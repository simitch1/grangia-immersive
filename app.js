/*
  Grangia Immersive Experience
  Prototype narrativo basato sulla presentazione "Grangia x 40 anni.pptx".
  GSAP gestisce transizioni, tempi, countdown, pause e crossfade audio.
*/

const $ = (s) => document.querySelector(s);
const dom = {
  startScreen: $('#startScreen'), startBtn: $('#startBtn'),
  bgA: $('#bgA'), bgB: $('#bgB'),
  content: $('#content'), kicker: $('#kicker'), title: $('#title'), body: $('#body'), aside: $('#aside'),
  visualCard: $('#visualCard'), visualImage: $('#visualImage'),
  reflection: $('#reflection'), reflectionPaper: $('#reflectionPaper'), paperLabel: $('#paperLabel'),
  paperQuestion: $('#paperQuestion'), paperHint: $('#paperHint'), timerValue: $('#timerValue'), timerText: $('#timerText'), continueBtn: $('#continueBtn'),
  countdown: $('#countdown'), countdownValue: $('#countdownValue'),
  progressBar: $('#progressBar'), sceneLabel: $('#sceneLabel'), muteBtn: $('#muteBtn'), fullscreenBtn: $('#fullscreenBtn'),
};

const audio = {
  soglia: $('#audioSoglia'),
  attraversamento: $('#audioAttraversamento'),
  approdo: $('#audioApprodo'),
};
Object.values(audio).forEach(a => { a.volume = 0; a.loop = true; });

const IMAGES = {
  // Fonte: La Grangia di Monluè
  casa: 'https://www.lagrangiadimonlue.org/wp-content/uploads/2015/09/edificio-grangia.jpg',
  // Fonti: Unsplash (crediti nel README)
  stazione: 'https://images.unsplash.com/photo-1771308456967-d1481943ea31?auto=format&fit=crop&fm=jpg&q=80&w=2400',
  notte: 'https://images.unsplash.com/photo-1668417862632-53654d39d7b6?auto=format&fit=crop&fm=jpg&q=78&w=2200',
  milano: 'https://images.unsplash.com/photo-1547473836-efa6d96ae1f1?auto=format&fit=crop&fm=jpg&q=78&w=2400',
  scrittura: 'https://images.unsplash.com/photo-1621459554273-b7af181b19d0?auto=format&fit=crop&fm=jpg&q=78&w=2200',
  domanda: 'assets/img/foglietti-domanda.png',
};

