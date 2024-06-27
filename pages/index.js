import React, { useState } from 'react';
import styled from 'styled-components';
import InputSection from '../components/InputSection';
import ScoreChart from '../components/ScoreChart';
import SectionCharts from '../components/SectionCharts';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, RadialLinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Registra i componenti necessari
ChartJS.register(CategoryScale, LinearScale, RadialLinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const sections = [
  {
    name: 'Business Model',
    fields: [
      'Chiarezza del Business Model',
      'Sostenibilità del Business Model',
      'Innovazione del Business Model',
      'Adattabilità del Business Model',
      'Target di Mercato',
      'Proposta di Valore',
      'Fonti di Ricavo',
      'Costi Operativi',
      'Scalabilità',
      'Partnership Strategiche',
    ],
  },
  {
    name: 'Sito Web',
    fields: [
      'Design e Usabilità del Sito',
      'Velocità di Caricamento del Sito',
      'Mobile-Friendly',
      'Contenuti del Sito',
      'Sicurezza del Sito Web',
      'Aggiornamento del Sito Web',
      'Accessibilità',
      'SEO e Visibilità',
      'Feedback degli Utenti',
      'Supporto Online',
    ],
  },
  {
    name: 'Documenti',
    fields: [
      'Qualità della Documentazione',
      'Accessibilità della Documentazione',
      'Aggiornamento della Documentazione',
      'Documentazione Legale',
      'Trasparenza della Documentazione',
      'Documentazione Tecnica',
      'Manuali d\'Uso',
      'Politiche di Privacy',
      'Termini e Condizioni',
      'Report Finanziari',
    ],
  },
  {
    name: 'Promotori',
    fields: [
      'Trasparenza dei Promotori',
      'Credibilità dei Promotori',
      'Esperienza dei Promotori',
      'Impegno dei Promotori',
      'Reputazione Pubblica dei Promotori',
      'Comunicazione dei Promotori',
      'Trasparenza nelle Attività',
      'Supporto ai Clienti',
      'Partecipazione in Eventi',
      'Contributi alla Community',
    ],
  },
];

const Container = styled.div`
  padding: 2rem;
  background-color: #001f3f;
  color: #fff;
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
`;

const StyledTitle = styled.h1`
  text-align: center;
  color: #ff851b;
  margin-bottom: 2rem;
`;

const Introduction = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #002b5c;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #fff;
`;

const SectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const SectionContent = styled.div`
  width: 65%;
`;

const SectionChartsContainer = styled.div`
  width: 30%;
`;

const ChartWrapper = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`;

const Home = () => {
  const [inputValues, setInputValues] = useState({});
  const [scores, setScores] = useState({});
  const [sectionScores, setSectionScores] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
    calculateScores({ ...inputValues, [name]: value });
  };

  const calculateScores = (updatedValues) => {
    const newScores = {};
    const newSectionScores = {};
    sections.forEach((section) => {
      let total = 0;
      newSectionScores[section.name] = section.fields.map((field) => {
        const score = parseInt(updatedValues[`${section.name}-${field}`]) || 0;
        const weight = parseInt(updatedValues[`${section.name}-${field}-weight`]) || 0;
        total += score + weight;
        return {
          name: field,
          score: score,
          weight: weight,
        };
      });
      newScores[section.name] = total;
    });
    setScores(newScores);
    setSectionScores(newSectionScores);
  };

  const totalScores = {
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

  return (
    <Container>
      <StyledTitle>Scamometer</StyledTitle>
      <Introduction>
        <h2>Cos'è lo Scamometer</h2>
        <p>
          Lo Scamometer è uno strumento di valutazione progettato per aiutarti a valutare la bontà di un progetto attraverso diverse metriche chiave. Inserisci i punteggi e le ponderazioni per ciascuna metrica nelle sezioni sottostanti. I grafici mostreranno una panoramica visiva dei punteggi assegnati.
        </p>
      </Introduction>
      {sections.map((section, index) => (
        <SectionContainer key={index}>
          <SectionContent>
            <InputSection section={section} handleInputChange={handleInputChange} />
          </SectionContent>
          <SectionChartsContainer>
            <SectionCharts sectionScores={sectionScores[section.name]} />
          </SectionChartsContainer>
        </SectionContainer>
      ))}
      <ChartWrapper>
        <h2>Punteggi Totali</h2>
        <ScoreChart scores={scores} />
      </ChartWrapper>
    </Container>
  );
};

export default Home;
