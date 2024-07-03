import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField, Typography, ButtonGroup, Button, Tooltip } from '@mui/material';
import { orange, deepOrange, amber } from '@mui/material/colors';
import descriptions from '../data/descriptions.json'; // Importa le descrizioni

const SectionContainer = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #002b5c;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #001f3f;
  color: #ff851b;
  border: 1px solid #ff851b;
  padding: 0.5rem;
  text-align: center;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #003366;
  }
  &:hover {
    background-color: #004080;
  }
`;

const TableCell = styled.td`
  border: 1px solid #ff851b;
  padding: 0.5rem;
  text-align: center;
`;

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))`
  & .MuiTooltip-tooltip {
    background-color: #ff851b;
    color: #001f3f;
    font-size: 1rem;
    border: 1px solid #ff851b;
    border-radius: 8px;
    padding: 0.5rem 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  & .MuiTooltip-arrow {
    color: #ff851b;
  }
`;

const InputSection = ({ section, handleInputChange }) => {
  const [selectedScores, setSelectedScores] = useState({});
  const [selectedWeights, setSelectedWeights] = useState({});

  const handleScoreClick = (name, value) => {
    setSelectedScores((prev) => ({ ...prev, [name]: prev[name] === value ? null : value }));
    handleInputChange({ target: { name, value: selectedScores[name] === value ? '' : value } });
  };

  const handleWeightClick = (name, value) => {
    setSelectedWeights((prev) => ({ ...prev, [name]: prev[name] === value ? null : value }));
    handleInputChange({ target: { name, value: selectedWeights[name] === value ? '' : value } });
  };

  return (
    <SectionContainer>
      <Typography variant="h4" component="h2" sx={{ color: '#ff851b' }}>{section.name}</Typography>
      <Table>
        <thead>
          <tr>
            <TableHeader>Criteri di Valutazione</TableHeader>
            <TableHeader>Punteggio Semplice</TableHeader>
            <TableHeader>Valore di Ponderazione</TableHeader>
            <TableHeader>Commenti</TableHeader>
          </tr>
        </thead>
        <tbody>
          {section.fields.map((field, index) => (
            <TableRow key={index}>
              <TableCell>
                <CustomTooltip title={descriptions[section.name][field]} arrow enterDelay={0} leaveDelay={0}>
                  <Typography variant="body1" sx={{ color: '#fff', cursor: 'pointer', display: 'inline-block' }}>{field}</Typography>
                </CustomTooltip>
              </TableCell>
              <TableCell>
                <ButtonGroup variant="contained">
                  {[1, 2, 3, 4].map((value) => (
                    <Button
                      key={value}
                      onClick={() => handleScoreClick(`${section.name}-${field}`, value)}
                      sx={{
                        backgroundColor: selectedScores[`${section.name}-${field}`] === value ? deepOrange[900] : orange[500],
                        color: '#fff',
                        transition: 'background-color 0.3s ease',
                        '&:hover': {
                          backgroundColor: deepOrange[700],
                        },
                      }}
                    >
                      {value}
                    </Button>
                  ))}
                </ButtonGroup>
              </TableCell>
              <TableCell>
                <ButtonGroup variant="contained">
                  {[-1, 0, 1].map((value) => (
                    <Button
                      key={value}
                      onClick={() => handleWeightClick(`${section.name}-${field}-weight`, value)}
                      sx={{
                        backgroundColor: selectedWeights[`${section.name}-${field}-weight`] === value ? deepOrange[900] : orange[500],
                        color: '#fff',
                        transition: 'background-color 0.3s ease',
                        '&:hover': {
                          backgroundColor: deepOrange[700],
                        },
                      }}
                    >
                      {value}
                    </Button>
                  ))}
                </ButtonGroup>
              </TableCell>
              <TableCell>
                <TextField
                  name={`${section.name}-${field}-comment`}
                  onChange={handleInputChange}
                  multiline
                  rows={2}
                  variant="outlined"
                  color="warning"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: orange[500],
                      },
                      '&:hover fieldset': {
                        borderColor: deepOrange[700],
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: deepOrange[900],
                      },
                      '& textarea': {
                        color: '#fff',
                      },
                    },
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </SectionContainer>
  );
};

export default InputSection;
