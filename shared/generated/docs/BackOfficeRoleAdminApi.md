# BackOfficeRoleAdminApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**roleAdminControllerCreate**](BackOfficeRoleAdminApi.md#roleadmincontrollercreateoperation) | **POST** /backoffice/role-admin |  |
| [**roleAdminControllerPaginate**](BackOfficeRoleAdminApi.md#roleadmincontrollerpaginate) | **GET** /backoffice/role-admin |  |
| [**roleAdminControllerRemove**](BackOfficeRoleAdminApi.md#roleadmincontrollerremove) | **DELETE** /backoffice/role-admin/{id} |  |
| [**roleAdminControllerUpdate**](BackOfficeRoleAdminApi.md#roleadmincontrollerupdate) | **PUT** /backoffice/role-admin/{id} |  |



## roleAdminControllerCreate

> roleAdminControllerCreate(roleAdminControllerCreateRequest)



### Example

```ts
import {
  Configuration,
  BackOfficeRoleAdminApi,
} from '';
import type { RoleAdminControllerCreateOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BackOfficeRoleAdminApi(config);

  const body = {
    // RoleAdminControllerCreateRequest
    roleAdminControllerCreateRequest: ...,
  } satisfies RoleAdminControllerCreateOperationRequest;

  try {
    const data = await api.roleAdminControllerCreate(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **roleAdminControllerCreateRequest** | [RoleAdminControllerCreateRequest](RoleAdminControllerCreateRequest.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## roleAdminControllerPaginate

> RoleAdminPaginateResponseSwagger roleAdminControllerPaginate()



### Example

```ts
import {
  Configuration,
  BackOfficeRoleAdminApi,
} from '';
import type { RoleAdminControllerPaginateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BackOfficeRoleAdminApi(config);

  try {
    const data = await api.roleAdminControllerPaginate();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**RoleAdminPaginateResponseSwagger**](RoleAdminPaginateResponseSwagger.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **0** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## roleAdminControllerRemove

> roleAdminControllerRemove(id)



### Example

```ts
import {
  Configuration,
  BackOfficeRoleAdminApi,
} from '';
import type { RoleAdminControllerRemoveRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BackOfficeRoleAdminApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies RoleAdminControllerRemoveRequest;

  try {
    const data = await api.roleAdminControllerRemove(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## roleAdminControllerUpdate

> roleAdminControllerUpdate(id, roleAdminControllerCreateRequest)



### Example

```ts
import {
  Configuration,
  BackOfficeRoleAdminApi,
} from '';
import type { RoleAdminControllerUpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BackOfficeRoleAdminApi(config);

  const body = {
    // string
    id: id_example,
    // RoleAdminControllerCreateRequest
    roleAdminControllerCreateRequest: ...,
  } satisfies RoleAdminControllerUpdateRequest;

  try {
    const data = await api.roleAdminControllerUpdate(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |
| **roleAdminControllerCreateRequest** | [RoleAdminControllerCreateRequest](RoleAdminControllerCreateRequest.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

