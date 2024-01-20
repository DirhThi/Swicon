import {
    Button,
    Image,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
  import useAuth from "../hooks/useAuth";
  import { useNavigation } from "@react-navigation/native";
  import tw from "tailwind-react-native-classnames";
  import { MaterialCommunityIcons, Entypo, Ionicons ,FontAwesome5} from "@expo/vector-icons";
  import Swiper from "react-native-deck-swiper";
  import { db, timestamp } from "../firebase";
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
  import generateId from "../lib/generateId";
  import Header from "../components/Header";
  
  
  
  const SkipScreen = () => {
    const { user, logout } = useAuth();
    const navigation = useNavigation();
    const [profiles, setProfiles] = useState([]);
    const swipeRef = useRef(null);
    useLayoutEffect(() => {
      const unsub = onSnapshot(doc(db, "users", user.uid), (snapshot) => {
        if (!snapshot.exists()) {
          navigation.navigate("Modal");
        }
      });
  
      return unsub;
    }, []);
  
    useEffect(() => {
      (async () => {
        let passes = await getDocs(
          collection(db, "users", user.uid, "passes")
        ).then((snapshot) => snapshot.docs.map((doc) => doc.id));
        const passedUserIds = passes.length > 0 ? passes : ["test"];
  
        let swipes = await getDocs(
          collection(db, "users", user.uid, "swipes")
        ).then((snapshot) => snapshot.docs.map((doc) => doc.id));
  
        const swipedUserIds = swipes.length > 0 ? swipes : ["test"];
  
        const unsub = onSnapshot(
          query(
            collection(db, "users"),
            where("id", "not-in", [...swipedUserIds])
          ),
          (snapshot) => {
            setProfiles(
              snapshot.docs
                .filter((doc) => doc.id !== user.uid)
                .map((doc) => ({ id: doc.id, ...doc.data() }))
            );
          }
        );
      })();
    }, [db]);
  
    const swipeLeft = async (cardIndex) => {
      if (!profiles[cardIndex]) return;
  
      const userSwiped = profiles[cardIndex];
      console.log(`You Passed on ${userSwiped.displayName}`);
  
      setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
    };
    const swipeRight = async (cardIndex) => {
      if (!profiles[cardIndex]) return;
      const userSwiped = profiles[cardIndex];
  
      const loggedInProfile = await (
        await getDoc(doc(db, "users", user.uid))
      ).data();
  
      getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(
        (snapshot) => {
          if (snapshot.exists()) {
            console.log("Hello");
            console.log(`Hooray you matched with ${userSwiped.displayName}`);
  
            setDoc(
              doc(db, "users", user.uid, "swipes", userSwiped.id),
              userSwiped
            );
  
            setDoc(
              doc(db, "users", user.uid, "matches", userSwiped.id),
              userSwiped
            );
  
            setDoc(
              doc(db, "users", userSwiped.id, "matches", user.uid),
              loggedInProfile
            );
  
            setDoc(doc(db, "matches", generateId(user.uid, userSwiped.id)), {
              users: {
                [user.uid]: loggedInProfile,
                [userSwiped.id]: userSwiped,
              },
              usersMatched: [user.uid, userSwiped.id],
              timestamp: new Date(),
            });
            setDoc(
              doc(db, "users", user.uid, "matches", userSwiped.id),
              userSwiped
            );
            navigation.navigate("Match", {
              loggedInProfile,
              userSwiped,
            });
          } else {
            console.log(`You Swiped on ${userSwiped.displayName}`);
            setDoc(
              doc(db, "users", user.uid, "swipes", userSwiped.id),
              userSwiped
            );
          }
        }
      );
    };
  
    return (
      <SafeAreaView style={tw.style("flex-1 mt-6")}>
        <Header
        title={"Skip"}
      />
  
        <View style={tw.style("flex-1 -mt-6")}>
          <Swiper
            ref={swipeRef}
            containerStyle={{
              backgroundColor: "transparent",
            }}
            cards={profiles}
            stackSize={5}
            cardIndex={0}
            animateCardOpacity
            verticalSwipe={false}
            onSwipedLeft={(cardIndex) => {
              console.log("Swipe Pass");
              swipeLeft(cardIndex);
            }}
            onSwipedRight={(cardIndex) => {
              console.log("Swipe Match");
              swipeRight(cardIndex);
            }}
            backgroundColor="#4FD0E9"
            overlayLabels={{
              left: {
                title: "NOPE",
                style: {
                  label: {
                    textAlign: "right",
                    color: "red",
                  },
                },
              },
              right: {
                title: "MATCH",
                style: {
                  label: {
                    color: "#4DED30",
                  },
                },
              },
            }}
            renderCard={(card) => {
              return card ? (
                <View
                  key={card.id}
                  style={tw.style("bg-white h-3/4 rounded-xl relative")}
                >
                  <Image
                    style={tw.style("absolute top-0 h-full w-full rounded-xl")}
                    source={{ uri: card.photoURL }}
                  />
  
                  <View
                    style={tw.style(
                      "absolute bottom-0 bg-white w-full h-20 justify-between items-center flex-row px-6 py-2 rounded-b-xl shadow-xl"
                    )}
                  >
                    <View>
                      <Text style={tw.style("text-2xl font-bold")}>
                        {card.displayName}
                      </Text>
                      <Text style={tw.style("text-l font-medium")}>{card.job}</Text>
                    </View>
                    <View style={{alignItems:"flex-end"}}> 
  
                    <Text style={tw.style("text-xl font-bold")}>{card.age}</Text>
                    <Text style={tw.style("text-l font-medium")}>Tp. Ho Chi Minh</Text>
  
                    </View>
                  </View>
                </View>
              ) : (
                <View
                  style={tw.style(
                    "relative bg-white h-3/4 rounded-xl justify-center items-center shadow-xl"
                  )}
                >
                  <Text style={tw.style("font-bold pb-5")}>No more profiles</Text>
                  <Image
                    style={tw.style("h-20 w-20")}
                    height={100}
                    width={100}
                    source={{
                      uri: "https://cdn.shopify.com/s/files/1/1061/1924/products/Crying_Face_Emoji_large.png?v=1571606037",
                    }}
                  />
                </View>
              );
            }}
          />
        </View>
  
        <View style={tw.style("flex flex-row justify-evenly")}>
          <TouchableOpacity
            onPress={() => swipeRef.current.swipeLeft()}
            style={tw.style(
              "items-center justify-center rounded-full w-16 h-16 bg-red-200"
            )}
          >
            <Entypo name="cross" size={24} color="red" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => swipeRef.current.swipeRight()}
            style={tw.style(
              "items-center justify-center rounded-full w-16 h-16 bg-green-200"
            )}
          >
            <Entypo name="heart" size={24} color="green" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
  
  export default SkipScreen;
  