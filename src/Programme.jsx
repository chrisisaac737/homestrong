import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ibrqwdhrzlrihczfovmp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlicnF3ZGhyemxyaWhjemZvdm1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NDc0NTIsImV4cCI6MjA4OTQyMzQ1Mn0.cb_nF1bJtFQ6v7TBI2f-BLTYYGq7y24qzCQpPMzWI1Q'
)

const exercicesData = {
  1: [
    { nom: 'Échauffement vélo', duree: 300, series: 1, desc: 'Pédalez à rythme lent pour préparer vos muscles. Résistance minimale.' },
    { nom: 'Intervalle intensif', duree: 60, series: 5, desc: 'Pédalez le plus vite possible pendant 1 minute. Résistance maximale.' },
    { nom: 'Récupération active', duree: 60, series: 5, desc: 'Pédalez lentement pour récupérer entre les intervalles.' },
    { nom: 'Retour au calme', duree: 180, series: 1, desc: 'Pédalez doucement pour faire redescendre votre rythme cardiaque.' },
  ],
  2: [
    { nom: 'Corde à sauter — base', duree: 60, series: 3, desc: 'Sautez à rythme régulier, pieds joints. Gardez les coudes près du corps.' },
    { nom: 'Corde double vitesse', duree: 30, series: 3, desc: 'Accélérez le rythme au maximum pendant 30 secondes.' },
    { nom: 'Repos actif', duree: 45, series: 3, desc: 'Marchez sur place en respirant profondément.' },
  ],
  3: [
    { nom: 'Vélo — warm up', duree: 180, series: 1, desc: 'Échauffement progressif sur le vélo.' },
    { nom: 'Corde à sauter', duree: 60, series: 3, desc: 'Séries de corde à rythme soutenu.' },
    { nom: 'Bandes élastiques — jambes', duree: 45, series: 3, desc: 'Squats avec bande élastique autour des cuisses.' },
    { nom: 'Vélo — sprint final', duree: 120, series: 1, desc: 'Sprint final à résistance maximale.' },
  ],
  4: [
    { nom: 'Pompes', duree: 40, series: 3, desc: 'Mains à largeur d\'épaules, corps droit. Descendez jusqu\'à frôler le sol. Modifiez en posant les genoux si besoin.' },
    { nom: 'Squats', duree: 40, series: 3, desc: 'Pieds à largeur d\'épaules, dos droit. Descendez comme pour vous asseoir. Genoux dans l\'axe des pieds.' },
    { nom: 'Fentes alternées', duree: 40, series: 3, desc: 'Un pied devant, l\'autre derrière. Descendez le genou arrière vers le sol.' },
    { nom: 'Gainage planche', duree: 30, series: 3, desc: 'Avant-bras au sol, corps droit de la tête aux pieds. Contractez abdos et fessiers.' },
    { nom: 'Repos', duree: 60, series: 3, desc: 'Récupérez en respirant profondément.' },
  ],
  5: [
    { nom: 'Jumping jacks', duree: 45, series: 3, desc: 'Sautez en écartant bras et jambes simultanément. Atterrissez doucement.' },
    { nom: 'Squats sautés', duree: 30, series: 3, desc: 'Descendez en squat puis explosez vers le haut. Atterrissez en douceur.' },
    { nom: 'Mountain climbers', duree: 30, series: 3, desc: 'En position de pompe, ramenez les genoux vers la poitrine en alternance rapidement.' },
    { nom: 'Repos', duree: 60, series: 3, desc: 'Respirez profondément, récupérez.' },
  ],
  6: [
    { nom: 'Curl biceps', duree: 40, series: 3, desc: 'Debout, haltères en main, coudes collés au corps. Montez les haltères en contractant les biceps.' },
    { nom: 'Développé épaules', duree: 40, series: 3, desc: 'Assis, haltères à hauteur d\'épaules. Poussez vers le haut sans verrouiller les coudes.' },
    { nom: 'Rowing haltères', duree: 40, series: 3, desc: 'Penché en avant, dos droit. Tirez les haltères vers les hanches en serrant les omoplates.' },
    { nom: 'Repos', duree: 60, series: 3, desc: 'Récupérez entre les séries.' },
  ],
  7: [
    { nom: 'Squats avec bandes', duree: 45, series: 4, desc: 'Bande élastique autour des cuisses. Descendez en squat, poussez les genoux vers l\'extérieur.' },
    { nom: 'Fentes avec haltères', duree: 45, series: 3, desc: 'Un haltère dans chaque main. Alternez les jambes en contrôlant la descente.' },
    { nom: 'Hip thrust', duree: 40, series: 3, desc: 'Dos sur le sol, pieds à plat. Poussez les hanches vers le haut en contractant les fessiers.' },
    { nom: 'Repos', duree: 60, series: 4, desc: 'Récupérez entre les séries.' },
  ],
  8: [
    { nom: 'Pompes haltères', duree: 40, series: 3, desc: 'Pompes avec les mains sur les haltères pour plus d\'amplitude.' },
    { nom: 'Squat presse', duree: 45, series: 3, desc: 'Montez depuis le squat en poussant les haltères au-dessus de la tête.' },
    { nom: 'Rowing incliné', duree: 40, series: 3, desc: 'Penché en avant, tirez les haltères vers les hanches.' },
    { nom: 'Curl marteau', duree: 40, series: 3, desc: 'Haltères en prise neutre, montez en gardant les coudes fixes.' },
    { nom: 'Repos', duree: 60, series: 3, desc: 'Récupérez entre chaque exercice.' },
  ],
  9: [
    { nom: 'Pompes', duree: 40, series: 3, desc: 'Corps droit, mains à largeur d\'épaules. Modifiable avec les genoux au sol.' },
    { nom: 'Squats', duree: 40, series: 3, desc: 'Pieds à largeur d\'épaules, descendez les hanches en dessous des genoux.' },
    { nom: 'Gainage latéral', duree: 30, series: 2, desc: 'Sur le côté, un avant-bras au sol. Corps droit de la tête aux pieds.' },
    { nom: 'Abdominaux', duree: 40, series: 3, desc: 'Sur le dos, genoux pliés. Montez les épaules sans tirer sur le cou.' },
    { nom: 'Repos', duree: 45, series: 3, desc: 'Récupérez en respirant.' },
  ],
  10: [
    { nom: 'Dips sur chaise', duree: 40, series: 3, desc: 'Mains sur le bord d\'une chaise stable, jambes tendues. Descendez en pliant les coudes à 90°.' },
    { nom: 'Pike push-ups', duree: 30, series: 3, desc: 'En position V inversé, pliez les coudes pour descendre la tête vers le sol.' },
    { nom: 'Pompes larges', duree: 30, series: 3, desc: 'Mains plus larges que les épaules pour cibler les pectoraux.' },
    { nom: 'Repos', duree: 60, series: 3, desc: 'Récupérez entre chaque série.' },
  ],
  11: [
    { nom: 'Salutation au soleil', duree: 60, series: 3, desc: 'Enchaînement de postures debout — montée des bras, flexion avant, planche, cobra, chien tête en bas.' },
    { nom: 'Mobilité hanches', duree: 60, series: 2, desc: 'Rotations de hanches, fentes basses maintenues, ouverture des hanches.' },
    { nom: 'Étirements dos', duree: 60, series: 2, desc: 'Chat-vache, torsions assises, enfant.' },
  ],
  12: [
    { nom: 'Vélo — rythme modéré', duree: 600, series: 1, desc: 'Pédalez à rythme confortable, résistance moyenne. Maintenez une conversation.' },
    { nom: 'Récupération', duree: 120, series: 1, desc: 'Pédalez doucement, respirez profondément.' },
  ],
  13: [
    { nom: 'Gainage planche', duree: 30, series: 3, desc: 'Avant-bras au sol, corps parfaitement droit. Respirez régulièrement.' },
    { nom: 'Étirements ischio', duree: 60, series: 2, desc: 'Assis, jambes tendues, penchez-vous doucement vers l\'avant.' },
    { nom: 'Étirements quadriceps', duree: 30, series: 2, desc: 'Debout, tenez votre cheville dans le dos. Gardez les genoux joints.' },
    { nom: 'Respiration profonde', duree: 120, series: 1, desc: 'Inspirez 4 secondes, retenez 4 secondes, expirez 4 secondes.' },
  ],
  14: [
    { nom: 'Marche dynamique', duree: 120, series: 3, desc: 'Marchez en levant les genoux haut, balancez les bras.' },
    { nom: 'Respiration box', duree: 60, series: 3, desc: 'Inspirez 4s, retenez 4s, expirez 4s, retenez 4s. Répétez.' },
    { nom: 'Étirements complets', duree: 120, series: 1, desc: 'Étirez cou, épaules, dos, jambes progressivement.' },
  ],
}

