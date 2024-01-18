import { LinkedInDateRange } from "./linkedin-date-range.entity";

export type LinkedInEducationUrn = string;

export const EDUCATION_TYPE = 'com.linkedin.voyager.dash.identity.profile.Education';

export interface LinkedInEducation {
    dateRange: LinkedInDateRange;
    description: string | null;
    "*company": string;
    "*profileTreasuryMediaEducation": string;
    companyUrn: string;
    schoolUrn: string;
    entityUrn: LinkedInEducationUrn;
    standardizedFieldOfStudyUrn: string | null;
    schoolName: string;
    fieldOfStudy: string;
    degreeName: string;
    multiLocaleGrade: Record<string, string> | null;
    $recipeTypes: string[];
    multiLocaleSchoolName: Record<string, string> ;
    $type: typeof EDUCATION_TYPE;
    multiLocaleActivities: Record<string, string>  | null;
    activities: string | null;
    grade: string | null;
    "*school": string;
    multiLocaleFieldOfStudy: Record<string, string>;
    multiLocaleDescription: Record<string, string> | null;
    multiLocaleDegreeName: Record<string, string>;
    degreeUrn: string | null
  }