const scenes = [
  {
    id:'presente', label:'La tua vita', audio:'soglia', seconds:8, bg:IMAGES.domanda,
    kicker:'Prima di partire',
    title:'Pensa qualche secondo alla tua vita.',
    body:['In questa storia sei proprio tu, con le gioie e le fatiche che la vita porta con sé.'],
    aside:'Non devi “recitare” un personaggio. Prova a restare vicino a ciò che senti adesso.'
  },
  {
    id:'emergenza', label:'L’emergenza', audio:'soglia', seconds:10, bg:null,
    kicker:'Immagina',
    title:'Nella tua città c’è un problema enorme.',
    body:['Un problema che ha a che fare con la sopravvivenza.', 'Le condizioni ti costringono a prendere una decisione che non avresti voluto prendere.'],
    aside:'La musica si assottiglia. Resta qualche secondo con questa possibilità.'
  },
  {
    id:'partenza', label:'La decisione', audio:'attraversamento', seconds:10, bg:IMAGES.stazione,
    kicker:'La decisione',
    title:'Partire.',
    body:['Migrare ti sembra la soluzione migliore.', 'Non sai con precisione dove andrai. Parti in solitaria e immagini, forse, di poter facilitare un giorno il viaggio di chi ami.'],
    aside:'Non è una scelta leggera. È una scelta dentro l’emergenza.'
  },
  {
    type:'reflection', id:'rosso', label:'Foglietto rosso', color:'red', seconds:24, audio:'attraversamento',
    paper:'FOGLIETTO ROSSO',
    question:'Quali emozioni provi all’idea di lasciare la tua vita, verso l’ignoto, lasciando persone care?',
    hint:'Scrivi poche parole. Quando hai finito, riponi il cartoncino nella scatola rossa. Il pulsante si attiva dopo un breve tempo minimo di riflessione.'
  },
  {
    type:'reflection', id:'arancione', label:'Foglietto arancione', color:'orange', seconds:22, audio:'attraversamento',
    paper:'FOGLIETTO ARANCIONE',
    question:'Quali emozioni provi pensando a ciò che potrebbe aspettarti nel luogo, ancora sconosciuto, dove andrai?',
    hint:'Non cercare una risposta “giusta”. Annota poche parole e riponi il cartoncino nella scatola arancione.'
  },
  {
    id:'viaggio', label:'Il viaggio', audio:'attraversamento', seconds:12, bg:IMAGES.notte,
    kicker:'Il viaggio comincia',
    title:'È lungo. È complesso.',
    body:['Ci sono difficoltà che ti mettono a rischio vita. Tu sopravvivi; non tutte le persone accanto a te hanno la stessa sorte.', 'Servono più soldi del previsto, più energie fisiche, più energie mentali.'],
    aside:'Qui la regia rallenta: meno parole, più spazio, più suono.'
  },
  {
    id:'arrivo', label:'L’arrivo', audio:'attraversamento', seconds:11, bg:IMAGES.milano,
    kicker:'Arrivi',
    title:'Senza soldi. Stanco. Senza lingua.',
    body:['Conosci solo poche persone incontrate lungo la strada.', 'Hai fame, ti senti male, sei molto triste. Non sai dove andare e cosa fare.'],
    aside:'La città è presente, ma non è ancora un luogo familiare.'
  },
  {
    id:'attesa', label:'L’attesa', audio:'approdo', seconds:10, bg:IMAGES.notte,
    kicker:'Cerchi un posto',
    title:'Scopri che esiste un luogo di accoglienza.',
    body:['Ma c’è una lista d’attesa.', 'Per alcuni giorni mangi dove ti indicano e dormi per strada. Per fortuna è estate.'],
    aside:'L’approdo non coincide subito con la sicurezza.'
  },
  {
    id:'accoglienza', label:'L’accoglienza', audio:'approdo', seconds:12, bg:IMAGES.casa,
    kicker:'Finalmente',
    title:'Entri nel centro di accoglienza.',
    body:['Persone professioniste ti spiegano molte regole e ti consegnano un regolamento tradotto nella tua lingua.', 'Avrai una stanza condivisa. Sei così stanco che non riesci a fare tutte le domande che vorresti.'],
    aside:'La Grangia accompagna persone richiedenti asilo, rifugiati e profughi in percorsi di accoglienza e integrazione.'
  },
  {
    id:'riposo', label:'I primi giorni', audio:'approdo', seconds:10, bg:IMAGES.casa,
    kicker:'Nei giorni successivi',
    title:'Finalmente riposi un po’.',
    body:['Ti manca la tua famiglia e il tuo Paese, anche se sai che non potevi restare là.', 'La stanchezza fisica e mentale accumulata è più grande di quanto avresti immaginato.'],
    aside:'Inizia un tempo diverso: non più solo sopravvivere, ma provare a ricostruire.'
  },
  {
    type:'reflection', id:'giallo', label:'Foglietto giallo', color:'yellow', seconds:34, audio:'approdo',
    paper:'FOGLIETTO GIALLO',
    question:'Ora che sei in accoglienza, di cosa avresti bisogno per sentirti bene?',
    hint:'Pensa e scrivi bisogni e desideri che ti vengono in mente. Individuare desideri può essere molto difficile quando si è attraversato un trauma.'
  },
  {
    id:'maslow', label:'Bisogni e desideri', audio:'approdo', seconds:10, bg:null, visual:'assets/img/maslow.png',
    kicker:'Bisogni',
    title:'Il desiderio è ciò che ci rende vivi.',
    body:['È stato facile rispondere?', 'Non serve scriverlo. La domanda resta aperta.'],
    aside:'La piramide di Maslow era presente nella traccia originale come immagine-guida.'
  },
  {
    id:'burocrazia', label:'La nuova complessità', audio:'attraversamento', seconds:11, bg:IMAGES.milano,
    kicker:'La storia continua',
    title:'Le difficoltà non sono finite. Sono cambiate.',
    body:['I documenti sono difficili da ottenere. Gli accessi agli uffici possono essere mortificanti.', 'Imparare la lingua è complesso quando la mente è piena di pensieri.'],
    aside:'La destinazione non è una “discesa”: è l’inizio di una nuova parte del viaggio.'
  },
  {
    id:'lavoro', label:'Lingua, lavoro, valore', audio:'attraversamento', seconds:11, bg:IMAGES.stazione,
    kicker:'Ricostruirsi',
    title:'Hai bisogno di lavorare. Ma il lavoro non arriva.',
    body:['Ti chiedono competenze diverse da quelle che hai.', 'Nel tuo Paese sentivi di avere un valore come persona. Qui, a volte, gli standard intorno a te ti fanno dubitare di quel valore.'],
    aside:'Il problema non è solo economico: riguarda identità, riconoscimento, autonomia.'
  },
  {
    id:'famiglia', label:'La famiglia lontana', audio:'soglia', seconds:10, bg:IMAGES.scrittura,
    kicker:'Riesci a contattare la tua famiglia',
    title:'Ti chiedono quando potranno raggiungerti.',
    body:['Ti chiedono aiuto e soldi.', 'Tu non sai ancora come aiutarli.'],
    aside:'A volte anche una telefonata può contenere insieme sollievo, responsabilità e impotenza.'
  },
  {
    id:'stopstoria', label:'Ci fermiamo qui', audio:'soglia', seconds:10, bg:null,
    kicker:'La storia continua',
    title:'Per ogni persona, in un modo diverso.',
    body:['Tutte le persone sono piene di risorse e competenze.', 'Ma, su temi così ampi e complessi, forse serve anche una riflessione che vada oltre l’individuale.'],
    aside:'Il viaggio immaginario si ferma qui. La domanda successiva riguarda noi.'
  },
  {
    type:'reflection', id:'azzurro', label:'Foglietto azzurro', color:'blue', seconds:34, audio:'soglia',
    paper:'FOGLIETTO AZZURRO',
    question:'Cosa credi che potresti fare tu — o che potremmo fare noi — per supportare le persone migranti?',
    hint:'Scrivi qualche idea. Quando hai finito, riponi il cartoncino nella scatola azzurra.'
  },
  {
    id:'epilogo', label:'Epilogo', audio:'approdo', seconds:12, bg:IMAGES.casa,
    kicker:'Prima di uscire',
    title:'È stato complesso questo viaggio immaginario?',
    body:['Se lo desideri, nell’altra stanza puoi trovare l’albo illustrato «Il buco», richiamato nella presentazione originale.', 'Anche gli adulti possono usare gli albi illustrati per riflettere in modo leggero e profondo, lasciando spazio alla speranza.'],
    aside:'Non è una verifica. È un invito a portare con te una domanda.'
  },
  {
    id:'finale', label:'Grazie', audio:'approdo', seconds:14, bg:IMAGES.casa,
    kicker:'Grazie per aver scelto di fare questo viaggio',
    title:'Anche tu sei in viaggio nella tua vita.',
    body:['Le persone accolte dalla Grangia di Monluè ne hanno fatti tanti e ancora ne faranno.', 'Chissà quali incontri ci porteranno questi viaggi. Magari alcuni tratti del nostro cammino si incroceranno, come oggi.'],
    aside:'È stato bello incontrarsi.'
  },
];

