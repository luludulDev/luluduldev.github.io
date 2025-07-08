import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const QuickStatsContainer = styled.div`
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
  z-index: 100;
  width: 100%;
  justify-content: center;
  padding: 0 20px;
`;

const StatItem = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  min-width: 80px;
  justify-content: center;
`;

const StatIcon = styled.span`
  font-size: 1.5rem;
`;

const StatInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatLabel = styled.span`
  font-size: 0.7rem;
  color: #666;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatValue = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
`;

const getStatIcon = (statName) => {
	const icons = {
		happiness: '😊',
		economy: '💰',
		energy: '⚡'
	};
	return icons[statName] || '📊';
};

const getStatLabel = (statName) => {
	const labels = {
		happiness: 'Bonheur',
		economy: 'Argent',
		energy: 'Énergie'
	};
	return labels[statName] || statName;
};

const getStatColor = (value) => {
	if (value > 80) return '#4CAF50';
	if (value > 60) return '#FF9800';
	if (value > 40) return '#FFC107';
	if (value > 20) return '#FF5722';
	return '#F44336';
};

const QuickStats = ({ gameState, previewStats, dragDirection }) => {
	const stats = ['happiness', 'economy', 'energy'];

	const getPreviewValue = (stat) => {
		if (!previewStats || !previewStats[stat]) return null;
		return previewStats[stat];
	};

	return (
		<QuickStatsContainer>
			{stats.map(stat => {
				const preview = getPreviewValue(stat);
				const currentValue = gameState[stat];
				const newValue = preview ? preview.new : currentValue;
				const change = preview ? preview.change : 0;

				return (
					<motion.div
						key={stat}
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{
							scale: preview ? 1.05 : 1,
							opacity: 1
						}}
						transition={{ duration: 0.3 }}
						whileHover={{ scale: 1.05 }}
					>
						<StatItem>
							<StatIcon>{getStatIcon(stat)}</StatIcon>
							<StatInfo>
								<StatLabel>{getStatLabel(stat)}</StatLabel>
								<StatValue
									style={{
										color: getStatColor(newValue),
										textShadow: preview ? '0 0 5px rgba(0,0,0,0.3)' : 'none'
									}}
								>
									{Math.round(newValue)}%
								</StatValue>
								{preview && (
									<motion.div
										initial={{ opacity: 0, y: -5 }}
										animate={{ opacity: 1, y: 0 }}
										style={{
											fontSize: '1rem',
											fontWeight: '900',
											color: change > 0 ? '#2e7d32' : '#c62828',
											textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
										}}
									>
										{change > 0 ? '+' : ''}{change}
									</motion.div>
								)}
							</StatInfo>
						</StatItem>
					</motion.div>
				);
			})}
		</QuickStatsContainer>
	);
};

export default QuickStats; 