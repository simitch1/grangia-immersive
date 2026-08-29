# Grangia GSAP Immersive

Prototipo web immersivo derivato dalla presentazione **“Grangia x 40 anni.pptx”**. La presentazione originale viene reinterpretata come una timeline narrativa continua con countdown, musica, pause di riflessione, crossfade audio, immagini e animazioni GSAP.

## Avvio rapido

1. Apri un terminale nella cartella del progetto.
2. Avvia un server locale:
   - macOS / Linux: `./start.sh`
   - Windows: doppio click su `start.bat`
   - oppure: `python3 -m http.server 8080`
3. Apri `http://localhost:8080`.
4. Premi **Inizia il viaggio**. Il click iniziale è necessario per consentire la riproduzione audio nei browser moderni.

## Struttura

- `index.html` — palco full-screen, controlli, pause interattive.
- `styles.css` — visual design, tipografia, pannelli, foglietti, responsive.
- `app.js` — regia GSAP, sequenza narrativa, countdown, timer e crossfade musicali.
- `assets/audio/` — tre ambienti musicali originali generati per il prototipo:
  - `soglia.mp3` — riflessivo / introduttivo;
  - `attraversamento.mp3` — più teso / sospeso;
  - `approdo.mp3` — più caldo / contemplativo.
- `assets/img/foglietti-domanda.png` — immagine già presente nel PowerPoint originale.
- `assets/img/maslow.png` — piramide di Maslow già presente nel PowerPoint originale.

## Logica dell’esperienza

La timeline segue la traccia originale:

- countdown e introduzione;
- pensiero sulla propria vita;
- emergenza e decisione di partire;
- foglietto rosso e foglietto arancione con pausa minima;
- viaggio, arrivo, stanchezza, lingua e disorientamento;
- accesso al centro di accoglienza;
- foglietto giallo e riflessione sui bisogni;
- piramide di Maslow;
- burocrazia, lingua, lavoro, famiglia;
- foglietto azzurro;
- epilogo e ringraziamento.

Le pause sui foglietti hanno un **tempo minimo** ma non un tempo massimo: il partecipante continua quando è pronto. È una scelta più coerente con la natura riflessiva della traccia rispetto a un autoplay rigido.

## Fonti visive

### La Grangia di Monluè

Il progetto usa come riferimento il sito ufficiale:
- https://www.lagrangiadimonlue.org/
- logo: `https://www.lagrangiadimonlue.org/wp-content/uploads/2014/08/logo-small-2.png`
- Casa di accoglienza: `https://www.lagrangiadimonlue.org/wp-content/uploads/2015/09/edificio-grangia.jpg`

Nel prototipo queste risorse sono caricate da remoto. Per un’installazione offline, scaricarle localmente previa verifica dei diritti d’uso con l’associazione e aggiornare le URL in `index.html` / `app.js`.

### Fotografie narrative — Unsplash

Il prototipo usa fotografie gratuite come riferimenti visivi narrativi:
- Jason Leung — “Man with suitcase on empty train station platform”  
  https://unsplash.com/photos/ZGB-D4ogbfc
- felkhadri — persona su una piattaforma ferroviaria  
  https://unsplash.com/photos/O4uf3Hpn4-U
- Milano di notte — riferimento fotografico  
  https://unsplash.com/photos/a4_k6rvqY80
- Nguyen Dang Hoang Nhu — scrittura su quaderno  
  https://unsplash.com/photos/XVtWhPS-hic

Le immagini vengono caricate direttamente da `images.unsplash.com`. Per l’uso definitivo in una mostra/installazione si consiglia di scaricare e archiviare i file localmente, mantenendo i crediti e verificando la licenza applicabile al momento del download.

## GSAP

Il prototipo carica GSAP da CDN:

`https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js`

Per una postazione **offline**, scaricare `gsap.min.js` in `assets/vendor/` e sostituire lo `<script>` in `index.html` con:

```html
<script src="assets/vendor/gsap.min.js"></script>
```

## Note per la messa in produzione

- Usare Chrome/Edge in modalità kiosk o fullscreen.
- Disabilitare sleep/salvaschermo del sistema operativo.
- Collegare l’uscita audio direttamente all’impianto della stanza e fare un sound check sui livelli reali.
- Per installazione offline: portare localmente **GSAP, logo, foto e font**.
- Se deve partire automaticamente all’accensione, configurare il browser in kiosk ma mantenere un primo gesto dell’utente oppure usare una shell desktop (Electron) che gestisca l’audio in modo più prevedibile.
- Se serve un pulsante fisico, si può collegare un controller USB che invii un tasto e usarlo al posto del click su “Continua”.

## Personalizzazione tempi

Tutti i tempi sono in `app.js`, nell’array `scenes`:

```js
{ id: 'viaggio', seconds: 12, ... }
{ type: 'reflection', id: 'rosso', seconds: 24, ... }
```

Per le scene normali `seconds` = permanenza prima della transizione automatica. Per le riflessioni `seconds` = **tempo minimo** prima dell’abilitazione del pulsante.
