import {
  launchCameraAsync,
  PermissionStatus,
  useCameraPermissions,
} from "expo-image-picker";
import { FC } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { colors } from "../app/theme/Colors";
import { Button } from "react-native-paper";

type Props = {
  setAvatar: (image: string) => void;
};

const ImagePicker: FC<Props> = ({ setAvatar }) => {
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  const verifyPermissions = async () => {
    if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permission to use this app",
        [{ text: "Okay" }]
      );
      console.log(cameraPermissionInformation?.status);
      return false;
    }
    return true;
  };
  const takeImageHandler = async () => {
    // const hasPermission = await verifyPermissions();
    // if (!hasPermission) {
    //   return;
    // }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    if (image.assets && image.assets.length > 0) {
      setAvatar(image.assets[0].uri);
    }
  };

  return (
    <View>
      <Button onPress={takeImageHandler}>Take Image</Button>
    </View>
  );
};
export default ImagePicker;
const styles = StyleSheet.create({
  ImagePreview: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
    backgroundColor: colors.lightGray,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
