import { ExtractedData, CalculatorMode } from '../types';

const API_ENDPOINT = '/api/analyze-document';

const EMPTY_RESULT: ExtractedData = { weeks: 0, wages: 0, days: 0, monthlyAmount: 0 };

export const analyzeContributionDocument = async (
    base64Data: string,
    mimeType: string,
    mode: CalculatorMode,
): Promise<ExtractedData> => {
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ base64Data, mimeType, mode }),
        });

        if (!response.ok) {
            console.error('analyzeContributionDocument HTTP', response.status);
            return EMPTY_RESULT;
        }

        const data = await response.json();
        return { ...EMPTY_RESULT, ...data } as ExtractedData;
    } catch (error) {
        console.error('analyzeContributionDocument error:', error);
        return EMPTY_RESULT;
    }
};
