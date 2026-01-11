# BackOfficeSettingsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**settingControllerCreate**](BackOfficeSettingsApi.md#settingcontrollercreateoperation) | **POST** /backoffice/settings |  |
| [**settingControllerPaginate**](BackOfficeSettingsApi.md#settingcontrollerpaginate) | **GET** /backoffice/settings |  |
| [**settingControllerRemove**](BackOfficeSettingsApi.md#settingcontrollerremove) | **DELETE** /backoffice/settings/{id} |  |
| [**settingControllerShow**](BackOfficeSettingsApi.md#settingcontrollershow) | **GET** /backoffice/settings/{id} |  |
| [**settingControllerUpdate**](BackOfficeSettingsApi.md#settingcontrollerupdateoperation) | **PUT** /backoffice/settings/{id} |  |



## settingControllerCreate

> settingControllerCreate(settingControllerCreateRequest)



### Example

```ts
import {
  Configuration,
  BackOfficeSettingsApi,
} from '';
import type { SettingControllerCreateOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BackOfficeSettingsApi(config);

  const body = {
    // SettingControllerCreateRequest
    settingControllerCreateRequest: ...,
  } satisfies SettingControllerCreateOperationRequest;

  try {
    const data = await api.settingControllerCreate(body);
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
| **settingControllerCreateRequest** | [SettingControllerCreateRequest](SettingControllerCreateRequest.md) |  | |

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


## settingControllerPaginate

> settingControllerPaginate()



### Example

```ts
import {
  Configuration,
  BackOfficeSettingsApi,
} from '';
import type { SettingControllerPaginateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BackOfficeSettingsApi(config);

  try {
    const data = await api.settingControllerPaginate();
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
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## settingControllerRemove

> settingControllerRemove(id)



### Example

```ts
import {
  Configuration,
  BackOfficeSettingsApi,
} from '';
import type { SettingControllerRemoveRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BackOfficeSettingsApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies SettingControllerRemoveRequest;

  try {
    const data = await api.settingControllerRemove(body);
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


## settingControllerShow

> SettingShowResponseSwagger settingControllerShow(id)



### Example

```ts
import {
  Configuration,
  BackOfficeSettingsApi,
} from '';
import type { SettingControllerShowRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BackOfficeSettingsApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies SettingControllerShowRequest;

  try {
    const data = await api.settingControllerShow(body);
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

[**SettingShowResponseSwagger**](SettingShowResponseSwagger.md)

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


## settingControllerUpdate

> settingControllerUpdate(id, settingControllerUpdateRequest)



### Example

```ts
import {
  Configuration,
  BackOfficeSettingsApi,
} from '';
import type { SettingControllerUpdateOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BackOfficeSettingsApi(config);

  const body = {
    // string
    id: id_example,
    // SettingControllerUpdateRequest
    settingControllerUpdateRequest: ...,
  } satisfies SettingControllerUpdateOperationRequest;

  try {
    const data = await api.settingControllerUpdate(body);
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
| **settingControllerUpdateRequest** | [SettingControllerUpdateRequest](SettingControllerUpdateRequest.md) |  | |

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

