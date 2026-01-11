
# RoleAdminPaginateResponse


## Properties

Name | Type
------------ | -------------
`perPage` | number
`total` | number
`currentPage` | number
`totalPage` | number
`lastPageUrl` | string
`nextPageUrl` | string
`previousPageUrl` | string
`firstPageUrl` | string
`data` | [Array&lt;RoleAdminItemResponse&gt;](RoleAdminItemResponse.md)

## Example

```typescript
import type { RoleAdminPaginateResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "perPage": null,
  "total": null,
  "currentPage": null,
  "totalPage": null,
  "lastPageUrl": null,
  "nextPageUrl": null,
  "previousPageUrl": null,
  "firstPageUrl": null,
  "data": null,
} satisfies RoleAdminPaginateResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RoleAdminPaginateResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