const programmes = {
  poids: {
    avec: [
      { id: 1, nom: 'Cardio vélo', duree: 25, calories: 220, icone: '🚴', description: 'Intervalles sur vélo fixe pour brûler les calories efficacement.' },
      { id: 2, nom: 'Corde à sauter HIIT', duree: 15, calories: 180, icone: '⚡', description: 'Séries intenses de corde à sauter pour maximiser la dépense calorique.' },
      { id: 3, nom: 'Circuit cardio complet', duree: 30, calories: 280, icone: '🔥', description: 'Circuit combinant vélo, corde et bandes élastiques.' },
    ],
    sans: [
      { id: 4, nom: 'Burpees & Mountain climbers', duree: 20, calories: 200, icone: '💪', description: 'Enchaînement explosif au poids du corps — $0 requis.' },
      { id: 5, nom: 'HIIT sans matériel', duree: 15, calories: 160, icone: '⚡', description: 'Jumping jacks, squats sautés, fentes alternées.' },
    ]
  },
  muscle: {
    avec: [
      { id: 6, nom: 'Renforcement haut du corps', duree: 25, calories: 150, icone: '🏋️', description: 'Curl biceps, développé épaules et rowing avec haltères.' },
      { id: 7, nom: 'Jambes & fessiers', duree: 30, calories: 180, icone: '💪', description: 'Squats lestés, fentes et hip thrust avec bandes élastiques.' },
      { id: 8, nom: 'Full body haltères', duree: 35, calories: 220, icone: '🔥', description: 'Programme complet corps entier avec haltères ajustables.' },
    ],
    sans: [
      { id: 9, nom: 'Full body poids du corps', duree: 20, calories: 140, icone: '💪', description: 'Pompes, squats, fentes, gainage — $0 requis.' },
      { id: 10, nom: 'Dips & Pike push-ups', duree: 15, calories: 120, icone: '🏋️', description: 'Renforcement haut du corps sur chaise — $0 requis.' },
    ]
  },
  energie: {
    avec: [
      { id: 11, nom: 'Yoga & mobilité', duree: 20, calories: 80, icone: '🧘', description: 'Séquences de mobilité articulaire avec tapis.' },
      { id: 12, nom: 'Cardio doux vélo', duree: 25, calories: 140, icone: '🚴', description: 'Pédalage modéré pour booster l\'énergie sans épuisement.' },
    ],
    sans: [
      { id: 13, nom: 'Étirements & gainage', duree: 15, calories: 60, icone: '🧘', description: 'Routine complète d\'étirements et gainage — $0 requis.' },
      { id: 14, nom: 'Marche active & respiration', duree: 20, calories: 80, icone: '⚡', description: 'Exercices de respiration et marche dynamique.' },
    ]
  }
}

