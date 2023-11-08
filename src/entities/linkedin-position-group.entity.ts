import { LinkedInDateRange } from "./linkedin-date-range.entity";

export type LinkedInPositionGroupUrn = string;

export const POSITION_GROUP_TYPE = 'com.linkedin.voyager.dash.identity.profile.PositionGroup';

export interface LinkedInPositionGroup {
    $type: typeof POSITION_GROUP_TYPE;
    dateRange: LinkedInDateRange;
    multiLocaleCompanyName: Record<string, string>;
    companyName: string;
    '*company': string;
    companyUrn: string;
    $recipeTypes: string[];
    entityUrn: LinkedInPositionGroupUrn;
  }