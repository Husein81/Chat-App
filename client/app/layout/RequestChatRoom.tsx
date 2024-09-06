import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { User } from "../models/User";
import { Ionicons } from "@expo/vector-icons";
import { useSendMessageMutation } from "../redux/slice/messageApi";
import { colors } from "../theme/Colors";
import { Button, TextInput } from "react-native-paper";
import {
  horizantalScale,
  moderateScale,
  verticalScale,
} from "../utils/guidelineBase";
import {
  useGetRequestsQuery,
  useSendRequestsMutation,
} from "../redux/slice/userApi";

type Params = {
  key: string;
  name: string;
  params: { name: string; receiverId: string };
};
const RequestChatRoom = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const user: User | null = useSelector((state: RootState) => state.auth.user);
  const route = useRoute<Params>();

  useLayoutEffect(() => {
    return navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={styles.route}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={"black"} />
          </Pressable>
          <View>
            <Text style={{ fontSize: 18 }}>{route.params.name}</Text>
          </View>
        </View>
      ),
    });
  }, [navigation, route.params.name]);

  const [sendRequest, { isLoading }] = useSendRequestsMutation();

  const sendRequestHandler = async () => {
    try {
      const response = await sendRequest({
        senderId: user?._id!,
        receiverId: route.params.receiverId,
        message,
      });

      if (response.data) {
        setMessage("");
        Alert.alert(
          "Your request has been shared",
          "wait for the user to accept your request"
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView></ScrollView>
      <View style={styles.barContainer}>
        <Ionicons name="happy-outline" size={24} color={colors.secondary} />
        <TextInput
          placeholder="type your message..."
          value={message}
          mode="outlined"
          style={styles.input}
          onChangeText={setMessage}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            marginHorizontal: horizantalScale(10),
          }}
        >
          <Ionicons name="camera" size={24} color={colors.gray} />
          <Ionicons name="mic" size={24} color={colors.gray} />
        </View>
        <Button
          mode="contained"
          onPress={sendRequestHandler}
          style={styles.button}
        >
          <Ionicons name="send" size={20} color={colors.white} />
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};
export default RequestChatRoom;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  route: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  barContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: horizantalScale(10),
    paddingVertical: verticalScale(10),
    borderTopWidth: 1,
    borderTopColor: "#bbb",
    marginBottom: verticalScale(20),
  },
  input: {
    flex: 1,
    height: verticalScale(40),
    marginLeft: 10,
  },
  button: {
    backgroundColor: colors.secondary,
  },
});
