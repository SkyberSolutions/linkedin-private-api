import { LinkedInDate } from "./linkedin-date.entity";

export const DATE_RANGE_TYPE = 'com.linkedin.common.DateRange';

export interface LinkedInDateRange {
    start: LinkedInDate,
    end: LinkedInDate | undefined,
    $recipeTypes: string[],
    $type: typeof DATE_RANGE_TYPE
}