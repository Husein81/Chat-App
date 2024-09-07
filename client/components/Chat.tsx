import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { User } from "../app/models/User";
import { FC, useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { verticalScale } from "../app/utils/guidelineBase";
import { Message } from "../app/models/Message";
import { RootState } from "../app/redux/store";
import { useSelector } from "react-redux";
import { useGetMessagesQuery } from "../app/redux/slice/messageApi";
type Props = {
  item: User;
};
const Chat: FC<Props> = ({ item }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigation = useNavigation();

  const [messages, setMessages] = useState<Message[]>([]);

  const {
    data: getMessages,
    isLoading,
    refetch,
  } = useGetMessagesQuery({
    senderId: user?._id!,
    receiverId: item._id,
  });

  const getLastMessage = useCallback((): string => {
    const lastMessage = messages[messages.length - 1];
    return lastMessage?.message || `Start a chat with ${item.name}`;
  }, [messages, item.name]);

  useEffect(() => {
    if (getMessages) {
      setMessages(getMessages);
    }
  }, []);

  const navigateToChat = () => {
    navigation.navigate("ChatRoom", {
      name: item.name,
      receiverId: item._id,
      image: item.avatar,
    });
  };

  return (
    <Pressable onPress={navigateToChat} style={styles.marginVertical}>
      <View style={styles.container}>
        <Pressable>
          <Image
            source={{ uri: item.avatar }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        </Pressable>

        <View>
          <Text>{item.name}</Text>
          <Text>{getLastMessage()}</Text>
        </View>
      </View>
    </Pressable>
  );
};
export default Chat;
const styles = StyleSheet.create({
  marginVertical: {
    marginVertical: verticalScale(10),
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
