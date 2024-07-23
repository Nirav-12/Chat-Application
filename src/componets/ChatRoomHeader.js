import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const ChatRoomHeader = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.header_container}>
        <View style={styles.header_txt_container}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginRight: 10 }}
          >
            <Ionicons name="chevron-back-outline" size={30} color="black" />
          </TouchableOpacity>
          <View style={styles.txt_container}>
            <Text style={styles.txt_style}>{item?.username[0]}</Text>
          </View>
          <Text style={{ fontSize: 20 }}>{item?.username}</Text>
        </View>
      </View>
    </View>
  );
};

export default ChatRoomHeader;

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

  header_txt_container: { alignItems: "center", flexDirection: "row", gap: 10 },

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
