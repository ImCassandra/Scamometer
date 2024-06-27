import React from 'react';
import App from 'next/app';
import GlobalStyle from '../styles/GlobalStyle';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <GlobalStyle />
        <Component {...pageProps} />
      </>
    );
  }
}

export default MyApp;
