import { Alert, View, Image, Text, StyleSheet } from "react-native";
import { launchCameraAsync, PermissionStatus, useCameraPermissions } from "expo-image-picker"
import { useState } from "react"
import { Colors } from "../../constants/colors"
import OutlinedButton from "../UI/OutlinedButton"

function ImagePicker({ onTakeImage }) {
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert('Insufficient Permissions!', 'you need to grant camera permission to use this app.'
      );
      return false;
    }
    return true;
  }
  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    // console.log(image.canceled);
    // to check if is canceled after cliking.
    if (image.canceled === false && image.assets && image.assets.length > 0) {
      const selectedImage = image.assets[0]; // Get the first asset (in case multiple images were captured)
      setPickedImage(selectedImage.uri);
      onTakeImage(selectedImage.uri);
    }
    /* if (!image.canceled) {
         setPickedImage(image.uri);
     }*///this gives us an key warning
    // setPickedImage(image.uri); //key warning
  }
  let imagePreview = <Text> No image is taken yet. </Text>;
  if (pickedImage) {
    imagePreview = <Image style={styles.image}
      source={{ uri: pickedImage }} />;
  }
  return (
    <View>
      <View style={styles.imagePreview}>
        {imagePreview}
      </View>
      <OutlinedButton
        icon='camera' onPress={takeImageHandler}
      > Take Image </OutlinedButton>
    </View >
  );
}
export default ImagePicker;
const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%'
  }
});