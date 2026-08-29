# Grangia GSAP Immersive

Esperienza web immersiva derivata dalla presentazione **“Grangia x 40 anni.pptx”**.

La sequenza conserva i contenuti principali delle 24 slide originali e li presenta con un linguaggio visivo volutamente neutro. Le sole eccezioni cromatiche sono i quattro foglietti di riflessione. L’unica fotografia utilizzata è quella della Grangia, trattata in scala di grigi nelle schermate di apertura, accoglienza e chiusura.

## Avvio

Il progetto non richiede build né dipendenze da installare. È incluso un piccolo server statico Node.js.

- Windows: esegui `start.bat`.
- macOS/Linux: esegui `./start.sh`.
- Da terminale: `npm start`.
- In alternativa, avvia un qualsiasi server statico nella cartella e apri `index.html` tramite HTTP.

L’uso di un server locale è necessario per una riproduzione audio affidabile. GSAP è incluso localmente in `assets/vendor/gsap.min.js`, quindi l’esperienza può essere presentata senza connessione internet.

## Funzionamento

- Il pulsante iniziale sblocca l’audio e avvia un conto alla rovescia.
- Le schermate narrative avanzano automaticamente.
- I checkpoint di riflessione avanzano solo dopo il click del partecipante; alcuni prevedono un breve tempo minimo.
- I controlli consentono di mettere in pausa, tornare indietro, andare avanti, uscire, regolare l’audio e attivare lo schermo intero.
- La pagina finale contiene il pulsante **Ricomincia**.
- In **modalità presentatore**, la pagina finale torna automaticamente alla home dopo 20 secondi.
- La modalità presentatore può essere preattivata anche con `?presenter=1` nell’URL.

## Tastiera

- `←` / `→`: schermata precedente o successiva.
- `Spazio`: pausa/riprendi.
- `M`: audio on/off.
- `F`: schermo intero.

## Audio

La regia usa esclusivamente le tracce richieste:

- `assets/audio/new1.mp3`: apertura;
- `assets/audio/new2.mp3`: partenza, viaggio e arrivo;
- `assets/audio/new3.mp3`: accoglienza, riflessione e chiusura.

Il passaggio indicato nella presentazione con “Musica sfuma e si ferma” viene rispettato prima della partenza.
