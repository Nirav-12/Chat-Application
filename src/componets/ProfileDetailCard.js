import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import EditNameModal from "./EditNameModal";
import { AuthContext } from "../context/AuthContext";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

const ProfileDetailCard = ({
  title,
  icon,
  bottomLine = true,
  isEdit = true,
  text,
}) => {
  const { user, setUser } = useContext(AuthContext);

  const [modalVisible, setModalVisible] = useState(false);

  const handleSave = async (value, title) => {
    const docRef = doc(db, "users", user.uid);

    if (value) {
      if (title == "Name") {
        try {
          await updateDoc(docRef, {
            username: value,
          });
          setUser({
            ...user,
            username: value,
          });
        } catch (error) {
          console.log("error change name", error);
        }
      } else {
        try {
          await updateDoc(docRef, {
            about: value,
          });
          setUser({
            ...user,
            about: value,
          });
        } catch (error) {
          console.log("error change name", error);
        }
      }
    }

    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 30,
          alignItems: "center",
          gap: 25,
          borderBottomWidth: bottomLine ? 0.5 : 0,
          borderColor: "gray",
          paddingVertical: 15,
        }}
      >
        <Feather name={icon} size={24} color="black" />
        <View style={{ flex: 1 }}>
          <Text style={{ color: "gray" }}>{title}</Text>
          <Text style={{ fontSize: 20 }}>{text}</Text>
        </View>
        {isEdit && (
          <TouchableOpacity
            style={{
              alignItems: "flex-end",
            }}
            onPress={() => setModalVisible(true)}
          >
            <MaterialIcons name="edit" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
      {isEdit && (
        <EditNameModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          onSave={handleSave}
          onCancel={handleCancel}
          initialValue={text}
          title={title}
        />
      )}
    </View>
  );
};

export default ProfileDetailCard;
