import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ibrqwdhrzlrihczfovmp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlicnF3ZGhyemxyaWhjemZvdm1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NDc0NTIsImV4cCI6MjA4OTQyMzQ1Mn0.cb_nF1bJtFQ6v7TBI2f-BLTYYGq7y24qzCQpPMzWI1Q'
)

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
  const [seanceTerminee, setSeanceTerminee] = useState(false)
  const [saving, setSaving] = useState(false)

  const objectif = profile?.objectif || 'poids'
  const listeProgrammes = programmes[objectif]?.[mode] || []

  const terminerSeance = async (prog) => {
    setSaving(true)
    await supabase.from('workouts').insert({
      user_id: user.id,
      titre: prog.nom,
      duree_min: prog.duree,
      calories: prog.calories,
      type: mode === 'avec' ? 'avec_equipement' : 'sans_equipement',
      date: new Date().toISOString().split('T')[0]
    })
    setSaving(false)
    setSeanceTerminee(true)
  }

  // ÉCRAN FÉLICITATIONS
  if (seanceTerminee) return (
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

  // ÉCRAN DÉTAIL SÉANCE
  if (seanceActive) return (
    <div style={{minHeight:'100vh',background:'#f8f5ef',fontFamily:'sans-serif'}}>
      <div style={{background:'#1e2419',padding:'20px'}}>
        <button onClick={() => setSeanceActive(null)} style={{background:'rgba(255,255,255,0.1)',color:'white',border:'none',borderRadius:'99px',padding:'8px 16px',fontSize:'0.82rem',cursor:'pointer',marginBottom:'16px'}}>
          ← Retour
        </button>
        <div style={{fontSize:'0.72rem',padding:'3px 10px',borderRadius:'99px',background:'rgba(212,232,74,0.15)',color:'#d4e84a',display:'inline-block',marginBottom:'8px'}}>
          Recommandé pour toi
        </div>
        <div style={{fontSize:'1.2rem',fontWeight:'800',color:'white',marginBottom:'8px'}}>{seanceActive.icone} {seanceActive.nom}</div>
        <div style={{display:'flex',gap:'14px'}}>
          <span style={{fontSize:'0.78rem',color:'rgba(255,255,255,0.5)'}}>⏱ {seanceActive.duree} min</span>
          <span style={{fontSize:'0.78rem',color:'rgba(255,255,255,0.5)'}}>🔥 {seanceActive.calories} kcal</span>
          <span style={{fontSize:'0.78rem',color:'rgba(255,255,255,0.5)'}}>
            {mode === 'sans' ? '$0 requis' : 'Avec équipement'}
          </span>
        </div>
      </div>

      <div style={{padding:'20px'}}>
        <div style={{background:'white',borderRadius:'16px',padding:'16px',marginBottom:'14px',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
          <div style={{fontWeight:'700',color:'#111',marginBottom:'8px',fontSize:'0.9rem'}}>Description</div>
          <div style={{fontSize:'0.85rem',color:'#6b7a6a',lineHeight:'1.65'}}>{seanceActive.description}</div>
        </div>

        <div style={{background:'#1e2419',borderRadius:'14px',padding:'14px',marginBottom:'20px'}}>
          <div style={{fontSize:'0.82rem',color:'rgba(255,255,255,0.75)',lineHeight:'1.6',fontStyle:'italic'}}>
            "{objectif === 'poids' ? 'Chaque calorie brûlée te rapproche de ton objectif.' : objectif === 'muscle' ? 'La régularité construit les muscles — un entraînement à la fois.' : 'Ton énergie grandit à chaque séance.'}"
          </div>
        </div>

        <button
          onClick={() => terminerSeance(seanceActive)}
          disabled={saving}
          style={{width:'100%',padding:'16px',borderRadius:'99px',border:'none',background:'#1a9e6e',color:'white',fontWeight:'600',fontSize:'1rem',cursor:'pointer'}}>
          {saving ? 'Sauvegarde...' : '✓ Marquer comme terminée'}
        </button>
      </div>
    </div>
  )

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
            onClick={() => setSeanceActive(prog)}
            style={{background:'white',borderRadius:'16px',padding:'14px',marginBottom:'10px',cursor:'pointer',boxShadow:'0 2px 8px rgba(0,0,0,0.06)',display:'flex',alignItems:'center',gap:'12px',animationDelay: i * 0.05 + 's'}}>
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