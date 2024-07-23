import { View, Text } from "react-native";
import React from "react";

const MessageItems = ({ item, currentUser }) => {
  console.log(item);

  return (
    <View>
      <View
        style={{
          marginHorizontal: 20,
          alignItems: currentUser == item.userId ? "flex-end" : "flex-start",
        }}
      >
        <Text
          style={{
            backgroundColor: currentUser == item.userId ? "white" : "#dbeeff",
            paddingVertical: 8,
            margin: 5,
            paddingHorizontal: 10,
            borderRadius: 5,
            fontSize: 18,
          }}
        >
          {item.text}
        </Text>
      </View>
    </View>
  );
};

export default MessageItems;
