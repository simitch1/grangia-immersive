const $ = (selector) => document.querySelector(selector);

const dom = {
  app: $('#app'),
  homeLink: $('#homeLink'),
  homeScreen: $('#homeScreen'),
  experience: $('#experience'),
  startBtn: $('#startBtn'),
  presenterMode: $('#presenterMode'),
  presenterBadge: $('#presenterBadge'),
  sceneCounter: $('#sceneCounter'),
  overallProgress: $('#overallProgress'),
  scene: $('#scene'),
  sceneKicker: $('#sceneKicker'),
  sceneTitle: $('#sceneTitle'),
  sceneBody: $('#sceneBody'),
  reflectionPaper: $('#reflectionPaper'),
  paperLabel: $('#paperLabel'),
  paperQuestion: $('#paperQuestion'),
  paperInstruction: $('#paperInstruction'),
  checkpoint: $('#checkpoint'),
  checkpointHint: $('#checkpointHint'),
  checkpointBtn: $('#checkpointBtn'),
  finalActions: $('#finalActions'),
  restartBtn: $('#restartBtn'),
  autoRestart: $('#autoRestart'),
  countdown: $('#countdown'),
  countdownValue: $('#countdownValue'),
  pauseNotice: $('#pauseNotice'),
  controls: $('#controls'),
  stopBtn: $('#stopBtn'),
  previousBtn: $('#previousBtn'),
  pauseBtn: $('#pauseBtn'),
  pauseIcon: $('#pauseIcon'),
  pauseLabel: $('#pauseLabel'),
  nextBtn: $('#nextBtn'),
  sceneProgress: $('#sceneProgress'),
  muteBtn: $('#muteBtn'),
  volumeSlider: $('#volumeSlider'),
  fullscreenBtn: $('#fullscreenBtn'),
};

const audio = {
  new1: $('#audioNew1'),
  new2: $('#audioNew2'),
  new3: $('#audioNew3'),
};

const PAPER_COLORS = {
  red: '#d45b52',
  orange: '#e3a14d',
  yellow: '#e5d762',
  blue: '#85b9c8',
};

