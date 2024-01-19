import LoginAPI from '../../api/auth/loginAPI'
export async function resendOTP() {
    await LoginAPI.requestOTP(email)
}
