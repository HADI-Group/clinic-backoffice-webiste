
# BankItemsResponseSchema


## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`code` | string
`logo` | string
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { BankItemsResponseSchema } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "code": null,
  "logo": null,
  "createdAt": null,
  "updatedAt": null,
} satisfies BankItemsResponseSchema

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as BankItemsResponseSchema
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


