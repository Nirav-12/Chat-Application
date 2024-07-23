import "react-native-gesture-handler";
import React from "react";
import { AuthProvider } from "./src/context/AuthContext";
import Navigation from "./index";
import { MenuProvider } from "react-native-popup-menu";

export default function App() {
  return (
    <MenuProvider>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </MenuProvider>
  );
}
