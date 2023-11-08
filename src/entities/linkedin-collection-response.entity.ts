export const COLLECTION_RESPONSE_TYPE = 'com.linkedin.restli.common.CollectionResponse';

interface Paging {
  count: number;
  links: string[];
  start: number;
}

export interface LinkedInCollectionResponse<T, I, M = undefined> {
  data: {
    elements: T[];
    $type: typeof COLLECTION_RESPONSE_TYPE;
    entityUrn: string;
    paging: Paging;
    metadata?: M;
  };
  included: I[];
}
