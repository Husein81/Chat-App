import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { User as UserModel } from "../app/models/User";
import { FC } from "react";
import { useNavigation } from "@react-navigation/native";
import { moderateScale } from "../app/utils/guidelineBase";
import { Button } from "react-native-paper";
import { colors } from "../app/theme/Colors";

type Props = {
  item: UserModel;
};
const User: FC<Props> = ({ item }) => {
  const navigation = useNavigation();

  const navigateToRequest = () => {
    navigation.navigate("Request", {
      name: item.name,
      receiverId: item._id,
    });
  };
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Pressable>
          <Image
            source={{ uri: item.avatar }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text>{item.name}</Text>
          <Text>{item.email}</Text>
        </View>
        <Button
          mode="contained"
          style={styles.button}
          onPress={navigateToRequest}
        >
          Chat
        </Button>
      </View>
    </View>
  );
};
export default User;
const styles = StyleSheet.create({
  container: {
    padding: moderateScale(10),
    marginTop: moderateScale(10),
  },
  button: {
    borderRadius: moderateScale(4),
    backgroundColor: colors.secondary,
  },
});
