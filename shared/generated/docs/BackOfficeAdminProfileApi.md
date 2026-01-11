# BackOfficeAdminProfileApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**adminProfileControllerAdminPaginate**](BackOfficeAdminProfileApi.md#adminprofilecontrolleradminpaginate) | **GET** /backoffice/admin |  |
| [**adminProfileControllerAdminRemove**](BackOfficeAdminProfileApi.md#adminprofilecontrolleradminremove) | **DELETE** /backoffice/admin/{id} |  |
| [**adminProfileControllerAdminShow**](BackOfficeAdminProfileApi.md#adminprofilecontrolleradminshow) | **PUT** /backoffice/admin/{id} |  |
| [**adminProfileControllerGetProfile**](BackOfficeAdminProfileApi.md#adminprofilecontrollergetprofile) | **GET** /backoffice/admin/profile |  |
| [**adminProfileControllerUpdateProfile**](BackOfficeAdminProfileApi.md#adminprofilecontrollerupdateprofileoperation) | **POST** /backoffice/admin/profile |  |



## adminProfileControllerAdminPaginate

> AdminPaginateResponseSwagger adminProfileControllerAdminPaginate()



### Example

```ts
import {
  Configuration,
  BackOfficeAdminProfileApi,
} from '';
import type { AdminProfileControllerAdminPaginateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BackOfficeAdminProfileApi(config);

  try {
    const data = await api.adminProfileControllerAdminPaginate();
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

[**AdminPaginateResponseSwagger**](AdminPaginateResponseSwagger.md)

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


## adminProfileControllerAdminRemove

> adminProfileControllerAdminRemove(id)



### Example

```ts
import {
  Configuration,
  BackOfficeAdminProfileApi,
} from '';
import type { AdminProfileControllerAdminRemoveRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BackOfficeAdminProfileApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies AdminProfileControllerAdminRemoveRequest;

  try {
    const data = await api.adminProfileControllerAdminRemove(body);
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
| **0** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## adminProfileControllerAdminShow

> adminProfileControllerAdminShow(id)



### Example

```ts
import {
  Configuration,
  BackOfficeAdminProfileApi,
} from '';
import type { AdminProfileControllerAdminShowRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BackOfficeAdminProfileApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies AdminProfileControllerAdminShowRequest;

  try {
    const data = await api.adminProfileControllerAdminShow(body);
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
| **0** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## adminProfileControllerGetProfile

> AdminProfileResponseSwagger adminProfileControllerGetProfile()



### Example

```ts
import {
  Configuration,
  BackOfficeAdminProfileApi,
} from '';
import type { AdminProfileControllerGetProfileRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BackOfficeAdminProfileApi(config);

  try {
    const data = await api.adminProfileControllerGetProfile();
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

[**AdminProfileResponseSwagger**](AdminProfileResponseSwagger.md)

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


## adminProfileControllerUpdateProfile

> adminProfileControllerUpdateProfile(adminProfileControllerUpdateProfileRequest)



### Example

```ts
import {
  Configuration,
  BackOfficeAdminProfileApi,
} from '';
import type { AdminProfileControllerUpdateProfileOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BackOfficeAdminProfileApi(config);

  const body = {
    // AdminProfileControllerUpdateProfileRequest
    adminProfileControllerUpdateProfileRequest: ...,
  } satisfies AdminProfileControllerUpdateProfileOperationRequest;

  try {
    const data = await api.adminProfileControllerUpdateProfile(body);
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
| **adminProfileControllerUpdateProfileRequest** | [AdminProfileControllerUpdateProfileRequest](AdminProfileControllerUpdateProfileRequest.md) |  | |

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

