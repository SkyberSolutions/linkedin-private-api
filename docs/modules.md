[linkedin-private-api](README.md) / Exports

# linkedin-private-api

## Table of contents

### Enumerations

- [Country](enums/Country.md)
- [FeaturedType](enums/FeaturedType.md)
- [Language](enums/Language.md)
- [LinkedInContractInterest](enums/LinkedInContractInterest.md)
- [LinkedInNetworkType](enums/LinkedInNetworkType.md)
- [LinkedInSearchType](enums/LinkedInSearchType.md)
- [SearchResultType](enums/SearchResultType.md)

### Classes

- [Client](classes/Client.md)

### Interfaces

- [AnonymousCookies](interfaces/AnonymousCookies.md)
- [AttributeText](interfaces/AttributeText.md)
- [AuthCookies](interfaces/AuthCookies.md)
- [CompanySearchHit](interfaces/CompanySearchHit.md)
- [Conversation](interfaces/Conversation.md)
- [GetConversationResponse](interfaces/GetConversationResponse.md)
- [GetOwnProfileResponse](interfaces/GetOwnProfileResponse.md)
- [Invitation](interfaces/Invitation.md)
- [LinkedEventCreateResponse](interfaces/LinkedEventCreateResponse.md)
- [LinkedInBaseCompany](interfaces/LinkedInBaseCompany.md)
- [LinkedInCollectionResponse](interfaces/LinkedInCollectionResponse.md)
- [LinkedInCompany](interfaces/LinkedInCompany.md)
- [LinkedInEvent](interfaces/LinkedInEvent.md)
- [LinkedInImageAttribute](interfaces/LinkedInImageAttribute.md)
- [LinkedInImageViewModel](interfaces/LinkedInImageViewModel.md)
- [LinkedInInvitation](interfaces/LinkedInInvitation.md)
- [LinkedInJobPosting](interfaces/LinkedInJobPosting.md)
- [LinkedInJobPostingCompany](interfaces/LinkedInJobPostingCompany.md)
- [LinkedInMessage](interfaces/LinkedInMessage.md)
- [LinkedInMessageEvent](interfaces/LinkedInMessageEvent.md)
- [LinkedInMiniCompany](interfaces/LinkedInMiniCompany.md)
- [LinkedInMiniProfile](interfaces/LinkedInMiniProfile.md)
- [LinkedInParticipantReceipts](interfaces/LinkedInParticipantReceipts.md)
- [LinkedInPhotoFilterPicture](interfaces/LinkedInPhotoFilterPicture.md)
- [LinkedInProfile](interfaces/LinkedInProfile.md)
- [LinkedInSearchCluster](interfaces/LinkedInSearchCluster.md)
- [LinkedInSearchHitV2](interfaces/LinkedInSearchHitV2.md)
- [LinkedInTextViewModel](interfaces/LinkedInTextViewModel.md)
- [LinkedInVectorArtifact](interfaces/LinkedInVectorArtifact.md)
- [LinkedInVectorImage](interfaces/LinkedInVectorImage.md)
- [LinkedinConversation](interfaces/LinkedinConversation.md)
- [MessageEvent](interfaces/MessageEvent.md)
- [MessageEventCreateResponse](interfaces/MessageEventCreateResponse.md)
- [MiniProfile](interfaces/MiniProfile.md)
- [PeopleSearchFilters](interfaces/PeopleSearchFilters.md)
- [PeopleSearchHit](interfaces/PeopleSearchHit.md)
- [Profile](interfaces/Profile.md)
- [QuickReplayRecommendation](interfaces/QuickReplayRecommendation.md)
- [SendMessageResponse](interfaces/SendMessageResponse.md)

### Type Aliases

