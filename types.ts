export type SetupScreenProps = {
  bullets: number;
  blanks: number;
  startGame: () => void;
};

export type CustomModalProps = {
  visible: boolean;
  onClose: () => void;
  onItemSelect: (item: string) => void;
};

export type GameScreenProps = {
  bullets: number;
  blanks: number;
  resetGame: () => void;
  setBullets: (bullets: number) => void;
  setBlanks: (blanks: number) => void;
};

export type EnemyProps = {
  resetGame: () => void;
  handleLifeLost: () => void;
  handleEnemyLifeLost: (change: number) => void;
  isPlayerTurn: boolean;
  setIsPlayerTurn: (isPlayerTurn: boolean) => void;
  enemyLives: number;
};
