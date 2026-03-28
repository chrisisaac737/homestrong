import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ibrqwdhrzlrihczfovmp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlicnF3ZGhyemxyaWhjemZvdm1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NDc0NTIsImV4cCI6MjA4OTQyMzQ1Mn0.cb_nF1bJtFQ6v7TBI2f-BLTYYGq7y24qzCQpPMzWI1Q'
)

// Durées en secondes selon le niveau
const durees = {
  beginner:     { courte: 20, standard: 30, longue: 45, repos: 90, sprint: 20 },
  intermediate: { courte: 35, standard: 45, longue: 60, repos: 60, sprint: 30 },
  advanced:     { courte: 50, standard: 60, longue: 90, repos: 45, sprint: 45 },
}

// Séries selon le niveau
const series = {
  beginner:     { peu: 2, standard: 3, beaucoup: 3 },
  intermediate: { peu: 3, standard: 3, beaucoup: 4 },
  advanced:     { peu: 3, standard: 4, beaucoup: 5 },
}

const getExercices = (niveau) => {
  const d = durees[niveau] || durees.intermediate
  const s = series[niveau] || series.intermediate

  return {
    1: [ // Cardio vélo
      { nom: 'Échauffement vélo', duree: niveau === 'beginner' ? 180 : niveau === 'advanced' ? 300 : 240, series: 1, desc: 'Pédalez à rythme lent pour préparer vos muscles. Résistance minimale.' },
      { nom: 'Intervalle intensif', duree: niveau === 'beginner' ? 30 : niveau === 'advanced' ? 90 : 60, series: s.standard, desc: 'Pédalez le plus vite possible. Résistance maximale.' },
      { nom: 'Récupération active', duree: d.repos, series: s.standard, desc: 'Pédalez lentement pour récupérer entre les intervalles.' },
      { nom: 'Retour au calme', duree: niveau === 'beginner' ? 120 : niveau === 'advanced' ? 240 : 180, series: 1, desc: 'Pédalez doucement pour faire redescendre votre rythme cardiaque.' },
    ],
    2: [ // Corde à sauter HIIT
      { nom: 'Corde — rythme régulier', duree: d.standard, series: s.standard, desc: 'Sautez à rythme régulier, pieds joints. Gardez les coudes près du corps.' },
      { nom: 'Corde — double vitesse', duree: d.courte, series: s.standard, desc: 'Accélérez le rythme au maximum.' },
      { nom: 'Repos actif', duree: d.repos, series: s.standard, desc: 'Marchez sur place en respirant profondément.' },
    ],
    3: [ // Circuit cardio complet
      { nom: 'Vélo — warm up', duree: niveau === 'beginner' ? 120 : 180, series: 1, desc: 'Échauffement progressif sur le vélo.' },
      { nom: 'Corde à sauter', duree: d.standard, series: s.standard, desc: 'Séries de corde à rythme soutenu.' },
      { nom: 'Bandes élastiques — jambes', duree: d.standard, series: s.standard, desc: 'Squats avec bande élastique autour des cuisses.' },
      { nom: 'Vélo — sprint final', duree: d.longue, series: 1, desc: 'Sprint final à résistance maximale.' },
      { nom: 'Repos', duree: d.repos, series: s.standard, desc: 'Récupérez en respirant profondément.' },
    ],
    4: [ // Burpees & Mountain climbers
      { nom: 'Pompes', duree: d.standard, series: s.standard, desc: niveau === 'beginner' ? 'Mains à largeur d\'épaules. Modifiez en posant les genoux si besoin.' : 'Corps droit, descente complète jusqu\'au sol.' },
      { nom: 'Squats', duree: d.standard, series: s.standard, desc: 'Pieds à largeur d\'épaules, dos droit. Descendez les hanches sous les genoux.' },
      { nom: 'Burpees', duree: d.courte, series: s.peu, desc: niveau === 'beginner' ? 'Faites chaque partie lentement — squat, planche, pompe, saut.' : 'Enchaînement explosif complet.' },
      { nom: 'Mountain climbers', duree: d.courte, series: s.standard, desc: 'En position de pompe, ramenez les genoux vers la poitrine en alternance.' },
      { nom: 'Repos', duree: d.repos, series: s.standard, desc: 'Récupérez en respirant profondément.' },
    ],
    5: [ // HIIT sans matériel
      { nom: 'Jumping jacks', duree: d.standard, series: s.standard, desc: 'Sautez en écartant bras et jambes. Atterrissez doucement.' },
      { nom: 'Squats sautés', duree: d.courte, series: s.standard, desc: 'Descendez en squat puis explosez vers le haut.' },
      { nom: 'Mountain climbers', duree: d.courte, series: s.standard, desc: 'Ramenez les genoux vers la poitrine rapidement en alternance.' },
      { nom: 'Fentes alternées', duree: d.standard, series: s.standard, desc: 'Un pied devant, l\'autre derrière. Alternez les jambes.' },
      { nom: 'Repos', duree: d.repos, series: s.standard, desc: 'Respirez profondément, récupérez.' },
    ],
    6: [ // Renforcement haut du corps
      { nom: 'Curl biceps', duree: d.standard, series: s.standard, desc: 'Debout, haltères en main, coudes collés au corps. Montez en contractant les biceps.' },
      { nom: 'Développé épaules', duree: d.standard, series: s.standard, desc: 'Assis, haltères à hauteur d\'épaules. Poussez vers le haut.' },
      { nom: 'Rowing haltères', duree: d.standard, series: s.standard, desc: 'Penché en avant, dos droit. Tirez les haltères vers les hanches.' },
      { nom: 'Pompes', duree: d.standard, series: s.peu, desc: niveau === 'beginner' ? 'Modifiez avec les genoux au sol si besoin.' : 'Corps parfaitement droit, amplitude complète.' },
      { nom: 'Repos', duree: d.repos, series: s.standard, desc: 'Récupérez entre les séries.' },
    ],
    7: [ // Jambes & fessiers
      { nom: 'Squats avec bandes', duree: d.standard, series: s.standard, desc: 'Bande élastique autour des cuisses. Poussez les genoux vers l\'extérieur.' },
      { nom: 'Fentes avec haltères', duree: d.standard, series: s.standard, desc: 'Un haltère dans chaque main. Alternez les jambes en contrôlant la descente.' },
      { nom: 'Hip thrust', duree: d.standard, series: s.standard, desc: 'Dos sur le sol, pieds à plat. Poussez les hanches vers le haut en contractant les fessiers.' },
      { nom: 'Flexions jambes', duree: d.courte, series: s.peu, desc: niveau === 'beginner' ? 'Flexions simples, amplitude partielle.' : 'Flexions profondes, amplitude complète.' },
      { nom: 'Repos', duree: d.repos, series: s.standard, desc: 'Récupérez entre les séries.' },
    ],
    8: [ // Full body haltères
      { nom: 'Pompes haltères', duree: d.standard, series: s.standard, desc: 'Pompes avec les mains sur les haltères pour plus d\'amplitude.' },
      { nom: 'Squat presse', duree: d.standard, series: s.standard, desc: 'Montez depuis le squat en poussant les haltères au-dessus de la tête.' },
      { nom: 'Rowing incliné', duree: d.standard, series: s.standard, desc: 'Penché en avant, tirez les haltères vers les hanches.' },
      { nom: 'Curl marteau', duree: d.standard, series: s.standard, desc: 'Haltères en prise neutre, montez en gardant les coudes fixes.' },
      { nom: 'Flexions complètes', duree: d.courte, series: s.peu, desc: 'Combinez curl et développé en un mouvement fluide.' },
      { nom: 'Repos', duree: d.repos, series: s.standard, desc: 'Récupérez entre chaque exercice.' },
    ],
    9: [ // Full body poids du corps
      { nom: 'Pompes', duree: d.standard, series: s.standard, desc: niveau === 'beginner' ? 'Modifiable avec les genoux au sol.' : 'Corps droit, amplitude complète.' },
      { nom: 'Squats', duree: d.standard, series: s.standard, desc: 'Pieds à largeur d\'épaules, descendez les hanches sous les genoux.' },
      { nom: 'Dips sur chaise', duree: d.courte, series: s.peu, desc: 'Mains sur le bord d\'une chaise stable. Descendez en pliant les coudes à 90°.' },
      { nom: 'Gainage latéral', duree: d.courte, series: 2, desc: 'Sur le côté, un avant-bras au sol. Corps droit de la tête aux pieds.' },
      { nom: 'Abdominaux', duree: d.standard, series: s.standard, desc: 'Sur le dos, genoux pliés. Montez les épaules sans tirer sur le cou.' },
      { nom: 'Repos', duree: d.repos, series: s.standard, desc: 'Récupérez en respirant.' },
    ],
    10: [ // Dips & Pike push-ups
      { nom: 'Dips sur chaise', duree: d.standard, series: s.standard, desc: 'Mains sur le bord d\'une chaise stable, jambes tendues. Descendez à 90°.' },
      { nom: 'Pike push-ups', duree: d.courte, series: s.standard, desc: 'En position V inversé, pliez les coudes pour descendre la tête vers le sol.' },
      { nom: 'Pompes larges', duree: d.courte, series: s.standard, desc: 'Mains plus larges que les épaules pour cibler les pectoraux.' },
      { nom: 'Flexions triceps', duree: d.courte, series: s.peu, desc: 'Pompes en diamant, mains rapprochées sous la poitrine.' },
      { nom: 'Repos', duree: d.repos, series: s.standard, desc: 'Récupérez entre chaque série.' },
    ],
    11: [ // Yoga & mobilité
      { nom: 'Salutation au soleil', duree: niveau === 'beginner' ? 60 : niveau === 'advanced' ? 120 : 90, series: s.standard, desc: 'Enchaînement de postures debout — montée des bras, flexion avant, planche, cobra, chien tête en bas.' },
      { nom: 'Mobilité hanches', duree: d.longue, series: 2, desc: 'Rotations de hanches, fentes basses maintenues, ouverture des hanches.' },
      { nom: 'Étirements dos', duree: d.longue, series: 2, desc: 'Chat-vache, torsions assises, posture de l\'enfant.' },
      { nom: 'Respiration profonde', duree: 60, series: 1, desc: 'Inspirez 4 secondes, retenez 4 secondes, expirez 4 secondes.' },
    ],
    12: [ // Cardio doux vélo
      { nom: 'Vélo — rythme modéré', duree: niveau === 'beginner' ? 300 : niveau === 'advanced' ? 900 : 600, series: 1, desc: 'Pédalez à rythme confortable, résistance moyenne. Maintenez une conversation.' },
      { nom: 'Récupération', duree: 120, series: 1, desc: 'Pédalez doucement, respirez profondément.' },
    ],
    13: [ // Étirements & gainage
      { nom: 'Gainage planche', duree: niveau === 'beginner' ? 20 : niveau === 'advanced' ? 60 : 40, series: s.standard, desc: 'Avant-bras au sol, corps parfaitement droit. Respirez régulièrement.' },
      { nom: 'Gainage latéral', duree: d.courte, series: 2, desc: 'Sur le côté, un avant-bras au sol. Corps droit.' },
      { nom: 'Étirements ischio', duree: d.longue, series: 2, desc: 'Assis, jambes tendues, penchez-vous doucement vers l\'avant.' },
      { nom: 'Étirements quadriceps', duree: d.courte, series: 2, desc: 'Debout, tenez votre cheville dans le dos.' },
      { nom: 'Respiration profonde', duree: 90, series: 1, desc: 'Inspirez 4s, retenez 4s, expirez 4s.' },
    ],
    14: [ // Marche active & respiration
      { nom: 'Marche dynamique', duree: d.longue, series: s.standard, desc: 'Marchez en levant les genoux haut, balancez les bras.' },
      { nom: 'Respiration box', duree: d.standard, series: s.standard, desc: 'Inspirez 4s, retenez 4s, expirez 4s, retenez 4s. Répétez.' },
      { nom: 'Étirements complets', duree: d.longue, series: 1, desc: 'Étirez cou, épaules, dos, jambes progressivement.' },
    ],
  }
}

