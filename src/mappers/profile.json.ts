// REFERENCE: https://nubela.co/proxycurl/linkedin

export interface Date {
    day: number;
    month: number;
    year: number;
}

export interface Experience {
    starts_at: Date;
    ends_at: Date;
    company: string;
    company_linkedin_profile_url: string;
    title: string;
    description: string | null;
    location: string | null;
    logo_url: string | null;
}

export interface Education {
    starts_at: Date;
    ends_at: Date;
    field_of_study: null;
    degree_name: null;
    school: string;
    description: string | null;
    logo_url: string;
}

export interface Language {
}

export interface Activity {
    title: string,
    link: string,
    activity_status: string
}

export interface ProfileSummary {
    name: string,
    link: string,
    summary: string,
    location: string
}

export interface Article {
    title: string,
    link: string,
    published_date: Date,
    author: string,
    image_url: string
}

export interface ProfileJSON {
    public_identifier: string,
    profile_pic_url: string | null,
    background_cover_image_url: string | null,
    first_name: string,
    last_name: string,
    full_name: string,
    occupation: string,
    headline: string,
    summary: string,
    country: string,
    country_full_name: string,
    city: string,
    state: string,
    experiences: Experience[],
    education: Education[],
    // languages: Language[],
    // accomplishment_organisations: [],
    // accomplishment_publications: [],
    // accomplishment_honors_awards: [],
    // accomplishment_patents: [],
    // accomplishment_courses: [],
    // accomplishment_projects: [],
    // accomplishment_test_scores: [],
    // volunteer_work: [],
    // certifications: [],
    // connections: number,
    // people_also_viewed: [],
    // recommendations: [],
    // activities: Activity[],
    // similarly_named_profiles: ProfileSummary[],
    // articles: Article[]
}