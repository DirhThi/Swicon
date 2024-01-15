import { View, Text, SafeAreaView } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import ChatList from "../components/ChatList";

const ChatScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 50 : 0,
      }}
    >
      <Header title="Chat" />
      <ChatList />
    </SafeAreaView>
  );
};

export default ChatScreen;
