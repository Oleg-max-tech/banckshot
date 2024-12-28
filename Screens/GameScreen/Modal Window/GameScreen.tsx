import React, { useState } from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import { GameScreenProps } from "../../../types";
import AmmoModal from "./AmmoModal";
import CustomModal from "./Select Item/Modal";
import Enemy from "./Select Item/Enemy";

const GameScreen: React.FC<GameScreenProps> = ({
  bullets,
  blanks,
  resetGame,
  setBullets,
  setBlanks,
}) => {
  const [ammoModalVisible, setAmmoModalVisible] = useState(false);
  const [customModalVisible, setCustomModalVisible] = useState(false);
  const [firedAmmo, setFiredAmmo] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [lives, setLives] = useState(4);
  const [enemyLives, setEnemyLives] = useState(4);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  const handleItemSelect = (item: string) => {
    setSelectedItem(item);
    setCustomModalVisible(false);

    handleEnemyItemUse(item);
  };

  const handleEnemyItemUse = (item: string) => {
    switch (item) {
      case "Cigarettes":
        // Логіка для цигарок (+1 життя)
        setLives((prevLives) => prevLives + 1);
        break;
      case "Magnifying Glass":
        // Логіка для лупи (перегляд предметів ворога)
        alert("You can view the enemy's item.");
        break;
      case "Handcuffs":
        // Логіка для наручників (блокування ворога)
        alert("You block the enemy!");
        break;
      case "Beer":
        // Логіка для пива (-1 патрон ворога)
        setEnemyLives((prevLives) => prevLives - 1);
        break;
      case "Knife":
        // Логіка для ножа (подвоїти шкоду від ворога)
        alert("You can double the enemy's damage!");
        break;
      case "Pills":
        // Логіка для пігулок (+2 або -1 життя)
        const pillEffect = Math.random() > 0.5 ? 2 : -1;
        setLives((prevLives) => prevLives + pillEffect);
        break;
      case "Adrenaline":
        // Логіка для адреналіну (вкрасти предмет)
        alert("You steal an item from the enemy!");
        break;
      default:
        break;
    }
  };

  const handleAddAmmo = (ammoType: string) => {
    if (ammoType.trim()) {
      setFiredAmmo((prev) => [...prev, ammoType]);
    }
    setAmmoModalVisible(false);
  };

  const handleShootBullet = () => {
    if (isPlayerTurn) {
      if (bullets > 0) {
        setBullets(bullets - 1);
        setFiredAmmo((prev) => [...prev, "Bullet"]);
        handleEnemyLifeLost();
      } else {
        handleLifeLost();
      }
      setIsPlayerTurn(false);
    }
  };

  const handleShootBlank = () => {
    if (isPlayerTurn) {
      if (blanks > 0) {
        setBlanks(blanks - 1);
        setFiredAmmo((prev) => [...prev, "Blank"]);
      } else {
        handleLifeLost();
      }
      setIsPlayerTurn(false);
    }
  };

  const handleLifeLost = () => {
    if (lives > 1) {
      setLives(lives - 1);
    } else {
      alert("Game Over! You ran out of lives.");
      resetGame();
    }
  };

  const handleEnemyLifeLost = () => {
    if (enemyLives > 1) {
      setEnemyLives(enemyLives - 1);
    } else {
      alert("You win! Enemy has no more lives.");
      resetGame();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bullets: {bullets}</Text>
      <Text style={styles.text}>Blanks: {blanks}</Text>

      {/* Відображення життів */}
      <View style={styles.livesContainer}>
        {Array.from({ length: 4 }, (_, index) => (
          <Text key={index} style={styles.heart}>
            {index < lives ? "❤️" : "🤍"}
          </Text>
        ))}
      </View>

      {/* Модальні вікна */}
      <AmmoModal
        visible={ammoModalVisible}
        onClose={() => setAmmoModalVisible(false)}
        onSave={handleAddAmmo}
      />
      <CustomModal
        visible={customModalVisible}
        onClose={() => setCustomModalVisible(false)}
        onItemSelect={handleItemSelect}
      />

      {/* Список вистрілених патронів */}
      <FlatList
        data={firedAmmo}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Text style={styles.ammoItem}>
            {index + 1}. {item}
          </Text>
        )}
        style={styles.flatListContainer}
      />

      <View style={styles.shootButtonsContainer}>
        <Button title="Shoot Bullet" onPress={handleShootBullet} />
        <Button title="Shoot Blank" onPress={handleShootBlank} />
      </View>

      <View style={styles.additionalButtonsContainer}>
        <Button title="Add Ammo" onPress={() => setAmmoModalVisible(true)} />
        <Button
          title="Select Item"
          onPress={() => setCustomModalVisible(true)}
        />
        <Button title="Reset Game" onPress={resetGame} />
      </View>

      <Enemy
        resetGame={resetGame}
        handleLifeLost={handleLifeLost}
        handleEnemyLifeLost={handleEnemyLifeLost}
        isPlayerTurn={isPlayerTurn}
        setIsPlayerTurn={setIsPlayerTurn}
        enemyLives={enemyLives}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    top: 40,
  },
  livesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  heart: {
    fontSize: 30,
    marginHorizontal: 5,
    top: 40,
  },
  shootButtonsContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-evenly",
    width: "100%",
    paddingHorizontal: 20,
  },
  ammoItem: {
    fontSize: 16,
    paddingVertical: 5,
    color: "#333",
  },
  additionalButtonsContainer: {
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  flatListContainer: {
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 20,
  },
});

export default GameScreen;
