import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/Colors";
const ProfileScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <View>
        <Text>ProfileScreen</Text>
      </View>
    </SafeAreaView>
  );
};
export default ProfileScreen;
const styles = StyleSheet.create({});
