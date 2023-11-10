import { Profile } from "src/entities";
import { ProfileJSON } from "./profile.json";


export class ProfileMapper {

    profileToJson(input: Profile): ProfileJSON {

        const output: ProfileJSON = {
            public_identifier: input.publicIdentifier,
            profile_pic_url: null,
            background_cover_image_url: null,
            first_name: input.firstName,
            last_name: input.lastName,
            full_name: input.firstName + " " + input.lastName,
            occupation: "",
            headline: input.headline,
            summary: "",
            country: "",
            country_full_name: "",
            city: "",
            state: "",
            experiences: [],
            education: []
        }
    
        return output
      }

}