export default function Programme({ user, profile, onBack }) {
  const [mode, setMode] = useState('avec')
  const [seanceActive, setSeanceActive] = useState(null)
  const [exerciceIndex, setExerciceIndex] = useState(0)
  const [timerVal, setTimerVal] = useState(0)
  const [timerRunning, setTimerRunning] = useState(false)
  const [serieActuelle, setSerieActuelle] = useState(1)
  const [seanceTerminee, setSeanceTerminee] = useState(false)
  const [saving, setSaving] = useState(false)
  const [vue, setVue] = useState('liste')

  const objectif = profile?.objectif || 'poids'
  const listeProgrammes = programmes[objectif]?.[mode] || []

  useEffect(() => {
    let interval = null
    if (timerRunning && timerVal > 0) {
      interval = setInterval(() => setTimerVal(v => v - 1), 1000)
    } else if (timerVal === 0 && timerRunning) {
      setTimerRunning(false)
    }
    return () => clearInterval(interval)
  }, [timerRunning, timerVal])

  const demarrerSeance = (prog) => {
    setSeanceActive(prog)
    const exs = exercicesData[prog.id] || []
    setExerciceIndex(0)
    setTimerVal(exs[0]?.duree || 60)
    setSerieActuelle(1)
    setTimerRunning(false)
    setSeanceTerminee(false)
    setVue('exercice')
  }

  const exerciceSuivant = () => {
    const exs = exercicesData[seanceActive.id] || []
    const exActuel = exs[exerciceIndex]
    if (serieActuelle < exActuel.series) {
      setSerieActuelle(s => s + 1)
      setTimerVal(exActuel.duree)
      setTimerRunning(false)
    } else if (exerciceIndex < exs.length - 1) {
      const nextIdx = exerciceIndex + 1
      setExerciceIndex(nextIdx)
      setSerieActuelle(1)
      setTimerVal(exs[nextIdx].duree)
      setTimerRunning(false)
    } else {
      terminerSeance()
    }
  }

  const terminerSeance = async () => {
    setSaving(true)
    await supabase.from('workouts').insert({
      user_id: user.id,
      titre: seanceActive.nom,
      duree_min: seanceActive.duree,
      calories: seanceActive.calories,
      type: mode === 'avec' ? 'avec_equipement' : 'sans_equipement',
      date: new Date().toISOString().split('T')[0]
    })
    setSaving(false)
    setSeanceTerminee(true)
    setVue('felicitations')
  }

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return m > 0 ? `${m}:${sec.toString().padStart(2, '0')}` : `${sec}s`
  }

  // FÉLICITATIONS
  if (vue === 'felicitations') return (
    <div style={{minHeight:'100vh',background:'#1e2419',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'2rem',fontFamily:'sans-serif',textAlign:'center'}}>
      <div style={{fontSize:'4rem',marginBottom:'16px'}}>🎉</div>
      <h2 style={{color:'white',fontWeight:'800',fontSize:'1.5rem',marginBottom:'8px'}}>Séance terminée !</h2>
      <p style={{color:'rgba(255,255,255,0.5)',marginBottom:'24px',lineHeight:'1.6'}}>Tu as tenu ta promesse aujourd'hui. Chaque répétition compte.</p>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',width:'100%',maxWidth:'300px',marginBottom:'24px'}}>
        <div style={{background:'rgba(255,255,255,0.08)',borderRadius:'14px',padding:'14px',textAlign:'center'}}>
          <div style={{fontWeight:'800',fontSize:'1.3rem',color:'white'}}>{seanceActive?.duree}</div>
          <div style={{fontSize:'0.7rem',color:'rgba(255,255,255,0.4)',marginTop:'2px'}}>minutes</div>
        </div>
        <div style={{background:'rgba(255,255,255,0.08)',borderRadius:'14px',padding:'14px',textAlign:'center'}}>
          <div style={{fontWeight:'800',fontSize:'1.3rem',color:'#d4e84a'}}>{seanceActive?.calories}</div>
          <div style={{fontSize:'0.7rem',color:'rgba(255,255,255,0.4)',marginTop:'2px'}}>calories</div>
        </div>
      </div>
      <div style={{background:'rgba(212,232,74,0.1)',border:'1px solid rgba(212,232,74,0.2)',borderRadius:'14px',padding:'12px 16px',marginBottom:'24px',width:'100%',maxWidth:'300px'}}>
        <div style={{fontSize:'0.72rem',color:'#d4e84a',fontWeight:'500',marginBottom:'3px'}}>Badge débloqué !</div>
        <div style={{fontSize:'0.88rem',color:'white'}}>⚡ Séance complétée</div>
      </div>
      <button onClick={onBack} style={{background:'#d4e84a',color:'#111',border:'none',borderRadius:'99px',padding:'14px 28px',fontWeight:'600',fontSize:'0.95rem',cursor:'pointer'}}>
        Retour au tableau de bord →
      </button>
    </div>
  )

  // MINUTEUR EXERCICE
  if (vue === 'exercice') {
    const exs = exercicesData[seanceActive?.id] || []
    const exActuel = exs[exerciceIndex]
    const progression = ((exerciceIndex) / exs.length) * 100

    return (
      <div style={{minHeight:'100vh',background:'#f8f5ef',fontFamily:'sans-serif'}}>
        <div style={{background:'#1e2419',padding:'16px 20px'}}>
          <button onClick={() => setVue('detail')} style={{background:'rgba(255,255,255,0.1)',color:'white',border:'none',borderRadius:'99px',padding:'7px 14px',fontSize:'0.78rem',cursor:'pointer',marginBottom:'12px'}}>
            ← Retour
          </button>
          <div style={{fontSize:'0.82rem',fontWeight:'700',color:'white',marginBottom:'4px'}}>{seanceActive?.nom}</div>
          <div style={{height:'4px',background:'rgba(255,255,255,0.1)',borderRadius:'99px',overflow:'hidden'}}>
            <div style={{height:'100%',background:'#d4e84a',borderRadius:'99px',width: progression + '%',transition:'width 0.3s'}}></div>
          </div>
          <div style={{fontSize:'0.68rem',color:'rgba(255,255,255,0.4)',marginTop:'4px'}}>
            Exercice {exerciceIndex + 1} sur {exs.length}
          </div>
        </div>

        <div style={{padding:'20px',display:'flex',flexDirection:'column',alignItems:'center'}}>
          <div style={{fontSize:'0.9rem',fontWeight:'700',color:'#111',marginBottom:'4px',textAlign:'center'}}>{exActuel?.nom}</div>
          <div style={{fontSize:'0.75rem',color:'#6b7a6a',marginBottom:'4px'}}>Série {serieActuelle} sur {exActuel?.series}</div>

          <div style={{width:'160px',height:'160px',borderRadius:'50%',border:'4px solid #e8f7f1',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',margin:'20px 0',background:'white',boxShadow:'0 4px 20px rgba(26,158,110,0.15)'}}>
            <div style={{fontWeight:'800',fontSize:'2.5rem',color:'#111'}}>{formatTime(timerVal)}</div>
            <div style={{fontSize:'0.7rem',color:'#6b7a6a'}}>secondes</div>
          </div>

          <div style={{background:'white',borderRadius:'14px',padding:'14px',marginBottom:'20px',width:'100%',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
            <div style={{fontSize:'0.82rem',color:'#6b7a6a',lineHeight:'1.6'}}>{exActuel?.desc}</div>
          </div>

          <div style={{display:'flex',gap:'10px',width:'100%',marginBottom:'12px'}}>
            <button
              onClick={() => setTimerRunning(r => !r)}
              style={{flex:2,padding:'14px',borderRadius:'99px',border:'none',background: timerRunning ? '#EF9F27' : '#1a9e6e',color:'white',fontWeight:'600',fontSize:'0.95rem',cursor:'pointer'}}>
              {timerRunning ? '⏸ Pause' : '▶ Démarrer'}
            </button>
            <button
              onClick={() => { setTimerVal(exActuel?.duree || 60); setTimerRunning(false) }}
              style={{flex:1,padding:'14px',borderRadius:'99px',border:'1px solid #e8f7f1',background:'white',color:'#6b7a6a',fontSize:'0.88rem',cursor:'pointer'}}>
              ↺ Reset
            </button>
          </div>

          <button
            onClick={exerciceSuivant}
            style={{width:'100%',padding:'14px',borderRadius:'99px',border:'none',background:'#1e2419',color:'white',fontWeight:'600',fontSize:'0.9rem',cursor:'pointer'}}>
            {exerciceIndex === exs.length - 1 && serieActuelle === exActuel?.series
              ? saving ? 'Sauvegarde...' : '✓ Terminer la séance'
              : serieActuelle < exActuel?.series
              ? `Série suivante (${serieActuelle + 1}/${exActuel?.series}) →`
              : 'Exercice suivant →'}
          </button>
        </div>
      </div>
    )
  }

  // DÉTAIL SÉANCE
  if (vue === 'detail') {
    const exs = exercicesData[seanceActive?.id] || []
    return (
      <div style={{minHeight:'100vh',background:'#f8f5ef',fontFamily:'sans-serif'}}>
        <div style={{background:'#1e2419',padding:'20px'}}>
          <button onClick={() => setVue('liste')} style={{background:'rgba(255,255,255,0.1)',color:'white',border:'none',borderRadius:'99px',padding:'8px 16px',fontSize:'0.82rem',cursor:'pointer',marginBottom:'16px'}}>
            ← Retour
          </button>
          <div style={{fontSize:'0.72rem',padding:'3px 10px',borderRadius:'99px',background:'rgba(212,232,74,0.15)',color:'#d4e84a',display:'inline-block',marginBottom:'8px'}}>
            Recommandé pour toi
          </div>
          <div style={{fontSize:'1.2rem',fontWeight:'800',color:'white',marginBottom:'6px'}}>{seanceActive?.icone} {seanceActive?.nom}</div>
          <div style={{display:'flex',gap:'14px'}}>
            <span style={{fontSize:'0.78rem',color:'rgba(255,255,255,0.5)'}}>⏱ {seanceActive?.duree} min</span>
            <span style={{fontSize:'0.78rem',color:'rgba(255,255,255,0.5)'}}>🔥 {seanceActive?.calories} kcal</span>
            <span style={{fontSize:'0.78rem',color:'rgba(255,255,255,0.5)'}}>💪 {exs.length} exercices</span>
          </div>
        </div>

        <div style={{padding:'16px'}}>
          <div style={{fontSize:'0.72rem',fontWeight:'700',color:'#6b7a6a',letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:'10px'}}>
            Exercices de la séance
          </div>
          {exs.map((ex, i) => (
            <div key={i} style={{background:'white',borderRadius:'14px',padding:'13px 14px',marginBottom:'8px',display:'flex',gap:'12px',alignItems:'flex-start',boxShadow:'0 2px 6px rgba(0,0,0,0.05)'}}>
              <div style={{width:'28px',height:'28px',borderRadius:'8px',background:'#e8f7f1',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.75rem',fontWeight:'700',color:'#0d6b49',flexShrink:0}}>
                {i + 1}
              </div>
              <div style={{flex:1}}>
                <div style={{fontWeight:'600',fontSize:'0.88rem',color:'#111',marginBottom:'2px'}}>{ex.nom}</div>
                <div style={{fontSize:'0.75rem',color:'#6b7a6a',marginBottom:'4px'}}>{ex.desc}</div>
                <div style={{display:'flex',gap:'6px'}}>
                  <span style={{fontSize:'0.65rem',background:'#f0f0eb',color:'#6b7a6a',padding:'2px 7px',borderRadius:'99px'}}>⏱ {formatTime(ex.duree)}</span>
                  <span style={{fontSize:'0.65rem',background:'#e8f7f1',color:'#1a9e6e',padding:'2px 7px',borderRadius:'99px'}}>{ex.series} série{ex.series > 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>
          ))}

          <div style={{background:'#1e2419',borderRadius:'14px',padding:'13px',marginBottom:'16px',marginTop:'8px'}}>
            <div style={{fontSize:'0.8rem',color:'rgba(255,255,255,0.75)',lineHeight:'1.6',fontStyle:'italic'}}>
              "{objectif === 'poids' ? 'Chaque calorie brûlée te rapproche de ton objectif.' : objectif === 'muscle' ? 'La régularité construit les muscles.' : 'Ton énergie grandit à chaque séance.'}"
            </div>
          </div>

          <button onClick={() => demarrerSeance(seanceActive)} style={{width:'100%',padding:'16px',borderRadius:'99px',border:'none',background:'#1a9e6e',color:'white',fontWeight:'600',fontSize:'1rem',cursor:'pointer'}}>
            ▶ Démarrer la séance
          </button>
        </div>
      </div>
    )
  }

  // LISTE DES PROGRAMMES
  return (
    <div style={{minHeight:'100vh',background:'#f8f5ef',fontFamily:'sans-serif'}}>
      <div style={{background:'#1e2419',padding:'20px 20px 24px'}}>
        <button onClick={onBack} style={{background:'rgba(255,255,255,0.1)',color:'white',border:'none',borderRadius:'99px',padding:'8px 16px',fontSize:'0.82rem',cursor:'pointer',marginBottom:'16px'}}>
          ← Tableau de bord
        </button>
        <div style={{fontSize:'1.2rem',fontWeight:'800',color:'white',marginBottom:'4px'}}>Mes programmes</div>
        <div style={{fontSize:'0.82rem',color:'rgba(255,255,255,0.5)'}}>
          {objectif === 'poids' ? '🔥 Perte de poids' : objectif === 'muscle' ? '💪 Musculation' : '⚡ Énergie'}
        </div>
      </div>

      <div style={{display:'flex',gap:'8px',padding:'12px 16px',background:'white',borderBottom:'1px solid #e8f7f1'}}>
        <button onClick={() => setMode('avec')} style={{flex:1,padding:'9px',borderRadius:'10px',border:'none',background: mode === 'avec' ? '#1a9e6e' : '#f0f0eb',color: mode === 'avec' ? 'white' : '#6b7a6a',fontWeight:'500',fontSize:'0.82rem',cursor:'pointer'}}>
          🏋️ Avec équipement
        </button>
        <button onClick={() => setMode('sans')} style={{flex:1,padding:'9px',borderRadius:'10px',border:'none',background: mode === 'sans' ? '#1a9e6e' : '#f0f0eb',color: mode === 'sans' ? 'white' : '#6b7a6a',fontWeight:'500',fontSize:'0.82rem',cursor:'pointer'}}>
          💪 Sans équipement
        </button>
      </div>

      {mode === 'sans' && (
        <div style={{margin:'12px 16px 0',background:'#e8f7f1',borderRadius:'12px',padding:'11px 14px',fontSize:'0.8rem',color:'#0d6b49',fontWeight:'500'}}>
          💪 Programmes 100% gratuits — ton corps est ton meilleur équipement !
        </div>
      )}

      <div style={{padding:'12px 16px'}}>
        {listeProgrammes.map((prog, i) => (
          <div key={prog.id}
            onClick={() => { setSeanceActive(prog); setVue('detail') }}
            style={{background:'white',borderRadius:'16px',padding:'14px',marginBottom:'10px',cursor:'pointer',boxShadow:'0 2px 8px rgba(0,0,0,0.06)',display:'flex',alignItems:'center',gap:'12px'}}>
            <div style={{width:'48px',height:'48px',borderRadius:'12px',background:'#e8f7f1',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.4rem',flexShrink:0}}>
              {prog.icone}
            </div>
            <div style={{flex:1}}>
              <div style={{fontWeight:'600',color:'#111',fontSize:'0.9rem',marginBottom:'3px'}}>{prog.nom}</div>
              <div style={{fontSize:'0.75rem',color:'#6b7a6a',marginBottom:'5px'}}>{prog.description.substring(0, 50)}...</div>
              <div style={{display:'flex',gap:'8px'}}>
                <span style={{fontSize:'0.68rem',background:'#f0f0eb',color:'#6b7a6a',padding:'2px 8px',borderRadius:'99px'}}>⏱ {prog.duree} min</span>
                <span style={{fontSize:'0.68rem',background:'#e8f7f1',color:'#1a9e6e',padding:'2px 8px',borderRadius:'99px'}}>🔥 {prog.calories} kcal</span>
                {mode === 'sans' && <span style={{fontSize:'0.68rem',background:'#e8f7f1',color:'#0d6b49',padding:'2px 8px',borderRadius:'99px',fontWeight:'600'}}>$0</span>}
              </div>
            </div>
            <div style={{color:'#6b7a6a',fontSize:'1.1rem'}}>›</div>
          </div>
        ))}
      </div>
    </div>
  )
}