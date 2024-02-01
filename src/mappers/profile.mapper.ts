import { Profile } from "../entities";
import { Education, Experience, ProfileJSON } from "./profile.json";
import { LinkedInDate } from "../entities/linkedin-date.entity";

function dateFromLinkedinDate(input: LinkedInDate | undefined) {
    if (input === undefined) return null
    return {
        day: undefined,
        month: input.month,
        year: input.year
    }
}

function getExperiences(input: Profile): Experience[] {
    return input.positions.map ((position) => {
        return {
            starts_at: dateFromLinkedinDate(position.dateRange.start)!,
            ends_at: dateFromLinkedinDate(position.dateRange.end),
            company: position.companyName,
            company_linkedin_profile_url: "",
            title: position.title,
            description: position.description,
            location: position.locationName,
            logo_url: null
        }
    })
}

function getEducations(input: Profile): Education[] {
    return input.educations.map ((education) => {
        return {
            starts_at: dateFromLinkedinDate(education.dateRange.start)!,
            ends_at: dateFromLinkedinDate(education.dateRange.end),
            field_of_study: education.fieldOfStudy,
            degree_name: education.degreeName,
            school: education.schoolName,
            description: education.description,
            logo_url: null
        }
    })
}

export class ProfileMapper {

    profileToJson(input: Profile): ProfileJSON {

        

        const output: ProfileJSON = {
            public_identifier: input.publicIdentifier,
            profile_pic_url: input.pictureUrls.reduce((prev, current) => (prev.width > current.width) ? prev : current).url,
            background_cover_image_url: null,
            first_name: input.firstName,
            last_name: input.lastName,
            full_name: input.firstName + " " + input.lastName,
            occupation: "",
            headline: input.headline,
            summary: input.summary,
            country: "",
            country_full_name: "",
            city: "",
            state: "",
            experiences: getExperiences(input),
            education: getEducations(input)
        }
    
        return output
      }
}