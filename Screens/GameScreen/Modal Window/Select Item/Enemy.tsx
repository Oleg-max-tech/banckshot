import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { EnemyProps } from "../../../../types";

const items = [
  "Cigarettes",
  "Magnifying Glass",
  "Handcuffs",
  "Beer",
  "Knife",
  "Pills",
  "Adrenaline",
];

const Enemy: React.FC<EnemyProps> = ({
  resetGame,
  handleLifeLost,
  handleEnemyLifeLost,
  isPlayerTurn,
  setIsPlayerTurn,
  enemyLives,
}) => {
  const [enemyBullets, setEnemyBullets] = useState(5);
  const [enemyBlanks, setEnemyBlanks] = useState(5);
  const [enemyItems, setEnemyItems] = useState<string[]>(items);
  const [blockPlayerTurn, setBlockPlayerTurn] = useState(false);

  const handleEnemyShoot = () => {
    if (!isPlayerTurn && !blockPlayerTurn) {
      if (enemyBullets > 0) {
        setEnemyBullets(enemyBullets - 1);
        handleLifeLost();
      } else {
        setEnemyBlanks(enemyBlanks - 1);
      }
      setIsPlayerTurn(true);
    }
  };

  const handleEnemyItemUse = () => {
    if (!isPlayerTurn && enemyItems.length > 0) {
      const randomItem =
        enemyItems[Math.floor(Math.random() * enemyItems.length)];
      setEnemyItems(enemyItems.filter((item) => item !== randomItem));

      switch (randomItem) {
        case "Cigarettes":
          if (enemyLives < 4) handleEnemyLifeLost(-1);
          break;
        case "Magnifying Glass":
          console.log("Enemy used Magnifying Glass");
          break;
        case "Handcuffs":
          setBlockPlayerTurn(true);
          setTimeout(() => setBlockPlayerTurn(false), 3000);
          break;
        case "Beer":
          if (enemyBullets > 0) setEnemyBullets(enemyBullets - 1);
          break;
        case "Knife":
          setEnemyBullets(enemyBullets + 1);
          break;
        case "Pills":
          const chance = Math.random();
          if (chance > 0.5) {
            if (enemyLives < 4) handleEnemyLifeLost(-2);
          } else {
            handleEnemyLifeLost(1);
          }
          break;
        case "Adrenaline":
          console.log("Enemy used Adrenaline");
          break;
        default:
          break;
      }

      setIsPlayerTurn(true);
    }
  };

  useEffect(() => {
    if (!isPlayerTurn) {
      const actionTimeout = setTimeout(() => {
        const useItem = Math.random() > 0.5;
        if (useItem) {
          handleEnemyItemUse();
        } else {
          handleEnemyShoot();
        }
      }, 1000);

      return () => clearTimeout(actionTimeout);
    }
  }, [isPlayerTurn]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enemy Lives:</Text>
      <View style={styles.livesContainer}>
        {Array.from({ length: 4 }, (_, index) => (
          <Text key={index} style={styles.heart}>
            {index < enemyLives ? "💔" : "🤍"}
          </Text>
        ))}
      </View>
      <Text style={styles.text}>Enemy Bullets: {enemyBullets}</Text>
      <Text style={styles.text}>Enemy Blanks: {enemyBlanks}</Text>
      {blockPlayerTurn && <Text style={styles.text}>Player Turn Blocked!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  livesContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  heart: {
    fontSize: 30,
    marginHorizontal: 5,
  },
});

export default Enemy;
