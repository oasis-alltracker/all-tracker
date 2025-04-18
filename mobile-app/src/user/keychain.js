import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import LoginAPI from "../api/auth/loginAPI";
import "core-js/stable/atob";
import navigationService from "../navigators/navigationService";

const isTokenValid = (token) => {
  try {
    // Decode the JWT token
    const decodedToken = jwtDecode(token);

    // Check if the token has an expiration time (exp field)
    if (decodedToken.exp) {
      // Get the current timestamp in seconds
      const currentTime = Math.floor(Date.now() / 1000);

      // Compare the current time with the token's expiration time
      return decodedToken.exp > currentTime;
    }

    // If the token doesn't have an expiration time, consider it as valid
    return true;
  } catch (error) {
    // If there's an error decoding the token, consider it as invalid
    return false;
  }
};

export async function saveToken(key, value) {
  try {
    await SecureStore.setItemAsync(key, value);
    await SecureStore.setItemAsync("isAccountCreated", "true");
  } catch (e) {
    console.log(e);
  }
}

export async function getAccessToken() {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  const refreshToken = await SecureStore.getItemAsync("refreshToken");
  if (accessToken && isTokenValid(accessToken)) {
    return accessToken;
  } else if (refreshToken && isTokenValid(refreshToken)) {
    try {
      const newAccessToken = await LoginAPI.refreshToken(refreshToken);
      await saveToken("accessToken", newAccessToken.accessToken);
    } catch (e) {
      await SecureStore.deleteItemAsync("refreshToken");
      await SecureStore.deleteItemAsync("accessToken");
      navigationService.reset("auth", 0);
    }
  } else {
    await SecureStore.deleteItemAsync("refreshToken");
    await SecureStore.deleteItemAsync("accessToken");
    navigationService.reset("auth", 0);
  }
}

export async function isLoggedIn() {
  try {
    const refreshToken = await SecureStore.getItemAsync("refreshToken");
    if (!refreshToken || !isTokenValid(refreshToken)) {
      return false;
    }
    const accessToken = await SecureStore.getItemAsync("accessToken");
    if (!accessToken || !isTokenValid(accessToken)) {
      try {
        const newAccessToken = await LoginAPI.refreshToken(refreshToken);
        await saveToken("accessToken", newAccessToken.accessToken);
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  } catch (e) {
    console.log(e);
    return false;
  }
  return true;
}

export async function isAccountCreated() {
  const isAccountCreated = await SecureStore.getItemAsync("isAccountCreated");
  if (isAccountCreated) {
    return true;
  } else {
    return false;
  }
}

export async function logout() {
  try {
    await SecureStore.deleteItemAsync("refreshToken");
    await SecureStore.deleteItemAsync("accessToken");
  } catch (e) {
    console.log(e);
  }
}
