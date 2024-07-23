import "react-native-gesture-handler";
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./src/context/AuthContext";
import SignIn from "./src/screens/Auth/SignIn";
import SignUp from "./src/screens/Auth/SignUp";
import Loading from "./src/screens/Loading";
import HomeScreen from "./src/screens/Main/HomeScreen";
import ChatRoom from "./src/screens/Main/ChatRoom";
import ProfileScreen from "./src/screens/Main/ProfileScreen";

export default function App() {
  const { isAuthenticated } = useContext(AuthContext);

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      {isAuthenticated == null && <Loading />}
      {isAuthenticated == false && (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      )}
      {isAuthenticated == true && (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Chat" component={ChatRoom} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
