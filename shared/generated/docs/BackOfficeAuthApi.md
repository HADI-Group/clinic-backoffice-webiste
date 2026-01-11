# BackOfficeAuthApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**adminControllerLogin**](BackOfficeAuthApi.md#admincontrollerloginoperation) | **POST** /backoffice/auth/login |  |
| [**adminControllerRegister**](BackOfficeAuthApi.md#admincontrollerregisteroperation) | **POST** /backoffice/auth/register |  |



## adminControllerLogin

> AdminAuthResponseSchemaSwagger adminControllerLogin(adminControllerLoginRequest)



### Example

```ts
import {
  Configuration,
  BackOfficeAuthApi,
} from '';
import type { AdminControllerLoginOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BackOfficeAuthApi();

  const body = {
    // AdminControllerLoginRequest
    adminControllerLoginRequest: ...,
  } satisfies AdminControllerLoginOperationRequest;

  try {
    const data = await api.adminControllerLogin(body);
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
| **adminControllerLoginRequest** | [AdminControllerLoginRequest](AdminControllerLoginRequest.md) |  | |

### Return type

[**AdminAuthResponseSchemaSwagger**](AdminAuthResponseSchemaSwagger.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **0** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## adminControllerRegister

> AdminAuthResponseSchemaSwagger adminControllerRegister(adminControllerRegisterRequest)



### Example

```ts
import {
  Configuration,
  BackOfficeAuthApi,
} from '';
import type { AdminControllerRegisterOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BackOfficeAuthApi(config);

  const body = {
    // AdminControllerRegisterRequest
    adminControllerRegisterRequest: ...,
  } satisfies AdminControllerRegisterOperationRequest;

  try {
    const data = await api.adminControllerRegister(body);
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
| **adminControllerRegisterRequest** | [AdminControllerRegisterRequest](AdminControllerRegisterRequest.md) |  | |

### Return type

[**AdminAuthResponseSchemaSwagger**](AdminAuthResponseSchemaSwagger.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **0** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

