
# AdminControllerRegisterRequest


## Properties

Name | Type
------------ | -------------
`username` | string
`email` | string
`role` | string
`password` | string
`passwordConfirmation` | string

## Example

```typescript
import type { AdminControllerRegisterRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "username": null,
  "email": null,
  "role": null,
  "password": null,
  "passwordConfirmation": null,
} satisfies AdminControllerRegisterRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AdminControllerRegisterRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


