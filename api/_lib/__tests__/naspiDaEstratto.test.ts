import { describe, it, expect } from 'vitest';
import { calcolaDaRighe, numeroItaliano, quattroAnniPrima, type RigaTrascritta } from '../naspiDaEstratto';

const riga = (dal: string, al: string, tipo: string, contributi: string, importo = '', unita = 'settimane'): RigaTrascritta =>
    ({ dal, al, tipo, unita, contributi, importo });

describe('naspiDaEstratto', () => {
    it('legge i numeri scritti all\'italiana', () => {
        expect(numeroItaliano('25.431,00')).toBe(25431);
        expect(numeroItaliano('52')).toBe(52);
        expect(numeroItaliano('46,000')).toBe(46);
        expect(numeroItaliano('1.234')).toBe(1234);
        expect(numeroItaliano('')).toBeNull();
    });

    it('il periodo è dei 4 anni prima della fine del lavoro', () => {
        expect(quattroAnniPrima('2026-10-31')).toBe('2022-11-01');
    });

    it('somma solo il lavoro dipendente degli ultimi 4 anni', () => {
        const r = calcolaDaRighe([
            riga('2021-01-01', '2021-12-31', 'Lavoro dipendente', '52', '20.000,00'), // fuori periodo
            riga('2023-01-01', '2023-12-31', 'Lavoro dipendente', '52', '24.000,00'),
            riga('2024-01-01', '2024-12-31', 'Lav.dipend. part-time', '52', '12.000,00'),
            riga('2025-03-01', '2025-04-30', 'Contr.Figurativa Malattia', '8', ''),
            riga('2025-01-01', '2025-12-31', 'Lavoro dipendente', '44', '22.000,00'),
            riga('2025-06-01', '2025-06-30', 'Maternità obbligatoria', '4', ''),
        ], '2026-10-31');
        expect(r.weeks).toBe(52 + 52 + 44 + 4);
        expect(r.wages).toBe(58000);
        expect(r.righeEscluse).toBe(1);
        expect(r.avvisi.join(' ')).toMatch(/figurativi/);
    });

    it('conta in proporzione la riga a cavallo dell\'inizio del periodo', () => {
        // periodo dal 2022-11-01: la riga 2022 conta per 61 giorni su 365
        const r = calcolaDaRighe([riga('2022-01-01', '2022-12-31', 'Lavoro dipendente', '52', '36.500,00')], '2026-10-31');
        expect(r.weeks).toBe(Math.round(52 * 61 / 365));
        expect(r.wages).toBe(6100);
    });

    it('esclude gestioni non da dipendente e righe in mesi', () => {
        const r = calcolaDaRighe([
            riga('2024-01-01', '2024-12-31', 'Gestione separata · Collaborazione', '12', '15.000,00', 'mesi'),
            riga('2024-01-01', '2024-12-31', 'Titolare di impresa COM.', '12', '', 'mesi'),
        ], '2026-10-31');
        expect(r.weeks).toBe(0);
        expect(r.righeContate).toBe(0);
    });
});
