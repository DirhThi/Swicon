import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ModalScreen from "./screens/ModalScreen";
import ChatScreen from "./screens/ChatScreen";
import useAuth from "./hooks/useAuth";
import MatchScreen from "./screens/MatchScreen";
import MessageScreen from "./screens/MessageScreen";
import UserScreen from "./screens/UserScreen";
import LocketHome from "./screens/Locket";
import LoveScreen from "./screens/LoveScreen";
import SkipScreen from "./screens/SkipScreen";


const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Group>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Message" component={MessageScreen} />
            <Stack.Screen name="User" component={ UserScreen}/>
            <Stack.Screen name="Locket" component={LocketHome}/>
            <Stack.Screen name="Love" component={LoveScreen}/>
            <Stack.Screen name="Skip" component={SkipScreen}/>

          </Stack.Group>
          <Stack.Group >
            <Stack.Screen name="Modal" component={ModalScreen} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
            <Stack.Screen name="Match" component={MatchScreen} />
          </Stack.Group>
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
