# BackOfficeBanksApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**bankControllerCreate**](BackOfficeBanksApi.md#bankcontrollercreateoperation) | **POST** /backoffice/banks |  |
| [**bankControllerPaginate**](BackOfficeBanksApi.md#bankcontrollerpaginate) | **GET** /backoffice/banks |  |
| [**bankControllerRemove**](BackOfficeBanksApi.md#bankcontrollerremove) | **DELETE** /backoffice/banks/{id} |  |
| [**bankControllerShow**](BackOfficeBanksApi.md#bankcontrollershow) | **GET** /backoffice/banks/{id} |  |
| [**bankControllerUpdate**](BackOfficeBanksApi.md#bankcontrollerupdate) | **PUT** /backoffice/banks/{id} |  |



## bankControllerCreate

> bankControllerCreate(bankControllerCreateRequest)



### Example

```ts
import {
  Configuration,
  BackOfficeBanksApi,
} from '';
import type { BankControllerCreateOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BackOfficeBanksApi(config);

  const body = {
    // BankControllerCreateRequest
    bankControllerCreateRequest: ...,
  } satisfies BankControllerCreateOperationRequest;

  try {
    const data = await api.bankControllerCreate(body);
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
| **bankControllerCreateRequest** | [BankControllerCreateRequest](BankControllerCreateRequest.md) |  | |

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


## bankControllerPaginate

> BankPaginateResponseSchemaSwagger bankControllerPaginate(limit, page, filterName, filterCode)



### Example

```ts
import {
  Configuration,
  BackOfficeBanksApi,
} from '';
import type { BankControllerPaginateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BackOfficeBanksApi(config);

  const body = {
    // number (optional)
    limit: 8.14,
    // number (optional)
    page: 8.14,
    // string (optional)
    filterName: filterName_example,
    // string (optional)
    filterCode: filterCode_example,
  } satisfies BankControllerPaginateRequest;

  try {
    const data = await api.bankControllerPaginate(body);
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
| **limit** | `number` |  | [Optional] [Defaults to `undefined`] |
| **page** | `number` |  | [Optional] [Defaults to `undefined`] |
| **filterName** | `string` |  | [Optional] [Defaults to `undefined`] |
| **filterCode** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**BankPaginateResponseSchemaSwagger**](BankPaginateResponseSchemaSwagger.md)

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


## bankControllerRemove

> bankControllerRemove(id)



### Example

```ts
import {
  Configuration,
  BackOfficeBanksApi,
} from '';
import type { BankControllerRemoveRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BackOfficeBanksApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies BankControllerRemoveRequest;

  try {
    const data = await api.bankControllerRemove(body);
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


## bankControllerShow

> BankShowResponseSchemaSwagger bankControllerShow(id)



### Example

```ts
import {
  Configuration,
  BackOfficeBanksApi,
} from '';
import type { BankControllerShowRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BackOfficeBanksApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies BankControllerShowRequest;

  try {
    const data = await api.bankControllerShow(body);
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

[**BankShowResponseSchemaSwagger**](BankShowResponseSchemaSwagger.md)

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


## bankControllerUpdate

> bankControllerUpdate(id, bankControllerCreateRequest)



### Example

```ts
import {
  Configuration,
  BackOfficeBanksApi,
} from '';
import type { BankControllerUpdateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BackOfficeBanksApi(config);

  const body = {
    // string
    id: id_example,
    // BankControllerCreateRequest
    bankControllerCreateRequest: ...,
  } satisfies BankControllerUpdateRequest;

  try {
    const data = await api.bankControllerUpdate(body);
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
| **bankControllerCreateRequest** | [BankControllerCreateRequest](BankControllerCreateRequest.md) |  | |

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

