// EditNameModal.js
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const EditNameModal = ({
  modalVisible,
  setModalVisible,
  onSave,
  onCancel,
  initialValue,
  title,
}) => {
  const [updatedValue, setUpdatedValue] = useState(initialValue);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Enter your {title}</Text>
          <TextInput
            style={styles.input}
            value={updatedValue}
            onChangeText={setUpdatedValue}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => onSave(updatedValue, title)}>
              <Text>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onCancel}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: "#A4D4FF",
    borderBottomWidth: 1,
    marginBottom: 15,
    width: "100%",
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    gap: 20,
  },
});

export default EditNameModal;
