# BackOfficeUsersApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**userControllerGet**](BackOfficeUsersApi.md#usercontrollerget) | **GET** /backoffice/users/{id} |  |
| [**userControllerPaginate**](BackOfficeUsersApi.md#usercontrollerpaginate) | **GET** /backoffice/users |  |
| [**userControllerRemove**](BackOfficeUsersApi.md#usercontrollerremove) | **DELETE** /backoffice/users/{id} |  |
| [**userControllerUpdate**](BackOfficeUsersApi.md#usercontrollerupdateoperation) | **PUT** /backoffice/users/{id} |  |



## userControllerGet

> UserShowDtoResponseSwagger userControllerGet(id)



### Example

```ts
import {
  Configuration,
  BackOfficeUsersApi,
} from '';
import type { UserControllerGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BackOfficeUsersApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies UserControllerGetRequest;

  try {
    const data = await api.userControllerGet(body);
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

[**UserShowDtoResponseSwagger**](UserShowDtoResponseSwagger.md)

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


## userControllerPaginate

> UserPaginateResponseSwagger userControllerPaginate()



### Example

```ts
import {
  Configuration,
  BackOfficeUsersApi,
} from '';
import type { UserControllerPaginateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BackOfficeUsersApi(config);

  try {
    const data = await api.userControllerPaginate();
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

[**UserPaginateResponseSwagger**](UserPaginateResponseSwagger.md)

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


## userControllerRemove

> userControllerRemove(id)



### Example

```ts
import {
  Configuration,
  BackOfficeUsersApi,
} from '';
import type { UserControllerRemoveRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BackOfficeUsersApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies UserControllerRemoveRequest;

  try {
    const data = await api.userControllerRemove(body);
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


## userControllerUpdate

> userControllerUpdate(id, userControllerUpdateRequest)



### Example

```ts
import {
  Configuration,
  BackOfficeUsersApi,
} from '';
import type { UserControllerUpdateOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BackOfficeUsersApi(config);

  const body = {
    // string
    id: id_example,
    // UserControllerUpdateRequest
    userControllerUpdateRequest: ...,
  } satisfies UserControllerUpdateOperationRequest;

  try {
    const data = await api.userControllerUpdate(body);
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
| **userControllerUpdateRequest** | [UserControllerUpdateRequest](UserControllerUpdateRequest.md) |  | |

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

