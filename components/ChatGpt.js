// components/ChatGpt.js
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ChatContainer = styled.div`
  background-color: #002b5c;
  color: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const MessageList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
`;

const Message = styled.div`
  margin: 0.5rem 0;
  padding: 0.5rem;
  background-color: ${props => (props.isUser ? '#ff851b' : '#004080')};
  border-radius: 4px;
  word-wrap: break-word; /* Assicurati che il testo vada a capo */
  max-width: 80%; /* Limita la larghezza del messaggio */
  white-space: pre-wrap; /* Mantiene gli a capo e gli spazi */
  align-self: ${props => (props.isUser ? 'flex-start' : 'flex-end')}; /* Allinea a sinistra se è dell'utente, a destra se del bot */
  text-align: left; /* Allinea il testo a sinistra */
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TextArea = styled.textarea`
  width: calc(100% - 70px); /* Riduci la larghezza per evitare sovrapposizioni */
  padding: 0.5rem;
  border: 1px solid #ff851b;
  border-radius: 4px;
  background-color: #001f3f;
  color: #ff851b; /* Colore del testo arancione */
  font-family: 'Roboto', sans-serif; /* Stesso font del resto del tool */
  margin-right: 10px; /* Aggiungi margine destro per separare dal pulsante */
  resize: none; /* Impedisci il ridimensionamento manuale */
  overflow-y: auto; /* Abilita la scorrimento verticale */
  min-height: 40px; /* Altezza minima */
  max-height: 150px; /* Altezza massima */
`;

const Button = styled.button`
  width: 60px; /* Aumenta leggermente la larghezza del pulsante */
  padding: 0.5rem;
  border: none;
  background-color: #ff851b;
  color: #001f3f;
  border-radius: 4px;
  cursor: pointer;
`;

const SectionTitle = styled.h2`
  color: #ff851b;
  margin-bottom: 1rem;
  font-size: 2rem;
`;

const ChatGpt = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, isUser: true }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt: input,
        max_tokens: 150,
        n: 1,
        stop: null,
        temperature: 0.7,
      }, {
        headers: {
          'Authorization': `Bearer YOUR_API_KEY`,
          'Content-Type': 'application/json',
        },
      });

      const botMessage = response.data.choices[0].text.trim();
      setMessages([...newMessages, { text: botMessage, isUser: false }]);
    } catch (error) {
      console.error('Error fetching data from OpenAI:', error);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    e.target.style.height = 'auto'; // Resetta l'altezza per ricalcolare
    e.target.style.height = `${e.target.scrollHeight}px`; // Imposta l'altezza in base al contenuto
  };

  return (
    <ChatContainer>
      <SectionTitle>Interagisci con GPT (da finire)</SectionTitle>
      <MessageList>
        {messages.map((message, index) => (
          <Message key={index} isUser={message.isUser}>
            {message.text}
          </Message>
        ))}
      </MessageList>
      <InputContainer>
        <TextArea
          value={input}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
          rows={1} // Inizialmente una riga
        />
        <Button onClick={sendMessage}>Invia</Button>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatGpt;
