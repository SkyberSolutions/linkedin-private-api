import { LinkedInDateRange } from "./linkedin-date-range.entity";

export type LinkedInPositionUrn = string;

export const POSITION_TYPE = 'com.linkedin.voyager.dash.identity.profile.Position';

export interface LinkedInPosition {
    $type: typeof POSITION_TYPE;
    dateRange: LinkedInDateRange;
    multiLocaleCompanyName: Record<string, string>;
    companyName: string;
    '*company': string;
    title: string;
    companyUrn: string;
    '*employmentType': string;
    employmentTypeUrn: string;
    entityUrn: LinkedInPositionUrn;
    multiLocaleGeoLocationName: Record<string, string>;
    shouldShowSourceOfHireBadge: boolean;
    locationName: string;
    '*profileTreasuryMediaPosition': string,
    multiLocaleTitle: Record<string, string>,
    $recipeTypes: string[],
    geoLocationName: string,
    multiLocaleLocationName: Record<string, string>,
    sourceOfHireType: string
  }