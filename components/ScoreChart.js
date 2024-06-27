import React from 'react';
import { Bar, Radar } from 'react-chartjs-2';
import ReactSpeedometer from 'react-d3-speedometer';
import { Chart as ChartJS, CategoryScale, LinearScale, RadialLinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';

// Registra i componenti necessari
ChartJS.register(CategoryScale, LinearScale, RadialLinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const ChartContainer = styled.div`
  width: 33%;
  background-color: #002b5c;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
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

const ChartsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ScoreChart = ({ scores }) => {
  const data = {
    labels: Object.keys(scores),
    datasets: [
      {
        label: 'Score',
        data: Object.values(scores),
        backgroundColor: 'rgba(255, 133, 27, 0.6)',
        borderColor: '#ff851b',
        borderWidth: 1,
      },
    ],
  };

  const radarData = {
    labels: Object.keys(scores),
    datasets: [
      {
        label: 'Score',
        data: Object.values(scores),
        backgroundColor: 'rgba(255, 133, 27, 0.6)',
        borderColor: '#ff851b',
        borderWidth: 2,
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
        angleLines: {
          color: '#888',
        },
        grid: {
          color: '#888',
        },
        pointLabels: {
          color: '#fff',
        },
        ticks: {
          backdropColor: 'rgba(0,0,0,0)',
          display: false, // Removed numbers
        },
        shape: 'circle',
      },
      x: {
        ticks: {
          color: '#fff',
        },
        grid: {
          color: '#888',
        },
      },
      y: {
        ticks: {
          color: '#fff',
        },
        grid: {
          color: '#888',
        },
      },
    },
  };

  const totalScore = Object.values(scores).reduce((acc, score) => acc + score, 0);
  const maxPossibleScore = Object.keys(scores).length * 4; // Assuming max score per section is 4
  const gaugeValue = (totalScore / maxPossibleScore) * 100;

  return (
    <ChartsWrapper>
      <ChartContainer>
        <BarChartContainer>
          <Bar data={data} options={options} />
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
    </ChartsWrapper>
  );
};

export default ScoreChart;
