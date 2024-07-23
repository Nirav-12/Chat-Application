import { View } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import ChatItem from "./ChatItem";
import { useNavigation } from "@react-navigation/native";

const ChatList = ({ users, currentUserId }) => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={users}
        contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ChatItem
            item={item}
            index={index}
            navigation={navigation}
            currentUserId={currentUserId}
          />
        )}
      />
    </View>
  );
};

export default ChatList;
