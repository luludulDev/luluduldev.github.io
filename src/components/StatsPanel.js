import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StatsContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.2);
  min-width: 250px;
  backdrop-filter: blur(10px);
`;

const StatItem = styled.div`
  margin-bottom: 15px;
  position: relative;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const StatLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 0.9rem;
  color: #333;
`;

const StatName = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StatIcon = styled.span`
  font-size: 1.2rem;
`;

const StatValue = styled.span`
  font-size: 0.8rem;
  color: #666;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  border-radius: 4px;
  position: relative;
  
  &.happiness {
    background: linear-gradient(90deg, #ff6b9d, #ff8e8e);
  }
  
  &.economy {
    background: linear-gradient(90deg, #ffd93d, #ff6b6b);
  }
  
  &.energy {
    background: linear-gradient(90deg, #feca57, #ff9ff3);
  }
  
  &.temperature {
    background: linear-gradient(90deg, #ff6348, #ff4757);
  }
  
  &.life_spaces {
    background: linear-gradient(90deg, #1dd1a1, #10ac84);
  }
  
  &.sea_level {
    background: linear-gradient(90deg, #48dbfb, #0abde3);
  }
  
  &.co2 {
    background: linear-gradient(90deg, #2f3542, #747d8c);
  }
`;



const getStatIcon = (statName) => {
  const icons = {
    happiness: '😊',
    economy: '💰',
    energy: '⚡',
    temperature: '🌡️',
    life_spaces: '🌳',
    sea_level: '🌊',
    co2: '☁️'
  };
  return icons[statName] || '📊';
};

const getStatLabel = (statName) => {
  const labels = {
    happiness: 'Bonheur',
    economy: 'Argent',
    energy: 'Énergie',
    temperature: 'Température',
    life_spaces: 'Espaces de vie',
    sea_level: 'Niveau de la mer',
    co2: 'CO2/Pollution'
  };
  return labels[statName] || statName;
};



const StatsPanel = ({ gameState, previewStats, dragDirection }) => {
  const stats = [
    'happiness',
    'economy', 
    'energy',
    'temperature',
    'life_spaces',
    'sea_level',
    'co2'
  ];

  const getPreviewValue = (stat) => {
    if (!previewStats || !previewStats[stat]) return null;
    return previewStats[stat];
  };

  return (
    <StatsContainer>
      <h3 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '1.1rem' }}>
        État du Monde
        {previewStats && (
          <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '5px' }}>
            Preview: {dragDirection === 'left' ? 'Gauche' : 'Droite'}
          </div>
        )}
      </h3>
      
      {stats.map(stat => {
        const preview = getPreviewValue(stat);
        const currentValue = gameState[stat];
        const newValue = preview ? preview.new : currentValue;
        
        return (
          <StatItem key={stat}>
            <StatLabel>
              <StatName>
                <StatIcon>{getStatIcon(stat)}</StatIcon>
                {getStatLabel(stat)}
              </StatName>
              <StatValue>
                {Math.round(currentValue)}%
              </StatValue>
            </StatLabel>
            
            <ProgressBar>
              <ProgressFill
                className={stat}
                initial={{ width: 0 }}
                animate={{ width: `${newValue}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </ProgressBar>
          </StatItem>
        );
      })}
    </StatsContainer>
  );
};

export default StatsPanel; 