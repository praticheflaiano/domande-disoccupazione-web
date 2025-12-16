export enum TerminationReason {
    INVOLUNTARY = 'Licenziamento Involontario / Scadenza Contratto',
    VOLUNTARY = 'Dimissioni Volontarie',
    CONSENSUAL = 'Risoluzione Consensuale',
}

export enum VoluntaryException {
    NONE = 'Nessuna eccezione',
    JUST_CAUSE = 'Giusta Causa',
    PROTECTED_PERIOD = 'Periodo Tutelato (es. Maternità)',
}

export type CalculatorMode = 'forecast' | 'analysis';
export type Page = 'home' | 'calculator' | 'guide' | 'office' | 'apply' | 'anticipo' | 'privacy' | 'obligations' | 'guide-book';

export interface UserInputData {
    age: number;
    weeksWorkedLast4Years: number;
    totalGrossWagesLast4Years: number;
    terminationReason: TerminationReason;
    voluntaryException: VoluntaryException;
    hasWorked30DaysLastYear: boolean;
    terminationDate: string;
    approvedStartDate?: string;
    approvedDaysDuration?: number;
    approvedMonthlyAmount?: number;
}

export interface MonthlyPayment {
    monthYear: string;
    grossAmount: number;
    netAmount: number;
    reductionApplied: boolean;
    reductionPercentage: number;
    daysPaid: number;
    estimatedPaymentDate: string;
    isFuture?: boolean;
    dateObj?: Date;
}

export interface NaspiResult {
    isEligible: boolean;
    ineligibilityReason?: string;
    durationWeeks: number;
    totalDaysDuration: number;
    grossMonthlyAmount: number;
    startDate: string;
    endDate: string;
    schedule: MonthlyPayment[];
    calculationDetails: {
        averageMonthlyWage: number;
        referenceWage: number;
    };
}

export interface ExtractedData {
    weeks?: number;
    wages?: number;
    startDate?: string;
    days?: number;
    monthlyAmount?: number;
}

export interface AnticipoInput {
    naspiStartDate: string;
    totalDays: number;
    monthlyGrossAmount: number;
    anticipoRequestDate: string;
}

export interface AnticipoResult {
    totalGrossAmount: number;
    estimatedTax: number;
    estimatedNetAmount: number;
    daysRemaining: number;
    lastDayCovered: string;
}
