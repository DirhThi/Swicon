import React from "react";
import {
  StyleSheet,
  Image,
  Dimensions,
  Text,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import {
  Box,
  Center,
  HStack,
  Hidden,
  Input,
  Modal,
  ScrollView,
  Select,
  View,
} from "native-base";
import { images } from "../../assets/images";
import PagerView from "react-native-pager-view";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import {
  MaterialIcons,
  Ionicons,
  FontAwesome5,
  Fontisto,
  Entypo,
} from "@expo/vector-icons";
import { useRef, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Title } from "react-native-paper";
const widthScreen = Dimensions.get("window").width;
const heightScreen = Dimensions.get("window").height;
import useAuth from "../../hooks/useAuth";
import { db } from "../../firebase";
import { getFirestore } from "firebase/firestore";
import { Firestore } from "firebase/firestore";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  setDoc,
  addDoc,
  where,
} from "firebase/firestore";

const PageImage = ({ backPagePress }) => {
  const { loading, setLoading } = useAuth();
  const navigation = useNavigation();
  const initialRef = useRef(null);
  const { user } = useAuth();
  const finalRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalFocus, setModalFocus] = useState(false);
  const [allUserMatches, setAllUserMatches] = useState([]);
  const [message, setMessage] = useState("");
  const [currentUserLocket, setCurrentUserLocket] = useState('all');
  const [locketMatches, setLocketMatches] = useState([]);
  const [currentPage, setCurrentPage] = useState(-1);
  const [matchId, setMatchId] = useState("");




  const replyLocket = async () => {
  
    if (!message) return;
    const loggedInProfile = await (
      await getDoc(doc(db, "users", user.uid))
    ).data();
    const data = [];
    const q = query(
      collection(db, "matches"),
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push(doc.id);
    });
    
    data.forEach(element => { 
      const string = element;
      if(string.includes(user.uid) && string.includes(locketMatches[currentPage].userId) )
      {
        setMatchId(string);
      }
    });
    addDoc(collection(db, "matches", matchId, "messages"), {
      timestamp: new Date(),
      userId: user.uid,
      displayName: loggedInProfile.displayName,
      photoURL: loggedInProfile.photoURL,
      imagesURL : locketMatches[currentPage].photoURL,
      message: message,
    });

    setMessage("");
  };
  const fetchDataAllMatches = async (crul) => {
    const data = [];

    if(crul=="all")
    {
      let allMatches = await getDocs(
        collection(db, "users", user.uid, "matches")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));
      const allMatchesUserId = allMatches.length > 0 ? allMatches : ["nobody match"];
      setAllUserMatches(allMatchesUserId);
  
      const q = query(
        collection(db, "locket"),
        where("userId", "in", [...allMatchesUserId])
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        data.push(doc.data());
      });
  
      data.sort((a, b) => b.timestamp - a.timestamp); // Ascending order
  
      data.forEach((element) => {
        const timestampObject = element.timestamp;
        const milliseconds =
          timestampObject.seconds * 1000 + timestampObject.nanoseconds / 1000000;
        const date = new Date(milliseconds).toLocaleString();
        element.timestamp = date;
      });
      setLocketMatches(data);
    }
    else if(currentUserLocket=="me")
    {
      console.log(user.uid );
        const q = query(
          collection(db, "locket"),
          where("userId", "==",user.uid )
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          data.push(doc.data());
        });
    
        data.sort((a, b) => b.timestamp - a.timestamp); // Ascending order
    
        data.forEach((element) => {
          const timestampObject = element.timestamp;
          const milliseconds =
            timestampObject.seconds * 1000 + timestampObject.nanoseconds / 1000000;
          const date = new Date(milliseconds).toLocaleString();
          element.timestamp = date;
        });
        setLocketMatches(data);
    }
    else 
    {
      console.log(crul );

        const q = query(
          collection(db, "locket"),
          where("userId", "==",crul )
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          data.push(doc.data());
        });
    
        data.sort((a, b) => b.timestamp - a.timestamp); // Ascending order
    
        data.forEach((element) => {
          const timestampObject = element.timestamp;
          const milliseconds =
            timestampObject.seconds * 1000 + timestampObject.nanoseconds / 1000000;
          const date = new Date(milliseconds).toLocaleString();
          element.timestamp = date;
        });
        setLocketMatches(data);
    }
    
  };

  const fetchAllUserMatches = async () => {
    const data = [];
    let allMatches = await getDocs(
      collection(db, "users", user.uid, "matches")
    ).then((snapshot) => snapshot.docs.map((doc) => doc.id));
    const allMatchesUserId = allMatches.length > 0 ? allMatches : ["nobody match"];
console.log(allMatchesUserId);
    const q = query(
      collection(db, "users"),
      where("id", "in", [...allMatchesUserId])
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push(doc.data());
    });


   
    console.log(data);
    setAllUserMatches(data);

  };

  useEffect(() => {
    fetchAllUserMatches(currentUserLocket);
  }, []);

  useEffect(() => {
    fetchDataAllMatches(currentUserLocket);
  }, [loading]);
  useEffect(() => {
    fetchDataAllMatches(currentUserLocket);
  }, [currentUserLocket]);
  return (
    <SafeAreaView style={tw.style("flex-1 ")}>
      <View style={tw.style("flex-row items-center justify-between px-5")}>
      <Select
            name="SA"
            variant="unstyled"
            fontSize={20}
            selectedValue={currentUserLocket}
            ml={-6}
            textAlign={"center"}
            onValueChange={(itemValue) =>
              {
                console.log(itemValue);
                setCurrentUserLocket(itemValue);
              } }
            justifyContent={"center"}
            dropdownIcon={false}
            dropdownCloseIcon={
              <View >
          <Ionicons name="people-circle-outline" size={34} color="#FF5864" />
              </View>
            }
            dropdownOpenIcon={
              <View >
          <Ionicons name="people-circle-outline" size={34} color="#FF5864" />
              </View>
            }
          >
            <Select.Item  label="All matches" value="all" />
            <Select.Item  label="Me" value="me" />
            {allUserMatches.map((item) => (
              <Select.Item key={item.id} label={item.displayName} value={item.id} />
            ))}
          </Select>
       
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <FontAwesome5 name="images" size={40} color="#FF5864" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
        </TouchableOpacity>
      </View>
      <View
        flex={1}
        width={widthScreen}
        height={widthScreen}
        justifyContent={"space-between"}
      >
        {/* top bar */}

        <PagerView
          onPageSelected={e => {setCurrentPage(e.nativeEvent.position)}}
          style={{ flex: 1 }}
          scrollEnabled={true}
          orientation="vertical"
          width={widthScreen}
          height={widthScreen}
        >
          {locketMatches.map((item) => (
            <View
              key={item.id}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box position="relative" overflow="hidden">
                <View
                  style={{
                    width: widthScreen,
                    height: widthScreen,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={{ uri: item.photoURL }}
                    style={{
                      borderRadius: 40,
                      flex: 1,
                      width: widthScreen,
                      height: widthScreen,
                    }}
                  />
                </View>
                <View
                              bottom={2}

                  w={"full"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  position="absolute"
                >
                  <View borderRadius={20} padding={1} bg={"grey"}>

                  <Text style={{color:"white", }} className="text-white text-2xl font-bold">
                    {item.timestamp}
                  </Text>
                  </View>

                </View>
              </Box>
              <View
                background={"gray.400"}
                opacity={80}
                mt={2}
                p={2}
                borderRadius={20}
                justifyContent={"center"}
                justifyItems={"center"}
              >
                {item.caption && (
                  <Text className="text-white text-lg font-semibold">
                    {item.caption}
                  </Text>
                )}
              </View>
              <View>
                <Text
                  style={{ fontWeight: 600, fontSize: 18 }}
                  className="text-white text-2xl font-bold"
                >
                  {item.user.displayName}
                </Text>
              </View>
            </View>
          ))}
        </PagerView>

        {/* bottom bar */}
        <View background={"transparent"} alignItems={"center"} p={4} pb={0}>
          <Input 
            onPressIn={() => {
              setModalFocus(true);
              setModalVisible(true);
            }}
            InputRightElement={
              <HStack>
                <TouchableOpacity pl={2}>
                  <View>
                    <Text style={{ fontSize: 32 }}>❤️</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View pl={1} pr={1}>
                    <Text style={{ fontSize: 32 }}>😍</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View pr={2}>
                    <Text style={{ fontSize: 32 }}>🥵</Text>
                  </View>
                </TouchableOpacity>
              </HStack>
            }
            isDisabled={currentUserLocket=="me" ? true : false}
            borderColor={"#FF5864"}
            editable={false}
            width={"full"}
            variant="rounded"
            borderWidth={2}
            fontSize={16}
            h={"12"}
            placeholder="What's on your mind ?"
          />
          
         
          <TouchableOpacity onPress={backPagePress}>
            <View
              mt={4}
              p={2}
              w={16}
              h={16}
              justifyContent={"center"}
              alignItems={"center"}
              borderRadius={50}
              borderWidth={3}
              borderColor={"#e63946"}
            >
              <View
                borderRadius={50}
                w={12}
                h={12}
                justifyItems={"center"}
                alignSelf={"center"}
                bg={"#FF5864"}
              ></View>
            </View>
          </TouchableOpacity>
        </View>

        <Modal
          isOpen={modalVisible}
          onClose={() => {
            setModalVisible(false);
            setModalFocus(false);
          }}
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
        >
          <Center mt={"155"} w={500}>
            <Modal.Content>
              <Modal.Body>
                <View w={"full"} justifyContent={"center"}>
                  <Input
                    InputRightElement={
                      <TouchableOpacity onPress={replyLocket}>
                        <View pl={2} pr={2}>
                          <Ionicons name="send" size={30} color="#FF5864" />
                        </View>
                      </TouchableOpacity>
                    }
                    value={message}
                    onChangeText={setMessage}
                    borderColor={"#FF5864"}
                    autoFocus={modalFocus}
                    width={"full"}
                    variant="rounded"
                    fontSize={16}
                    borderWidth={2}
                    h={"12"}
                    placeholder="What's on your mind ?"
                  />
                  
                </View>
              </Modal.Body>
            </Modal.Content>
          </Center>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default PageImage;
