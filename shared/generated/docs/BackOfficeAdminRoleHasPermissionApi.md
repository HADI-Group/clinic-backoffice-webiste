# BackOfficeAdminRoleHasPermissionApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**roleAdminPermissionControllerCreate**](BackOfficeAdminRoleHasPermissionApi.md#roleadminpermissioncontrollercreateoperation) | **POST** /backoffice/role-admin-permissions |  |
| [**roleAdminPermissionControllerPaginate**](BackOfficeAdminRoleHasPermissionApi.md#roleadminpermissioncontrollerpaginate) | **GET** /backoffice/role-admin-permissions/{role_id} |  |
| [**roleAdminPermissionControllerRemove**](BackOfficeAdminRoleHasPermissionApi.md#roleadminpermissioncontrollerremoveoperation) | **DELETE** /backoffice/role-admin-permissions |  |



## roleAdminPermissionControllerCreate

> roleAdminPermissionControllerCreate(roleAdminPermissionControllerCreateRequest)



### Example

```ts
import {
  Configuration,
  BackOfficeAdminRoleHasPermissionApi,
} from '';
import type { RoleAdminPermissionControllerCreateOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BackOfficeAdminRoleHasPermissionApi(config);

  const body = {
    // RoleAdminPermissionControllerCreateRequest
    roleAdminPermissionControllerCreateRequest: ...,
  } satisfies RoleAdminPermissionControllerCreateOperationRequest;

  try {
    const data = await api.roleAdminPermissionControllerCreate(body);
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
| **roleAdminPermissionControllerCreateRequest** | [RoleAdminPermissionControllerCreateRequest](RoleAdminPermissionControllerCreateRequest.md) |  | |

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
| **0** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## roleAdminPermissionControllerPaginate

> RoleAdminPermissionPaginateResponseSchemaSwagger roleAdminPermissionControllerPaginate(roleId)



### Example

```ts
import {
  Configuration,
  BackOfficeAdminRoleHasPermissionApi,
} from '';
import type { RoleAdminPermissionControllerPaginateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BackOfficeAdminRoleHasPermissionApi(config);

  const body = {
    // string
    roleId: roleId_example,
  } satisfies RoleAdminPermissionControllerPaginateRequest;

  try {
    const data = await api.roleAdminPermissionControllerPaginate(body);
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
| **roleId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**RoleAdminPermissionPaginateResponseSchemaSwagger**](RoleAdminPermissionPaginateResponseSchemaSwagger.md)

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


## roleAdminPermissionControllerRemove

> roleAdminPermissionControllerRemove(roleAdminPermissionControllerRemoveRequest)



### Example

```ts
import {
  Configuration,
  BackOfficeAdminRoleHasPermissionApi,
} from '';
import type { RoleAdminPermissionControllerRemoveOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BackOfficeAdminRoleHasPermissionApi(config);

  const body = {
    // RoleAdminPermissionControllerRemoveRequest
    roleAdminPermissionControllerRemoveRequest: ...,
  } satisfies RoleAdminPermissionControllerRemoveOperationRequest;

  try {
    const data = await api.roleAdminPermissionControllerRemove(body);
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
| **roleAdminPermissionControllerRemoveRequest** | [RoleAdminPermissionControllerRemoveRequest](RoleAdminPermissionControllerRemoveRequest.md) |  | |

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

