import { Image, Pressable, StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/Colors";
import {
  horizantalScale,
  moderateScale,
  verticalScale,
} from "../utils/guidelineBase";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigation } from "@react-navigation/native";
import { logoutUserAction } from "../redux/slice/authSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { User } from "../models/User";
import { Request } from "../models/Request";
import Chat from "../../components/Chat";
import {
  useAcceptRequestMutation,
  useGetRequestsQuery,
  useGetUserQuery,
  useRejectRequestMutation, // Import the reject request mutation
} from "../redux/slice/userApi";
import { ActivityIndicator } from "react-native-paper";

const ChatsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [options, setOptions] = useState<string[]>(["chats"]);
  const [chats, setChats] = useState<User[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);

  const chooseOption = (option: string) => {
    if (options.includes(option)) {
      setOptions(options.filter((opt) => opt !== option));
    } else {
      setOptions([...options, option]);
    }
  };

  const logoutHandler = () => {
    dispatch(logoutUserAction());
  };
  const userId = user?._id!;
  const {
    data: userData,
    isLoading: isLoadingUser,
    refetch: refetchUser,
  } = useGetUserQuery(userId!, { skip: !userId });

  const { data, isLoading, refetch } = useGetRequestsQuery(userId!);
  const [acceptRequest] = useAcceptRequestMutation();
  const [rejectRequest] = useRejectRequestMutation(); // Add this mutation

  const getRequests = async () => {
    try {
      if (data) {
        setRequests(data!);
        refetch();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const acceptRequestHandler = async (requestId: string) => {
    try {
      const response = await acceptRequest({ requestId, userId: userId });
      console.log("accept", response.data);
      if (response.data) {
        getRequests();
        refetch();
        refetchUser();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const rejectRequestHandler = async (requestId: string) => {
    try {
      const response = await rejectRequest({ requestId, userId: userId }); // Use rejectRequest mutation
      console.log("reject", response.data);
      if (response.data) {
        getRequests();
        refetch();
        refetchUser();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = async () => {
    try {
      if (userData) {
        setChats(userData);
        refetchUser();
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (userId) {
      console.log("userId", userId, data);
      refetch();
      getRequests();
    }
  }, [userId]);
  useEffect(() => {
    if (userId) {
      console.log("userId", userId, userData);
      refetchUser();
      getUser();
    }
  }, [userId]);

  const chatLength = chats?.length || 0;
  if (isLoadingUser || isLoading)
    return (
      <ActivityIndicator
        style={{ flex: 1 }}
        size={"large"}
        animating={isLoadingUser || isLoading}
      />
    );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={styles.header}>
        <Pressable onPress={logoutHandler}>
          <Image
            style={styles.avatar}
            source={{
              uri: user?.avatar
                ? user?.avatar
                : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
            }}
          />
        </Pressable>
        <Text style={styles.headerText}>Chats</Text>
        <View>
          <View style={styles.headerIcons}>
            <Ionicons name="camera-outline" size={26} color="black" />
            <Ionicons
              onPress={() => navigation.navigate("People" as never)}
              name="person-outline"
              size={26}
              color="black"
            />
          </View>
        </View>
      </View>
      <View style={styles.optionsContainer}>
        <Pressable
          onPress={() => chooseOption("chats")}
          style={styles.optionToggle}
        >
          <View>
            <Text>Chats</Text>
          </View>
          <Ionicons name="chevron-down" size={26} color="black" />
        </Pressable>
        <View>
          {options?.includes("chats") &&
            (chatLength > 0 ? (
              <View>
                {chats.map((item, index) => (
                  <Chat item={item} key={index} />
                ))}
              </View>
            ) : (
              <View style={styles.emptyState}>
                <View>
                  <Text style={styles.emptyStateText}>No Chats yet</Text>
                  <Text style={styles.emptySubText}>
                    Get started by messaging a friend
                  </Text>
                </View>
              </View>
            ))}
        </View>
        <Pressable
          onPress={() => chooseOption("Requests")}
          style={styles.optionToggle}
        >
          <View>
            <Text>Requests</Text>
          </View>
          <Ionicons name="chevron-down" size={26} color="black" />
        </Pressable>
        <View style={styles.requestContainer}>
          {options.includes("Requests") && (
            <View>
              <Text style={styles.requestHeader}>
                Checkout all the requests
              </Text>
              {requests?.map((item) => (
                <Pressable key={item._id} style={styles.requestItem}>
                  <View style={styles.requestContent}>
                    <Pressable>
                      <Image
                        source={{ uri: item.from.avatar }}
                        style={styles.requestAvatar}
                      />
                    </Pressable>

                    <View style={{ flex: 1 }}>
                      <Text style={styles.requestName}>{item.from.name}</Text>
                      <Text style={{ color: colors.gray }}>{item.message}</Text>
                    </View>

                    <Pressable
                      onPress={() => acceptRequestHandler(item.from._id)}
                      style={styles.acceptButton}
                    >
                      <Text style={styles.acceptButtonText}>Accept</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => rejectRequestHandler(item.from._id)}
                    >
                      <Ionicons name="trash-outline" size={26} color="red" />
                    </Pressable>
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({
  header: {
    padding: moderateScale(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  avatar: {
    width: horizantalScale(30),
    height: verticalScale(30),
    borderRadius: 15,
  },
  headerText: {
    fontSize: 15,
    fontWeight: "500",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  optionsContainer: {
    padding: moderateScale(10),
  },
  optionToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  emptyState: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    textAlign: "center",
    color: colors.gray,
  },
  emptySubText: {
    marginTop: 4,
    color: colors.gray,
  },
  requestContainer: {
    marginVertical: verticalScale(12),
  },
  requestHeader: {
    fontSize: 15,
    fontWeight: "500",
    marginHorizontal: "auto",
  },
  requestItem: {
    marginVertical: verticalScale(12),
  },
  requestContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  requestAvatar: {
    width: horizantalScale(40),
    height: verticalScale(40),
    borderRadius: moderateScale(20),
  },
  requestName: {
    fontSize: moderateScale(15),
    fontWeight: "500",
  },
  acceptButton: {
    padding: moderateScale(8),
    backgroundColor: colors.primary,
    width: horizantalScale(75),
    borderRadius: moderateScale(5),
  },
  acceptButtonText: {
    fontSize: 13,
    textAlign: "center",
    color: "white",
  },
});
