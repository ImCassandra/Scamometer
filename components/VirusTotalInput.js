import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField, Typography, Grid, Button, IconButton } from '@mui/material';
import { orange, deepOrange } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';

const VirusTotalInputContainer = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #002b5c;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ScreenshotsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: flex-start;
`;

const ScreenshotContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const ScreenshotPreview = styled.img`
  margin-top: 1rem;
  max-width: 100px; /* Dimensione massima della preview */
  max-height: 100px; /* Dimensione massima della preview */
  border: 2px solid ${orange[500]};
  border-radius: 4px;
  cursor: pointer;
`;

const AddScreenshotButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DeleteButton = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const LightboxOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LightboxImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  border: 2px solid ${orange[500]};
  border-radius: 4px;
`;

const VirusTotalInput = ({ onVirusTotalDataChange }) => {
  const [virusTotalData, setVirusTotalData] = useState({
    scanId: '',
    url: '',
    scanDate: '',
    positives: '',
    virusName: '',
    virusDetails: '',
    notes: '',
    screenshots: [],
  });

  const [lightboxImage, setLightboxImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVirusTotalData({ ...virusTotalData, [name]: value });
    onVirusTotalDataChange({ ...virusTotalData, [name]: value });
  };

  const handleScreenshotChange = (index, e) => {
    const file = e.target.files[0];
    const newScreenshots = [...virusTotalData.screenshots];
    newScreenshots[index] = {
      file,
      preview: URL.createObjectURL(file),
    };
    setVirusTotalData({ ...virusTotalData, screenshots: newScreenshots });
    onVirusTotalDataChange({ ...virusTotalData, screenshots: newScreenshots });
  };

  const addScreenshotBox = () => {
    setVirusTotalData({ ...virusTotalData, screenshots: [...virusTotalData.screenshots, { file: null, preview: null }] });
  };

  const removeScreenshotBox = (index) => {
    const newScreenshots = virusTotalData.screenshots.filter((_, i) => i !== index);
    setVirusTotalData({ ...virusTotalData, screenshots: newScreenshots });
    onVirusTotalDataChange({ ...virusTotalData, screenshots: newScreenshots });
  };

  const openLightbox = (url) => {
    setLightboxImage(url);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  return (
    <>
      <VirusTotalInputContainer>
        <Typography variant="h4" component="h2" sx={{ color: '#ff851b', marginBottom: '1rem' }}>
          Analisi delle Vulnerabilità (VirusTotal) 
        </Typography>
        <TextField
          label="Scan ID"
          name="scanId"
          value={virusTotalData.scanId}
          onChange={handleInputChange}
          fullWidth
          inputProps={{ autoComplete: 'off' }}
          sx={{
            marginBottom: '1rem',
            '& .MuiInputLabel-root': { color: '#ff851b' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: orange[500] },
              '&:hover fieldset': { borderColor: deepOrange[700] },
              '&.Mui-focused fieldset': { borderColor: deepOrange[900] },
              '& input': { color: orange[500] }, // Modifica il colore del testo inserito
            },
          }}
        />
        <TextField
          label="URL"
          name="url"
          value={virusTotalData.url}
          onChange={handleInputChange}
          fullWidth
          inputProps={{ autoComplete: 'off' }}
          sx={{
            marginBottom: '1rem',
            '& .MuiInputLabel-root': { color: '#ff851b' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: orange[500] },
              '&:hover fieldset': { borderColor: deepOrange[700] },
              '&.Mui-focused fieldset': { borderColor: deepOrange[900] },
              '& input': { color: orange[500] }, // Modifica il colore del testo inserito
            },
          }}
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Data di Scansione"
              name="scanDate"
              value={virusTotalData.scanDate}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputProps={{ autoComplete: 'off', pattern: '\\d{4}-\\d{2}-\\d{2}' }} // Formato data YYYY-MM-DD
              sx={{
                marginBottom: '1rem',
                '& .MuiInputLabel-root': { color: '#ff851b' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: orange[500] },
                  '&:hover fieldset': { borderColor: deepOrange[700] },
                  '&.Mui-focused fieldset': { borderColor: deepOrange[900] },
                  '& input': { color: orange[500] }, // Modifica il colore del testo inserito
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Numero di Positivi"
              name="positives"
              value={virusTotalData.positives}
              onChange={handleInputChange}
              fullWidth
              inputProps={{ autoComplete: 'off' }}
              sx={{
                marginBottom: '1rem',
                '& .MuiInputLabel-root': { color: '#ff851b' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: orange[500] },
                  '&:hover fieldset': { borderColor: deepOrange[700] },
                  '&.Mui-focused fieldset': { borderColor: deepOrange[900] },
                  '& input': { color: orange[500] }, // Modifica il colore del testo inserito
                },
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Nome dei Virus"
              name="virusName"
              value={virusTotalData.virusName}
              onChange={handleInputChange}
              fullWidth
              multiline
              minRows={1}
              maxRows={4}
              inputProps={{ autoComplete: 'off' }}
              sx={{
                marginBottom: '1rem',
                '& .MuiInputLabel-root': { color: '#ff851b' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: orange[500] },
                  '&:hover fieldset': { borderColor: deepOrange[700] },
                  '&.Mui-focused fieldset': { borderColor: deepOrange[900] },
                  '& input': { color: orange[500] }, // Modifica il colore del testo inserito
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Specifiche dei Virus"
              name="virusDetails"
              value={virusTotalData.virusDetails}
              onChange={handleInputChange}
              fullWidth
              multiline
              minRows={1}
              maxRows={4}
              inputProps={{ autoComplete: 'off' }}
              sx={{
                marginBottom: '1rem',
                '& .MuiInputLabel-root': { color: '#ff851b' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: orange[500] },
                  '&:hover fieldset': { borderColor: deepOrange[700] },
                  '&.Mui-focused fieldset': { borderColor: deepOrange[900] },
                  '& input': { color: orange[500] }, // Modifica il colore del testo inserito
                },
              }}
            />
          </Grid>
        </Grid>
        <TextField
          label="Note"
          name="notes"
          value={virusTotalData.notes}
          onChange={handleInputChange}
          fullWidth
          multiline
          minRows={2}
          maxRows={10}
          inputProps={{ autoComplete: 'off' }}
          sx={{
            marginBottom: '1rem',
            '& .MuiInputLabel-root': { color: '#ff851b' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: orange[500] },
              '&:hover fieldset': { borderColor: deepOrange[700] },
              '&.Mui-focused fieldset': { borderColor: deepOrange[900] },
              '& textarea': { color: orange[500] }, // Modifica il colore del testo inserito
            },
          }}
        />
        <ScreenshotsContainer>
          {virusTotalData.screenshots.map((screenshot, index) => (
            <ScreenshotContainer key={index}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleScreenshotChange(index, e)}
                style={{ color: '#ff851b', marginBottom: '1rem' }}
                autoComplete="off"
              />
              {screenshot.preview && (
                <>
                  <ScreenshotPreview
                    src={screenshot.preview}
                    alt={`Screenshot ${index + 1}`}
                    onClick={() => openLightbox(screenshot.preview)}
                  />
                  <DeleteButton size="small" onClick={() => removeScreenshotBox(index)}>
                    <CloseIcon fontSize="small" />
                  </DeleteButton>
                </>
              )}
            </ScreenshotContainer>
          ))}
          <AddScreenshotButtonContainer>
            <Button
              variant="contained"
              onClick={addScreenshotBox}
              sx={{
                backgroundColor: orange[500],
                '&:hover': { backgroundColor: deepOrange[700] },
                color: '#fff',
                height: 'fit-content',
                marginTop: '1rem',
              }}
            >
              Aggiungi Screenshot
            </Button>
          </AddScreenshotButtonContainer>
        </ScreenshotsContainer>
        {lightboxImage && (
          <LightboxOverlay onClick={closeLightbox}>
            <LightboxImage src={lightboxImage} alt="Lightbox Image" />
          </LightboxOverlay>
        )}
      </VirusTotalInputContainer>
    </>
  );
};

export default VirusTotalInput;
