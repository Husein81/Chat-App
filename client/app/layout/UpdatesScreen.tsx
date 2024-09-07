import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/Colors";
import {
  horizantalScale,
  moderateScale,
  verticalScale,
} from "../utils/guidelineBase";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import InstaStory from "react-native-insta-story";
import { data, channels } from "../data/data";
const UpdatesScreen = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.header}>Updates</Text>

        <View style={styles.profileContainer}>
          <View style={{ marginTop: horizantalScale(10) }}>
            <Pressable>
              <Image
                style={styles.image}
                source={{
                  uri: user?.avatar
                    ? user.avatar
                    : "https://lh3.googleusercontent.com/ogw/AF2bZyi09EC0vkA0pKVqrtBq0Y-SLxZc0ynGmNrVKjvV66i3Yg=s64-c-mo",
                }}
              />
              <Text style={styles.profileText}>Your Story</Text>
            </Pressable>
          </View>
          <View>
            <InstaStory data={data} duration={10} />
          </View>
        </View>
      </View>

      <View style={styles.channelContainer}>
        <Text style={styles.channelHeader}>Channels</Text>
        {channels.map((channel, index) => (
          <View style={styles.channel} key={index}>
            <View>
              <Image
                style={styles.channelImage}
                source={{
                  uri: channel.image,
                }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.channelText}>{channel.name}</Text>
              <Text style={styles.channelSubText}>{channel.text}</Text>
              <Text style={{ fontSize: 13, color: colors.darkGray }}>
                {channel.date}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};
export default UpdatesScreen;
const styles = StyleSheet.create({
  container: {
    padding: moderateScale(10),
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    marginHorizontal: horizantalScale(10),
  },
  image: {
    width: horizantalScale(58),
    height: verticalScale(58),
    borderRadius: moderateScale(29),
  },
  profileText: {
    textAlign: "center",
    marginTop: horizantalScale(5),
  },
  channelContainer: {
    padding: moderateScale(10),
  },
  channelHeader: {
    fontSize: 15,
    fontWeight: "bold",
  },
  channel: {
    flexDirection: "row",
    marginVertical: verticalScale(10),
    alignItems: "center",
    gap: 12,
  },
  channelImage: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
  },
  channelText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  channelSubText: {
    marginTop: 4,
    color: colors.gray,
  },
});
