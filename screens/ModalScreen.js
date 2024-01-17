import {
  View,
  Text,
  Platform,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React from "react";
import tw from "tailwind-rn";
import useAuth from "../hooks/useAuth";
import { serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import ImageInput from "../components/ImageInput";
import {
  Box,
  Center,
  IconButton,
  Pressable,
  Image,
  Radio,
  HStack,
  Toast,
  Button,
  Input,
  Select,
  CheckIcon,
} from "native-base";
import { Feather,Ionicons, MaterialCommunityIcons  } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as fs from "expo-file-system";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
import tinhThanh from "../lib/address";

const ModalScreen = () => {
  const { user } = useAuth();
  const [image, setImage] = useState(null);
  const [rootImage, setrootImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [name, setName] = useState(null);
  const [gender, setGender] = useState(null);
  const [age, setAge] = useState(null);
  const [address, setAddress] = useState(null);
  const [profiles, setProfiles] = useState(null);
  const navigation = useNavigation();
  const incompleteForm = !image || !gender || !age || !address;
  const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          base64: true,
          aspect: [3, 3],
          quality: 0.5,
      });

      // console.log(result);

      if (!result.canceled) {
          const base64 = `data:image/jpg;base64,${result.assets[0].base64}`;
          setImage(base64);
          const uri =result.assets[0].uri;
          const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
          setImage(uploadUri);
          console.log(uploadUri);
      }
  };

  function handleResetImage() {
      setImage(rootImage);
  }

  const fetchUser = async () => {
    const docSnap = await getDoc(doc(db, "users", user.uid));
    if (docSnap.exists()) {
      setProfiles(docSnap.data());
      setName(docSnap.data().displayName);
      setImage(docSnap.data().photoURL);
      setrootImage(docSnap.data().photoURL);
      setAge(docSnap.data().age);
      setGender(docSnap.data().gender);
      setAddress(docSnap.data().address);
      console.log(docSnap.data());
    }
  };
  useEffect(() => {
    fetchUser();

  }, []);
  useEffect(() => {
    console.log(image);
  }, [image]);
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

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "swicon");
    data.append("cloud_name", "duv0w3w4u");
    data.append("folder", "swicon");

    fetch("https://api.cloudinary.com/v1_1/duv0w3w4u/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setImageURL(data.url);
        console.log(data.url);
      })
      .catch((err) => console.log(err));
  };

  return (
    <SafeAreaView
      style={[
        { marginTop: Platform.OS === "android" ? 40 : 0 },
        tw("flex-1 items-center pt-1"),
      ]}
    >
      <Text style={[{ color: "brown", fontSize: 40 }, tw(" p-2 font-bold")]}>
        S w i c o n
      </Text>
      <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <View style={[tw("flex-1 items-center ")]}>
          <Text style={[{ color: "grey" }, tw("text-xl p-2 font-bold")]}>
            Welcome {name}
          </Text>
          <Text style={tw("text-center p-4 font-bold text-red-400")}>
            The Profile Pic
          </Text>

          <View style={{ width: 200, height: 200, borderRadius: 100 }}>
          <Box  borderRadius={100}  position="relative" w={210} h="210"  rounded={0} overflow="hidden" >
            <Pressable borderRadius={100} onPress={pickImage}>
                {image ? (
                    <Image borderRadius={100} alt="" src={image}  h="200" w="200" />
                ) : (
                    <Center borderRadius={100} bg="gray.200"  h="full" w="full">
                        <MaterialCommunityIcons name="file-image-plus-outline" size={40} color="black" />
                    </Center>
                )}
            </Pressable>

            {image && (
                <IconButton 
                    position="absolute"
                    right="0"
                    top="-15"
                    rounded="full"
                    py="3"
                    onPress={handleResetImage}
                    icon={<Ionicons name="close" size={24} color="#f4a261"/>}
                />
            )}
        </Box>
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
                <Text
                  style={{
                    fontSize: 20,
                    color: gender == "Man" ? "black" : "gray",
                  }}
                >
                  Man
                </Text>
              </Radio>
              <Radio ml={10} value="Woman" my={1}>
                <Text
                  style={{
                    fontSize: 20,
                    color: gender == "Woman" ? "black" : "gray",
                  }}
                >
                  Woman
                </Text>
              </Radio>
            </HStack>
          </Radio.Group>

          <Text style={tw("text-center p-4 font-bold text-red-400")}>
            The Age
          </Text>
          <Input
            maxLength={2}
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
            pb={2}
            variant="unstyled"
            fontSize={20}
            textAlign={"center"}
            placeholder="Enter your Age"
          />
          <Text style={tw("text-center p-4 font-bold text-red-400")}>
            The Address
          </Text>
          <Select
            name="SA"
            w={"56"}
            variant="unstyled"
            h={12}
            fontSize={20}
            textAlign={"center"}
            selectedValue={address}
            justifyContent={"center"}
            accessibilityLabel="Enter your Address"
            placeholder="Enter your Address"
            onValueChange={(itemValue) => setAddress(itemValue)}
            dropdownIcon={false}
            dropdownCloseIcon={
              <View mr={2}>
                <Feather name="chevron-down" size={24} color="gray" />
              </View>
            }
            dropdownOpenIcon={
              <View mr={2}>
                <Feather name="chevron-up" size={24} color="gray" />
              </View>
            }
          >
            {tinhThanh.map((item) => (
              <Select.Item key={item} label={item} value={item} />
            ))}
          </Select>
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
    </SafeAreaView>
  );
};

export default ModalScreen;
