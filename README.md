# Scamometer

Scamometer è una web app sviluppata con Next.js che aiuta a valutare la bontà di un progetto attraverso diverse metriche chiave. L'app permette di inserire punteggi e ponderazioni per ciascuna metrica e visualizzare i risultati tramite grafici a barre, radar e tachimetro.

## Funzionalità

- **Sezioni di Valutazione**: Include diverse sezioni come Business Model, Sito Web, Documenti e Promotori, ciascuna con diverse metriche.
- **Punteggio Semplice e Ponderato**: Inserisci punteggi semplici (1-4) e ponderazioni (-1, 0, +1) per ogni metrica.
- **Grafici Dinamici**: Visualizza i risultati con grafici a barre, radar e tachimetro.
- **Interfaccia User-Friendly**: Interfaccia intuitiva con un design moderno e accattivante.

## Installazione

1. Clona il repository:

    ```bash
    git clone git@github.com:Decripto-org/Scamometer.git
    cd Scamometer
    ```

2. Installa le dipendenze:

    ```bash
    npm install
    ```

3. Avvia l'applicazione:

    ```bash
    npm run dev
    ```

4. Apri il browser e vai a `http://localhost:3000`.

## Utilizzo

1. **Introduzione**: Nella homepage, troverai una breve introduzione che spiega cos'è lo Scamometer e come usarlo.

2. **Inserimento Punteggi**: Ogni sezione (Business Model, Sito Web, Documenti, Promotori) contiene diversi campi per inserire i punteggi e le ponderazioni. Inserisci i valori nei campi appropriati.

3. **Visualizzazione Risultati**: I grafici a destra di ogni sezione mostrano i punteggi inseriti. I grafici totali in basso forniscono una panoramica complessiva delle valutazioni.

## Struttura del Progetto

- **components**: Contiene i componenti React utilizzati nell'app.
  - `InputSection.js`: Componente per l'inserimento dei punteggi.
  - `ScoreChart.js`: Componente per la visualizzazione dei grafici totali.
  - `SectionCharts.js`: Componente per la visualizzazione dei grafici delle singole sezioni.
- **pages**: Contiene le pagine dell'app.
  - `index.js`: Pagina principale dell'app.
- **styles**: Contiene i file di stile.

## Tecnologie Utilizzate

- **Next.js**: Framework React per applicazioni web.
- **React**: Libreria JavaScript per la creazione di interfacce utente.
- **Chart.js**: Libreria per la creazione di grafici.
- **React-Chartjs-2**: Integrazione di Chart.js con React.
- **React-D3-Speedometer**: Componente per la creazione di tachimetri.
- **Styled-Components**: Libreria per lo styling dei componenti in React.

## Contributi

I contributi sono benvenuti! Se hai suggerimenti o migliorie, apri un issue o invia una pull request.

1. Fork il progetto.
2. Crea un tuo branch (`git checkout -b feature/nome-feature`).
3. Committa le modifiche (`git commit -m 'Aggiungi nome-feature'`).
4. Pusha sul branch (`git push origin feature/nome-feature`).
5. Apri una pull request.
