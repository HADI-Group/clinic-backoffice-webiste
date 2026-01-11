
# SettingShowResponse


## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`value` | [SettingValueFormatDto](SettingValueFormatDto.md)
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { SettingShowResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "value": null,
  "createdAt": null,
  "updatedAt": null,
} satisfies SettingShowResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SettingShowResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


