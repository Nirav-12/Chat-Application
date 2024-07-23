import { View, FlatList } from "react-native";
import React from "react";
import MessageItems from "./MessageItems";

const MessageList = ({ messageList, currentUser, flatListRef }) => {
  return (
    <View>
      <FlatList
        data={messageList}
        ref={flatListRef}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <MessageItems item={item} key={index} currentUser={currentUser} />
        )}
      />
    </View>
  );
};

export default MessageList;