let bgFront = dom.bgA, bgBack = dom.bgB;
let currentTrack = null;
let muted = false;
let started = false;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function htmlParagraphs(items = []) { return items.map(x => `<p>${x}</p>`).join(''); }
function updateProgress(i) { gsap.to(dom.progressBar, { width:`${Math.round((i/scenes.length)*100)}%`, duration:.7, ease:'power2.out' }); }

async function setTrack(name, target = .38) {
  if (!name || !audio[name] || currentTrack === name) return;
  const next = audio[name];
  try { await next.play(); } catch (_) { /* click-start context should allow playback */ }
  const old = currentTrack ? audio[currentTrack] : null;
  currentTrack = name;
  gsap.to(next, { volume: muted ? 0 : target, duration:2.4, ease:'power2.out' });
  if (old && old !== next) gsap.to(old, { volume:0, duration:2.4, ease:'power2.out', onComplete:()=>old.pause() });
}
function duckAudio(to=.12, dur=1.5) {
  if (!currentTrack) return;
  gsap.to(audio[currentTrack], { volume: muted ? 0 : to, duration:dur, ease:'power2.out' });
}
function restoreAudio(to=.36, dur=1.8) {
  if (!currentTrack) return;
  gsap.to(audio[currentTrack], { volume: muted ? 0 : to, duration:dur, ease:'power2.out' });
}

