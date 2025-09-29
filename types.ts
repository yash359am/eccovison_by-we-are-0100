export enum ClassificationCategory {
    RECYCLABLE = 'Recyclable',
    NON_RECYCLABLE = 'Non-Recyclable',
    COMPOSTABLE = 'Compostable',
}

export interface ClassificationResult {
    classification: ClassificationCategory;
    reason: string;
}