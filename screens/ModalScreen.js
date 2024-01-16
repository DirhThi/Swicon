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
import ImageInput from "../components/ImageInput";
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
      <Text style={[{ color: "brown", fontSize: 40 }, tw(" p-2 font-bold")]}>
        S w i c o n
      </Text>
      <Text style={[{ color: "grey" }, tw("text-xl p-2 font-bold")]}>
        Welcome {user?.displayName}
      </Text>
      <Text style={tw("text-center p-4 font-bold text-red-400")}>
        The Profile Pic
      </Text>
          
      <View style={{width:200,height:200, borderRadius:100,} }>
      <ImageInput  initValue={image} onChange={(value) => {setImage(value)}} />

      </View>
      <Text style={tw("text-center p-4 font-bold text-red-400")}>
       The Job
      </Text>
      <TextInput
        value={job}
        onChangeText={setJob}
        style={tw("pb-2 text-xl text-center")}
        placeholder="Enter your Occupation"
      />
      <Text style={tw("text-center p-4 font-bold text-red-400")}>
       The Age
      </Text>
      <TextInput
        maxLength={2}
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
        style={tw("pb-2 text-xl text-center")}
        placeholder="Enter your Age"
      />
      <Text style={tw("text-center p-4 font-bold text-red-400")}>
       The Address
      </Text>
      <TextInput
        maxLength={2}
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
        style={tw("pb-2 text-xl text-center")}
        placeholder="Enter your Address"
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
