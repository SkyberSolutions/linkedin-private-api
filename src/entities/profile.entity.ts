import { LinkedInCompany } from './linkedin-company.entity';
import { LinkedInEducation } from './linkedin-education.entity';
import { Image } from './image.entity';
import { LinkedInPositionGroup } from './linkedin-position-group.entity';
import { LinkedInPosition } from './linkedin-position.entity';
import { LinkedInProfile } from './linkedin-profile.entity';
import { LinkedInSkill } from './linkedin-skill.entity';

export interface Profile extends LinkedInProfile {
  pictureUrls: Image[];
  positionGroups: LinkedInPositionGroup[];
  positions: LinkedInPosition[];
  skills: LinkedInSkill[];
  educations: LinkedInEducation[]
  companies: LinkedInCompany[]
}
