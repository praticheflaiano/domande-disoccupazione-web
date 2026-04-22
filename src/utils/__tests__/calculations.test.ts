import { describe, it, expect } from 'vitest';
import { calculateNaspiEligibility, calculateNaspiFromDecree, calculateAnticipo } from '../calculations';
import { NASPI_CONSTANTS } from '../../constants';
import { TerminationReason, VoluntaryException, UserInputData } from '../../types';

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
