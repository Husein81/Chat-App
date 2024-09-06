import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import { moderateScale, verticalScale } from "../utils/guidelineBase";
import { Button, TextInput } from "react-native-paper";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../theme/Colors";
import { useRegisterUserMutation } from "../redux/slice/userApi";
import { useDispatch } from "react-redux";
import { setuser } from "../redux/slice/authSlice";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import ImagePicker from "../../components/ImagePicker";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState<string>(
    "https://cdn-icons-png.flaticon.com/128/149/149071.png"
  );

  const emailChangeHandler = (email: string) => setEmail(email);
  const passwordChangeHandler = (password: string) => setPassword(password);
  const nameChangeHandler = (name: string) => setName(name);

  const navigateHandler = () => {
    navigation.navigate("Login" as never);
  };

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const onRegisterHandler = async () => {
    try {
      const userData = await registerUser({
        email,
        password,
        name,
        avatar,
      }).unwrap();
      console.log(userData);
      dispatch(setuser(userData));
      setName("");
      setEmail("");
      setPassword("");
      setAvatar("");
    } catch (error) {
      Alert.alert(
        "Registration Error",
        "An error occurred while registering the user."
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <View style={styles.header}>
            <Text style={styles.labelHeader}>Set up your profile</Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Pressable style={{ marginTop: 20 }}>
              <Image
                source={{
                  uri: avatar
                    ? avatar
                    : "https://cdn-icons-png.flaticon.com/128/149/149071.png",
                }}
                style={styles.image}
              />
              <View style={{ display: "flex", flexDirection: "row" }}>
                <ImagePicker setAvatar={setAvatar} />
              </View>
            </Pressable>
          </View>
          <View style={{ marginTop: verticalScale(20) }}>
            <View>
              <View>
                <Text style={styles.label}>Name</Text>
              </View>
              <View>
                <TextInput
                  value={name}
                  mode="outlined"
                  onChangeText={nameChangeHandler}
                  style={styles.input}
                  placeholder="Enter your name"
                />
              </View>
            </View>
            <View>
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
            <View>
              <View>
                <Text style={styles.label}>Password</Text>
              </View>
              <View>
                <TextInput
                  value={password}
                  mode="outlined"
                  onChangeText={passwordChangeHandler}
                  style={styles.input}
                  placeholder="Enter your password"
                  secureTextEntry
                />
              </View>
            </View>
            <View style={{ marginTop: verticalScale(20) }}>
              <Button
                style={styles.button}
                mode="contained"
                onPress={onRegisterHandler}
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register"}
              </Button>
            </View>
            <View>
              <Pressable onPress={navigateHandler}>
                <Text style={styles.link}>Already have an account? Login</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    padding: moderateScale(40),
    alignItems: "center",
  },
  header: {
    marginTop: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
  },
  labelHeader: {
    fontSize: moderateScale(20),
    fontWeight: "500",
    color: colors.primary,
  },
  label: {
    marginTop: 10,
    fontSize: moderateScale(18),
    fontWeight: "600",
    color: colors.primary,
  },
  input: {
    width: 340,
    marginTop: 10,
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
  image: {
    marginHorizontal: "auto",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
