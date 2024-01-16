import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  FlatList,
  Pressable,
} from "react-native";
import { images } from "../../assets/images";
import PagerView from "react-native-pager-view";

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
  return (
    <View className="flex-1 bg-zinc-900 justify-between">
      {/* top bar */}
      <View
        className="flex-row justify-between px-7 pt-3"
        style={{ height: heightScreen / 17 }}
      >
        <Pressable onPress={backPagePress}>
          <Image
            source={images.up}
            className="w-[30px] h-[30px]"
            style={{ tintColor: "white" }}
          />
        </Pressable>
        <Text className="text-white text-lg">All Image</Text>
        <Image
          source={images.more}
          className="w-[30px] h-[30px]"
          style={{ tintColor: "white" }}
        />
      </View>

      <PagerView
        style={{ flex: 1 }}
        scrollEnabled={true}
        orientation="vertical"
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
              className="relative p-1"
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  flex: 1,
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
                className="rounded-3xl"
              />
              <View className="bg-zinc-900 opacity-80 mt-5 p-2 px-4 rounded-3xl justify-center items-center absolute bottom-3">
                {item.title && (
                  <Text className="text-white text-lg font-semibold">
                    {item.title}
                  </Text>
                )}
              </View>
            </View>
            <View className="bg-zinc-700 mt-5 p-2 px-4 rounded-3xl justify-center items-center">
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
  );
};

const styles = StyleSheet.create({});

export default PageImage;
