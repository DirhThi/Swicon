import { getAuth, onAuthStateChanged } from "firebase/auth";
import React from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { View, Text, Divider, Button, HStack } from "native-base";
import {
  MaterialCommunityIcons,
  Entypo,
  FontAwesome,
} from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import { LinearGradient } from "expo-linear-gradient";
import tw from "tailwind-react-native-classnames";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

const auth = getAuth();

export default function UserScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);

  const fetchUser = async () => {
    const docSnap = await getDoc(doc(db, "users", user.uid));
    if (docSnap.exists()) {
      console.log(docSnap.data());
      setName(docSnap.data().displayName);
      setImage(docSnap.data().photoURL);
    }
  };
  useEffect(() => {
    fetchUser();
    console.log(image);
  }, []);

  return (
    <ImageBackground
      style={tw.style("flex-1")}
      resizeMode="cover"
      source={require("../assets/bg.png")}
    >
      <View>
        <View
          borderBottomLeftRadius={35}
          borderBottomRightRadius={30}
          style={{ paddingBottom: 10, paddingTop: 10, alignItems: "center" }}
        >
          <HStack mt={4}>
            <Header title="User" color={"white"} />
            <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
              <FontAwesome
                style={{ margin: 20, marginStart: 200 }}
                name="pencil"
                size={30}
                color="white"
              />
            </TouchableOpacity>
          </HStack>

          <View
            mt={-4}
            justifyContent={"center"}
            alignItems={"center"}
            w={24}
            h={24}
            bg={"white"}
            borderRadius={50}
          >
            <Image
            width={"100%"}
            height={"100%"}
            borderRadius={50}
              source={{uri : "http://res.cloudinary.com/duv0w3w4u/image/upload/v1705661873/swicon/eoiutjoekhj4a4ogppez.jpg"} }
              
            />
          </View>
          <Text fontWeight={"semibold"} fontSize={24} mt={2}>
            {name}
          </Text>
        </View>
        <View>
          <View
            justifyContent={"start"}
            p={4}
            h={"full"}
            bg={"white"}
            borderTopRadius={20}
          >
            <Text fontSize={18} fontWeight={"bold"}>
              Re-Swipe
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Love")}
              style={{
                width: "100%",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View height={"12"} alignItems={"center"} flexDirection={"row"}>
                <MaterialCommunityIcons
                  name="account-key-outline"
                  size={24}
                  color="#f4a261"
                />
                <Text
                  fontSize={16}
                  fontWeight={"medium"}
                  style={{ marginLeft: 20 }}
                >
                  Love
                </Text>
              </View>
              <AntDesign name="right" size={18} color="#767676" />
            </TouchableOpacity>

            <TouchableOpacity
             onPress={() => navigation.navigate("Skip")}
              style={{
                width: "100%",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View height={"12"} alignItems={"center"} flexDirection={"row"}>
                <MaterialCommunityIcons
                  name="lock-reset"
                  size={24}
                  color="#f4a261"
                />
                <Text
                  fontSize={16}
                  fontWeight={"medium"}
                  style={{ marginLeft: 20 }}
                >
                  Skip
                </Text>
              </View>
              <AntDesign name="right" size={18} color="#767676" />
            </TouchableOpacity>

            <Divider></Divider>

            <TouchableOpacity
              style={{
                width: "100%",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={logout}
            >
              <View height={"12"} alignItems={"center"} flexDirection={"row"}>
                <MaterialCommunityIcons
                  name="logout"
                  size={24}
                  color="#f4a261"
                />
                <Text
                  fontSize={16}
                  fontWeight={"medium"}
                  style={{ marginLeft: 20 }}
                >
                  Logout
                </Text>
              </View>
              <AntDesign name="right" size={18} color="#767676" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
