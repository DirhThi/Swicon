import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  Dimensions,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Center, View } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { images } from "../../assets/images/index";
import { Snackbar, Provider as PaperProvider } from "react-native-paper";
import tw from "tailwind-react-native-classnames";
import {
  MaterialIcons,
  Ionicons,
  FontAwesome5,
  Fontisto,
} from "@expo/vector-icons";

const widthScreen = Dimensions.get("window").width;
const heightScreen = Dimensions.get("window").height;

const PageHome = ({ onPressed }) => {
  const navigation = useNavigation();
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  // const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const saveImage = async () => {
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image);
        setImage(null);
        setSnackbarVisible(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const renderCamera = () => {
    return (
      <View>
        <View
          borderRadius={60}
          overflow={"hidden"}
          w={widthScreen}
          h={widthScreen}
        >
          <Camera
            style={{ flex: 1 }}
            type={type}
            flashMode={flash}
            ref={cameraRef}
          ></Camera>
        </View>
        {/* control */}
        <View flexDirection={"row"} justifyContent={"space-around"} alignItems={"center"} mt={8} >
          {/* flash */}
          <TouchableOpacity
            onPress={() => {
              setFlash(
                flash === Camera.Constants.FlashMode.off
                  ? Camera.Constants.FlashMode.on
                  : Camera.Constants.FlashMode.off
              );
            }}
          >
            <Ionicons name={flash === Camera.Constants.FlashMode.off ? "flash-off-outline" : "flash-outline"} size={36} color="#FF5864" />
           
          </TouchableOpacity>
          {/* take photo */}
          <TouchableOpacity
            onPress={takePicture}
          >
                      <View p={2} w={82} h={82} justifyContent={"center"} alignItems={"center"} borderRadius={50} borderWidth={3} borderColor={"#e63946"}>
                        <View borderRadius={50} w={16} h={16} justifyItems={"center"} alignSelf={"center"} bg={"#FF5864"}>

                        </View>
                      </View>

          </TouchableOpacity>

          {/* type camera */}
          <TouchableOpacity
            className=""
            onPress={() => {
              setType(
                type === CameraType.back ? CameraType.front : CameraType.back
              );
            }}
          >
            <MaterialIcons name="loop" size={36} color="#FF5864" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderImage = () => {
    return (
      <View>
        <Image source={{ uri: image }} style={styles.camera} />
        {/* control */}
        <View className="flex-row justify-around items-center mt-8">
          {/* close */}
          <TouchableOpacity
            onPress={() => {
              setImage(null);
            }}
          >
            <Image
              source={images.close}
              className="w-[40px] h-[40px]"
              style={{
                tintColor: "white",
              }}
            />
          </TouchableOpacity>
          {/* send */}
          <TouchableOpacity
            className="bg-zinc-600 w-24 h-24 justify-center items-center rounded-full"
            onPress={() => {
              console.log("aaa");
            }}
          >
            <Image
              source={images.send}
              className="w-[50px] h-[50px]"
              style={{ tintColor: "white" }}
            />
          </TouchableOpacity>
          {/* download */}
          <TouchableOpacity onPress={saveImage}>
            <Image
              source={images.download}
              className="w-[40px] h-[40px]"
              style={{ tintColor: "white" }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <PaperProvider>
      <SafeAreaView style={tw.style("flex-1 ")}>
        <View style={tw.style("flex-row items-center justify-between px-5")}>
          <TouchableOpacity onPress={() => navigation.navigate("User")}>
            <FontAwesome5 name="user-edit" size={28} color="#FF5864" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <FontAwesome5 name="images" size={40} color="#FF5864" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
            <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
          </TouchableOpacity>
        </View>
        {/* camera */}
        <View shadow={9}  mt={20}>{!image ? renderCamera() : renderImage()}</View>
        {/* bottom */}
          <TouchableOpacity             onPress={onPressed}>
          <View mt={12} justifyContent={"center"} alignItems={"center"}>

            <Text style={{color:"#e63946",fontSize:24,fontWeight:"600"}}>History</Text>
            <Fontisto name="angle-dobule-down" size={24} color="#FF5864" />
            </View>

          </TouchableOpacity>
        
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={Snackbar.DURATION_SHORT} // You can adjust the duration as needed
        >
          Image saved successfully!
        </Snackbar>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  camera: {
    width: widthScreen,
    height: (widthScreen * 4) / 3,
    borderRadius: 60,
    overflow: "hidden",
    marginTop: widthScreen / 18,
  },
});

export default PageHome;
