import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, verticalScale } from "../utils/guidelineBase";
import { Button, TextInput } from "react-native-paper";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useLoginUserMutation } from "../redux/slice/userApi";
import { useDispatch } from "react-redux";
import { loginUserAction } from "../redux/slice/authSlice";
import { colors } from "../theme/Colors";

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailChangeHandler = (email: string) => {
    setEmail(email);
  };
  const passwordChangeHandler = (password: string) => {
    setPassword(password);
  };
  const navigateHandler = () => {
    navigation.navigate("Register" as never);
  };

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const onLoginhandler = async () => {
    try {
      console.log(email, password);
      const userData = await loginUser({ email, password }).unwrap();
      dispatch(loginUserAction(userData));
      setEmail("");
      setPassword("");
    } catch (error) {
      Alert.alert(
        "Error logging in",
        "An error occurred while registering the user"
      );
    }
  };
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <View style={styles.header}>
            <Text style={styles.labelHeader}>Login to your account</Text>
          </View>
          <View style={{ marginTop: verticalScale(50) }}>
            <View>
              <Text style={styles.label}>Email</Text>
            </View>
            <View>
              <TextInput
                value={email}
                mode="outlined"
                onChangeText={emailChangeHandler}
                style={styles.input}
                placeholder="Enter your email"
                keyboardType="email-address"
              />
            </View>
          </View>
          <View style={{ marginTop: verticalScale(20) }}>
            <View>
              <Text style={styles.label}>Password</Text>
            </View>
            <View>
              <TextInput
                value={password}
                onChangeText={passwordChangeHandler}
                mode="outlined"
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry={true}
              />
            </View>
          </View>
          <View style={{ marginTop: verticalScale(20) }}>
            <Button
              style={styles.button}
              mode="contained"
              onPress={onLoginhandler}
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Login"}
            </Button>
          </View>
          <View>
            <Pressable onPress={navigateHandler}>
              <Text style={styles.link}>Don't have an account? Register</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};
export default LoginScreen;
const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    padding: moderateScale(20),
    alignItems: "center",
  },
  header: {
    marginTop: verticalScale(80),
    alignItems: "center",
    justifyContent: "center",
  },
  labelHeader: {
    fontSize: moderateScale(20),
    fontWeight: "500",
    color: colors.primary,
  },
  label: {
    fontSize: moderateScale(18),
    fontWeight: "600",
    color: colors.primary,
  },
  input: {
    width: 340,

    marginTop: 15,
    paddingBottom: 10,
    fontSize: 15,
  },
  button: {
    borderRadius: 5,
  },
  link: {
    textAlign: "center",
    color: colors.primary,
    fontSize: 15,
    margin: moderateScale(12),
  },
});
