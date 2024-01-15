import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import getMactchedUserInfo from "../lib/getMatchedUserInfo";
import useAuth from "../hooks/useAuth";
import { useRoute } from "@react-navigation/native";
import tw from "tailwind-rn";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const MessageScreen = () => {
  const { user } = useAuth();
  const { params } = useRoute();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (!input) return;
    addDoc(collection(db, "matches", matchDetails.id, "messages"), {
      timestamp: serverTimestamp(),
      userId: user.uid,
      displayName: user.displayName,
      photoURL: matchDetails.users[user.uid].photoURL,
      message: input,
    });

    setInput("");
  };

  const { matchDetails } = params;

  useEffect(() => {
    const unsub = onSnapshot(
      query(
        collection(db, "matches", matchDetails.id, "messages"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      }
    );
    console.log(messages);
    return unsub;
  }, [matchDetails, db]);
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 50 : 0,
        paddingBottom: Platform.OS === "android" ? 20 : 0,
        flex: 1,
      }}
    >
      <Header
        callEnabled
        title={getMactchedUserInfo(matchDetails?.users, user.uid).displayName}
      />

      <KeyboardAvoidingView
        keyboardVerticalOffset={10}
        style={tw("flex-1")}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            inverted={-1}
            data={messages}
            style={tw("pl-4")}
            keyExtractor={(item) => item.id}
            renderItem={({ item: message }) => {
              if (message.userId === user.uid) {
                return (
                  <View
                    key={message.id}
                    style={[
                      tw(
                        "bg-purple-600 rounded-lg rounded-tr-none px-5 py-3 mx-3 my-3"
                      ),
                      {
                        alignSelf: "flex-start",
                        marginLeft: "auto",
                      },
                    ]}
                  >
                    <Text style={tw("font-bold text-white")}>
                      {message.message}
                    </Text>
                  </View>
                );
              } else {
                return (
                  <View
                    key={message.id}
                    style={[
                      tw(
                        "bg-red-400 rounded-lg rounded-tl-none px-5 py-3 mx-3 my-3"
                      ),
                      {
                        alignSelf: "flex-start",
                        marginLeft: 55,
                      },
                    ]}
                  >
                    <Image
                      source={{ uri: message.photoURL }}
                      style={[
                        tw("h-12 w-12 rounded-full absolute top-0"),
                        { left: -55 },
                      ]}
                    />
                    <Text style={tw("font-bold text-white")}>
                      {message.message}
                    </Text>
                  </View>
                );
              }
            }}
          />
        </TouchableWithoutFeedback>
        <View
          style={[
            { borderColor: "rgb(229,231,235)" },
            tw("flex-row justify-between border-t items-center px-5 py-2"),
          ]}
        >
          <TextInput
            style={tw("h-10 text-lg")}
            placeholder="Send Message"
            onSubmitEditing={sendMessage}
            value={input}
            onChangeText={setInput}
          />
          {Platform.OS === "ios" ? (
            <Button title="Send" onPress={sendMessage} color="#FF5864" />
          ) : (
            <TouchableOpacity onPress={sendMessage}>
              <Text style={[{ color: "#FF5864" }, tw("text-lg")]}>Send</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessageScreen;
