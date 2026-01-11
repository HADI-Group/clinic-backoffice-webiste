import { backOfficeAuthApi } from "./client";
import { setBackOfficeToken } from "./token.store";

export async function loginBackOffice(email: string, password: string) {
  const res = await backOfficeAuthApi.adminControllerLogin({
    adminControllerLoginRequest: {
      email,
      password,
    },
  });

  setBackOfficeToken(res.data.token);
  return res;
}
