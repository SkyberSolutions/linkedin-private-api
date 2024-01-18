[@skybersolutions/linkedin-private-api](../README.md) / [Exports](../modules.md) / GetOwnProfileResponse

# Interface: GetOwnProfileResponse

## Table of contents

### Properties

- [data](GetOwnProfileResponse.md#data)
- [included](GetOwnProfileResponse.md#included)

## Properties

### data

• **data**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `$type` | ``"com.linkedin.voyager.common.Me"`` |
| `*miniProfile` | `string` |
| `plainId` | `number` |
| `premiumSubscriber` | `boolean` |
| `publicContactInfo` | { `$type`: ``"com.linkedin.voyager.identity.shared.PublicContactInfo"``  } |
| `publicContactInfo.$type` | ``"com.linkedin.voyager.identity.shared.PublicContactInfo"`` |

#### Defined in

[responses/own-profile.response.get.ts:4](https://github.com/SkyberSolutions/linkedin-private-api/blob/c247a0c/src/responses/own-profile.response.get.ts#L4)

___

### included

• **included**: [`LinkedInMiniProfile`](LinkedInMiniProfile.md)[]

#### Defined in

[responses/own-profile.response.get.ts:13](https://github.com/SkyberSolutions/linkedin-private-api/blob/c247a0c/src/responses/own-profile.response.get.ts#L13)
