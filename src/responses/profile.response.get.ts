import { LinkedInPositionGroup } from 'src/entities/linkedin-position-group.entity';
import { LinkedInCollectionResponse } from '../entities/linkedin-collection-response.entity';
import { LinkedInCompany } from '../entities/linkedin-company.entity';
import { LinkedInProfile, ProfileUrn } from '../entities/linkedin-profile.entity';

export type UrnCollection = LinkedInCollectionResponse<string, undefined>;

export type GetProfileResponse = LinkedInCollectionResponse<
                                                            ProfileUrn, 
                                                            LinkedInProfile | 
                                                            LinkedInCompany |
                                                            LinkedInPositionGroup |
                                                            UrnCollection
                                                            >;
