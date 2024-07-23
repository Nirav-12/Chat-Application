import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import ProfileHeader from "../../componets/ProfileHeader";
import { AuthContext } from "../../context/AuthContext";
import ProfileDetailCard from "../../componets/ProfileDetailCard";
import EditNameModal from "../../componets/EditNameModal";

const ProfileScreen = () => {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <StatusBar hidden={false} />
      <ProfileHeader />
      <View
        style={{
          backgroundColor: "black",
          height: 100,
          aspectRatio: 1,
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center",
          borderRadius: 99,
          marginTop: 70,
          marginBottom: 30,
        }}
      >
        <Text style={{ color: "white", fontSize: 45 }}>
          {user?.username[0]}
        </Text>
      </View>
      <ProfileDetailCard title="Name" icon="user" text={user?.username} />
      <ProfileDetailCard
        title="About"
        icon="info"
        text={user?.about ?? "Hey there! I am using Chats."}
      />
      <ProfileDetailCard
        title="Email Id"
        icon="mail"
        bottomLine={false}
        isEdit={false}
        text={user?.email}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
  },
});
