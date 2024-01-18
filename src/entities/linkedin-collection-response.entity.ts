import { LinkedInCollection } from "./linkedin-collection.entity";

export interface LinkedInCollectionResponse<T, I, M = undefined> {
  data: LinkedInCollection<T,M>;
  included: I[];
}
