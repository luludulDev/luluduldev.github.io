import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import GameCard from './components/GameCard';
import BackgroundScene from './components/BackgroundScene';
import QuickStats from './components/QuickStats';
import gameData from './data/jeu_ecologie_cartes.json';
import './App.css';

const GameContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const CardContainer = styled.div`
  position: relative;
  width: 350px;
  height: 500px;
  margin: 20px;
`;

const GameTitle = styled.h1`
  color: white;
  font-size: 2.5rem;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  font-weight: bold;
`;

const GameOverScreen = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  z-index: 1000;
`;

const RestartButton = styled.button`
  background: linear-gradient(45deg, #4CAF50, #45a049);
  border: none;
  color: white;
  padding: 15px 30px;
  font-size: 1.2rem;
  border-radius: 25px;
  cursor: pointer;
  margin-top: 20px;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ScoreDisplay = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 20px;
  margin: 20px;
  text-align: center;
  box-shadow: 0 5px 20px rgba(0,0,0,0.2);
  
  h2 {
    color: #333;
    margin-bottom: 15px;
  }
  
  .score-item {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    font-size: 1.1rem;
    
    .label {
      font-weight: bold;
      color: #555;
    }
    
    .value {
      color: #333;
    }
  }
`;

function App() {
  const [gameState, setGameState] = useState({
    happiness: 50,
    economy: 50,
    energy: 50,
    temperature: 50,
    life_spaces: 50,
    sea_level: 50,
    co2: 50,
    currentCardIndex: 0,
    gameOver: false,
    gameOverReason: '',
    population: 100,
    lost_species: 0
  });

  const [previewStats, setPreviewStats] = useState(null);
  const [dragDirection, setDragDirection] = useState(null);

  const calculatePreview = (direction) => {
    const currentCard = gameData.cards[gameState.currentCardIndex];
    const consequences = direction === 'left' ? currentCard.yes.ressources : currentCard.no.ressources;
    const preview = {};
    
    Object.keys(consequences).forEach(key => {
      if (gameState[key] !== undefined) {
        const newValue = Math.max(0, Math.min(100, gameState[key] + consequences[key]));
        preview[key] = {
          current: gameState[key],
          new: newValue,
          change: consequences[key]
        };
      }
    });
    
    return preview;
  };

  const handleChoice = (choice) => {
    const currentCard = gameData.cards[gameState.currentCardIndex];
    const consequences = choice === 'left' ? currentCard.yes.ressources : currentCard.no.ressources;
    
    const newState = { ...gameState };
    
    // Appliquer les conséquences
    Object.keys(consequences).forEach(key => {
      if (newState[key] !== undefined) {
        newState[key] = Math.max(0, Math.min(100, newState[key] + consequences[key]));
      }
    });
    
    // Calculer l'impact sur la population et les espèces
    const criticalStats = ['happiness', 'economy', 'energy', 'temperature', 'life_spaces', 'sea_level', 'co2'];
    const lowStats = criticalStats.filter(stat => newState[stat] <= 20);
    const highStats = criticalStats.filter(stat => newState[stat] >= 80);
    
    // Impact sur la population
    if (lowStats.length > 0) {
      newState.population = Math.max(0, newState.population - lowStats.length * 5);
    } else if (highStats.length >= 4) {
      newState.population = Math.min(100, newState.population + 2);
    }
    
    // Impact sur les espèces
    if (newState.life_spaces <= 20) {
      newState.lost_species = Math.min(100, newState.lost_species + 10);
    } else if (newState.life_spaces >= 80) {
      newState.lost_species = Math.max(0, newState.lost_species - 2);
    }
    
    // Vérifier les conditions de fin de jeu
    const hasCriticalFailure = criticalStats.some(stat => newState[stat] <= 0);
    const hasPopulationExtinction = newState.population <= 0;
    const hasAllSpeciesExtinct = newState.lost_species >= 100;
    
    if (hasCriticalFailure) {
      newState.gameOver = true;
      newState.gameOverReason = 'Une ou plusieurs ressources critiques ont atteint zéro !';
    } else if (hasPopulationExtinction) {
      newState.gameOver = true;
      newState.gameOverReason = 'L\'humanité a disparu !';
    } else if (hasAllSpeciesExtinct) {
      newState.gameOver = true;
      newState.gameOverReason = 'Toutes les espèces animales ont disparu !';
    } else if (newState.currentCardIndex >= gameData.cards.length - 1) {
      newState.gameOver = true;
      newState.gameOverReason = 'Vous avez terminé toutes les décisions !';
    } else {
      newState.currentCardIndex += 1;
    }
    
    setGameState(newState);
    setPreviewStats(null);
    setDragDirection(null);
  };

  const handleDragStart = (direction) => {
    setDragDirection(direction);
    setPreviewStats(calculatePreview(direction));
  };

  const handleDragEnd = () => {
    setPreviewStats(null);
    setDragDirection(null);
  };

  const restartGame = () => {
    setGameState({
      happiness: 50,
      economy: 50,
      energy: 50,
      temperature: 50,
      life_spaces: 50,
      sea_level: 50,
      co2: 50,
      currentCardIndex: 0,
      gameOver: false,
      gameOverReason: '',
      population: 100,
      lost_species: 0
    });
    setPreviewStats(null);
    setDragDirection(null);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleChoice('left'),
    onSwipedRight: () => handleChoice('right'),
    onSwiping: (eventData) => {
      if (eventData.deltaX > 50) {
        handleDragStart('right');
      } else if (eventData.deltaX < -50) {
        handleDragStart('left');
      }
    },
    onSwiped: () => handleDragEnd(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  if (gameState.gameOver) {
    return (
      <GameContainer>
        <BackgroundScene gameState={gameState} />
        <GameOverScreen
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Fin de Partie</h2>
          <p>{gameState.gameOverReason}</p>
          <ScoreDisplay>
            <h3>Score Final</h3>
            <div className="score-item">
              <span className="label">Population humaine restante :</span>
              <span className="value">{Math.round(gameState.population)}%</span>
            </div>
            <div className="score-item">
              <span className="label">Espèces animales perdues :</span>
              <span className="value">{Math.round(gameState.lost_species)}%</span>
            </div>
          </ScoreDisplay>
          <RestartButton onClick={restartGame}>
            Recommencer
          </RestartButton>
        </GameOverScreen>
      </GameContainer>
    );
  }

  return (
    <GameContainer>
      <BackgroundScene gameState={gameState} />
      <QuickStats 
        gameState={gameState}
        previewStats={previewStats}
        dragDirection={dragDirection}
      />
      <GameTitle>ÉcoReigns</GameTitle>
      <CardContainer {...handlers}>
        <AnimatePresence mode="wait">
          <GameCard
            key={gameState.currentCardIndex}
            card={gameData.cards[gameState.currentCardIndex]}
            onChoice={handleChoice}
            gameState={gameState}
          />
        </AnimatePresence>
      </CardContainer>
    </GameContainer>
  );
}

export default App;
