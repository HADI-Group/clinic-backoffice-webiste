// client/api/back_office/client.ts
import { Configuration } from "@shared/generated";
import { BackOfficeAuthApi } from "@shared/generated";

const config = new Configuration({
  basePath: import.meta.env.VITE_BACKOFFICE_API_URL,
  // ✅ THIS IS REQUIRED
  fetchApi: async (input, init) => {
    return fetch(input, {
      ...init,
      headers: {
        ...init?.headers,
        Authorization: localStorage.getItem("backoffice_access_token")
          ? `Bearer ${localStorage.getItem("backoffice_access_token")}`
          : "",
      },
    });
  },
});

export const backOfficeAuthApi = new BackOfficeAuthApi(config);