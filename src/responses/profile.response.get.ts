import { LinkedInPositionGroup } from 'src/entities/linkedin-position-group.entity';
import { LinkedInCollectionResponse } from '../entities/linkedin-collection-response.entity';
import { LinkedInCompany } from '../entities/linkedin-company.entity';
import { LinkedInProfile, ProfileUrn } from '../entities/linkedin-profile.entity';
import { LinkedInPosition } from '../entities/linkedin-position.entity';
import { LinkedInSkill } from 'src/entities/linkedin-skill.entity';
import { LinkedInEducation } from 'src/entities/linkedin-education.entity';

export type UrnCollection = LinkedInCollectionResponse<string, undefined>;

export type ProfileResponseEntityType = LinkedInProfile | 
LinkedInCompany |
LinkedInPositionGroup |
LinkedInPosition |
LinkedInSkill |
LinkedInEducation

export type ProfileResponseType = ProfileResponseEntityType | UrnCollection;

export type GetProfileResponse = LinkedInCollectionResponse<ProfileUrn, ProfileResponseType>;
