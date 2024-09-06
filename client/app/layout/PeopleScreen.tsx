import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { User as UserModel } from "../models/User";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/Colors";
import { verticalScale } from "../utils/guidelineBase";
import { useGetMyUsersQuery } from "../redux/slice/userApi";
import User from "../../components/User";

const PeopleScreen = () => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const user: UserModel | null = useSelector(
    (state: RootState) => state.auth.user
  );

  const { data: myUsers, refetch } = useGetMyUsersQuery(user?._id!, {
    skip: !user?._id,
  });

  useEffect(() => {
    if (myUsers) {
      setUsers(myUsers);
      refetch();
    }
  }, [myUsers]);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View>
        <Text style={styles.header}>People using LinkUp</Text>
      </View>
      <View>
        <FlatList
          data={users}
          keyExtractor={(item) => item._id} // Ensure each item has a unique key
          renderItem={({ item }) => <User item={item} />} // Render User component
          ListEmptyComponent={
            // Display a message when there are no users
            <Text style={styles.emptyText}>No users found.</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default PeopleScreen;

const styles = StyleSheet.create({
  safeAreaContainer: { flex: 1, backgroundColor: colors.white },
  header: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
    marginTop: verticalScale(12),
  },
  emptyText: {
    textAlign: "center",
    marginTop: verticalScale(20),
    color: colors.gray,
  },
});
