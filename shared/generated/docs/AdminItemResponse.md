
# AdminItemResponse


## Properties

Name | Type
------------ | -------------
`id` | string
`role` | string
`username` | string
`avatar` | string
`isActive` | number
`contacts` | [Array&lt;AdminContactResponse&gt;](AdminContactResponse.md)
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { AdminItemResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "role": null,
  "username": null,
  "avatar": null,
  "isActive": null,
  "contacts": null,
  "createdAt": null,
  "updatedAt": null,
} satisfies AdminItemResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AdminItemResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


