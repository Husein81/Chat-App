import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/redux/store";
import ChatsScreen from "../app/layout/ChatScreen";
import UpdatesScreen from "../app/layout/UpdatesScreen";
import { Ionicons } from "@expo/vector-icons";
import LoginScreen from "../app/layout/LoginScreen";
import RegisterScreen from "../app/layout/RegisterScreen";
import PeopleScreen from "../app/layout/PeopleScreen";
import RequestChatRoom from "../app/layout/RequestChatRoom";
import ChatRoom from "../app/layout/ChatRoom";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { loadUser } from "../app/redux/slice/authSlice";
import { colors } from "../app/theme/Colors";
import { verticalScale } from "../app/utils/guidelineBase";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  const Tab = createBottomTabNavigator();
  const { user } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    dispatch(loadUser() as any);
  }, []);

  const BottomTabs = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: colors.primary,
            height: verticalScale(60),
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            shadowColor: "black",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            elevation: 5,
          },
          tabBarActiveTintColor: "white",
        }}
      >
        <Tab.Screen
          name="Chats"
          component={ChatsScreen}
          options={{
            tabBarActiveTintColor: "white",
            headerShown: false,

            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="chatbox-outline" size={30} color="white" />
              ) : (
                <Ionicons name="chatbox-outline" size={30} color={"#989898"} />
              ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={UpdatesScreen}
          options={{
            headerShown: false,
            tabBarActiveTintColor: "white",
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