- [BlendedSearchFilters](modules.md#blendedsearchfilters)
- [ClientInterface](modules.md#clientinterface)
- [ConversationId](modules.md#conversationid)
- [ConversationUrn](modules.md#conversationurn)
- [GetBlendedSearchResponse](modules.md#getblendedsearchresponse)
- [GetConversationsResponse](modules.md#getconversationsresponse)
- [GetMessagesResponse](modules.md#getmessagesresponse)
- [GetProfileResponse](modules.md#getprofileresponse)
- [GetReceivedInvitationResponse](modules.md#getreceivedinvitationresponse)
- [GetSentInvitationResponse](modules.md#getsentinvitationresponse)
- [LinkedInEventUrn](modules.md#linkedineventurn)
- [MiniProfileUrn](modules.md#miniprofileurn)
- [ProfileId](modules.md#profileid)
- [ProfileUrn](modules.md#profileurn)

### Variables

- [BASE\_COMPANY\_TYPE](modules.md#base_company_type)
- [COMPANY\_TYPE](modules.md#company_type)
- [CONVERSATION\_TYPE](modules.md#conversation_type)
- [EVENT\_TYPE](modules.md#event_type)
- [INVITATION\_TYPE](modules.md#invitation_type)
- [JOB\_POSTING\_TYPE](modules.md#job_posting_type)
- [MINI\_COMPANY\_TYPE](modules.md#mini_company_type)
- [MINI\_PROFILE\_TYPE](modules.md#mini_profile_type)
- [PROFILE\_TYPE](modules.md#profile_type)

## Type Aliases

### BlendedSearchFilters

Ƭ **BlendedSearchFilters**: [`PeopleSearchFilters`](interfaces/PeopleSearchFilters.md) \| { `resultType?`: [`LinkedInSearchType`](enums/LinkedInSearchType.md)  }

#### Defined in

[types/blended-search-filters.ts:4](https://github.com/SkyberSolutions/linkedin-private-api/blob/2fe9e6a/src/types/blended-search-filters.ts#L4)

___

### ClientInterface

Ƭ **ClientInterface**: [`Client`](classes/Client.md)

#### Defined in

[types/client.interface.ts:3](https://github.com/SkyberSolutions/linkedin-private-api/blob/2fe9e6a/src/types/client.interface.ts#L3)

___

### ConversationId

Ƭ **ConversationId**: `string`

#### Defined in

[entities/conversation.entity.ts:4](https://github.com/SkyberSolutions/linkedin-private-api/blob/2fe9e6a/src/entities/conversation.entity.ts#L4)

___

### ConversationUrn

Ƭ **ConversationUrn**: `string`

#### Defined in

[entities/linkedin-conversation.entity.ts:23](https://github.com/SkyberSolutions/linkedin-private-api/blob/2fe9e6a/src/entities/linkedin-conversation.entity.ts#L23)

___

### GetBlendedSearchResponse

Ƭ **GetBlendedSearchResponse**: [`LinkedInCollectionResponse`](interfaces/LinkedInCollectionResponse.md)<[`LinkedInSearchCluster`](interfaces/LinkedInSearchCluster.md), [`LinkedInMiniProfile`](interfaces/LinkedInMiniProfile.md) \| [`LinkedInMiniCompany`](interfaces/LinkedInMiniCompany.md), `GetBlendedSearchMetadata`\>

#### Defined in

[responses/blended-search.reponse.get.ts:17](https://github.com/SkyberSolutions/linkedin-private-api/blob/2fe9e6a/src/responses/blended-search.reponse.get.ts#L17)

___

### GetConversationsResponse

Ƭ **GetConversationsResponse**: [`LinkedInCollectionResponse`](interfaces/LinkedInCollectionResponse.md)<[`ConversationUrn`](modules.md#conversationurn), [`LinkedInMiniProfile`](interfaces/LinkedInMiniProfile.md) \| [`LinkedinConversation`](interfaces/LinkedinConversation.md), `ConversationMetadata`\>

#### Defined in

[responses/conversations.response.get.ts:10](https://github.com/SkyberSolutions/linkedin-private-api/blob/2fe9e6a/src/responses/conversations.response.get.ts#L10)

___

### GetMessagesResponse

Ƭ **GetMessagesResponse**: [`LinkedInCollectionResponse`](interfaces/LinkedInCollectionResponse.md)<[`LinkedInEventUrn`](modules.md#linkedineventurn), [`LinkedInMiniProfile`](interfaces/LinkedInMiniProfile.md) \| [`LinkedInMessageEvent`](interfaces/LinkedInMessageEvent.md)\>

#### Defined in

[responses/messages.response.get.ts:6](https://github.com/SkyberSolutions/linkedin-private-api/blob/2fe9e6a/src/responses/messages.response.get.ts#L6)

___

### GetProfileResponse

Ƭ **GetProfileResponse**: [`LinkedInCollectionResponse`](interfaces/LinkedInCollectionResponse.md)<[`ProfileUrn`](modules.md#profileurn), [`LinkedInProfile`](interfaces/LinkedInProfile.md) \| [`LinkedInCompany`](interfaces/LinkedInCompany.md)\>

#### Defined in

[responses/profile.response.get.ts:5](https://github.com/SkyberSolutions/linkedin-private-api/blob/2fe9e6a/src/responses/profile.response.get.ts#L5)

___

### GetReceivedInvitationResponse

Ƭ **GetReceivedInvitationResponse**: [`LinkedInCollectionResponse`](interfaces/LinkedInCollectionResponse.md)<`string`, [`MiniProfile`](interfaces/MiniProfile.md) \| [`LinkedInInvitation`](interfaces/LinkedInInvitation.md), `ReceivedInvitationMetadata`\>

#### Defined in

[responses/received-invitations.response.get.ts:10](https://github.com/SkyberSolutions/linkedin-private-api/blob/2fe9e6a/src/responses/received-invitations.response.get.ts#L10)

___

### GetSentInvitationResponse

Ƭ **GetSentInvitationResponse**: [`LinkedInCollectionResponse`](interfaces/LinkedInCollectionResponse.md)<`string`, [`MiniProfile`](interfaces/MiniProfile.md) \| [`LinkedInInvitation`](interfaces/LinkedInInvitation.md), `SentInvitationMetadata`\>

#### Defined in

[responses/sent-invitations.response.get.ts:10](https://github.com/SkyberSolutions/linkedin-private-api/blob/2fe9e6a/src/responses/sent-invitations.response.get.ts#L10)

___

### LinkedInEventUrn

Ƭ **LinkedInEventUrn**: `string`

#### Defined in

[entities/linkedin-event.entity.ts:1](https://github.com/SkyberSolutions/linkedin-private-api/blob/2fe9e6a/src/entities/linkedin-event.entity.ts#L1)

___

### MiniProfileUrn

Ƭ **MiniProfileUrn**: `string`

#### Defined in

[entities/linkedin-mini-profile.entity.ts:3](https://github.com/SkyberSolutions/linkedin-private-api/blob/2fe9e6a/src/entities/linkedin-mini-profile.entity.ts#L3)

___

### ProfileId

Ƭ **ProfileId**: `string`

#### Defined in

[entities/mini-profile.entity.ts:3](https://github.com/SkyberSolutions/linkedin-private-api/blob/2fe9e6a/src/entities/mini-profile.entity.ts#L3)

___

### ProfileUrn

Ƭ **ProfileUrn**: `string`

#### Defined in

[entities/linkedin-profile.entity.ts:38](https://github.com/SkyberSolutions/linkedin-private-api/blob/2fe9e6a/src/entities/linkedin-profile.entity.ts#L38)

## Variables

### BASE\_COMPANY\_TYPE

• `Const` **BASE\_COMPANY\_TYPE**: ``"com.linkedin.voyager.organization.Company"``

#### Defined in

[entities/linkedin-base-company.ts:3](https://github.com/SkyberSolutions/linkedin-private-api/blob/2fe9e6a/src/entities/linkedin-base-company.ts#L3)

___

### COMPANY\_TYPE

• `Const` **COMPANY\_TYPE**: ``"com.linkedin.voyager.dash.organization.Company"``

#### Defined in

[entities/linkedin-company.entity.ts:3](https://github.com/SkyberSolutions/linkedin-private-api/blob/2fe9e6a/src/entities/linkedin-company.entity.ts#L3)

___

### CONVERSATION\_TYPE

• `Const` **CONVERSATION\_TYPE**: ``"com.linkedin.voyager.messaging.Conversation"``

#### Defined in

[entities/linkedin-conversation.entity.ts:21](https://github.com/SkyberSolutions/linkedin-private-api/blob/2fe9e6a/src/entities/linkedin-conversation.entity.ts#L21)

___

### EVENT\_TYPE

• `Const` **EVENT\_TYPE**: ``"com.linkedin.voyager.messaging.Event"``

#### Defined in

[entities/linkedin-event.entity.ts:3](https://github.com/SkyberSolutions/linkedin-private-api/blob/2fe9e6a/src/entities/linkedin-event.entity.ts#L3)

___

### INVITATION\_TYPE

• `Const` **INVITATION\_TYPE**: ``"com.linkedin.voyager.relationships.invitation.Invitation"``

#### Defined in

[entities/linkedin-invitation.entity.ts:13](https://github.com/SkyberSolutions/linkedin-private-api/blob/2fe9e6a/src/entities/linkedin-invitation.entity.ts#L13)

___

### JOB\_POSTING\_TYPE

• `Const` **JOB\_POSTING\_TYPE**: ``"com.linkedin.voyager.jobs.JobPosting"``

#### Defined in

[entities/linkedin-job-posting.ts:1](https://github.com/SkyberSolutions/linkedin-private-api/blob/2fe9e6a/src/entities/linkedin-job-posting.ts#L1)

___

### MINI\_COMPANY\_TYPE

• `Const` **MINI\_COMPANY\_TYPE**: ``"com.linkedin.voyager.entities.shared.MiniCompany"``

#### Defined in

[entities/linkedin-mini-company.entity.ts:3](https://github.com/SkyberSolutions/linkedin-private-api/blob/2fe9e6a/src/entities/linkedin-mini-company.entity.ts#L3)

___

### MINI\_PROFILE\_TYPE

• `Const` **MINI\_PROFILE\_TYPE**: ``"com.linkedin.voyager.identity.shared.MiniProfile"``

#### Defined in

[entities/linkedin-mini-profile.entity.ts:5](https://github.com/SkyberSolutions/linkedin-private-api/blob/2fe9e6a/src/entities/linkedin-mini-profile.entity.ts#L5)

___

### PROFILE\_TYPE

• `Const` **PROFILE\_TYPE**: ``"com.linkedin.voyager.dash.identity.profile.Profile"``

#### Defined in

[entities/linkedin-profile.entity.ts:4](https://github.com/SkyberSolutions/linkedin-private-api/blob/2fe9e6a/src/entities/linkedin-profile.entity.ts#L4)
