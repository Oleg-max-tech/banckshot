import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { SetupScreenProps } from "../types";

const SetupScreen: React.FC<SetupScreenProps> = ({
  bullets,
  blanks,
  startGame,
}) => {
  return (
    <View style={styles.container}>
      <Text>Bullets: {bullets}</Text>
      <Text>Blanks: {blanks}</Text>
      <Button title="Start Game" onPress={startGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});

export default SetupScreen;
