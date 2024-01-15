import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";
import { AuthProvider } from "./hooks/useAuth";
import { LogBox } from "react-native";
import { NativeBaseProvider } from "native-base";

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <AuthProvider>
          <StackNavigator />
        </AuthProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