const programmes = {
  poids: {
    avec: [
      { id: 1, nom: 'Cardio vélo', duree: { beginner: 20, intermediate: 30, advanced: 45 }, calories: { beginner: 150, intermediate: 220, advanced: 320 }, icone: '🚴', description: 'Intervalles sur vélo fixe pour brûler les calories efficacement.' },
      { id: 2, nom: 'Corde à sauter HIIT', duree: { beginner: 15, intermediate: 20, advanced: 35 }, calories: { beginner: 120, intermediate: 180, advanced: 260 }, icone: '⚡', description: 'Séries intenses de corde à sauter pour maximiser la dépense calorique.' },
      { id: 3, nom: 'Circuit cardio complet', duree: { beginner: 25, intermediate: 35, advanced: 55 }, calories: { beginner: 180, intermediate: 280, advanced: 400 }, icone: '🔥', description: 'Circuit combinant vélo, corde et bandes élastiques.' },
    ],
    sans: [
      { id: 4, nom: 'Burpees & Mountain climbers', duree: { beginner: 20, intermediate: 30, advanced: 50 }, calories: { beginner: 140, intermediate: 200, advanced: 300 }, icone: '💪', description: 'Enchaînement explosif au poids du corps — $0 requis.' },
      { id: 5, nom: 'HIIT sans matériel', duree: { beginner: 15, intermediate: 25, advanced: 45 }, calories: { beginner: 110, intermediate: 160, advanced: 250 }, icone: '⚡', description: 'Jumping jacks, squats sautés, fentes alternées.' },
    ]
  },
  muscle: {
    avec: [
      { id: 6, nom: 'Renforcement haut du corps', duree: { beginner: 20, intermediate: 30, advanced: 50 }, calories: { beginner: 100, intermediate: 150, advanced: 220 }, icone: '🏋️', description: 'Curl biceps, développé épaules et rowing avec haltères.' },
      { id: 7, nom: 'Jambes & fessiers', duree: { beginner: 25, intermediate: 35, advanced: 55 }, calories: { beginner: 120, intermediate: 180, advanced: 260 }, icone: '💪', description: 'Squats lestés, fentes et hip thrust avec bandes élastiques.' },
      { id: 8, nom: 'Full body haltères', duree: { beginner: 30, intermediate: 45, advanced: 70 }, calories: { beginner: 150, intermediate: 220, advanced: 320 }, icone: '🔥', description: 'Programme complet corps entier avec haltères ajustables.' },
    ],
    sans: [
      { id: 9, nom: 'Full body poids du corps', duree: { beginner: 20, intermediate: 30, advanced: 50 }, calories: { beginner: 100, intermediate: 140, advanced: 210 }, icone: '💪', description: 'Pompes, squats, dips, gainage — $0 requis.' },
      { id: 10, nom: 'Dips & Pike push-ups', duree: { beginner: 15, intermediate: 25, advanced: 40 }, calories: { beginner: 80, intermediate: 120, advanced: 180 }, icone: '🏋️', description: 'Renforcement haut du corps sur chaise — $0 requis.' },
    ]
  },
  energie: {
    avec: [
      { id: 11, nom: 'Yoga & mobilité', duree: { beginner: 20, intermediate: 30, advanced: 45 }, calories: { beginner: 50, intermediate: 80, advanced: 120 }, icone: '🧘', description: 'Séquences de mobilité articulaire avec tapis.' },
      { id: 12, nom: 'Cardio doux vélo', duree: { beginner: 20, intermediate: 30, advanced: 50 }, calories: { beginner: 90, intermediate: 140, advanced: 200 }, icone: '🚴', description: 'Pédalage modéré pour booster l\'énergie sans épuisement.' },
    ],
    sans: [
      { id: 13, nom: 'Étirements & gainage', duree: { beginner: 15, intermediate: 25, advanced: 40 }, calories: { beginner: 40, intermediate: 60, advanced: 90 }, icone: '🧘', description: 'Routine complète d\'étirements et gainage — $0 requis.' },
      { id: 14, nom: 'Marche active & respiration', duree: { beginner: 15, intermediate: 25, advanced: 40 }, calories: { beginner: 50, intermediate: 80, advanced: 120 }, icone: '⚡', description: 'Exercices de respiration et marche dynamique.' },
    ]
  }
}

