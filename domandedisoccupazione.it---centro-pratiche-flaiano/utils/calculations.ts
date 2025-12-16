import { NASPI_CONSTANTS } from "../constants";
import { NaspiResult, TerminationReason, UserInputData, VoluntaryException, MonthlyPayment, AnticipoInput, AnticipoResult } from "../types";

const formatDate = (date: Date): string => {
  if (!date || isNaN(date.getTime())) return "Data non valida";
  return new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
};

const formatMonthYear = (date: Date): string => {
  if (!date || isNaN(date.getTime())) return "N/A";
  return new Intl.DateTimeFormat('it-IT', { month: 'long', year: 'numeric' }).format(date);
};

// Calcolo Netto Stimato
const calculateEstimatedNet = (grossAmount: number, daysPaid: number): number => {
  if (!grossAmount || grossAmount <= 0 || !daysPaid || daysPaid <= 0) return 0;

  // Proiezione su base annua
  const projectedAnnualIncome = (grossAmount / daysPaid) * 365;

  let annualTax = 0;
  // Scaglioni IRPEF 2024 semplificati
  if (projectedAnnualIncome <= 28000) {
    annualTax = projectedAnnualIncome * 0.23;
  } else if (projectedAnnualIncome <= 50000) {
    annualTax = 6440 + ((projectedAnnualIncome - 28000) * 0.35);
  } else {
    annualTax = 14140 + ((projectedAnnualIncome - 50000) * 0.43);
  }

  // Detrazioni Lavoro Dipendente (approx)
  let annualDetraction = 0;
  if (projectedAnnualIncome <= 15000) {
    annualDetraction = 1955;
  } else if (projectedAnnualIncome <= 28000) {
    annualDetraction = 1910 + (1190 * ((28000 - projectedAnnualIncome) / 13000));
  } else if (projectedAnnualIncome <= 50000) {
    annualDetraction = 1910 * ((50000 - projectedAnnualIncome) / 22000);
  }

  let netAnnualTax = Math.max(0, annualTax - annualDetraction);
  const effectiveTaxRate = netAnnualTax / projectedAnnualIncome;
  
  // Apply tax rate
  return parseFloat((grossAmount * (1 - effectiveTaxRate)).toFixed(2));
};

const generateSchedule = (
    startDateObj: Date, 
    totalDaysDuration: number, 
    baseMonthlyAmount: number, 
    age: number
): MonthlyPayment[] => {
    const schedule: MonthlyPayment[] = [];
    if (isNaN(startDateObj.getTime()) || totalDaysDuration <= 0) return schedule;

    const dailyRate = baseMonthlyAmount / 30;
    let remainingDays = totalDaysDuration;
    let currentDate = new Date(startDateObj);
    
    // Décalage logic
    const reductionStartMonth = age >= 55 ? NASPI_CONSTANTS.REDUCTION_START_MONTH_OVER_55 : NASPI_CONSTANTS.REDUCTION_START_MONTH;
    
    while (remainingDays > 0) {
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        // Days in current month logic
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const currentDayOfMonth = currentDate.getDate();
        
        let daysInThisMonth = (lastDayOfMonth - currentDayOfMonth) + 1;
        if (daysInThisMonth > remainingDays) daysInThisMonth = remainingDays;

        // Calculate Month Index for reduction
        const msSinceStart = currentDate.getTime() - startDateObj.getTime();
        const monthsSinceStart = Math.floor(msSinceStart / (1000 * 60 * 60 * 24 * 30.4375)); // Average month
        const naspiMonthIndex = monthsSinceStart + 1;

        let reductionApplied = false;
        let reductionPercentageDisplay = 0;
        let currentReductionFactor = 1;

        if (naspiMonthIndex >= reductionStartMonth) {
            const monthsOver = naspiMonthIndex - reductionStartMonth + 1;
            // 3% reduction per month logic
            currentReductionFactor = Math.pow(1 - NASPI_CONSTANTS.REDUCTION_PERCENTAGE, monthsOver);
            reductionApplied = true;
            reductionPercentageDisplay = Math.round((1 - currentReductionFactor) * 100);
        }

        const grossAmount = (dailyRate * currentReductionFactor) * daysInThisMonth;
        const netAmount = calculateEstimatedNet(grossAmount, daysInThisMonth);
        const paymentDate = new Date(currentYear, currentMonth + 1, 15);

        schedule.push({
          monthYear: formatMonthYear(currentDate),
          grossAmount: parseFloat(grossAmount.toFixed(2)),
          netAmount: netAmount,
          reductionApplied,
          reductionPercentage: reductionPercentageDisplay,
          daysPaid: daysInThisMonth,
          estimatedPaymentDate: formatDate(paymentDate),
          dateObj: new Date(currentDate)
        });

        remainingDays -= daysInThisMonth;
        // Advance to 1st of next month
        currentDate = new Date(currentYear, currentMonth + 1, 1);
    }
    return schedule;
};

