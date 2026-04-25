import { describe, it, expect } from 'vitest';
import { calculateNaspiEligibility, calculateNaspiFromDecree, calculateAnticipo } from '../calculations';
import { NASPI_CONSTANTS } from '../../constants';
import { TerminationReason, VoluntaryException } from '../../types';
import type { UserInputData } from '../../types';

const baseInput = (overrides: Partial<UserInputData> = {}): UserInputData => ({
    age: 40,
    weeksWorkedLast4Years: 104,
    totalGrossWagesLast4Years: 60000,
    terminationReason: TerminationReason.INVOLUNTARY,
    voluntaryException: VoluntaryException.NONE,
    hasWorked30DaysLastYear: true,
    terminationDate: '2026-01-10',
    approvedStartDate: '',
    approvedDaysDuration: 0,
    approvedMonthlyAmount: 0,
    ...overrides,
});

describe('calculateNaspiEligibility — eligibilità', () => {
    it('rifiuta dimissioni volontarie senza eccezioni', () => {
        const r = calculateNaspiEligibility(
            baseInput({ terminationReason: TerminationReason.VOLUNTARY, voluntaryException: VoluntaryException.NONE }),
        );
        expect(r.isEligible).toBe(false);
        expect(r.ineligibilityReason).toMatch(/dimissioni volontarie/i);
    });

    it('accetta dimissioni volontarie per giusta causa', () => {
        const r = calculateNaspiEligibility(
            baseInput({
                terminationReason: TerminationReason.VOLUNTARY,
                voluntaryException: VoluntaryException.JUST_CAUSE,
            }),
        );
        expect(r.isEligible).toBe(true);
    });

    it('rifiuta anzianità contributiva < 13 settimane', () => {
        const r = calculateNaspiEligibility(baseInput({ weeksWorkedLast4Years: 12 }));
        expect(r.isEligible).toBe(false);
        expect(r.ineligibilityReason).toMatch(/13 settimane/);
    });

    it('accetta esattamente 13 settimane contributive', () => {
        const r = calculateNaspiEligibility(baseInput({ weeksWorkedLast4Years: 13, totalGrossWagesLast4Years: 6500 }));
        expect(r.isEligible).toBe(true);
    });
});

describe('calculateNaspiEligibility — durata', () => {
    it('durata = metà delle settimane lavorate', () => {
        const r = calculateNaspiEligibility(baseInput({ weeksWorkedLast4Years: 100, totalGrossWagesLast4Years: 50000 }));
        expect(r.durationWeeks).toBe(50);
        expect(r.totalDaysDuration).toBe(350);
    });

    it('durata max 104 settimane (2 anni) anche con 4 anni pieni', () => {
        const r = calculateNaspiEligibility(baseInput({ weeksWorkedLast4Years: 208, totalGrossWagesLast4Years: 120000 }));
        expect(r.durationWeeks).toBe(104);
    });
});

describe('calculateNaspiEligibility — importo lordo (parametri 2026)', () => {
    it('RMM sotto la soglia: 75% della retribuzione media', () => {
        // RMM ~= 1200 €: weeksWorked=52, wages = 1200/4.33*52 = ~14412
        const wages = (1200 / NASPI_CONSTANTS.COEFF_WEEKS_TO_MONTHS) * 52;
        const r = calculateNaspiEligibility(baseInput({ weeksWorkedLast4Years: 52, totalGrossWagesLast4Years: wages }));
        expect(r.grossMonthlyAmount).toBeCloseTo(900, 0);
    });

    it('RMM pari alla soglia (1456,72): NASpI = 75%', () => {
        const wages = (NASPI_CONSTANTS.THRESHOLD_AMOUNT / NASPI_CONSTANTS.COEFF_WEEKS_TO_MONTHS) * 52;
        const r = calculateNaspiEligibility(baseInput({ weeksWorkedLast4Years: 52, totalGrossWagesLast4Years: wages }));
        expect(r.grossMonthlyAmount).toBeCloseTo(1092.54, 1);
    });

    it('RMM sopra la soglia: 75% soglia + 25% eccedenza', () => {
        // RMM ~= 2000 €: formula attesa = 0.75*1456.72 + 0.25*(2000-1456.72) = 1228.36
        const wages = (2000 / NASPI_CONSTANTS.COEFF_WEEKS_TO_MONTHS) * 52;
        const r = calculateNaspiEligibility(baseInput({ weeksWorkedLast4Years: 52, totalGrossWagesLast4Years: wages }));
        expect(r.grossMonthlyAmount).toBeCloseTo(1228.36, 1);
    });

    it('RMM molto alta: clampato al massimale 2026 (1584,70)', () => {
        const wages = (5000 / NASPI_CONSTANTS.COEFF_WEEKS_TO_MONTHS) * 52;
        const r = calculateNaspiEligibility(baseInput({ weeksWorkedLast4Years: 52, totalGrossWagesLast4Years: wages }));
        expect(r.grossMonthlyAmount).toBe(NASPI_CONSTANTS.MAX_MONTHLY_CAP);
    });
});

