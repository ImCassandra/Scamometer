import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField, Typography, Grid } from '@mui/material';
import { orange, deepOrange } from '@mui/material/colors';

const ProjectInputContainer = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #002b5c;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProjectInput = ({ onProjectDataChange }) => {
  const [projectData, setProjectData] = useState({
    projectName: '',
    projectDescription: '',
    startDate: '',
    endDate: '',
    analystName: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
    onProjectDataChange({ ...projectData, [name]: value });
  };

  return (
    <ProjectInputContainer>
      <Typography variant="h4" component="h2" sx={{ color: '#ff851b', marginBottom: '1rem' }}>
        Inserisci i dati del progetto
      </Typography>
      <TextField
        label="Nome del Progetto"
        name="projectName"
        value={projectData.projectName}
        onChange={handleInputChange}
        fullWidth
        sx={{
          marginBottom: '1rem',
          '& .MuiInputLabel-root': { color: '#ff851b' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: orange[500] },
            '&:hover fieldset': { borderColor: deepOrange[700] },
            '&.Mui-focused fieldset': { borderColor: deepOrange[900] },
            '& input': { color: orange[500] },
          },
        }}
      />
      <TextField
        label="Descrizione del Progetto"
        name="projectDescription"
        value={projectData.projectDescription}
        onChange={handleInputChange}
        fullWidth
        multiline
        minRows={2}
        maxRows={6}
        sx={{
          marginBottom: '1rem',
          '& .MuiInputLabel-root': { color: '#ff851b' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: orange[500] },
            '&:hover fieldset': { borderColor: deepOrange[700] },
            '&.Mui-focused fieldset': { borderColor: deepOrange[900] },
            '& textarea': { color: orange[500] },
          },
        }}
      />
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <TextField
            label="Data di Inizio"
            name="startDate"
            type="date"
            value={projectData.startDate}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{
              marginBottom: '1rem',
              '& .MuiInputLabel-root': { color: '#ff851b' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: orange[500] },
                '&:hover fieldset': { borderColor: deepOrange[700] },
                '&.Mui-focused fieldset': { borderColor: deepOrange[900] },
                '& input[type="date"]': { color: orange[500] },
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Data di Fine"
            name="endDate"
            type="date"
            value={projectData.endDate}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{
              marginBottom: '1rem',
              '& .MuiInputLabel-root': { color: '#ff851b' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: orange[500] },
                '&:hover fieldset': { borderColor: deepOrange[700] },
                '&.Mui-focused fieldset': { borderColor: deepOrange[900] },
                '& input[type="date"]': { color: orange[500] },
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Nome dell'Analista"
            name="analystName"
            value={projectData.analystName}
            onChange={handleInputChange}
            fullWidth
            sx={{
              marginBottom: '1rem',
              '& .MuiInputLabel-root': { color: '#ff851b' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: orange[500] },
                '&:hover fieldset': { borderColor: deepOrange[700] },
                '&.Mui-focused fieldset': { borderColor: deepOrange[900] },
                '& input': { color: orange[500] },
              },
            }}
          />
        </Grid>
      </Grid>
    </ProjectInputContainer>
  );
};

export default ProjectInput;
