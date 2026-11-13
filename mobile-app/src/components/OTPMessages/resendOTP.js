import LoginAPI from "../../api/auth/loginAPI";
export async function resendOTP(email) {
  await LoginAPI.requestOTP(email);
}
