import { Platform } from "react-native";

export const getApiUri = () => {
  if (Platform.OS === "android") {
    // Use 10.0.2.2 for Android emulator or IP address for a physical device
    return "http://192.168.0.14:5000/api"; // For Android emulator
  } else if (Platform.OS === "ios") {
    // Use localhost for iOS simulator or IP address for a physical device
    return "http://localhost:5000/api"; // For iOS simulator
  } else {
    // Use your computer's IP address for physical devices (replace with your actual IP)
    return "http://192.168.0.14:5000/api"; // Replace with your computer's IP address
  }
};

export const BASE_URL = getApiUri();
export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const REGISTER_URL = `${BASE_URL}/auth/register`;
export const USER_URL = `${BASE_URL}/user`;
export const MESSAGE_URL = `${BASE_URL}/message`;
