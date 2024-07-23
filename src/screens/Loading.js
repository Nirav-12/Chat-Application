import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export default function () {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
    alignItems: "center",
    padding: 20,
    justifyContent: "center",
  },
});
