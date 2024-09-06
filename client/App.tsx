import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./app/redux/store";
import StackNavigator from "./navigation/StackNavigator";
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";
import { theme } from "./app/theme/Colors";

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <StackNavigator />
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({});