export const calculateNaspiEligibility = (data: UserInputData): NaspiResult => {
  const { 
    weeksWorkedLast4Years, 
    totalGrossWagesLast4Years, 
    terminationReason, 
    voluntaryException,
    age,
    terminationDate
  } = data;

  let isEligible = true;
  let ineligibilityReason = "";

  if (terminationReason === TerminationReason.VOLUNTARY && voluntaryException === VoluntaryException.NONE) {
    isEligible = false;
    ineligibilityReason = "Le dimissioni volontarie non danno diritto alla NASpI (salvo giusta causa/maternità).";
  }

  if (isEligible && weeksWorkedLast4Years < 13) {
    isEligible = false;
    ineligibilityReason = `Requisito non soddisfatto: servono 13 settimane contributive (tu ne hai ${weeksWorkedLast4Years}).`;
  }

  if (!isEligible) {
    return {
      isEligible: false, ineligibilityReason, durationWeeks: 0, totalDaysDuration: 0, grossMonthlyAmount: 0,
      startDate: "", endDate: "", schedule: [], calculationDetails: { averageMonthlyWage: 0, referenceWage: 0 },
    };
  }

  const durationWeeks = Math.min(weeksWorkedLast4Years / 2, 104); // Max 2 years
  const totalDaysDuration = Math.floor(durationWeeks * 7);

  // Calcolo Importo
  const averageMonthlyWage = (totalGrossWagesLast4Years / Math.max(weeksWorkedLast4Years, 1)) * NASPI_CONSTANTS.COEFF_WEEKS_TO_MONTHS;

  let baseGrossMonthly = 0;
  if (averageMonthlyWage <= NASPI_CONSTANTS.THRESHOLD_AMOUNT) {
    baseGrossMonthly = averageMonthlyWage * NASPI_CONSTANTS.PERCENTAGE_BASE;
  } else {
    const excess = averageMonthlyWage - NASPI_CONSTANTS.THRESHOLD_AMOUNT;
    baseGrossMonthly = (NASPI_CONSTANTS.THRESHOLD_AMOUNT * NASPI_CONSTANTS.PERCENTAGE_BASE) + (excess * NASPI_CONSTANTS.PERCENTAGE_EXCESS);
  }
  
  if (baseGrossMonthly > NASPI_CONSTANTS.MAX_MONTHLY_CAP) baseGrossMonthly = NASPI_CONSTANTS.MAX_MONTHLY_CAP;

  // Date
  const termDateObj = new Date(terminationDate);
  const startDateObj = new Date(termDateObj);
  startDateObj.setDate(termDateObj.getDate() + 8); // Start 8th day after termination
  
  const endDateObj = new Date(startDateObj);
  endDateObj.setDate(startDateObj.getDate() + totalDaysDuration);

  const schedule = generateSchedule(startDateObj, totalDaysDuration, baseGrossMonthly, age);

  return {
    isEligible: true,
    durationWeeks,
    totalDaysDuration,
    grossMonthlyAmount: parseFloat(baseGrossMonthly.toFixed(2)),
    startDate: formatDate(startDateObj),
    endDate: formatDate(endDateObj),
    schedule,
    calculationDetails: { averageMonthlyWage, referenceWage: averageMonthlyWage },
  };
};

export const calculateNaspiFromDecree = (data: UserInputData): NaspiResult => {
    const { approvedStartDate, approvedDaysDuration, approvedMonthlyAmount, age } = data;

    if (!approvedStartDate || !approvedDaysDuration || !approvedMonthlyAmount) {
         return {
            isEligible: false, ineligibilityReason: "Dati insufficienti.",
            durationWeeks: 0, totalDaysDuration: 0, grossMonthlyAmount: 0,
            startDate: "", endDate: "", schedule: [], calculationDetails: { averageMonthlyWage: 0, referenceWage: 0 }
        };
    }

    const startDateObj = new Date(approvedStartDate);
    const endDateObj = new Date(startDateObj);
    endDateObj.setDate(startDateObj.getDate() + approvedDaysDuration);

    const schedule = generateSchedule(startDateObj, approvedDaysDuration, approvedMonthlyAmount, age);

    return {
        isEligible: true,
        durationWeeks: Math.round(approvedDaysDuration / 7),
        totalDaysDuration: approvedDaysDuration,
        grossMonthlyAmount: approvedMonthlyAmount,
        startDate: formatDate(startDateObj),
        endDate: formatDate(endDateObj),
        schedule,
        calculationDetails: { averageMonthlyWage: 0, referenceWage: 0 }
    };
}

export const calculateAnticipo = (input: AnticipoInput): AnticipoResult => {
  const startDate = new Date(input.naspiStartDate);
  const requestDate = new Date(input.anticipoRequestDate);
  const fullSchedule = generateSchedule(startDate, input.totalDays, input.monthlyGrossAmount, 40); // Assume no reduction yet for simplicity or age < 55

  let totalGross = 0;
  let remainingDays = 0;

  for (const payment of fullSchedule) {
      // Logic: If payment covers period AFTER request date, it is anticipatable.
      // Payment dateObj represents start of that payment month usually.
      
      if (!payment.dateObj) continue;
      
      const paymentEndOfMonth = new Date(payment.dateObj.getFullYear(), payment.dateObj.getMonth() + 1, 0);

      if (payment.dateObj >= requestDate) {
          // Whole month is future
          totalGross += payment.grossAmount;
          remainingDays += payment.daysPaid;
      } else if (paymentEndOfMonth > requestDate) {
          // Partial month
          const timeDiff = paymentEndOfMonth.getTime() - requestDate.getTime();
          const daysLeftInMonth = Math.ceil(timeDiff / (1000 * 3600 * 24));
          const dailyRate = payment.grossAmount / payment.daysPaid;
          totalGross += (dailyRate * daysLeftInMonth);
          remainingDays += daysLeftInMonth;
      }
  }

  // Tassazione Separata Stima (23%)
  const estimatedTax = totalGross * NASPI_CONSTANTS.SEPARATE_TAXATION_RATE_ESTIMATE;

  return {
      totalGrossAmount: parseFloat(totalGross.toFixed(2)),
      estimatedTax: parseFloat(estimatedTax.toFixed(2)),
      estimatedNetAmount: parseFloat((totalGross - estimatedTax).toFixed(2)),
      daysRemaining: remainingDays,
      lastDayCovered: "Fine NASpI"
  };
};