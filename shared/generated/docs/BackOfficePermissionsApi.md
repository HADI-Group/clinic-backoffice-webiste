# BackOfficePermissionsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**permissionControllerGet**](BackOfficePermissionsApi.md#permissioncontrollerget) | **GET** /backoffice/permissions | Show Permissions |
| [**permissionControllerSynchronized**](BackOfficePermissionsApi.md#permissioncontrollersynchronized) | **POST** /backoffice/permissions | Synchronized Permission Endpoint |



## permissionControllerGet

> ShowPermissionItemSwagger permissionControllerGet()

Show Permissions

### Example

```ts
import {
  Configuration,
  BackOfficePermissionsApi,
} from '';
import type { PermissionControllerGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BackOfficePermissionsApi(config);

  try {
    const data = await api.permissionControllerGet();
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

[**ShowPermissionItemSwagger**](ShowPermissionItemSwagger.md)

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


## permissionControllerSynchronized

> permissionControllerSynchronized()

Synchronized Permission Endpoint

### Example

```ts
import {
  Configuration,
  BackOfficePermissionsApi,
} from '';
import type { PermissionControllerSynchronizedRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BackOfficePermissionsApi(config);

  try {
    const data = await api.permissionControllerSynchronized();
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

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **0** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

