import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors } from "../theme/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Message } from "../models/Message";
import { useEffect, useLayoutEffect, useState } from "react";
import { User } from "../models/User";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Ionicons } from "@expo/vector-icons";
import {
  useGetMessagesQuery,
  useSendMessageMutation,
} from "../redux/slice/messageApi";
import { Button, Icon, TextInput } from "react-native-paper";
import { horizantalScale, verticalScale } from "../utils/guidelineBase";
import { get } from "mongoose";

type ChatRoomParams = {
  ChatRoom: { name: string; receiverId: string };
};

const ChatRoom = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const user: User | null = useSelector((state: RootState) => state.auth.user);
  const { socket } = useSelector((state: RootState) => state.socket);
  const route = useRoute<RouteProp<ChatRoomParams, "ChatRoom">>();
  const { data: getMessages, refetch } = useGetMessagesQuery({
    senderId: user?._id!,
    receiverId: route.params.receiverId,
  });
  const [sendMessage] = useSendMessageMutation();

  // Set messages when fetched
  useEffect(() => {
    if (getMessages) {
      setMessages(getMessages);
      refetch();
    }
  }, [getMessages, messages]);

  // Handle incoming new messages via socket
  useEffect(() => {
    if (!socket) return;

    const newMessageHandler = (newMessage: Message) => {
      newMessage.shouldShake = true;
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };
    socket.on("newMessage", newMessageHandler);
    return () => {
      socket.off("newMessage", newMessageHandler);
    };
  }, [socket, messages]);

  // Set navigation header
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.black} />
          </Pressable>
          <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: "bold" }}>
            {route.params.name}
          </Text>
        </View>
      ),
    });
  }, [navigation, route.params.name]);

  // Send message handler
  const sendMessageHandler = async (senderId: string, receiverId: string) => {
    try {
      await sendMessage({
        senderId,
        receiverId,
        message,
      });
      socket?.emit("sendMessage", { senderId, receiverId, message });
      setMessage("");
    } catch (error) {
      console.error(error);
    } finally {
      refetch();
    }
  };

  // Format time for message display
  const formatTime = (time: Date) => {
    return new Date(time).toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <KeyboardAvoidingView style={styles.barContainer}>
      <ScrollView>
        {messages.map((item, index) => (
          <Pressable
            style={[
              item.senderId._id == user?._id ? styles.sender : styles.receiver,
            ]}
            key={index}
          >
            <Text style={styles.message}>{item.message}</Text>
            <Text style={styles.time}>{formatTime(item.timeStamp)}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <Ionicons name="happy-outline" size={24} color={colors.secondary} />
        <TextInput
          placeholder="type your message..."
          value={message}
          mode="outlined"
          style={styles.input}
          onChangeText={setMessage}
        />
        <View style={styles.iconsContainer}>
          <Ionicons name="camera" size={24} color={colors.secondary} />
          <Ionicons name="mic" size={24} color={colors.secondary} />
        </View>
        <Button
          onPress={() =>
            sendMessageHandler(user?._id!, route.params.receiverId)
          }
          style={{
            backgroundColor: colors.secondary,
          }}
        >
          <Ionicons name="send" size={20} color={colors.white} />
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};
export default ChatRoom;

const styles = StyleSheet.create({
  barContainer: { flex: 1, backgroundColor: colors.white },
  sender: {
    alignSelf: "flex-end",
    backgroundColor: colors.secondary,
    padding: 8,
    maxWidth: "60%",
    borderRadius: 7,
    margin: 10,
  },
  receiver: {
    alignSelf: "flex-start",
    backgroundColor: colors.primary,
    padding: 8,
    margin: 10,
    borderRadius: 7,
    maxWidth: "60%",
  },
  message: {
    fontSize: 13,
    color: colors.white,
    textAlign: "left",
  },
  time: {
    textAlign: "right",
    fontSize: 9,
    color: colors.gray,
    marginTop: 5,
  },
  inputContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#dddddd",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: verticalScale(40),
    marginLeft: 10,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 8,
  },
});
