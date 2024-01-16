import React from "react";
import {
  StyleSheet,
  Image,
  Dimensions,
  Text,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Center, View } from "native-base";
import { images } from "../../assets/images";
import PagerView from "react-native-pager-view";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import {
  MaterialIcons,
  Ionicons,
  FontAwesome5,
  Fontisto,
  Entypo
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Title } from "react-native-paper";
const widthScreen = Dimensions.get("window").width;
const heightScreen = Dimensions.get("window").height;

const data = [
  {
    id: 1,
    image:"https://upload.wikimedia.org/wikipedia/commons/f/fe/Son_Tung_M-TP_1_%282017%29.png",

    title: "best image",
    name: "vanh",
  },
  {
    id: 2,
    image:"https://upload.wikimedia.org/wikipedia/commons/f/fe/Son_Tung_M-TP_1_%282017%29.png",
      title: "best image",
    name: "thanh",
  },
  {
    id: 3,
    image:
      "https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/370371573_987884872435265_3912501485857872186_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=4c1e7d&_nc_ohc=5fmiBAXUEswAX-cH5dH&_nc_ht=scontent.fhan2-3.fna&oh=00_AfCsAYsAbta0_1KAvT5pCgMzTUz1vEcwKA6uLE8Kd3ntUw&oe=65022CCB",
      title: "best image",
      name: "hau",
  },
  {
    id: 4,
    image:"https://upload.wikimedia.org/wikipedia/commons/f/fe/Son_Tung_M-TP_1_%282017%29.png",
    title: "best image",
    name: "hang",
  },
  {
    id: 5,
    image:"https://upload.wikimedia.org/wikipedia/commons/f/fe/Son_Tung_M-TP_1_%282017%29.png",
    title: "best image",
    name: "le",
  },
];

const PageImage = ({ backPagePress }) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw.style("flex-1 ")}>
        <View style={tw.style("flex-row items-center justify-between px-5")}>
          <TouchableOpacity onPress={backPagePress}>
          <FontAwesome5 name="chevron-up"  size={28} color="#FF5864" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <FontAwesome5 name="images" size={40} color="#FF5864" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="people-circle-outline" size={34} color="#FF5864" />
          </TouchableOpacity>
        </View>
    <View flex={1}   width= {widthScreen} height= {widthScreen} justifyContent={"space-between"} >
      {/* top bar */}
     

      <PagerView
        style={{ flex: 1 }}
        scrollEnabled={true}
        orientation="vertical"
        width= {widthScreen} height= {widthScreen}
      >
        {data.map((item) => (
          <View
            key={item.id}
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <View
              style={{
                width: widthScreen,
                height: widthScreen,
                alignItems: "center",
                justifyContent: "center",
              }}
              
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  borderRadius:20,
                  flex: 1,
                  width: widthScreen,
                  height: widthScreen,
                  
                }}
              />
              
            </View>
            <View background={"gray.400"} opacity={80} mt={2} p={2} borderRadius={20} justifyContent={"center"} justifyItems={"center"}
              >
                {item.title && (
                  <Text className="text-white text-lg font-semibold">
                    {item.title}
                  </Text>
                )}
              </View>
            <View >
              <Text className="text-white text-2xl font-semibold">
                {item.name}
              </Text>
            </View>
          </View>
       ))} 
      </PagerView>

      {/* bottom bar */}
      <View
        className="flex-row justify-between px-7 mb-5 items-center"
        style={{ height: heightScreen / 17 }}
      >
        <Image
          source={images.windows}
          className="w-[30px] h-[30px]"
          style={{ tintColor: "white" }}
        />
        {/* icon */}
        <View className="flex-row bg-zinc-700 p-2 px-4 rounded-3xl justify-center items-center">
          <Image
            source={images.comment}
            className="w-[30px] h-[30px] mx-1"
            style={{ tintColor: "white" }}
          />
          <Image source={images.heart} className="w-[30px] h-[30px] mx-1" />
          <Image source={images.fire} className="w-[30px] h-[30px]  mx-1" />
          <Image source={images.smile} className="w-[30px] h-[30px]  mx-1" />
          <Image
            source={images.add}
            className="w-[30px] h-[30px]  mx-1"
            style={{ tintColor: "white" }}
          />
        </View>
        {/* icon */}
        <Image
          source={images.share}
          className="w-[30px] h-[30px]"
          style={{ tintColor: "white" }}
        />
      </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default PageImage;
