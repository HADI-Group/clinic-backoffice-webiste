
# UserProfileDtoResponse


## Properties

Name | Type
------------ | -------------
`avatar` | string
`name` | string
`gender` | string
`placeOfBirth` | string
`dateOfBirth` | Date
`religion` | string
`isActive` | number
`properties` | object
`address` | [UserProfileAddressDtoResponse](UserProfileAddressDtoResponse.md)
`contacts` | [Array&lt;UserProfileContactsDtoResponse&gt;](UserProfileContactsDtoResponse.md)

## Example

```typescript
import type { UserProfileDtoResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "avatar": null,
  "name": null,
  "gender": null,
  "placeOfBirth": null,
  "dateOfBirth": null,
  "religion": null,
  "isActive": null,
  "properties": null,
  "address": null,
  "contacts": null,
} satisfies UserProfileDtoResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UserProfileDtoResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


