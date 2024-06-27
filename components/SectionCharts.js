import React from 'react';
import { Bar, Radar } from 'react-chartjs-2';
import ReactSpeedometer from 'react-d3-speedometer';
import { Chart as ChartJS, CategoryScale, LinearScale, RadialLinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';

// Registra i componenti necessari
ChartJS.register(CategoryScale, LinearScale, RadialLinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const ChartContainer = styled.div`
  width: 100%;
  background-color: #002b5c;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RadarChartContainer = styled.div`
  width: 100%;
  height: 500px;
  margin-top: 1rem;
`;

const BarChartContainer = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 1rem;
`;

const SpeedometerContainer = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const SpeedometerLabel = styled.div`
  position: absolute;
  top: 85%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #fff;
  padding: 0 10px;
`;

const SectionCharts = ({ sectionScores }) => {
  if (!sectionScores) return null;

  const labels = sectionScores.map(score => score.name);
  const scores = sectionScores.map(score => score.score);
  const weights = sectionScores.map(score => score.weight);

  const barData = {
    labels,
    datasets: [
      {
        label: 'Score',
        data: scores,
        backgroundColor: 'rgba(255, 133, 27, 0.6)',
        borderColor: '#ff851b',
        borderWidth: 1,
      },
      {
        label: 'Weight',
        data: weights,
        backgroundColor: 'rgba(0, 133, 255, 0.6)',
        borderColor: '#0085ff',
        borderWidth: 1,
      },
    ],
  };

  const radarData = {
    labels,
    datasets: [
      {
        label: 'Score',
        data: scores.map(value => Number(value) || 0),
        backgroundColor: 'rgba(255, 133, 27, 0.6)',
        borderColor: '#ff851b',
        borderWidth: 2, // Increased thickness
        pointBackgroundColor: '#ff851b',
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: '#fff',
        },
      },
    },
    scales: {
      r: {
        min: 0,
        max: 4, // Fixed range from 0 to 4
        angleLines: {
          color: '#888', // Changed to gray
        },
        grid: {
          color: '#888', // Changed to gray
        },
        pointLabels: {
          color: '#fff',
        },
        ticks: {
          backdropColor: 'rgba(0,0,0,0)',
          display: false, // Removed numbers
        },
        shape: 'circle', // Make radar chart circular
      },
      x: {
        ticks: {
          color: '#fff',
        },
        grid: {
          color: '#888', // Changed to gray
        },
      },
      y: {
        ticks: {
          color: '#fff',
        },
        grid: {
          color: '#888', // Changed to gray
        },
      },
    },
  };

  const averageScore = scores.reduce((acc, score) => acc + (Number(score) || 0), 0) / scores.length;
  const gaugeValue = averageScore * 25; // Assuming max score is 4 and scale is 0-100

  return (
    <ChartWrapper>
      <ChartContainer>
        <BarChartContainer>
          <Bar data={barData} options={options} />
        </BarChartContainer>
      </ChartContainer>
      <ChartContainer>
        <RadarChartContainer>
          <Radar data={radarData} options={options} />
        </RadarChartContainer>
      </ChartContainer>
      <ChartContainer>
        <SpeedometerContainer>
          <ReactSpeedometer
            value={gaugeValue}
            minValue={0}
            maxValue={100}
            segments={4}
            needleColor="#ff851b"
            startColor="#ff0000"
            endColor="#00ff00"
            textColor="#fff"
          />
          <SpeedometerLabel>
            <div>Rischio Alto</div>
            <div>Rischio Basso</div>
          </SpeedometerLabel>
        </SpeedometerContainer>
      </ChartContainer>
    </ChartWrapper>
  );
};

export default SectionCharts;
