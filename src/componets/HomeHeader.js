import { View, Text, StyleSheet } from "react-native";
import React from "react";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
export default function HomeHeader({ text, navigation }) {
  const signUserOut = async () => {
    await signOut(auth);
  };
  return (
    <View>
      <View style={styles.header_container}>
        <View style={styles.header_txt_container}>
          <Text style={styles.header_txt}>Chats</Text>
        </View>

        <Menu>
          <MenuTrigger>
            <View style={styles.txt_container}>
              <Text style={styles.txt_style}>{text}</Text>
            </View>
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: styles.menu_container,
            }}
          >
            <MenuOption onSelect={() => navigation.navigate("Profile")}>
              <Text style={styles.menuText}>Profile</Text>
            </MenuOption>
            <MenuOption onSelect={signUserOut}>
              <Text style={styles.menuText}>Sign Out</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header_container: {
    backgroundColor: "#A4D4FF",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header_txt: {
    fontSize: 22,
    fontWeight: "600",
  },
  header_txt_container: { alignItems: "center", flexDirection: "row", gap: 10 },
  menuText: {
    fontSize: 20,
    alignSelf: "center",
    paddingVertical: 5,
  },
  menu_container: {
    marginTop: 40,
    marginLeft: -30,
    borderRadius: 10,
    width: 160,
  },
  txt_container: {
    backgroundColor: "black",
    height: 40,
    aspectRatio: 1,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  txt_style: { color: "white", fontSize: 20 },
});