describe('calculateNaspiEligibility — decorrenza e schedule', () => {
    it('data inizio = data cessazione + 8 giorni', () => {
        const r = calculateNaspiEligibility(baseInput({ terminationDate: '2026-01-10' }));
        expect(r.startDate).toMatch(/18 gennaio 2026/);
    });

    it('schedule genera pagamenti mensili fino alla fine', () => {
        const r = calculateNaspiEligibility(baseInput({ weeksWorkedLast4Years: 52, totalGrossWagesLast4Years: 26000 }));
        expect(r.schedule.length).toBeGreaterThan(0);
        expect(r.schedule.every((p) => p.grossAmount > 0)).toBe(true);
    });
});

describe('calculateNaspiEligibility — decalage', () => {
    it('under 55: nessuna riduzione prima del 6° mese, poi applicata', () => {
        const r = calculateNaspiEligibility(
            baseInput({ age: 40, weeksWorkedLast4Years: 104, totalGrossWagesLast4Years: 60000 }),
        );
        const early = r.schedule.slice(0, 5);
        expect(early.every((p) => !p.reductionApplied)).toBe(true);
        const late = r.schedule.slice(6);
        expect(late.some((p) => p.reductionApplied)).toBe(true);
    });

    it('over 55: decalage posticipato all\'8° mese', () => {
        const r = calculateNaspiEligibility(
            baseInput({ age: 60, weeksWorkedLast4Years: 200, totalGrossWagesLast4Years: 120000 }),
        );
        const early = r.schedule.slice(0, 7);
        expect(early.every((p) => !p.reductionApplied)).toBe(true);
    });

    it('over 55 (concreto): zero riduzione finché naspiMonthIndex < 8, poi attiva', () => {
        // age=56 -> reductionStartMonth = 8
        // weeksWorkedLast4Years = 208 -> durationWeeks = 104 -> totalDays = 728 ~ 24 mesi
        const r = calculateNaspiEligibility(
            baseInput({ age: 56, weeksWorkedLast4Years: 208, totalGrossWagesLast4Years: 120000 }),
        );
        // Tutte le voci con naspiMonthIndex < 8 (= primi mesi) NON devono avere riduzione.
        // Calcolato dal codice: il primo mese rated (naspiMonthIndex>=8) viene dopo
        // diversi record. Verifichiamo che almeno i primi 7 record non abbiano riduzione.
        for (let i = 0; i < 7 && i < r.schedule.length; i++) {
            expect(r.schedule[i].reductionApplied).toBe(false);
            expect(r.schedule[i].reductionPercentage).toBe(0);
        }
        // E che almeno una voce dopo l'inizio decalage abbia la riduzione applicata
        expect(r.schedule.some((p) => p.reductionApplied)).toBe(true);
        // Confronto con under 55: trovo l'indice del primo record con riduzione
        const firstReductionIdxOver55 = r.schedule.findIndex((p) => p.reductionApplied);
        const rUnder = calculateNaspiEligibility(
            baseInput({ age: 40, weeksWorkedLast4Years: 208, totalGrossWagesLast4Years: 120000 }),
        );
        const firstReductionIdxUnder55 = rUnder.schedule.findIndex((p) => p.reductionApplied);
        // Per over 55 la decalage parte più tardi (indice maggiore)
        expect(firstReductionIdxOver55).toBeGreaterThan(firstReductionIdxUnder55);
    });

    it('under 55 (concreto): la decalage compare entro le prime 8 voci della schedule', () => {
        // age=40 -> reductionStartMonth = 6
        const r = calculateNaspiEligibility(
            baseInput({ age: 40, weeksWorkedLast4Years: 200, totalGrossWagesLast4Years: 120000 }),
        );
        const firstReductionIdx = r.schedule.findIndex((p) => p.reductionApplied);
        expect(firstReductionIdx).toBeGreaterThanOrEqual(0);
        expect(firstReductionIdx).toBeLessThanOrEqual(7);
        // Dopo l'indice in cui parte, la riduzione percentuale e' > 0
        expect(r.schedule[firstReductionIdx].reductionPercentage).toBeGreaterThan(0);
    });
});

