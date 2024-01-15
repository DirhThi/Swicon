import { getAuth, onAuthStateChanged } from "firebase/auth";
import React from "react";
import { Image, SafeAreaView, TouchableOpacity } from "react-native";
import { View, Text, Divider, Button, HStack } from "native-base";
import { MaterialCommunityIcons, Entypo,FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import { LinearGradient } from "expo-linear-gradient";

const auth = getAuth();

export default function UserScreen({ navigation }) {
    const { user, logout } = useAuth();

  return (
    <LinearGradient 
        // Background Linear Gradient
        colors={['#fcbf49', '#fefae0']}
        start={{ x: 0.7, y: 0 }}
        >
        <View >
      <View
        borderBottomLeftRadius={35}
        borderBottomRightRadius={30}
        style={{ paddingBottom: 10, paddingTop: 10, alignItems: "center" }}
      >
        <HStack mt={4} >
            <Header title="User" />
            <TouchableOpacity>
                            <FontAwesome style={{margin:20, marginStart:200}} name="pencil" size={30} color="gray" />
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
        
          <Entypo name="user" size={60} color="#a2d2ff" />
        </View>
        <Text fontWeight={"semibold"} fontSize={20} mt={2}>
          Nguyễn Đình Thi
        </Text>
      </View>
      <View>
        <View
          justifyContent={"start"}
          p={4}
          h={'full'}
          bg={"white"}
          borderTopRadius={20}   
        >
           <Text
         
          fontSize={18}
          fontWeight={"bold"}
        >
          Cài đặt
        </Text>
          <TouchableOpacity
            style={{
              width: "100%",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View  height={"12"} alignItems={"center"} flexDirection={"row"}>
              <MaterialCommunityIcons
                name="account-key-outline"
                size={24}
                color="#a2d2ff"
              />
              <Text fontSize={15} style={{ marginLeft: 20 }}>
                Tài khoản
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
          
            style={{
              width: "100%",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View height={"12"} alignItems={"center"}  flexDirection={"row"}>
              <MaterialCommunityIcons
                name="lock-reset"
                size={24}
                color="#a2d2ff"
              />
              <Text fontSize={15} style={{ marginLeft: 20 }}>
                Đổi mật khẩu
              </Text>
            </View>
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
            <View height={"12"} alignItems={"center"}  flexDirection={"row"}>
              <MaterialCommunityIcons name="logout" size={24} color="#a2d2ff" />
              <Text fontSize={15} style={{ marginLeft: 20 }}>
                Đăng xuất
              </Text>
            </View>
            <AntDesign name="right" size={18} color="#767676" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </LinearGradient>
    
  
  );
}
