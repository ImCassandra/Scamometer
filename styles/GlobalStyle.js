import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #001f3f;
    color: #fff;
    font-family: 'Arial', sans-serif;
  }

  h1, h2 {
    color: #ff851b;
  }

  input, select, textarea {
    margin: 0.5rem 0;
    padding: 0.5rem;
    border: 1px solid #ff851b;
    border-radius: 4px;
    background-color: #001f3f;
    color: #fff;
  }

  label {
    color: #ff851b;
  }
`;

export default GlobalStyle;
