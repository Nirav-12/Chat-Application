import { View, StyleSheet, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { StatusBar } from "expo-status-bar";
import HomeHeader from "../../componets/HomeHeader";
import ChatList from "../../componets/ChatList";
import { getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase";

export default function HomeScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user?.uid) getUsers();
  }, [user]);

  const getUsers = async () => {
    // fetch users
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("userId", "!=", user?.uid));
      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data() });
      });
      console.log("get all user list ,", data);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar hidden={false} />
      <HomeHeader text={user?.username[0]} navigation={navigation} />

      {users.length > 0 ? (
        <ChatList users={users} currentUserId={user?.uid} />
      ) : (
        <View style={{ justifyContent: "center", flex: 1 }}>
          <ActivityIndicator size="large" color="#A4D4FF" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
  },
});
