import React, { FC, useState } from "react";
import { Modal, View, Text, Button, StyleSheet, TextInput } from "react-native";

interface AmmoModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (ammoType: string) => void;
}

const AmmoModal: FC<AmmoModalProps> = ({ visible, onClose, onSave }) => {
  const [ammoType, setAmmoType] = useState("");

  const handleSave = () => {
    if (ammoType.trim()) {
      onSave(ammoType);
      setAmmoType("");
      onClose();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Enter Ammo Type</Text>
          <TextInput
            style={styles.input}
            placeholder="Ammo type..."
            value={ammoType}
            onChangeText={setAmmoType}
          />
          <Button title="Save" onPress={handleSave} />
          <Button title="Cancel" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default AmmoModal;
