import React, { FC } from "react";
import { Modal, View, Text, Button, StyleSheet } from "react-native";
import { CustomModalProps } from "../../../../types";

const CustomModal: FC<CustomModalProps> = ({
  visible,
  onClose,
  onItemSelect,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Choose an Item</Text>
          <View style={styles.itemButtons}>
            <Button
              title="Cigarettes (+1 Life)"
              onPress={() => onItemSelect("Cigarettes")}
            />
            <Button
              title="Magnifying Glass (View Enemy Item)"
              onPress={() => onItemSelect("Magnifying Glass")}
            />
            <Button
              title="Handcuffs (Block Enemy)"
              onPress={() => onItemSelect("Handcuffs")}
            />
            <Button
              title="Beer (-1 Enemy Bullet)"
              onPress={() => onItemSelect("Beer")}
            />
            <Button
              title="Knife (Double Enemy Shot)"
              onPress={() => onItemSelect("Knife")}
            />
            <Button
              title="Pills (+2 or -1 Life)"
              onPress={() => onItemSelect("Pills")}
            />
            <Button
              title="Adrenaline (Steal Item)"
              onPress={() => onItemSelect("Adrenaline")}
            />
          </View>
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
  itemButtons: {
    marginBottom: 20,
  },
});

export default CustomModal;
