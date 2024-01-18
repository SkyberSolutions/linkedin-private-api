[@skybersolutions/linkedin-private-api](../README.md) / [Exports](../modules.md) / LinkedInCompany

# Interface: LinkedInCompany

## Table of contents

### Properties

- [$anti\_abuse\_annotations](LinkedInCompany.md#$anti_abuse_annotations)
- [$recipeTypes](LinkedInCompany.md#$recipetypes)
- [$type](LinkedInCompany.md#$type)
- [employeeCountRange](LinkedInCompany.md#employeecountrange)
- [entityUrn](LinkedInCompany.md#entityurn)
- [industry](LinkedInCompany.md#industry)
- [industryUrns](LinkedInCompany.md#industryurns)
- [logo](LinkedInCompany.md#logo)
- [name](LinkedInCompany.md#name)
- [universalName](LinkedInCompany.md#universalname)
- [url](LinkedInCompany.md#url)

## Properties

### $anti\_abuse\_annotations

• `Optional` **$anti\_abuse\_annotations**: { `attributeId`: `number` ; `entityId`: `number`  }[]

#### Defined in

[entities/linkedin-company.entity.ts:8](https://github.com/SkyberSolutions/linkedin-private-api/blob/c247a0c/src/entities/linkedin-company.entity.ts#L8)

___

### $recipeTypes

• **$recipeTypes**: `string`[]

#### Defined in

[entities/linkedin-company.entity.ts:12](https://github.com/SkyberSolutions/linkedin-private-api/blob/c247a0c/src/entities/linkedin-company.entity.ts#L12)

___

### $type

• **$type**: ``"com.linkedin.voyager.dash.organization.Company"``

#### Defined in

[entities/linkedin-company.entity.ts:7](https://github.com/SkyberSolutions/linkedin-private-api/blob/c247a0c/src/entities/linkedin-company.entity.ts#L7)

___

### employeeCountRange

• `Optional` **employeeCountRange**: `LinkedInIntegerRange`

#### Defined in

[entities/linkedin-company.entity.ts:14](https://github.com/SkyberSolutions/linkedin-private-api/blob/c247a0c/src/entities/linkedin-company.entity.ts#L14)

___

### entityUrn

• **entityUrn**: `string`

#### Defined in

[entities/linkedin-company.entity.ts:13](https://github.com/SkyberSolutions/linkedin-private-api/blob/c247a0c/src/entities/linkedin-company.entity.ts#L13)

___

### industry

• `Optional` **industry**: `Record`<`string`, `string`\>

#### Defined in

[entities/linkedin-company.entity.ts:15](https://github.com/SkyberSolutions/linkedin-private-api/blob/c247a0c/src/entities/linkedin-company.entity.ts#L15)

___

### industryUrns

• `Optional` **industryUrns**: `string`[]

#### Defined in

[entities/linkedin-company.entity.ts:16](https://github.com/SkyberSolutions/linkedin-private-api/blob/c247a0c/src/entities/linkedin-company.entity.ts#L16)

___

### logo

• **logo**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `vetorImage` | [`LinkedInVectorImage`](LinkedInVectorImage.md) |

#### Defined in

[entities/linkedin-company.entity.ts:17](https://github.com/SkyberSolutions/linkedin-private-api/blob/c247a0c/src/entities/linkedin-company.entity.ts#L17)

___

### name

• **name**: `string`

#### Defined in

[entities/linkedin-company.entity.ts:20](https://github.com/SkyberSolutions/linkedin-private-api/blob/c247a0c/src/entities/linkedin-company.entity.ts#L20)

___

### universalName

• **universalName**: `string`

#### Defined in

[entities/linkedin-company.entity.ts:21](https://github.com/SkyberSolutions/linkedin-private-api/blob/c247a0c/src/entities/linkedin-company.entity.ts#L21)

___

### url

• **url**: `string`

#### Defined in

[entities/linkedin-company.entity.ts:22](https://github.com/SkyberSolutions/linkedin-private-api/blob/c247a0c/src/entities/linkedin-company.entity.ts#L22)