describe('calculateNaspiEligibility — edge case eligibilità', () => {
    it('NOT eligible se settimane < 13 anche con 30 giorni nell\'ultimo anno', () => {
        const r = calculateNaspiEligibility(
            baseInput({
                weeksWorkedLast4Years: 12,
                hasWorked30DaysLastYear: true,
                totalGrossWagesLast4Years: 6000,
            }),
        );
        expect(r.isEligible).toBe(false);
        expect(r.ineligibilityReason).toMatch(/13 settimane/);
    });

    it('NOT eligible se manca il requisito dei 30 giorni nell\'ultimo anno (altri requisiti OK)', () => {
        const r = calculateNaspiEligibility(
            baseInput({
                hasWorked30DaysLastYear: false,
            }),
        );
        expect(r.isEligible).toBe(false);
        expect(r.ineligibilityReason).toMatch(/30 giorni/);
        expect(r.durationWeeks).toBe(0);
        expect(r.schedule).toEqual([]);
    });

    it('eligible quando hasWorked30DaysLastYear=true e tutti gli altri requisiti sono OK', () => {
        const r = calculateNaspiEligibility(
            baseInput({
                hasWorked30DaysLastYear: true,
                weeksWorkedLast4Years: 52,
                totalGrossWagesLast4Years: 26000,
            }),
        );
        expect(r.isEligible).toBe(true);
        expect(r.schedule.length).toBeGreaterThan(0);
    });

    it('ordine dei check: 30 giorni mancanti + settimane < 13 → vince la reason dei 30 giorni', () => {
        // L'ordine atteso dei check è:
        //   1) VOLUNTARY/NONE
        //   2) hasWorked30DaysLastYear
        //   3) weeksWorkedLast4Years < 13
        // Quindi se hasWorked30DaysLastYear=false e settimane=5, la prima reason ad essere
        // impostata è quella sui 30 giorni.
        const r = calculateNaspiEligibility(
            baseInput({
                hasWorked30DaysLastYear: false,
                weeksWorkedLast4Years: 5,
                totalGrossWagesLast4Years: 2500,
            }),
        );
        expect(r.isEligible).toBe(false);
        expect(r.ineligibilityReason).toMatch(/30 giorni/);
        expect(r.ineligibilityReason).not.toMatch(/13 settimane/);
    });

    it('ordine dei check: VOLUNTARY/NONE vince anche se mancano i 30 giorni', () => {
        const r = calculateNaspiEligibility(
            baseInput({
                terminationReason: TerminationReason.VOLUNTARY,
                voluntaryException: VoluntaryException.NONE,
                hasWorked30DaysLastYear: false,
            }),
        );
        expect(r.isEligible).toBe(false);
        expect(r.ineligibilityReason).toMatch(/dimissioni volontarie/i);
    });

    it('VOLUNTARY senza eccezione: NOT eligible, durata=0 e schedule vuoto', () => {
        const r = calculateNaspiEligibility(
            baseInput({
                terminationReason: TerminationReason.VOLUNTARY,
                voluntaryException: VoluntaryException.NONE,
            }),
        );
        expect(r.isEligible).toBe(false);
        expect(r.durationWeeks).toBe(0);
        expect(r.totalDaysDuration).toBe(0);
        expect(r.schedule).toEqual([]);
        expect(r.grossMonthlyAmount).toBe(0);
    });

    it('VOLUNTARY con JUST_CAUSE: eligible e produce schedule', () => {
        const r = calculateNaspiEligibility(
            baseInput({
                terminationReason: TerminationReason.VOLUNTARY,
                voluntaryException: VoluntaryException.JUST_CAUSE,
                weeksWorkedLast4Years: 52,
                totalGrossWagesLast4Years: 26000,
            }),
        );
        expect(r.isEligible).toBe(true);
        expect(r.schedule.length).toBeGreaterThan(0);
    });

    it('VOLUNTARY con PROTECTED_PERIOD (maternità): eligible', () => {
        const r = calculateNaspiEligibility(
            baseInput({
                terminationReason: TerminationReason.VOLUNTARY,
                voluntaryException: VoluntaryException.PROTECTED_PERIOD,
                weeksWorkedLast4Years: 52,
                totalGrossWagesLast4Years: 26000,
            }),
        );
        expect(r.isEligible).toBe(true);
    });

    it('importo lordo > MAX_MONTHLY_CAP: clamp esatto al cap (1584,70)', () => {
        // Forziamo retribuzione molto alta: la formula calcolerebbe > cap
        const wages = (10_000 / NASPI_CONSTANTS.COEFF_WEEKS_TO_MONTHS) * 52;
        const r = calculateNaspiEligibility(
            baseInput({ weeksWorkedLast4Years: 52, totalGrossWagesLast4Years: wages }),
        );
        expect(r.grossMonthlyAmount).toBe(NASPI_CONSTANTS.MAX_MONTHLY_CAP);
        expect(r.grossMonthlyAmount).toBeLessThanOrEqual(NASPI_CONSTANTS.MAX_MONTHLY_CAP);
    });
});

describe('calculateNaspiFromDecree', () => {
    it('usa i valori approvati dal decreto senza ricalcolare', () => {
        const r = calculateNaspiFromDecree(
            baseInput({
                approvedStartDate: '2026-02-01',
                approvedDaysDuration: 365,
                approvedMonthlyAmount: 1200,
            }),
        );
        expect(r.grossMonthlyAmount).toBe(1200);
        expect(r.totalDaysDuration).toBe(365);
    });
});

describe('calculateAnticipo', () => {
    it('calcola lordo, tassa stimata 23% e netto residuo', () => {
        const r = calculateAnticipo({
            naspiStartDate: '2026-01-15',
            anticipoRequestDate: '2026-03-15',
            totalDays: 300,
            monthlyGrossAmount: 1200,
        });
        expect(r.totalGrossAmount).toBeGreaterThan(0);
        expect(r.estimatedTax).toBeCloseTo(r.totalGrossAmount * 0.23, 1);
        expect(r.estimatedNetAmount).toBeCloseTo(r.totalGrossAmount - r.estimatedTax, 1);
        expect(r.daysRemaining).toBeGreaterThan(0);
    });
});
