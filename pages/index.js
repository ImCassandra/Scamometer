import React, { useState } from 'react';
import styled from 'styled-components';
import InputSection from '../components/InputSection';
import ScoreChart from '../components/ScoreChart';
import SectionCharts from '../components/SectionCharts';
import { Chart as ChartJS, CategoryScale, LinearScale, RadialLinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Registra i componenti necessari per Chart.js
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
  padding: 0.5rem 2rem 2rem;
  background-color: #001f3f;
  color: #fff;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
`;

const StyledTitle = styled.h1`
  text-align: center;
  color: #ff851b;
  margin-bottom: 2rem;
  margin-top: 0;
  font-size: 4rem;
`;

const Introduction = styled.div`
  margin-bottom: 2rem;
`;

const Dropdown = styled.div`
  background-color: #002b5c;
  color: #fff;
  padding: 1rem;
  border-radius: 8px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  cursor: pointer;
`;

const DropdownHeader = styled.div`
  display: flex;
  align-items: center;
`;

const QuestionText = styled.span`
  font-family: 'Roboto', sans-serif;
  font-size: 1.2rem;
  font-weight: bold;
  color: #ff851b;
`;

const DropdownContent = styled.div`
  margin-top: 1rem;
  max-height: ${({ $show }) => ($show ? '500px' : '0')};
  overflow: hidden;
  transition: max-height 0.5s ease, opacity 0.5s ease;
  opacity: ${({ $show }) => ($show ? '1' : '0')};
  visibility: ${({ $show }) => ($show ? 'visible' : 'hidden')};
  background-color: #003366;
  padding: ${({ $show }) => ($show ? '1rem' : '0')};
  border-radius: 8px;
  cursor: default;
`;

const Arrow = styled.span`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  margin-right: 1rem;
  transform: ${({ $show }) => ($show ? 'rotate(45deg)' : 'rotate(-45deg)')};
  transition: transform 0.3s ease;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ChartWrapper = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`;

const Home = () => {
  const [inputValues, setInputValues] = useState({});
  const [scores, setScores] = useState({});
  const [weightedScores, setWeightedScores] = useState({});
  const [sectionScores, setSectionScores] = useState({});
  const [maxScores, setMaxScores] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [showDropdown3, setShowDropdown3] = useState(false);

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
    const newWeightedScores = {};
    const newSectionScores = {};
    const newMaxScores = {};
    
    sections.forEach((section) => {
      let total = 0;
      let weightedTotal = 0;
      let maxTotal = 0;
      
      newSectionScores[section.name] = section.fields.map((field) => {
        const score = parseInt(updatedValues[`${section.name}-${field}`]) || 0;
        const weight = parseInt(updatedValues[`${section.name}-${field}-weight`]) || 0;
        
        total += score;
        weightedTotal += score + weight;
        
        maxTotal += 4;
        return {
          name: field,
          score: score,
          weight: weight,
        };
      });
      
      newScores[section.name] = total;
      newWeightedScores[section.name] = weightedTotal;
      newMaxScores[section.name] = section.fields.length * 5;
    });
    
    setScores(newScores);
    setWeightedScores(newWeightedScores);
    setSectionScores(newSectionScores);
    setMaxScores(newMaxScores);
  };

  const handleToggle = (dropdown, setDropdown) => {
    setDropdown(!dropdown);
  };

  return (
    <Container>
      <StyledTitle>Scam O'Meter</StyledTitle>
      <Introduction>
        <Dropdown onClick={() => handleToggle(showDropdown, setShowDropdown)}>
          <DropdownHeader>
            <Arrow $show={showDropdown} />
            <QuestionText>Cos'è lo Scam O'Meter?</QuestionText>
          </DropdownHeader>
          <DropdownContent $show={showDropdown} onClick={(e) => e.stopPropagation()}>
            <p>
              <strong>Scam O'Meter</strong> è lo strumento integrato nella nostra web app progettato per valutare la credibilità di siti web, annunci e offerte online. Fornisce una valutazione obiettiva del potenziale rischio di truffe e inganni, aiutando gli utenti a prendere decisioni informate sulla sicurezza delle proprie interazioni digitali.
            </p>
            <p>
              Scam O'Meter identifica segnali di allarme e fornisce indicazioni utili per migliorare la consapevolezza e proteggere la privacy degli utenti durante la navigazione online.
            </p>
          </DropdownContent>
        </Dropdown>
        <Dropdown onClick={() => handleToggle(showDropdown2, setShowDropdown2)}>
          <DropdownHeader>
            <Arrow $show={showDropdown2} />
            <QuestionText>Come funziona lo Scam O'Meter?</QuestionText>
          </DropdownHeader>
          <DropdownContent $show={showDropdown2} onClick={(e) => e.stopPropagation()}>
            <p>
              Lo <strong>Scam O'Meter</strong> analizza vari parametri del sito web, degli annunci e delle offerte online per determinare la loro credibilità.
            </p>
            <p>
              Utilizza algoritmi avanzati per identificare potenziali segnali di truffa e fornisce un punteggio basato su diversi criteri di valutazione, inclusi modelli di business, usabilità del sito web, documentazione e altro.
            </p>
          </DropdownContent>
        </Dropdown>
        <Dropdown onClick={() => handleToggle(showDropdown3, setShowDropdown3)}>
          <DropdownHeader>
            <Arrow $show={showDropdown3} />
            <QuestionText>Come dare i punteggi e utilizzare il Valore di Ponderazione?</QuestionText>
          </DropdownHeader>
          <DropdownContent $show={showDropdown3} onClick={(e) => e.stopPropagation()}>
            <p>
              Per assegnare i punteggi, valuta ciascun criterio utilizzando una scala da 1 a 4, dove 1 rappresenta il punteggio più basso (scarso) e 4 il punteggio più alto (eccellente). La <strong>ponderazione</strong> è un parametro aggiuntivo che può essere impostato a -1, 0 o +1 per indicare rispettivamente un impatto negativo, neutro o positivo sulla valutazione complessiva.
            </p>
            <p>
              Il vantaggio di avere un <strong>risultato ponderato</strong> rispetto a un risultato semplice risiede nella capacità di riflettere più accuratamente l'importanza relativa dei diversi criteri di valutazione.
            </p>
          </DropdownContent>
        </Dropdown>
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
        <ScoreChart scores={scores} weightedScores={weightedScores} maxScores={maxScores} />
      </ChartWrapper>
    </Container>
  );
};

export default Home;