const niveauLabel = {
  beginner: '🌱 Débutant',
  intermediate: '💪 Intermédiaire',
  advanced: '🔥 Avancé'
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
  const niveau = profile?.niveau || 'intermediate'
  const listeProgrammes = programmes[objectif]?.[mode] || []
  const exercicesData = getExercices(niveau)

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
    const dureeReelle = seanceActive.duree[niveau] || seanceActive.duree.intermediate
    const caloriesReelles = seanceActive.calories[niveau] || seanceActive.calories.intermediate
    await supabase.from('workouts').insert({
      user_id: user.id,
      titre: seanceActive.nom,
      duree_min: dureeReelle,
      calories: caloriesReelles,
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

  const getDuree = (prog) => prog.duree[niveau] || prog.duree.intermediate
  const getCalories = (prog) => prog.calories[niveau] || prog.calories.intermediate

  // FÉLICITATIONS
  if (vue === 'felicitations') return (
    <div style={{minHeight:'100vh',background:'#1e2419',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'2rem',fontFamily:'sans-serif',textAlign:'center'}}>
      <div style={{fontSize:'4rem',marginBottom:'16px'}}>🎉</div>
      <h2 style={{color:'white',fontWeight:'800',fontSize:'1.5rem',marginBottom:'8px'}}>Séance terminée !</h2>
      <p style={{color:'rgba(255,255,255,0.5)',marginBottom:'24px',lineHeight:'1.6'}}>Tu as tenu ta promesse aujourd'hui. Chaque répétition compte.</p>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',width:'100%',maxWidth:'300px',marginBottom:'24px'}}>
        <div style={{background:'rgba(255,255,255,0.08)',borderRadius:'14px',padding:'14px',textAlign:'center'}}>
          <div style={{fontWeight:'800',fontSize:'1.3rem',color:'white'}}>{getDuree(seanceActive)}</div>
          <div style={{fontSize:'0.7rem',color:'rgba(255,255,255,0.4)',marginTop:'2px'}}>minutes</div>
        </div>
        <div style={{background:'rgba(255,255,255,0.08)',borderRadius:'14px',padding:'14px',textAlign:'center'}}>
          <div style={{fontWeight:'800',fontSize:'1.3rem',color:'#d4e84a'}}>{getCalories(seanceActive)}</div>
          <div style={{fontSize:'0.7rem',color:'rgba(255,255,255,0.4)',marginTop:'2px'}}>calories</div>
        </div>
      </div>
      <div style={{background:'rgba(212,232,74,0.1)',border:'1px solid rgba(212,232,74,0.2)',borderRadius:'14px',padding:'12px 16px',marginBottom:'24px',width:'100%',maxWidth:'300px'}}>
        <div style={{fontSize:'0.72rem',color:'#d4e84a',fontWeight:'500',marginBottom:'3px'}}>Badge débloqué !</div>
        <div style={{fontSize:'0.88rem',color:'white'}}>⚡ Séance {niveauLabel[niveau]} complétée</div>
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
    const progression = (exerciceIndex / exs.length) * 100

    return (
      <div style={{minHeight:'100vh',background:'#f8f5ef',fontFamily:'sans-serif'}}>
        <div style={{background:'#1e2419',padding:'16px 20px'}}>
          <button onClick={() => setVue('detail')} style={{background:'rgba(255,255,255,0.1)',color:'white',border:'none',borderRadius:'99px',padding:'7px 14px',fontSize:'0.78rem',cursor:'pointer',marginBottom:'12px'}}>
            ← Retour
          </button>
          <div style={{fontSize:'0.82rem',fontWeight:'700',color:'white',marginBottom:'2px'}}>{seanceActive?.nom}</div>
          <div style={{fontSize:'0.68rem',color:'#d4e84a',marginBottom:'6px'}}>{niveauLabel[niveau]}</div>
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
            <button onClick={() => setTimerRunning(r => !r)}
              style={{flex:2,padding:'14px',borderRadius:'99px',border:'none',background: timerRunning ? '#EF9F27' : '#1a9e6e',color:'white',fontWeight:'600',fontSize:'0.95rem',cursor:'pointer'}}>
              {timerRunning ? '⏸ Pause' : '▶ Démarrer'}
            </button>
            <button onClick={() => { setTimerVal(exActuel?.duree || 60); setTimerRunning(false) }}
              style={{flex:1,padding:'14px',borderRadius:'99px',border:'1px solid #e8f7f1',background:'white',color:'#6b7a6a',fontSize:'0.88rem',cursor:'pointer'}}>
              ↺ Reset
            </button>
          </div>

          <button onClick={exerciceSuivant}
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
            {niveauLabel[niveau]}
          </div>
          <div style={{fontSize:'1.2rem',fontWeight:'800',color:'white',marginBottom:'6px'}}>{seanceActive?.icone} {seanceActive?.nom}</div>
          <div style={{display:'flex',gap:'14px'}}>
            <span style={{fontSize:'0.78rem',color:'rgba(255,255,255,0.5)'}}>⏱ {getDuree(seanceActive)} min</span>
            <span style={{fontSize:'0.78rem',color:'rgba(255,255,255,0.5)'}}>🔥 {getCalories(seanceActive)} kcal</span>
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
        <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
          <span style={{fontSize:'0.82rem',color:'rgba(255,255,255,0.5)'}}>
            {objectif === 'poids' ? '🔥 Perte de poids' : objectif === 'muscle' ? '💪 Musculation' : '⚡ Énergie'}
          </span>
          <span style={{fontSize:'0.75rem',background:'rgba(212,232,74,0.15)',color:'#d4e84a',padding:'2px 8px',borderRadius:'99px'}}>
            {niveauLabel[niveau]}
          </span>
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
                <span style={{fontSize:'0.68rem',background:'#f0f0eb',color:'#6b7a6a',padding:'2px 8px',borderRadius:'99px'}}>⏱ {getDuree(prog)} min</span>
                <span style={{fontSize:'0.68rem',background:'#e8f7f1',color:'#1a9e6e',padding:'2px 8px',borderRadius:'99px'}}>🔥 {getCalories(prog)} kcal</span>
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