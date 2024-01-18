export const DATE_TYPE = 'com.linkedin.common.Date';

export interface LinkedInDate {
    month: number,
    year: number,
    $recipeTypes: string[],
    $type: typeof DATE_TYPE
}