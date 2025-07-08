import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ArrowContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ArrowIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  svg {
    width: 320px;
    height: 128px;
    transform: ${props => props.direction === 'up' ? 'rotate(-90deg)' : 'rotate(90deg)'};
    filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.9));
  }
  polygon {
    fill: ${props => {
		const goodColor = '#4CAF50';
		const badColor = '#FF5722';
		if (props.isPositiveGood) {
			// For stats where an increase is good (e.g., life_spaces)
			return props.direction === 'up' ? goodColor : badColor;
		}
		// For stats where a decrease is good (e.g., temperature)
		return props.direction === 'down' ? goodColor : badColor;
	}};
  }
`;

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
  user-select: none;
`;

const Column = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border-right: 3px solid rgba(255, 255, 255, 0.5);
  user-select: none;

  &:last-child {
    border-right: none;
  }

  &:first-child {
    border-left: 3px solid rgba(255, 255, 255, 0.5);
  }
`;

const ColumnTitle = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
  z-index: 20;
  background: rgba(0, 0, 0, 0.6);
  padding: 8px 15px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
`;

const ImageContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 1;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const getLifeSpacesImage = (level) => {
	if (level >= 75) return require('../ressources/lifespace/lifespace1.png');
	if (level >= 50) return require('../ressources/lifespace/lifespace2.png');
	if (level >= 25) return require('../ressources/lifespace/lifespace3.png');
	return require('../ressources/lifespace/lifespace4.png');
};

const getTemperatureImage = (level) => {
	if (level >= 75) return require('../ressources/temperature/temperature4.png');
	if (level >= 50) return require('../ressources/temperature/temperature3.png');
	if (level >= 25) return require('../ressources/temperature/temperature2.png');
	return require('../ressources/temperature/temperature1.png');
};

const getSeaLevelImage = (level) => {
	if (level >= 75) return require('../ressources/sealevel/sealevel4.png');
	if (level >= 50) return require('../ressources/sealevel/sealevel3.png');
	if (level >= 25) return require('../ressources/sealevel/sealevel2.png');
	return require('../ressources/sealevel/sealevel1.png');
};

const getCO2Image = (level) => {
	if (level >= 75) return require('../ressources/pollution/pollution4.png');
	if (level >= 50) return require('../ressources/pollution/pollution3.png');
	if (level >= 25) return require('../ressources/pollution/pollution2.png');
	return require('../ressources/pollution/pollution1.png');
};

const getArrowSize = (change) => {
	const absChange = Math.abs(change);
	if (absChange >= 15) return 'large';
	if (absChange >= 8) return 'large';
	return 'large';
};

const getArrowDirection = (change) => {
	if (change > 0) return 'up';
	if (change < 0) return 'down';
	return null;
};

const getArrowSymbol = (direction) => {
	if (direction === 'up' || direction === 'down') {
		return (
			<svg width="100" height="40" viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg">
				<polygon points="0,10 70,10 70,0 100,20 70,40 70,30 0,30" fill="#333"></polygon>
			</svg>
		);
	}
	return null;
};

const BackgroundScene = ({ gameState, previewStats }) => {
	const getPreviewValue = (stat) => {
		if (!previewStats || !previewStats[stat]) return null;
		return previewStats[stat];
	};

	return (
		<BackgroundContainer>
			<Column>
				<ColumnTitle>Espaces de Vie</ColumnTitle>
				<ImageContainer
					animate={{
						opacity: 1
					}}
					transition={{ duration: 0.5 }}
				>
					<img src={getLifeSpacesImage(gameState.life_spaces)} alt="Espaces de vie" />
					{(() => {
						const preview = getPreviewValue('life_spaces'); // ou temperature, sea_level, co2 selon la colonne
						if (preview) {
							const arrowDirection = getArrowDirection(preview.change);
							if (!arrowDirection) return null;
							// up = rouge, down = vert, orientation adaptée
							return (
								<ArrowContainer>
									<ArrowIndicator direction={arrowDirection} isPositiveGood={true}>
										{getArrowSymbol(arrowDirection)}
									</ArrowIndicator>
								</ArrowContainer>
							);
						}
						return null;
					})()}
				</ImageContainer>
			</Column>

			<Column>
				<ColumnTitle>Température</ColumnTitle>
				<ImageContainer
					animate={{
						opacity: 1
					}}
					transition={{ duration: 0.5 }}
				>
					<img src={getTemperatureImage(gameState.temperature)} alt="Température" />
					{(() => {
						const preview = getPreviewValue('temperature');
						if (preview) {
							const arrowDirection = getArrowDirection(preview.change);
							if (!arrowDirection) return null;
							return (
								<ArrowContainer>
									<ArrowIndicator direction={arrowDirection} isPositiveGood={true}>
										{getArrowSymbol(arrowDirection)}
									</ArrowIndicator>
								</ArrowContainer>
							);
						}
						return null;
					})()}
				</ImageContainer>
			</Column>

			<Column>
				<ColumnTitle>Niveau de la Mer</ColumnTitle>
				<ImageContainer
					animate={{
						opacity: 1
					}}
					transition={{ duration: 0.5 }}
				>
					<img src={getSeaLevelImage(gameState.sea_level)} alt="Niveau de la mer" />
					{(() => {
						const preview = getPreviewValue('sea_level');
						if (preview) {
							const arrowDirection = getArrowDirection(preview.change);
							if (!arrowDirection) return null;
							return (
								<ArrowContainer>
									<ArrowIndicator direction={arrowDirection}>
										{getArrowSymbol(arrowDirection)}
									</ArrowIndicator>
								</ArrowContainer>
							);
						}
						return null;
					})()}
				</ImageContainer>
			</Column>

			<Column>
				<ColumnTitle>CO2/Pollution</ColumnTitle>
				<ImageContainer
					animate={{
						opacity: 1
					}}
					transition={{ duration: 0.5 }}
				>
					<img src={getCO2Image(gameState.co2)} alt="CO2/Pollution" />
					{(() => {
						const preview = getPreviewValue('co2');
						if (preview) {
							const arrowDirection = getArrowDirection(preview.change);
							if (!arrowDirection) return null;
							return (
								<ArrowContainer>
									<ArrowIndicator direction={arrowDirection}>
										{getArrowSymbol(arrowDirection)}
									</ArrowIndicator>
								</ArrowContainer>
							);
						}
						return null;
					})()}
				</ImageContainer>
			</Column>
		</BackgroundContainer>
	);
};

export default BackgroundScene; 