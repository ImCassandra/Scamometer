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
  height: 230px; /* Incrementa leggermente l'altezza del contenitore */
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden; /* Aggiungi overflow nascosto per evitare tagli laterali */
`;

const SpeedometerLabel = styled.div`
  position: absolute;
  top: 94%; /* Posiziona le etichette più vicine al grafico */
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #fff;
  padding: 0 10px;
  transform: translateY(-50%);
`;

const SectionCharts = ({ sectionScores }) => {
  if (!sectionScores) return null;

  const labels = sectionScores.map(score => score.name);
  const scores = sectionScores.map(score => score.score);
  const weightedScores = sectionScores.map(score => score.score + score.weight);

  const barData = {
    labels,
    datasets: [
      {
        label: 'Punteggio Semplice',
        data: scores,
        backgroundColor: 'rgba(255, 133, 27, 0.6)',
        borderColor: '#ff851b',
        borderWidth: 1,
      },
      {
        label: 'Punteggio Ponderato',
        data: weightedScores,
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
        label: 'Punteggio Semplice',
        data: scores,
        backgroundColor: 'rgba(255, 133, 27, 0.6)',
        borderColor: '#ff851b',
        borderWidth: 2,
        pointBackgroundColor: '#ff851b',
      },
      {
        label: 'Punteggio Ponderato',
        data: weightedScores,
        backgroundColor: 'rgba(0, 133, 255, 0.6)',
        borderColor: '#0085ff',
        borderWidth: 2,
        pointBackgroundColor: '#0085ff',
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
        max: 5, // Fixed range from 0 to 5
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
          display: false,
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

  const averageWeightedScore = weightedScores.reduce((acc, score) => acc + score, 0) / weightedScores.length;
  const gaugeValue = (averageWeightedScore / 5) * 100; // Adjusted for a max score of 5

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
            needleColor="#fff"
            needleTransition="easeQuadIn"
            needleHeightRatio={0.7}
            ringWidth={40}
            textColor="#fff"
            startColor="#ff0000"
            endColor="#00ff00"
            height={160}  // Incrementa leggermente l'altezza del tachimetro
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
