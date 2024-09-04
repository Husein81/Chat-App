/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./../../models/User";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuhtState {
  user: User | null;
}
const loadUserAction = async () => {
  try {
    const response = await AsyncStorage.getItem("user");
    return response ? JSON.parse(response) : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const initialState: AuhtState = {
  user: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUserAction: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      AsyncStorage.setItem("user", JSON.stringify(action.payload));
    },
    logoutUserAction: (state) => {
      state.user = null;
      AsyncStorage.removeItem("user");
    },
    setuser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { loginUserAction, logoutUserAction, setuser } = authSlice.actions;
export default authSlice.reducer;

export const loadUser = () => async (dispatch: any) => {
  const user = await loadUserAction();
  if (user) {
    dispatch(setuser(user));
  }
};
