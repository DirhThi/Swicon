import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import getMactchedUserInfo from "../lib/getMatchedUserInfo";
import tw from "tailwind-rn";

const ChatRow = ({ matchDetails }) => {
  const navigation = useNavigation();
  const [matchedUserInfo, setMatchedUserInfo] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    setMatchedUserInfo(getMactchedUserInfo(matchDetails.users, user.uid));
  }, []);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Message", {
          matchDetails,
        })
      }
      style={[
        styles.cardShadow,
        tw("flex-row rounded-lg bg-white mx-3 my-1 py-3 px-5 items-center"),
      ]}
    >
      <Image
        style={tw("rounded-full h-16 w-16 mr-4")}
        source={{ uri: matchedUserInfo?.photoURL }}
      />
      <View>
        <Text style={tw("text-lg font-semibold")}>
          {matchedUserInfo?.displayName}
        </Text>
        <Text>Say Hi!</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