const scenes = [
  {
    slide: 2,
    label: 'L’invito',
    title: 'Buongiorno, sei pronto per immergerti in un’esperienza riflessiva?',
    body: ['Ti anticipiamo che sarà un po’ impegnativa, ma crediamo possa avere un forte valore…'],
    track: 'new1',
    duration: 14,
  },
  {
    slide: 3,
    label: 'Prima di partire',
    title: 'Se sei ancora qui è perché hai accettato il nostro invito…',
    body: ['Buon viaggio!'],
    track: 'new1',
    duration: 9,
  },
  {
    slide: 4,
    label: 'Come funziona',
    title: 'Nel corso della storia troverai alcune domande che guideranno il tuo pensiero…',
    body: ['Di volta in volta ti indicheremo il colore di un foglietto su cui scrivere le risposte in modo anonimo. Poi potrai riporre il foglietto nella scatola dello stesso colore.'],
    track: 'new1',
    duration: 18,
    dense: true,
  },
  {
    slide: 5,
    label: 'La tua vita',
    title: 'Pensa qualche secondo alla tua attuale vita…',
    body: ['In questa storia sei proprio tu, con le gioie e le fatiche che la vita porta con sé…'],
    track: 'new1',
    checkpoint: {
      minimum: 8,
      hint: 'Prenditi qualche secondo. Non devi scrivere nulla.',
      button: 'Ho riflettuto, continua',
    },
  },
  {
    slide: 6,
    label: 'Immagina',
    title: 'Nella tua città e nel tuo Stato ci sono grandi problemi, molto grandi…',
    body: ['Prova a immaginarti un problema talmente grande che ha a che fare con la sopravvivenza…'],
    track: null,
    duration: 16,
  },
  {
    slide: 7,
    label: 'La decisione',
    title: 'Prendi la decisione di partire.',
    body: [
      'Migrare è la soluzione che ti sembra migliore, viste le condizioni. Non sai di preciso dove andrai…',
      'A prescindere dalla tua situazione familiare, le condizioni ti obbligano a partire in solitaria. Sai che sarà complesso e provi la via per poi, eventualmente, facilitare altri componenti della tua famiglia.',
    ],
    track: 'new2',
    duration: 22,
    dense: true,
  },
  {
    slide: 8,
    label: 'Foglietto rosso',
    track: 'new2',
    paper: {
      color: 'red',
      label: 'Scrivi poche parole sul foglietto rosso',
      question: 'Quali emozioni provi all’idea di dover lasciare la tua attuale vita in condizioni d’emergenza, verso l’ignoto e lasciando persone care?',
      instruction: 'Quando hai risposto, riponi il cartoncino nella scatola rossa.',
    },
    checkpoint: {
      minimum: 12,
      hint: 'Il passaggio successivo si attiverà dopo un breve tempo minimo. Puoi restare quanto vuoi.',
      button: 'Continua il viaggio',
    },
  },
  {
    slide: 9,
    label: 'Foglietto arancione',
    track: 'new2',
    paper: {
      color: 'orange',
      label: 'Scrivi poche parole sul foglietto arancione',
      question: 'Quali emozioni provi all’idea di cosa ti aspetta nel luogo, che non conosci, dove andrai?',
      instruction: 'Quando hai risposto, riponi il cartoncino nella scatola arancione.',
    },
    checkpoint: {
      minimum: 12,
      hint: 'Non esiste una risposta giusta. Prosegui quando sei pronto.',
      button: 'Continua il viaggio',
    },
  },
  {
    slide: 10,
    label: 'Il viaggio',
    title: 'Parti. Il viaggio è lungo e complesso.',
    body: [
      'Ci sono tante difficoltà, alcune che ti mettono a rischio vita, ma tu sopravvivi. Non tutte le persone accanto a te hanno la stessa sorte…',
      'Ti richiede molti più soldi di quelli che avevi preventivato e anche tante energie fisiche e mentali.',
    ],
    track: 'new2',
    duration: 22,
    dense: true,
  },
  {
    slide: 11,
    label: 'La destinazione',
    title: 'Giungi a destinazione senza soldi, con tanta stanchezza.',
    body: [
      'Non conosci nessuno tranne poche persone incontrate sulla strada, con le quali hai condiviso tante fatiche, ma che non conosci davvero…',
      'Non sai parlare la lingua di questo nuovo Paese…',
    ],
    track: 'new2',
    duration: 20,
    dense: true,
  },
  {
    slide: 12,
    label: 'L’arrivo',
    title: 'Non sai dove andare e cosa fare.',
    body: ['Non hai soldi, senti tanta stanchezza addosso, hai fame e ti senti male…', 'Inoltre sei molto, molto triste…'],
    track: 'new2',
    duration: 17,
  },
  {
    slide: 13,
    label: 'L’attesa',
    title: 'Scopri che ci sono luoghi dove puoi essere ospitato.',
    body: [
      'Ci vai, ma non avevi capito che c’era una lista d’attesa per l’ingresso…',
      'Ti dicono dove andare a mangiare provvisoriamente. Mentre attendi alcuni giorni, dormi per strada. Per fortuna è estate.',
    ],
    track: 'new2',
    duration: 22,
    dense: true,
  },
  {
    slide: 14,
    label: 'Il centro d’accoglienza',
    title: 'Finalmente arriva il giorno dell’ingresso nel centro d’accoglienza.',
    body: [
      'Ti accolgono delle persone professioniste che ti leggono tante regole della casa e ti consegnano un regolamento tradotto nella tua lingua. Da quanto comprendi avrai una stanza che condividerai con un’altra persona.',
      'Non capisci proprio tutte le regole, ma la stanchezza ti impedisce di fare domande. Vuoi riposarti.',
    ],
    track: 'new2',
    duration: 24,
    dense: true,
    photo: true,
  },
  {
    slide: 15,
    label: 'I giorni successivi',
    title: 'Inizi a conoscere la casa dove sarai ospite per qualche tempo.',
    body: [
      'Se non hai capito male, sei mesi… Ti manca tanto la tua famiglia e il tuo Paese, anche se sai che non potevi restare là.',
      'Finalmente ti riposi un po’. La stanchezza fisica e mentale accumulata è davvero tanta; non avresti mai immaginato di sentirti così.',
    ],
    track: 'new2',
    duration: 23,
    dense: true,
    photo: true,
  },
  {
    slide: 16,
    label: 'Foglietto giallo',
    track: 'new3',
    paper: {
      color: 'yellow',
      label: 'Prendi il foglietto giallo',
      question: 'Ora che sei in accoglienza, di cosa senti che avresti bisogno per sentirti bene?',
      instruction: 'Pensa e scrivi tutti i bisogni e i desideri che ti vengono in mente.',
    },
    checkpoint: {
      minimum: 15,
      hint: 'Dai spazio sia ai bisogni immediati sia ai desideri.',
      button: 'Ho terminato, continua',
    },
  },
  {
    slide: 17,
    label: 'Bisogni e desideri',
    title: 'È stato facile rispondere alla domanda precedente?',
    body: [
      'Non ti chiediamo di scriverlo…',
      'Sappi che per persone traumatizzate individuare e pensare ai propri desideri è molto difficile…',
      'Ma il desiderio è ciò che ci rende vivi.',
    ],
    track: 'new3',
    checkpoint: {
      minimum: 7,
      hint: 'La domanda può restare aperta.',
      button: 'Continua',
    },
  },
  {
    slide: 18,
    label: 'Nuove complessità',
    title: 'Le complessità non sono terminate. Si sono modificate.',
    body: [
      'Sei in questo nuovo Paese da un po’ di tempo. Ti avevano detto che con l’arrivo a destinazione tutto sarebbe stato in discesa, ma non è così…',
      'I documenti sono molto difficili da ottenere, sia per la burocrazia sia per il trattamento durante gli accessi in Questura. Spesso è mortificante…',
    ],
    track: 'new3',
    duration: 24,
    dense: true,
  },
  {
    slide: 19,
    label: 'Lingua e lavoro',
    title: 'Imparare la nuova lingua è davvero complesso.',
    body: [
      'Ci sono sempre tanti pensieri che ti affollano la mente. Hai bisogno di lavorare, ma non trovi lavoro.',
      'La mancata conoscenza della lingua ti frena e ti chiedono competenze molto diverse da quelle che hai. Eppure te la sei sempre cavata nella vita e nel tuo Paese sentivi di avere un valore come persona. Qui, a volte, ti viene da dubitarne rispetto a questi standard.',
    ],
    track: 'new3',
    duration: 26,
    dense: true,
  },
  {
    slide: 20,
    label: 'La famiglia',
    title: 'Da quando sei in accoglienza riesci a contattare la tua famiglia…',
    body: ['Non stanno bene. Ti chiedono quando possono raggiungerti e di mandare loro dei soldi…', 'Ma tu non sai come aiutarli…'],
    track: 'new3',
    duration: 18,
    dense: true,
  },
  {
    slide: 21,
    label: 'Ci fermiamo qui',
    title: 'La storia continua, per ogni persona in un modo diverso…',
    body: [
      'Ci fermiamo qui nel nostro viaggio.',
      'Tutte le persone sono piene di risorse e competenze che sicuramente metteranno in campo. Ma forse, su temi così ampi e complessi, sarebbe importante una riflessione che va oltre l’individuale…',
    ],
    track: 'new3',
    duration: 22,
    dense: true,
  },
  {
    slide: 22,
    label: 'Foglietto azzurro',
    track: 'new3',
    paper: {
      color: 'blue',
      label: 'Prendi il foglietto azzurro',
      question: 'Cosa credi che potresti fare tu, o anche noi, per supportare le persone migranti?',
      instruction: 'Scrivi qualche idea e riponi il cartoncino nella scatola azzurra.',
    },
    checkpoint: {
      minimum: 15,
      hint: 'Puoi pensare ad azioni individuali, collettive o istituzionali.',
      button: 'Continua',
    },
  },
  {
    slide: 23,
    label: 'Prima di concludere',
    title: 'È stato complesso questo tuo viaggio immaginario?',
    body: [
      'Se lo desideri, nell’altra stanza puoi trovare un albo illustrato sul trauma: si intitola «Il buco». Puoi leggerlo se vuoi.',
      'Gli albi illustrati non sono pensati solo per i bambini, ma aiutano a riflettere anche gli adulti, in modo leggero e profondo, dando segnali di speranza.',
    ],
    track: 'new3',
    checkpoint: {
      minimum: 6,
      hint: 'Prima di concludere, prenditi un ultimo momento.',
      button: 'Concludi il viaggio',
    },
    dense: true,
  },
  {
    slide: 24,
    label: 'Grazie',
    title: 'Grazie per aver scelto di fare questo viaggio.',
    body: [
      'Le persone accolte dalla Grangia di Monluè ne hanno fatti tanti e ancora ne faranno, ma anche tu sei in viaggio nella tua vita…',
      'Chissà quali meravigliosi incontri ci porteranno questi viaggi. Magari alcuni tratti del nostro cammino si incroceranno, come oggi.',
      'È stato bello incontrarsi.',
    ],
    track: 'new3',
    final: true,
    photo: true,
    dense: true,
  },
];