function setBackground(url, duration=8) {
  if (!url) {
    gsap.to([bgFront,bgBack], { opacity:0, duration:1.2 });
    return;
  }
  bgBack.style.backgroundImage = `url("${url}")`;
  gsap.set(bgBack, { opacity:0, scale:1.04 });
  gsap.to(bgBack, { opacity:1, scale:1.0, duration:1.5, ease:'power2.out' });
  gsap.to(bgFront, { opacity:0, duration:1.5, ease:'power2.out' });
  gsap.to(bgBack, { scale:1.085, duration:Math.max(8,duration+3), ease:'none' });
  [bgFront,bgBack] = [bgBack,bgFront];
}

async function playCountdown() {
  dom.countdown.hidden = false;
  gsap.set(dom.countdown, { autoAlpha:1 });
  for (const n of [5,4,3,2,1]) {
    dom.countdownValue.textContent = n;
    gsap.fromTo(dom.countdownValue, { scale:.76, autoAlpha:0 }, { scale:1, autoAlpha:1, duration:.42, ease:'power3.out' });
    await sleep(720);
    await gsap.to(dom.countdownValue, { scale:1.1, autoAlpha:0, duration:.25 }).then();
  }
  dom.countdownValue.textContent = 'BUON VIAGGIO';
  dom.countdownValue.style.fontSize = 'clamp(44px, 8vw, 124px)';
  gsap.fromTo(dom.countdownValue, { y:20, autoAlpha:0 }, { y:0, autoAlpha:1, duration:.8, ease:'power3.out' });
  await sleep(1000);
  await gsap.to(dom.countdown, { autoAlpha:0, duration:1 }).then();
  dom.countdown.hidden = true;
}

async function playScene(scene) {
  dom.sceneLabel.textContent = scene.label;
  await setTrack(scene.audio);
  setBackground(scene.bg, scene.seconds);

  dom.reflection.hidden = true;
  dom.visualCard.hidden = !scene.visual;
  if (scene.visual) {
    dom.visualImage.src = scene.visual;
    dom.visualImage.alt = scene.id === 'maslow' ? 'Piramide di Maslow' : '';
    gsap.fromTo(dom.visualCard, { x:80, autoAlpha:0, rotate:1.5 }, { x:0, autoAlpha:1, rotate:0, duration:1.1, ease:'power3.out' });
  }
  dom.kicker.textContent = scene.kicker || '';
  dom.title.textContent = scene.title || '';
  dom.body.innerHTML = htmlParagraphs(scene.body || []);
  dom.aside.textContent = scene.aside || '';

  gsap.killTweensOf([dom.content, dom.kicker, dom.title, dom.body, dom.aside]);
  const tl = gsap.timeline();
  tl.set(dom.content,{autoAlpha:1})
    .fromTo(dom.kicker,{y:16,autoAlpha:0},{y:0,autoAlpha:1,duration:.55})
    .fromTo(dom.title,{y:30,autoAlpha:0},{y:0,autoAlpha:1,duration:1.05,ease:'power3.out'},'-=.25')
    .fromTo(dom.body.children,{y:22,autoAlpha:0},{y:0,autoAlpha:1,duration:.8,stagger:.18,ease:'power2.out'},'-=.55')
    .fromTo(dom.aside,{y:12,autoAlpha:0},{y:0,autoAlpha:1,duration:.7},'-=.35');
  await tl.then();
  await sleep(scene.seconds * 1000);
  await gsap.to([dom.content, dom.visualCard], { autoAlpha:0, y:-10, duration:.8, ease:'power2.inOut' }).then();
  gsap.set(dom.content,{y:0});
}

