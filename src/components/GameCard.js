import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Card = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  cursor: grab;
  overflow: hidden;
  
  &:active {
    cursor: grabbing;
  }
`;

const CardHeader = styled.div`
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  padding: 20px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
`;

const CardContent = styled.div`
  flex: 1;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
`;

const ChoiceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const ChoiceButton = styled.button`
  flex: 1;
  padding: 15px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &.left {
    background: linear-gradient(45deg, #ff6b6b, #ee5a52);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
    }
    &.selected {
      transform: translateY(-5px) scale(1.05);
      box-shadow: 0 8px 20px rgba(255, 107, 107, 0.5);
    }
  }
  
  &.right {
    background: linear-gradient(45deg, #4ecdc4, #44a08d);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(78, 205, 196, 0.4);
    }
    &.selected {
      transform: translateY(-5px) scale(1.05);
      box-shadow: 0 8px 20px rgba(78, 205, 196, 0.5);
    }
  }
`;

const SwipeIndicator = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2.5rem;
  font-weight: bold;
  opacity: 0.9;
  pointer-events: none;
  z-index: 10;
  padding: 10px 15px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);

  &.left {
    left: 10px;
    color: #ff6b6b;
  }
  
  &.right {
    right: 10px;
    color: #4ecdc4;
  }
`;

const ActorName = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 5px;
  font-weight: normal;
`;


const getActorName = (actorIndex) => {
	const actors = [
		"Ministre de l'Industrie",
		"Ministre de l'Environnement",
		"Porte parole du Peuple"
	];
	return actors[actorIndex] || "Acteur inconnu";
};

const GameCard = ({ card, onChoice, gameState, previewStats, dragDirection }) => {
	const economicStats = ['happiness', 'economy', 'energy'];

	return (
		<Card
			initial={{ scale: 0.8, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			exit={{ scale: 0.8, opacity: 0 }}
			transition={{ duration: 0.3 }}
			whileHover={{ scale: 1.02 }}
		>
			<CardHeader>
				{card.title || 'Décision'}
				{card.actor !== undefined && <ActorName>{getActorName(card.actor)}</ActorName>}
			</CardHeader>


			<CardContent>
				<CardText>{card.description}</CardText>

				<ChoiceContainer>
					<ChoiceButton
						className={`left ${dragDirection === 'left' ? 'selected' : ''}`}
						onClick={() => onChoice('left')}
					>
						{card.choices.left.text}
					</ChoiceButton>

					<ChoiceButton
						className={`right ${dragDirection === 'right' ? 'selected' : ''}`}
						onClick={() => onChoice('right')}
					>
						{card.choices.right.text}
					</ChoiceButton>
				</ChoiceContainer>
			</CardContent>

			{dragDirection && (
				<SwipeIndicator className={dragDirection}>
					{dragDirection === 'left' ? '←' : '→'}
				</SwipeIndicator>
			)}
		</Card>
	);
};

export default GameCard; 