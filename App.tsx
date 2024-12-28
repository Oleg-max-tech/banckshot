import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import SetupScreen from "./Screens/SetupScreen";
import GameScreen from "./Screens/GameScreen/Modal Window/GameScreen";

export default function App() {
  const [bullets, setBullets] = useState(0); // Кількість бойових патронів
  const [blanks, setBlanks] = useState(0); // Кількість холостих патронів
  const [currentScreen, setCurrentScreen] = useState<"setup" | "game">("setup"); // Поточний екран

  // Функція для старту гри
  const startGame = () => {
    const randomBullets = Math.floor(Math.random() * 9); // Випадкова кількість бойових патронів від 0 до 8
    const randomBlanks = 8 - randomBullets; // Залишкові патрони будуть холостими
    setBullets(randomBullets);
    setBlanks(randomBlanks);
    setCurrentScreen("game");
  };

  // Функція для скидання гри
  const resetGame = () => {
    setBullets(0);
    setBlanks(0);
    setCurrentScreen("setup");
  };

  return (
    <View style={styles.container}>
      {currentScreen === "setup" ? (
        <SetupScreen bullets={bullets} blanks={blanks} startGame={startGame} />
      ) : (
        <GameScreen
          bullets={bullets}
          blanks={blanks}
          resetGame={resetGame}
          setBullets={setBullets}
          setBlanks={setBlanks}
        />
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});