async function playReflection(scene) {
  dom.sceneLabel.textContent = scene.label;
  await setTrack(scene.audio);
  duckAudio(.10,1.3);
  dom.reflection.className = `reflection accent-${scene.color}`;
  dom.paperLabel.textContent = scene.paper;
  dom.paperQuestion.textContent = scene.question;
  dom.paperHint.textContent = scene.hint;
  dom.timerValue.textContent = scene.seconds;
  dom.timerText.textContent = 'Tempo minimo di riflessione';
  dom.continueBtn.disabled = true;
  dom.continueBtn.textContent = 'Continua il viaggio';
  dom.reflection.hidden = false;
  gsap.set(dom.reflection,{autoAlpha:0});
  gsap.fromTo(dom.reflectionPaper,{y:60,rotate:-2,autoAlpha:0},{y:0,rotate:-.6,autoAlpha:1,duration:1,ease:'power3.out'});
  gsap.to(dom.reflection,{autoAlpha:1,duration:.5});

  let remaining = scene.seconds;
  while (remaining > 0) {
    dom.timerValue.textContent = remaining;
    await sleep(1000);
    remaining--;
  }
  dom.timerValue.textContent = '✓';
  dom.timerText.textContent = 'Prenditi ancora tutto il tempo che ti serve';
  dom.continueBtn.disabled = false;
  gsap.fromTo(dom.continueBtn,{scale:.96},{scale:1,duration:.45,ease:'back.out(1.7)'});

  await new Promise(resolve => {
    const handler = () => { dom.continueBtn.removeEventListener('click', handler); resolve(); };
    dom.continueBtn.addEventListener('click', handler);
  });
  await gsap.to(dom.reflection,{autoAlpha:0,duration:.7,ease:'power2.inOut'}).then();
  dom.reflection.hidden = true;
  restoreAudio(.34,1.8);
}

async function runExperience() {
  await setTrack('soglia', .32);
  await playCountdown();
  for (let i=0;i<scenes.length;i++) {
    updateProgress(i+1);
    const scene = scenes[i];
    if (scene.type === 'reflection') await playReflection(scene);
    else await playScene(scene);
  }
  gsap.to(dom.progressBar,{width:'100%',duration:.5});
  duckAudio(.14,3);
}

function toggleMute() {
  muted = !muted;
  dom.muteBtn.textContent = muted ? 'Audio off' : 'Audio';
  Object.entries(audio).forEach(([name,a]) => gsap.to(a,{volume: muted ? 0 : (name===currentTrack ? .34 : 0),duration:.45}));
}
async function toggleFullscreen() {
  try {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
  } catch (_) {}
}

dom.startBtn.addEventListener('click', async () => {
  if (started) return;
  started = true;
  await Promise.all(Object.values(audio).map(a => a.play().then(()=>{a.pause();a.currentTime=0;}).catch(()=>{})));
  await gsap.to(dom.startScreen,{autoAlpha:0,duration:.9,ease:'power2.inOut'}).then();
  dom.startScreen.hidden = true;
  runExperience();
});
dom.muteBtn.addEventListener('click',toggleMute);
dom.fullscreenBtn.addEventListener('click',toggleFullscreen);
window.addEventListener('keydown',e=>{
  if (e.key.toLowerCase()==='m') toggleMute();
  if (e.key.toLowerCase()==='f') toggleFullscreen();
});

// Precarica gli sfondi remoti senza bloccare l'avvio.
Object.values(IMAGES).forEach(src => { if (/^https?:/.test(src)) { const i=new Image(); i.src=src; } });
