import {
  View,
  Text,
  Image,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import tw from "tailwind-rn";
import useAuth from "../hooks/useAuth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigation } from "@react-navigation/native";

const ModalScreen = () => {
  const { user } = useAuth();
  const [image, setImage] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);

  const navigation = useNavigation();

  const incompleteForm = !image || !job || !age;

  const updateUserProfile = () => {
    if (incompleteForm) return;

    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: user.displayName,
      photoURL: image,
      job: job,
      age: age,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch(alert);
  };

  return (
    <View
      style={[
        { marginTop: Platform.OS === "android" ? 40 : 0 },
        tw("flex-1 items-center pt-1"),
      ]}
    >
      <Image
        style={tw("h-20 w-full")}
        resizeMode="contain"
        source={{ uri: "https://links.papareact.com/2pf" }}
      />
      <Text style={[{ color: "grey" }, tw("text-xl p-2 font-bold")]}>
        Welcome {user?.displayName}
      </Text>
      <Text style={tw("text-center p-4 font-bold text-red-400")}>
        Step 1: The Profile Pic
      </Text>
      <TextInput
        value={image}
        onChangeText={setImage}
        style={tw("pb-2 text-xl text-center")}
        placeholder="Enter a Profile Pic Url"
      />
      <Text style={tw("text-center p-4 font-bold text-red-400")}>
        Step 2: The Job
      </Text>
      <TextInput
        value={job}
        onChangeText={setJob}
        style={tw("pb-2 text-xl text-center")}
        placeholder="Enter your Occupation"
      />
      <Text style={tw("text-center p-4 font-bold text-red-400")}>
        Step 1: The Age
      </Text>
      <TextInput
        maxLength={2}
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
        style={tw("pb-2 text-xl text-center")}
        placeholder="Enter your Age"
      />
      <TouchableOpacity
        disabled={incompleteForm}
        onPress={updateUserProfile}
        style={[
          { bottom: 50, borderRadius: 15 },
          incompleteForm ? tw("bg-gray-400") : tw("bg-red-400"),
          tw("w-64 p-3 absolute"),
        ]}
      >
        <Text style={tw("text-center text-white text-xl")}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalScreen;
