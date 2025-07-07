import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  display: flex;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const Column = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background: rgba(0, 0, 0, 0.2);
  border-right: 3px solid rgba(255, 255, 255, 0.5);
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.3);
  
  &:last-child {
    border-right: none;
  }
  
  &:first-child {
    border-left: 3px solid rgba(255, 255, 255, 0.5);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
  }
`;

const ColumnTitle = styled.div`
  position: absolute;
  top: 20px;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
  z-index: 10;
  background: rgba(0, 0, 0, 0.6);
  padding: 8px 15px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
`;

const ImageContainer = styled(motion.div)`
  width: 80%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  margin: 20px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
`;

const getLifeSpacesImage = (level) => {
  if (level > 80) return '🌳🌲🌳';
  if (level > 60) return '🌳🌲';
  if (level > 40) return '🌳';
  if (level > 20) return '🌱';
  return '🏜️';
};

const getTemperatureImage = (level) => {
  if (level > 80) return '🔥🔥🔥';
  if (level > 60) return '🔥🔥';
  if (level > 40) return '🔥';
  if (level > 20) return '🌡️';
  return '❄️';
};

const getSeaLevelImage = (level) => {
  if (level > 80) return '🌊🌊🌊';
  if (level > 60) return '🌊🌊';
  if (level > 40) return '🌊';
  if (level > 20) return '💧';
  return '🏔️';
};

const getCO2Image = (level) => {
  if (level > 80) return '☁️☁️☁️';
  if (level > 60) return '☁️☁️';
  if (level > 40) return '☁️';
  if (level > 20) return '🌫️';
  return '☀️';
};

const getColumnColor = (level) => {
  if (level > 80) return 'rgba(255, 0, 0, 0.4)';
  if (level > 60) return 'rgba(255, 165, 0, 0.4)';
  if (level > 40) return 'rgba(255, 255, 0, 0.4)';
  if (level > 20) return 'rgba(0, 255, 0, 0.4)';
  return 'rgba(0, 0, 255, 0.4)';
};

const BackgroundScene = ({ gameState }) => {
  return (
    <BackgroundContainer>
      <Column style={{ background: getColumnColor(gameState.life_spaces) }}>
        <ColumnTitle>Espaces de Vie</ColumnTitle>
        <ImageContainer
          animate={{ 
            scale: gameState.life_spaces / 100,
            opacity: gameState.life_spaces > 10 ? 1 : 0.3
          }}
          transition={{ duration: 0.5 }}
        >
          {getLifeSpacesImage(gameState.life_spaces)}
        </ImageContainer>
      </Column>
      
      <Column style={{ background: getColumnColor(gameState.temperature) }}>
        <ColumnTitle>Température</ColumnTitle>
        <ImageContainer
          animate={{ 
            scale: gameState.temperature / 100,
            opacity: gameState.temperature > 10 ? 1 : 0.3
          }}
          transition={{ duration: 0.5 }}
        >
          {getTemperatureImage(gameState.temperature)}
        </ImageContainer>
      </Column>
      
      <Column style={{ background: getColumnColor(gameState.sea_level) }}>
        <ColumnTitle>Niveau de la Mer</ColumnTitle>
        <ImageContainer
          animate={{ 
            scale: gameState.sea_level / 100,
            opacity: gameState.sea_level > 10 ? 1 : 0.3
          }}
          transition={{ duration: 0.5 }}
        >
          {getSeaLevelImage(gameState.sea_level)}
        </ImageContainer>
      </Column>
      
      <Column style={{ background: getColumnColor(gameState.co2) }}>
        <ColumnTitle>CO2/Pollution</ColumnTitle>
        <ImageContainer
          animate={{ 
            scale: gameState.co2 / 100,
            opacity: gameState.co2 > 10 ? 1 : 0.3
          }}
          transition={{ duration: 0.5 }}
        >
          {getCO2Image(gameState.co2)}
        </ImageContainer>
      </Column>
    </BackgroundContainer>
  );
};

export default BackgroundScene; 