import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "tailwind-rn";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import useAuth from "../hooks/useAuth";
import { db } from "../firebase";
import ChatRow from "./ChatRow";

const ChatList = () => {
  const [matches, setMacthes] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const unsub = onSnapshot(
      query(
        collection(db, "matches"),
        where("usersMatched", "array-contains", user.uid)
      ),
      (snapshot) => {
        setMacthes(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      }
    );

    return unsub;
  }, []);

  return matches.length > 0 ? (
    <FlatList
      style={tw("h-4 h-full")}
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatRow matchDetails={item} />}
    />
  ) : (
    <View style={tw("p-5")}>
      <Text style={tw("text-center text-lg")}>No Matches at the Moment 😢</Text>
    </View>
  );
};

export default ChatList;
