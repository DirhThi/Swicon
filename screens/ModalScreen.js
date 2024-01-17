import {
  View,
  Text,
  Image,
  Platform,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import tw from "tailwind-rn";
import useAuth from "../hooks/useAuth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import ImageInput from "../components/ImageInput";
import { Radio, HStack, Toast } from "native-base";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';


const ModalScreen = () => {
  const { user } = useAuth();
  const [image, setImage] = useState(null);
  const [gender, setGender] = useState(null);
  const [age, setAge] = useState(null);
  const [address, setAddress] = useState(null);
  const navigation = useNavigation();

  const incompleteForm = !image || !gender || !age || !address;

  const updateUserProfile = () => {
    if (incompleteForm) return;

    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: user.displayName,
      photoURL: image,
      gender: gender,
      age: age,
      address: address,
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
      <ScrollView  automaticallyAdjustKeyboardInsets={true}>
      <View
      style={[
        tw("flex-1 items-center "),
      ]}
    >
      <Text style={[{ color: "grey" }, tw("text-xl p-2 font-bold")]}>
        Welcome {user?.displayName}
      </Text>
      <Text style={tw("text-center p-4 font-bold text-red-400")}>
        The Profile Pic
      </Text>

      <View style={{ width: 200, height: 200, borderRadius: 100 }}>
        <ImageInput
          initValue={image}
          onChange={(value) => {
            setImage(value);
          }}
        />
      </View>
      <Text style={tw("text-center p-4 font-bold text-red-400")}>
        The Gender
      </Text>
      <Radio.Group
        name="GenderGroup"
        value={gender}
        onChange={(nextValue) => {
          setGender(nextValue);
        }}
      >
        <HStack>
          <Radio value="Man" my={1}>
            <Text style={{ fontSize:20, color:gender=="Man" ? "black" : "gray"}}>Man</Text>
          </Radio>
          <Radio ml={10} value="Woman" my={1}>
            <Text style={{fontSize:20, color:gender=="Woman" ? "black" : "gray"}}>Woman</Text>
          </Radio>
        </HStack>
      </Radio.Group>
     
      <Text style={tw("text-center p-4 font-bold text-red-400")}>The Age</Text>
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
        value={address}
        onChangeText={setAddress}
        style={tw("pb-2 text-xl text-center")}
        placeholder="Enter your Address"
      />
      </View>
      </ScrollView>
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