const state = {
  started: false,
  index: 0,
  paused: false,
  presenter: false,
  muted: false,
  volume: 0.34,
  currentTrack: null,
  timer: null,
  remainingMs: 0,
  totalMs: 0,
  gateRemainingMs: 0,
  gateUnlocked: false,
  lastTick: 0,
  transitioning: false,
  autoRestartRemainingMs: 0,
  sessionId: 0,
};

Object.values(audio).forEach((track) => {
  track.volume = 0;
});

function paragraphs(items = []) {
  return items.map((item) => `<p>${item}</p>`).join('');
}

function wait(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

function animate(targets, from, to) {
  if (!window.gsap) {
    const list = Array.isArray(targets) ? targets : [targets];
    list.filter(Boolean).forEach((target) => {
      if ('opacity' in to) target.style.opacity = to.opacity;
      if ('x' in to) target.style.transform = `translateX(${to.x}px)`;
      if ('y' in to) target.style.transform = `translateY(${to.y}px)`;
    });
    return Promise.resolve();
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.set(targets, to);
    return Promise.resolve();
  }
  return gsap.fromTo(targets, from, to).then();
}

function updateAudioButton() {
  const isOff = state.muted || state.volume === 0;
  dom.muteBtn.textContent = isOff ? 'Audio off' : 'Audio';
  dom.muteBtn.setAttribute('aria-pressed', String(isOff));
}

async function unlockAudio() {
  await Promise.all(Object.values(audio).map(async (track) => {
    try {
      await track.play();
      track.pause();
      track.currentTime = 0;
    } catch (_) {
      // Il browser può negare il preavvio; il click successivo riproverà.
    }
  }));
}

async function setTrack(name) {
  if (!name) {
    const oldTracks = Object.values(audio);
    oldTracks.forEach((track) => {
      gsap.to(track, {
        volume: 0,
        duration: 1.8,
        overwrite: true,
        onComplete: () => track.pause(),
      });
    });
    state.currentTrack = null;
    return;
  }

  const next = audio[name];
  if (!next) return;

  if (state.currentTrack === name) {
    if (!state.paused) {
      try { await next.play(); } catch (_) {}
    }
    gsap.to(next, { volume: state.muted ? 0 : state.volume, duration: 0.5, overwrite: true });
    return;
  }

  const previous = state.currentTrack ? audio[state.currentTrack] : null;
  state.currentTrack = name;

  try { await next.play(); } catch (_) {}
  gsap.to(next, {
    volume: state.muted || state.paused ? 0 : state.volume,
    duration: 2.2,
    overwrite: true,
  });

  if (previous && previous !== next) {
    gsap.to(previous, {
      volume: 0,
      duration: 2.2,
      overwrite: true,
      onComplete: () => previous.pause(),
    });
  }
}

function stopAllAudio(reset = false) {
  Object.values(audio).forEach((track) => {
    gsap.killTweensOf(track);
    track.pause();
    track.volume = 0;
    if (reset) track.currentTime = 0;
  });
  state.currentTrack = null;
}

function clearSceneTimer() {
  if (state.timer) window.clearInterval(state.timer);
  state.timer = null;
}

function updateGateButton() {
  const scene = scenes[state.index];
  if (!scene?.checkpoint) return;

  if (state.gateUnlocked) {
    dom.checkpointBtn.disabled = false;
    dom.checkpointBtn.textContent = scene.checkpoint.button;
  } else {
    const seconds = Math.max(1, Math.ceil(state.gateRemainingMs / 1000));
    dom.checkpointBtn.disabled = true;
    dom.checkpointBtn.textContent = `Continua tra ${seconds} s`;
  }

  dom.nextBtn.disabled = !state.gateUnlocked;
}

function tick() {
  const now = performance.now();
  const delta = Math.min(now - state.lastTick, 250);
  state.lastTick = now;

  if (!state.started || state.paused || state.transitioning) return;

  const scene = scenes[state.index];

  if (scene.checkpoint && !state.gateUnlocked) {
    state.gateRemainingMs = Math.max(0, state.gateRemainingMs - delta);
    if (state.gateRemainingMs === 0) state.gateUnlocked = true;
    updateGateButton();
    const gateProgress = state.gateUnlocked ? 1 : 1 - (state.gateRemainingMs / (scene.checkpoint.minimum * 1000));
    dom.sceneProgress.style.width = `${Math.max(0, gateProgress) * 100}%`;
  } else if (!scene.checkpoint && !scene.final) {
    state.remainingMs = Math.max(0, state.remainingMs - delta);
    const progress = state.totalMs ? 1 - (state.remainingMs / state.totalMs) : 0;
    dom.sceneProgress.style.width = `${Math.max(0, progress) * 100}%`;
    if (state.remainingMs === 0) nextScene();
  }

  if (scene.final && state.presenter && state.autoRestartRemainingMs > 0) {
    state.autoRestartRemainingMs = Math.max(0, state.autoRestartRemainingMs - delta);
    const seconds = Math.ceil(state.autoRestartRemainingMs / 1000);
    dom.autoRestart.textContent = `Ritorno automatico alla pagina iniziale tra ${seconds} secondi.`;
    if (state.autoRestartRemainingMs === 0) goHome();
  }
}

function startSceneTimer(scene) {
  clearSceneTimer();
  state.totalMs = (scene.duration || 0) * 1000;
  state.remainingMs = state.totalMs;
  state.gateRemainingMs = (scene.checkpoint?.minimum || 0) * 1000;
  state.gateUnlocked = !scene.checkpoint || state.gateRemainingMs === 0;
  state.autoRestartRemainingMs = scene.final && state.presenter ? 20000 : 0;
  state.lastTick = performance.now();

  dom.sceneProgress.style.width = scene.final ? '100%' : '0%';
  if (scene.checkpoint) updateGateButton();

  state.timer = window.setInterval(tick, 100);
}

function updateControls(scene) {
  dom.previousBtn.disabled = state.index === 0 || state.transitioning;
  dom.nextBtn.disabled = Boolean(scene.final || state.transitioning || (scene.checkpoint && !state.gateUnlocked));
  dom.pauseBtn.disabled = state.transitioning;
  dom.sceneCounter.textContent = `${String(state.index + 1).padStart(2, '0')} / ${scenes.length} · ${scene.label}`;
  dom.overallProgress.style.width = `${((state.index + 1) / scenes.length) * 100}%`;
}

function renderScene(scene) {
  dom.app.classList.toggle('has-photo', Boolean(scene.photo));
  dom.scene.className = `scene${scene.dense ? ' is-dense' : ''}${scene.paper ? ' has-paper' : ''}`;
  dom.sceneKicker.textContent = `${String(scene.slide).padStart(2, '0')} · ${scene.label}`;
  dom.sceneTitle.textContent = scene.title || '';
  dom.sceneBody.innerHTML = paragraphs(scene.body);

  if (scene.paper) {
    dom.reflectionPaper.hidden = false;
    dom.reflectionPaper.style.setProperty('--paper-color', PAPER_COLORS[scene.paper.color]);
    dom.paperLabel.textContent = scene.paper.label;
    dom.paperQuestion.textContent = scene.paper.question;
    dom.paperInstruction.textContent = scene.paper.instruction;
  } else {
    dom.reflectionPaper.hidden = true;
  }

  if (scene.checkpoint) {
    dom.checkpoint.hidden = false;
    dom.checkpointHint.textContent = scene.checkpoint.hint;
  } else {
    dom.checkpoint.hidden = true;
  }

  dom.finalActions.hidden = !scene.final;
  dom.autoRestart.hidden = !(scene.final && state.presenter);
  if (scene.final && state.presenter) {
    dom.autoRestart.textContent = 'Ritorno automatico alla pagina iniziale tra 20 secondi.';
  }

  updateControls(scene);
}

async function showScene(index, direction = 1) {
  if (!state.started || state.transitioning || index < 0 || index >= scenes.length) return;

  const sessionId = state.sessionId;
  state.transitioning = true;
  clearSceneTimer();
  updateControls(scenes[state.index]);

  if (!dom.experience.hidden) {
    await animate(dom.scene, { opacity: 1, x: 0 }, {
      opacity: 0,
      x: direction >= 0 ? -24 : 24,
      duration: 0.35,
      ease: 'power2.in',
    });
  }
  if (!state.started || sessionId !== state.sessionId) return;

  state.index = index;
  const scene = scenes[index];
  renderScene(scene);
  await setTrack(scene.track);
  if (!state.started || sessionId !== state.sessionId) return;

  gsap.set(dom.scene, { opacity: 1, x: 0 });
  const animatedContent = scene.paper
    ? [dom.sceneKicker, dom.reflectionPaper, dom.checkpoint]
    : [dom.sceneKicker, dom.sceneTitle, dom.sceneBody, scene.checkpoint ? dom.checkpoint : dom.finalActions];

  await animate(animatedContent, { opacity: 0, y: 20 }, {
    opacity: 1,
    y: 0,
    duration: 0.72,
    stagger: 0.09,
    ease: 'power3.out',
  });
  if (!state.started || sessionId !== state.sessionId) return;

  state.transitioning = false;
  startSceneTimer(scene);
  updateControls(scene);
  dom.sceneTitle.focus({ preventScroll: true });
}

function nextScene() {
  if (!state.started || state.transitioning) return;
  const scene = scenes[state.index];
  if (scene.final || (scene.checkpoint && !state.gateUnlocked)) return;
  showScene(state.index + 1, 1);
}

function previousScene() {
  if (!state.started || state.transitioning || state.index === 0) return;
  showScene(state.index - 1, -1);
}

function setPaused(paused) {
  if (!state.started) return;
  state.paused = paused;
  dom.pauseNotice.hidden = !paused;
  dom.pauseIcon.textContent = paused ? '▶' : 'Ⅱ';
  dom.pauseLabel.textContent = paused ? 'Riprendi' : 'Pausa';
  dom.pauseBtn.setAttribute('aria-label', paused ? 'Riprendi l’esperienza' : 'Metti in pausa');

  if (state.currentTrack) {
    const track = audio[state.currentTrack];
    if (paused) {
      track.pause();
    } else {
      track.play().catch(() => {});
      gsap.to(track, { volume: state.muted ? 0 : state.volume, duration: 0.4, overwrite: true });
    }
  }
  state.lastTick = performance.now();
}

function toggleMute() {
  state.muted = !state.muted;
  updateAudioButton();
  Object.entries(audio).forEach(([name, track]) => {
    const target = !state.muted && name === state.currentTrack && !state.paused ? state.volume : 0;
    gsap.to(track, { volume: target, duration: 0.35, overwrite: true });
  });
}

function setVolume(value) {
  state.volume = Math.max(0, Math.min(1, Number(value) / 100));
  state.muted = state.volume === 0;
  updateAudioButton();
  if (state.currentTrack) {
    gsap.to(audio[state.currentTrack], {
      volume: state.muted || state.paused ? 0 : state.volume,
      duration: 0.2,
      overwrite: true,
    });
  }
}

async function playCountdown() {
  dom.countdown.hidden = false;
  for (const number of [5, 4, 3, 2, 1]) {
    dom.countdownValue.textContent = number;
    await animate(dom.countdownValue, { opacity: 0, scale: 0.88 }, {
      opacity: 1,
      scale: 1,
      duration: 0.35,
      ease: 'power2.out',
    });
    await wait(520);
    await animate(dom.countdownValue, { opacity: 1 }, { opacity: 0, duration: 0.18 });
  }
  dom.countdownValue.textContent = 'Buon viaggio';
  await animate(dom.countdownValue, { opacity: 0, scale: 0.96 }, {
    opacity: 1,
    scale: 1,
    duration: 0.55,
  });
  await wait(650);
  await animate(dom.countdown, { opacity: 1 }, { opacity: 0, duration: 0.45 });
  dom.countdown.hidden = true;
  gsap.set(dom.countdown, { opacity: 1 });
}

async function startExperience() {
  if (state.started) return;
  state.started = true;
  const sessionId = ++state.sessionId;
  state.presenter = dom.presenterMode.checked;
  state.paused = false;
  state.index = 0;

  dom.app.classList.remove('is-home');
  dom.homeScreen.hidden = true;
  dom.experience.hidden = false;
  dom.controls.hidden = true;
  dom.presenterBadge.hidden = !state.presenter;

  await unlockAudio();
  if (!state.started || sessionId !== state.sessionId) return;
  await playCountdown();
  if (!state.started || sessionId !== state.sessionId) return;
  dom.controls.hidden = false;
  await showScene(0, 1);
}

function goHome() {
  clearSceneTimer();
  stopAllAudio(true);
  state.started = false;
  state.sessionId += 1;
  state.paused = false;
  state.transitioning = false;
  state.index = 0;
  state.presenter = false;

  dom.app.classList.add('is-home');
  dom.app.classList.remove('has-photo');
  dom.experience.hidden = true;
  dom.controls.hidden = true;
  dom.countdown.hidden = true;
  dom.pauseNotice.hidden = true;
  dom.homeScreen.hidden = false;
  dom.presenterBadge.hidden = true;
  dom.sceneCounter.textContent = 'Esperienza immersiva';
  dom.overallProgress.style.width = '0%';
  dom.startBtn.focus({ preventScroll: true });
}

async function toggleFullscreen() {
  try {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
  } catch (_) {
    // Il browser può impedire lo schermo intero in contesti incorporati.
  }
}

dom.startBtn.addEventListener('click', startExperience);
dom.homeLink.addEventListener('click', (event) => {
  event.preventDefault();
  goHome();
});
dom.stopBtn.addEventListener('click', goHome);
dom.previousBtn.addEventListener('click', previousScene);
dom.nextBtn.addEventListener('click', nextScene);
dom.pauseBtn.addEventListener('click', () => setPaused(!state.paused));
dom.checkpointBtn.addEventListener('click', nextScene);
dom.restartBtn.addEventListener('click', goHome);
dom.muteBtn.addEventListener('click', toggleMute);
dom.volumeSlider.addEventListener('input', (event) => setVolume(event.target.value));
dom.fullscreenBtn.addEventListener('click', toggleFullscreen);

window.addEventListener('keydown', (event) => {
  if (!state.started || event.target.matches('input, button')) return;
  if (event.key === 'ArrowLeft') previousScene();
  if (event.key === 'ArrowRight') nextScene();
  if (event.key === ' ') {
    event.preventDefault();
    setPaused(!state.paused);
  }
  if (event.key.toLowerCase() === 'm') toggleMute();
  if (event.key.toLowerCase() === 'f') toggleFullscreen();
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden && state.started && !state.paused) setPaused(true);
});

const params = new URLSearchParams(window.location.search);
dom.presenterMode.checked = params.get('presenter') === '1';
updateAudioButton();
