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
import { Center, HStack, Input, Modal, ScrollView, View } from "native-base";
import { images } from "../../assets/images";
import PagerView from "react-native-pager-view";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import {
  MaterialIcons,
  Ionicons,
  FontAwesome5,
  Fontisto,
  Entypo,
} from "@expo/vector-icons";
import { useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Title } from "react-native-paper";
const widthScreen = Dimensions.get("window").width;
const heightScreen = Dimensions.get("window").height;

const data = [
  {
    id: 1,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/fe/Son_Tung_M-TP_1_%282017%29.png",

    title: "it's a beautiful day",
    name: "vanh",
  },
  {
    id: 2,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/fe/Son_Tung_M-TP_1_%282017%29.png",
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
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/fe/Son_Tung_M-TP_1_%282017%29.png",
    title: "best image",
    name: "hang",
  },
  {
    id: 5,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/fe/Son_Tung_M-TP_1_%282017%29.png",
    title: "best image",
    name: "le",
  },
];

const PageImage = ({ backPagePress }) => {
  const navigation = useNavigation();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalFocus, setModalFocus] = useState(false);

  return (
    <SafeAreaView style={tw.style("flex-1 ")}>
      <View style={tw.style("flex-row items-center justify-between px-5")}>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="people-circle-outline" size={34} color="#FF5864" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <FontAwesome5 name="images" size={40} color="#FF5864" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
            <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
          </TouchableOpacity>
      </View>
      <View
        flex={1}
        width={widthScreen}
        height={widthScreen}
        justifyContent={"space-between"}
      >
        {/* top bar */}

        <PagerView
          style={{ flex: 1 }}
          scrollEnabled={true}
          orientation="vertical"
          width={widthScreen}
          height={widthScreen}
        >
          {data.map((item) => (
            <View
              key={item.id}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
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
                    borderRadius: 20,
                    flex: 1,
                    width: widthScreen,
                    height: widthScreen,
                  }}
                />
              </View>
              <View
                background={"gray.400"}
                opacity={80}
                mt={2}
                p={2}
                borderRadius={20}
                justifyContent={"center"}
                justifyItems={"center"}
              >
                {item.title && (
                  <Text className="text-white text-lg font-semibold">
                    {item.title}
                  </Text>
                )}
              </View>
              <View>
                <Text className="text-white text-2xl font-semibold">
                  {item.name}
                </Text>
              </View>
            </View>
          ))}
        </PagerView>

        {/* bottom bar */}
        <View background={"transparent"} alignItems={"center"} p={4} pb={0}>
          <Input
            onPressIn={() => {
              setModalFocus(true);
              setModalVisible(true);
            }}
            InputRightElement={
              <HStack>
                <TouchableOpacity pl={2}>
                  <View  >
                    <Text style={{ fontSize: 32 }}>❤️</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View pl={1} pr={1} >
                    <Text style={{ fontSize: 32 }}>😍</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View  pr={2}>
                    <Text style={{ fontSize: 32 }}>🥵</Text>
                  </View>
                </TouchableOpacity>
              </HStack>
            }
            borderColor={"#FF5864"}
            editable={false}
            width={"full"}
            variant="rounded"
            borderWidth={2}
            fontSize={16}
            h={"12"}
            placeholder="What's on your mind ?"
          />
          <TouchableOpacity onPress={backPagePress}>
            <View
              mt={4}
              p={2}
              w={16}
              h={16}
              justifyContent={"center"}
              alignItems={"center"}
              borderRadius={50}
              borderWidth={3}
              borderColor={"#e63946"}
            >
              <View
                borderRadius={50}
                w={12}
                h={12}
                justifyItems={"center"}
                alignSelf={"center"}
                bg={"#FF5864"}
              ></View>
            </View>
          </TouchableOpacity>
        </View>

        <Modal
          isOpen={modalVisible}
          onClose={() => {
            setModalVisible(false);
            setModalFocus(false);
          }}
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
        >
          <Center mt={"155"} w={500}>
            <Modal.Content>
              <Modal.Body>
                <View w={"full"} justifyContent={"center"}>
                  <Input
                    InputRightElement={
                      <TouchableOpacity>
                        <View pl={2} pr={2}>
                          <Ionicons name="send" size={30} color="#FF5864" />
                        </View>
                      </TouchableOpacity>
                    }
                    borderColor={"#FF5864"}
                    autoFocus={modalFocus}
                    width={"full"}
                    variant="rounded"
                    fontSize={16}
                    borderWidth={2}
                    h={"12"}
                    placeholder="What's on your mind ?"
                  />
                </View>
              </Modal.Body>
            </Modal.Content>
          </Center>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default PageImage;
