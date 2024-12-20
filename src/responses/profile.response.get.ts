import { LinkedInPositionGroup } from '../entities/linkedin-position-group.entity';
import { LinkedInCollectionResponse } from '../entities/linkedin-collection-response.entity';
import { LinkedInCompany } from '../entities/linkedin-company.entity';
import { LinkedInProfile, ProfileUrn } from '../entities/linkedin-profile.entity';
import { LinkedInPosition } from '../entities/linkedin-position.entity';
import { LinkedInSkill } from '../entities/linkedin-skill.entity';
import { LinkedInEducation } from '../entities/linkedin-education.entity';
import { LinkedInCollection } from '../entities/linkedin-collection.entity';

export type UrnCollection = LinkedInCollection<string, undefined>;

export type ProfileResponseEntityType = LinkedInProfile | 
LinkedInCompany |
LinkedInPositionGroup |
LinkedInPosition |
LinkedInSkill |
LinkedInEducation

export type ProfileResponseType = ProfileResponseEntityType | UrnCollection;

export type GetProfileResponse = LinkedInCollectionResponse<ProfileUrn, ProfileResponseType>;
