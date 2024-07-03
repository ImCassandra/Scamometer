import React from 'react';
import App from 'next/app';
import GlobalStyle from '../styles/GlobalStyle';
import Image from 'next/image'; // Importa Image da next/image

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <GlobalStyle />
        <div style={{ position: 'relative' }}>
          <header style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem' }}>
            <Image src="/decriptologo.png" alt="Decripto Logo" width={262} height={88} />
          </header>
          <Component {...pageProps} />
        </div>
      </>
    );
  }
}

export default MyApp;
