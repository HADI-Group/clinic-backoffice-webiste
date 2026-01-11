
# AdminAuthResponse


## Properties

Name | Type
------------ | -------------
`token` | string
`role` | string

## Example

```typescript
import type { AdminAuthResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "token": eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkNjUxNjRiZi01MmI5LTQyN2QtOWRhNi1kN2MxYmNmNTU5YTYiLCJpYXQiOjE3MDI5NTcyODEsImV4cCI6MTcwMjk2MDg4MX0.5HhRhvbWbDfIWcfBeEh74czI6vxfOdrFIIRagExw8Bw,
  "role": null,
} satisfies AdminAuthResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AdminAuthResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


