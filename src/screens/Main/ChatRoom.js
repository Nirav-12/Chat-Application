import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import ChatRoomHeader from "../../componets/ChatRoomHeader";
import MessageList from "../../componets/MessageList";
import { Feather } from "@expo/vector-icons";
import { getRoomId } from "../../helper/helper";
import { AuthContext } from "../../context/AuthContext";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../../firebase";

const ChatRoom = ({ route }) => {
  const { params: item } = route;
  const { user } = useContext(AuthContext);
  const flatListRef = useRef(null);

  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  console.log("--->>>mesagelist ", messageList);

  useEffect(() => {
    cretaeRoomIfNotExit();
    let roomId = getRoomId(item.userId, user?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messageRef = collection(docRef, "messages");
    const q = query(messageRef, orderBy("createAt", "asc"));
    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      console.log(allMessages);
      setMessageList([...allMessages]);
    });

    return unsub;
  }, []);

  const cretaeRoomIfNotExit = async () => {
    let roomId = getRoomId(item.userId, user?.userId);
    try {
      await setDoc(doc(db, "rooms", roomId), {
        roomId,
        createdAt: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      console.log("erorr", error);
    }
  };

  const handleSendMessage = async () => {
    if (!message) return;

    try {
      let roomId = getRoomId(item.userId, user?.userId);
      const docRef = doc(db, "rooms", roomId);
      const messageRef = collection(docRef, "messages");
      const newDoc = await addDoc(messageRef, {
        userId: user?.userId,
        text: message,
        createAt: Timestamp.fromDate(new Date()),
      });

      setMessage("");
    } catch (error) {
      console.log("error --->>>", error);
    }
  };

  useEffect(() => {
    updateScroll();
  }, [messageList]);

  const updateScroll = () => {
    setTimeout(() => {
      flatListRef?.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={false} />
      <ChatRoomHeader item={item} />
      <View style={{ flex: 1 }}>
        <MessageList
          messageList={messageList}
          currentUser={user?.userId}
          flatListRef={flatListRef}
        />
      </View>
      <View style={styles.send_message_container}>
        <TextInput
          placeholder="Type message"
          style={{ flex: 1 }}
          onChangeText={setMessage}
          value={message}
        />
        <TouchableOpacity onPress={handleSendMessage}>
          <Feather name="send" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
  },
  send_message_container: {
    flexDirection: "row",
    paddingVertical: 10,
    borderWidth: 1,
    margin: 20,
    borderRadius: 30,
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
