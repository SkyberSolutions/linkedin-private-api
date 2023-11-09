import { LinkedInCompany } from './linkedin-company.entity';
import { LinkedInPositionGroup } from './linkedin-position-group.entity';
import { LinkedInPosition } from './linkedin-position.entity';
import { LinkedInProfile } from './linkedin-profile.entity';
import { LinkedInSkill } from './linkedin-skill.entity';

export interface Profile extends LinkedInProfile {
  company: LinkedInCompany;
  pictureUrls: string[];
  positionGroups: LinkedInPositionGroup[];
  positions: LinkedInPosition[];
  skills: LinkedInSkill[];
}
