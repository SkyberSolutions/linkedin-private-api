export const INTEGER_RANGE_TYPE = 'com.linkedin.voyager.dash.deco.common.IntegerRange';

export interface LinkedInIntegerRange {
    start: number,
    end: number,
    $recipeTypes: string[],
    $type: typeof INTEGER_RANGE_TYPE
}