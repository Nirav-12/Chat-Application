import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { getRoomId, monthName } from "../helper/helper";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";

const ChatItem = ({ item, navigation, currentUserId }) => {
  const [lastMessage, setLastMessage] = useState(undefined);
  useEffect(() => {
    let roomId = getRoomId(item.userId, currentUserId);
    const docRef = doc(db, "rooms", roomId);
    const messageRef = collection(docRef, "messages");
    const q = query(messageRef, orderBy("createAt", "desc"));
    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      console.log(allMessages);
      setLastMessage(allMessages[0] ? allMessages[0] : null);
    });

    return unsub;
  }, []);

  const renderLastMessage = () => {
    if (typeof lastMessage == "undefined") return "loading";

    if (lastMessage) {
      if (currentUserId == lastMessage?.userId)
        return "You :" + lastMessage?.text;
      return lastMessage?.text;
    } else {
      return "Say Hi 🖐";
    }
  };

  const renderTime = () => {
    if (lastMessage) {
      let date = lastMessage?.createAt;

      let d = new Date(date?.seconds);
      let dateString = d.getDate() + " " + monthName[d.getMonth()];
      return dateString;
    } else {
      return "";
    }
  };
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        marginHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: "lightgray",
        alignItems: "center",
        gap: 10,
      }}
      onPress={() => navigation.navigate("Chat", item)}
    >
      <View
        style={{
          backgroundColor: "black",
          height: 50,
          aspectRatio: 1,
          borderRadius: 100,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>
          {item?.username[0]}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text>{item?.username}</Text>
          <Text>{renderLastMessage()}</Text>
        </View>
        <Text>{renderTime()}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
