import React from 'react';
import styled from 'styled-components';
import descriptions from '../data/descriptions.json'; // Assicurati che il percorso sia corretto

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

const Label = styled.label`
  display: flex;
  align-items: center;
  color: #ff851b;
  margin-bottom: 0.5rem;
  text-align: left;
`;

const TooltipIcon = styled.span`
  margin-left: 0.5rem;
  cursor: pointer;
  position: relative;
  
  &::before {
    content: '?';
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #ff851b;
    color: #001f3f;
    text-align: center;
    line-height: 16px;
    font-size: 12px;
  }
  
  &:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    top: -5px;
    left: 20px;
    background-color: #ff851b;
    color: #001f3f;
    padding: 5px;
    border-radius: 4px;
    white-space: pre; /* Permette il wrapping del testo su \n */
    z-index: 10;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    line-height: 1.4; /* Migliora la leggibilità del testo */
  }
`;

const Input = styled.input`
  width: 80px;
  padding: 0.5rem;
  border: 1px solid #ff851b;
  border-radius: 4px;
  background-color: #001f3f;
  color: #fff;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover,
  &:focus {
    background-color: #002b5c;
    box-shadow: 0 0 8px rgba(255, 133, 27, 0.8);
  }
`;

const Select = styled.select`
  width: 80px;
  padding: 0.5rem;
  border: 1px solid #ff851b;
  border-radius: 4px;
  background-color: #001f3f;
  color: #fff;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover,
  &:focus {
    background-color: #002b5c;
    box-shadow: 0 0 8px rgba(255, 133, 27, 0.8);
  }
`;

const Textarea = styled.textarea`
  width: 150px;
  height: 60px;
  padding: 0.5rem;
  border: 1px solid #ff851b;
  border-radius: 4px;
  background-color: #001f3f;
  color: #fff;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover,
  &:focus {
    background-color: #002b5c;
    box-shadow: 0 0 8px rgba(255, 133, 27, 0.8);
  }
`;

const InputSection = ({ section, handleInputChange }) => {
  return (
    <SectionContainer>
      <h2>{section.name}</h2>
      <Table>
        <thead>
          <tr>
            <TableHeader>Criteri di valutazione</TableHeader>
            <TableHeader>Punteggio semplice (1-4)</TableHeader>
            <TableHeader>Ponderazione (-1/0/+1)</TableHeader>
            <TableHeader>Commenti</TableHeader>
          </tr>
        </thead>
        <tbody>
          {section.fields.map((field, index) => (
            <TableRow key={index}>
              <TableCell>
                <Label>
                  {field}
                  <TooltipIcon data-tooltip={descriptions[section.name][field]} />
                </Label>
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  name={`${section.name}-${field}`}
                  onChange={handleInputChange}
                  min="1"
                  max="4"
                />
              </TableCell>
              <TableCell>
                <Select name={`${section.name}-${field}-weight`} onChange={handleInputChange} defaultValue="0">
                  <option value="1">+1</option>
                  <option value="0">0</option>
                  <option value="-1">-1</option>
                </Select>
              </TableCell>
              <TableCell>
                <Textarea
                  name={`${section.name}-${field}-comment`}
                  onChange={handleInputChange}
                ></Textarea>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </SectionContainer>
  );
};

export default InputSection;
