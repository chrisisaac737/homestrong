import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ibrqwdhrzlrihczfovmp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlicnF3ZGhyemxyaWhjemZvdm1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NDc0NTIsImV4cCI6MjA4OTQyMzQ1Mn0.cb_nF1bJtFQ6v7TBI2f-BLTYYGq7y24qzCQpPMzWI1Q'
)

export default function Onboarding({ user, onComplete }) {
  const [step, setStep] = useState(1)
  const [objectif, setObjectif] = useState('')
  const [budget, setBudget] = useState(100)
  const [style, setStyle] = useState('')
  const [niveau, setNiveau] = useState('')
  const [loading, setLoading] = useState(false)

  const saveProfile = async () => {
    setLoading(true)
    await supabase.from('users').update({
      objectif,
      budget_equipement: budget,
      style,
      niveau,
    }).eq('id', user.id)
    setLoading(false)
    onComplete()
  }

  const btnStyle = (selected, val) => ({
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: selected === val ? '2px solid #1a9e6e' : '1.5px solid #e8f7f1',
    background: selected === val ? '#e8f7f1' : 'white',
    color: selected === val ? '#0d6b49' : '#111',
    fontWeight: selected === val ? '600' : '400',
    fontSize: '0.9rem',
    cursor: 'pointer',
    marginBottom: '8px',
    textAlign: 'left',
  })

  return (
    <div style={{minHeight:'100vh',background:'#f8f5ef',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'1.5rem',fontFamily:'sans-serif'}}>
      <div style={{background:'white',borderRadius:'20px',padding:'2rem',width:'100%',maxWidth:'400px',boxShadow:'0 8px 32px rgba(0,0,0,0.08)'}}>
        
        {/* Barre de progression */}
        <div style={{display:'flex',gap:'6px',marginBottom:'24px'}}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{flex:1,height:'4px',borderRadius:'99px',background: i <= step ? '#1a9e6e' : '#eee'}}></div>
          ))}
        </div>

        {/* ÉTAPE 1 — Objectif */}
        {step === 1 && (
          <>
            <h2 style={{fontWeight:'800',color:'#111',marginBottom:'4px'}}>Quel est ton objectif ?</h2>
            <p style={{color:'#6b7a6a',fontSize:'0.85rem',marginBottom:'20px'}}>Pas de pression — tu peux changer à tout moment.</p>
            {[
              {val:'poids', label:'🔥 Perdre du poids', desc:'Cardio, calories, résultats visibles'},
              {val:'muscle', label:'💪 Me muscler', desc:'Force, volume, progression'},
              {val:'energie', label:'⚡ Retrouver de l\'énergie', desc:'Bien-être, vitalité, sommeil'},
            ].map(o => (
              <button key={o.val} style={btnStyle(objectif, o.val)} onClick={() => setObjectif(o.val)}>
                <div>{o.label}</div>
                <div style={{fontSize:'0.75rem',color:'#6b7a6a',marginTop:'2px'}}>{o.desc}</div>
              </button>
            ))}
            <button onClick={() => objectif && setStep(2)} style={{width:'100%',padding:'14px',borderRadius:'99px',border:'none',background: objectif ? '#1a9e6e' : '#ccc',color:'white',fontWeight:'600',fontSize:'0.95rem',cursor: objectif ? 'pointer' : 'not-allowed',marginTop:'8px'}}>
              Continuer →
            </button>
          </>
        )}

        {/* ÉTAPE 2 — Budget */}
        {step === 2 && (
          <>
            <h2 style={{fontWeight:'800',color:'#111',marginBottom:'4px'}}>Ton budget équipement ?</h2>
            <p style={{color:'#6b7a6a',fontSize:'0.85rem',marginBottom:'20px'}}>On te recommande exactement ce qu'il te faut.</p>
            <div style={{background:'#e8f7f1',borderRadius:'12px',padding:'16px',marginBottom:'16px',textAlign:'center'}}>
              <div style={{fontFamily:'sans-serif',fontSize:'2rem',fontWeight:'800',color:'#111'}}>${budget}</div>
              <div style={{fontSize:'0.78rem',color:'#6b7a6a'}}>budget équipement</div>
            </div>
            <input type="range" min="0" max="500" step="10" value={budget} onChange={e => setBudget(parseInt(e.target.value))}
              style={{width:'100%',marginBottom:'8px'}} />
            <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.72rem',color:'#6b7a6a',marginBottom:'16px'}}>
              <span>$0</span><span>$500+</span>
            </div>
            {budget === 0 && (
              <div style={{background:'#e8f7f1',borderRadius:'12px',padding:'12px',marginBottom:'16px',fontSize:'0.82rem',color:'#0d6b49'}}>
                💪 Parfait ! HomeStrong propose des programmes complets au poids du corps — pompes, squats, burpees. Ton corps est ton meilleur équipement !
              </div>
            )}
            <div style={{display:'flex',gap:'8px'}}>
              <button onClick={() => setStep(1)} style={{flex:1,padding:'12px',borderRadius:'99px',border:'1px solid #e8f7f1',background:'transparent',color:'#6b7a6a',cursor:'pointer'}}>← Retour</button>
              <button onClick={() => setStep(3)} style={{flex:2,padding:'12px',borderRadius:'99px',border:'none',background:'#1a9e6e',color:'white',fontWeight:'600',cursor:'pointer'}}>Continuer →</button>
            </div>
          </>
        )}

        {/* ÉTAPE 3 — Style */}
        {step === 3 && (
          <>
            <h2 style={{fontWeight:'800',color:'#111',marginBottom:'4px'}}>Comment tu vis le sport ?</h2>
            <p style={{color:'#6b7a6a',fontSize:'0.85rem',marginBottom:'20px'}}>On adapte ton expérience HomeStrong.</p>
            {[
              {val:'solo', label:'🎧 Je préfère m\'entraîner seul(e)', desc:'Mon espace, mon rythme, sans regard extérieur'},
              {val:'flex', label:'⚡ Je veux la flexibilité', desc:'Complément à la salle, voyages, jours chargés'},
              {val:'smart', label:'💡 Je cherche l\'efficacité', desc:'Pas de déplacement, résultats concrets'},
            ].map(o => (
              <button key={o.val} style={btnStyle(style, o.val)} onClick={() => setStyle(o.val)}>
                <div>{o.label}</div>
                <div style={{fontSize:'0.75rem',color:'#6b7a6a',marginTop:'2px'}}>{o.desc}</div>
              </button>
            ))}
            <div style={{display:'flex',gap:'8px',marginTop:'8px'}}>
              <button onClick={() => setStep(2)} style={{flex:1,padding:'12px',borderRadius:'99px',border:'1px solid #e8f7f1',background:'transparent',color:'#6b7a6a',cursor:'pointer'}}>← Retour</button>
              <button onClick={() => style && setStep(4)} style={{flex:2,padding:'12px',borderRadius:'99px',border:'none',background: style ? '#1a9e6e' : '#ccc',color:'white',fontWeight:'600',cursor: style ? 'pointer' : 'not-allowed'}}>Continuer →</button>
            </div>
          </>
        )}

        {/* ÉTAPE 4 — Niveau */}
        {step === 4 && (
          <>
            <h2 style={{fontWeight:'800',color:'#111',marginBottom:'4px'}}>Ton niveau actuel ?</h2>
            <p style={{color:'#6b7a6a',fontSize:'0.85rem',marginBottom:'20px'}}>Pour adapter l'intensité de tes programmes.</p>
            {[
              {val:'beginner', label:'🌱 Débutant(e)', desc:'Je recommence ou je débute'},
              {val:'intermediate', label:'💪 Intermédiaire', desc:'Je m\'entraîne occasionnellement'},
              {val:'advanced', label:'🔥 Avancé(e)', desc:'Je m\'entraîne régulièrement'},
            ].map(o => (
              <button key={o.val} style={btnStyle(niveau, o.val)} onClick={() => setNiveau(o.val)}>
                <div>{o.label}</div>
                <div style={{fontSize:'0.75rem',color:'#6b7a6a',marginTop:'2px'}}>{o.desc}</div>
              </button>
            ))}
            <div style={{display:'flex',gap:'8px',marginTop:'8px'}}>
              <button onClick={() => setStep(3)} style={{flex:1,padding:'12px',borderRadius:'99px',border:'1px solid #e8f7f1',background:'transparent',color:'#6b7a6a',cursor:'pointer'}}>← Retour</button>
              <button onClick={() => niveau && saveProfile()} disabled={loading} style={{flex:2,padding:'12px',borderRadius:'99px',border:'none',background: niveau ? '#1a9e6e' : '#ccc',color:'white',fontWeight:'600',cursor: niveau ? 'pointer' : 'not-allowed'}}>
                {loading ? 'Sauvegarde...' : 'Terminer ✓'}
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  )
}