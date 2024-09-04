import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/redux/store";
import ChatsScreen from "../app/layout/ChatScreen";
import ProfileScreen from "../app/layout/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import LoginScreen from "../app/layout/LoginScreen";
import RegisterScreen from "../app/layout/RegisterScreen";
import PeopleScreen from "../app/layout/PeopleScreen";
import RequestChatRoom from "../app/layout/RequestChatRoom";
import ChatRoom from "../app/layout/ChatRoom";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { loadUser } from "../app/redux/slice/authSlice";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  const Tab = createBottomTabNavigator();
  const { user } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    dispatch(loadUser() as any);
  }, [user]);
  const BottomTabs = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Chats"
          component={ChatsScreen}
          options={{
            tabBarStyle: { backgroundColor: "#101010" },
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarStyle: { backgroundColor: "#101010" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="person-outline" size={30} color="white" />
              ) : (
                <Ionicons name="person-outline" size={30} color="#989898" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  };
  const AuthStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };

  const MainStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="People"
          component={PeopleScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Request" component={RequestChatRoom} />
        <Stack.Screen name="ChatRoom" component={ChatRoom} />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      {user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
export default StackNavigator;
const styles = StyleSheet.create({});
