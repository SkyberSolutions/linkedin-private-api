export const SKILL_TYPE = 'com.linkedin.voyager.dash.identity.profile.Profile';
export type SkillUrn = string;

export interface LinkedInSkill {
  $type: typeof SKILL_TYPE;
  $recipeTypes: string[];
  entityUrn: SkillUrn;
  name: string
}