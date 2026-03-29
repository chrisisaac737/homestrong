import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ibrqwdhrzlrihczfovmp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlicnF3ZGhyemxyaWhjemZvdm1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NDc0NTIsImV4cCI6MjA4OTQyMzQ1Mn0.cb_nF1bJtFQ6v7TBI2f-BLTYYGq7y24qzCQpPMzWI1Q'
)

export default function Profil({ user, profile, onBack, onUpdate }) {
  const [objectif, setObjectif] = useState(profile?.objectif || '')
  const [budget, setBudget] = useState(profile?.budget_equipement || 0)
  const [niveau, setNiveau] = useState(profile?.niveau || 'intermediate')
  const [allergies, setAllergies] = useState(profile?.allergies || [])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const saveProfile = async () => {
    setSaving(true)
    await supabase.from('users').update({
      objectif,
      budget_equipement: budget,
      niveau,
      allergies,
    }).eq('id', user.id)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    onUpdate()
  }

  const btnStyle = (selected, val) => ({
    width: '100%',
    padding: '12px 14px',
    borderRadius: '12px',
    border: selected === val ? '2px solid #1a9e6e' : '1.5px solid #e8f7f1',
    background: selected === val ? '#e8f7f1' : 'white',
    color: selected === val ? '#0d6b49' : '#111',
    fontWeight: selected === val ? '600' : '400',
    fontSize: '0.85rem',
    cursor: 'pointer',
    marginBottom: '8px',
    textAlign: 'left',
  })

  const objectifLabel = {
    poids: '🔥 Perte de poids',
    muscle: '💪 Musculation',
    energie: '⚡ Énergie'
  }

  const niveauLabel = {
    beginner: '🌱 Débutant',
    intermediate: '💪 Intermédiaire',
    advanced: '🔥 Avancé'
  }

  return (
    <div style={{minHeight:'100vh',background:'#f8f5ef',fontFamily:'sans-serif'}}>

      {/* HEADER */}
      <div style={{background:'#1e2419',padding:'20px'}}>
        <button onClick={onBack} style={{background:'rgba(255,255,255,0.1)',color:'white',border:'none',borderRadius:'99px',padding:'7px 14px',fontSize:'0.78rem',cursor:'pointer',marginBottom:'12px'}}>
          ← Tableau de bord
        </button>
        <div style={{fontSize:'1.2rem',fontWeight:'800',color:'white',marginBottom:'4px'}}>Mon Profil</div>
        <div style={{fontSize:'0.8rem',color:'rgba(255,255,255,0.5)'}}>
          {profile?.prenom || 'Champion(ne)'} · {objectifLabel[objectif] || '🎯 Objectif non défini'}
        </div>
      </div>

      <div style={{padding:'16px'}}>

        {/* OBJECTIF */}
        <div style={{background:'white',borderRadius:'16px',padding:'16px',marginBottom:'12px',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
          <div style={{fontSize:'0.72rem',fontWeight:'700',color:'#6b7a6a',letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:'10px'}}>
            🎯 Mon objectif
          </div>
          {[
            {val:'poids', label:'🔥 Perdre du poids', desc:'Cardio, calories, résultats visibles'},
            {val:'muscle', label:'💪 Me muscler', desc:'Force, volume, progression'},
            {val:'energie', label:'⚡ Retrouver de l\'énergie', desc:'Bien-être, vitalité, sommeil'},
          ].map(o => (
            <button key={o.val} style={btnStyle(objectif, o.val)} onClick={() => setObjectif(o.val)}>
              <div>{o.label}</div>
              <div style={{fontSize:'0.72rem',color:'#6b7a6a',marginTop:'2px'}}>{o.desc}</div>
            </button>
          ))}
        </div>

        {/* NIVEAU */}
        <div style={{background:'white',borderRadius:'16px',padding:'16px',marginBottom:'12px',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
          <div style={{fontSize:'0.72rem',fontWeight:'700',color:'#6b7a6a',letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:'10px'}}>
            💪 Mon niveau
          </div>
          {[
            {val:'beginner', label:'🌱 Débutant(e)', desc:'Je recommence ou je débute'},
            {val:'intermediate', label:'💪 Intermédiaire', desc:'Je m\'entraîne occasionnellement'},
            {val:'advanced', label:'🔥 Avancé(e)', desc:'Je m\'entraîne régulièrement'},
          ].map(o => (
            <button key={o.val} style={btnStyle(niveau, o.val)} onClick={() => setNiveau(o.val)}>
              <div>{o.label}</div>
              <div style={{fontSize:'0.72rem',color:'#6b7a6a',marginTop:'2px'}}>{o.desc}</div>
            </button>
          ))}
        </div>

        {/* BUDGET */}
        <div style={{background:'white',borderRadius:'16px',padding:'16px',marginBottom:'12px',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
          <div style={{fontSize:'0.72rem',fontWeight:'700',color:'#6b7a6a',letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:'10px'}}>
            🛒 Budget équipement
          </div>
          <div style={{background:'#e8f7f1',borderRadius:'12px',padding:'12px',marginBottom:'12px',textAlign:'center'}}>
            <div style={{fontSize:'1.8rem',fontWeight:'800',color:'#111'}}>${budget}</div>
            <div style={{fontSize:'0.72rem',color:'#6b7a6a'}}>budget équipement</div>
          </div>
          <input type="range" min="0" max="500" step="10" value={budget}
            onChange={e => setBudget(parseInt(e.target.value))}
            style={{width:'100%',marginBottom:'6px'}} />
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.7rem',color:'#6b7a6a'}}>
            <span>$0</span><span>$500+</span>
          </div>
        </div>

        {/* ALLERGIES */}
        <div style={{background:'white',borderRadius:'16px',padding:'16px',marginBottom:'16px',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
          <div style={{fontSize:'0.72rem',fontWeight:'700',color:'#6b7a6a',letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:'10px'}}>
            🥗 Restrictions alimentaires
          </div>
          {[
            {val:'gluten', label:'🌾 Sans gluten'},
            {val:'lactose', label:'🥛 Sans lactose'},
            {val:'arachides', label:'🥜 Allergie aux arachides'},
            {val:'poisson', label:'🐟 Sans poisson'},
            {val:'vegetarien', label:'🌱 Végétarien'},
            {val:'vegan', label:'🌿 Végétalien'},
          ].map(o => (
            <button key={o.val}
              style={{width:'100%',padding:'11px 14px',borderRadius:'12px',border: allergies.includes(o.val) ? '2px solid #1a9e6e' : '1.5px solid #e8f7f1',background: allergies.includes(o.val) ? '#e8f7f1' : 'white',color: allergies.includes(o.val) ? '#0d6b49' : '#111',fontWeight: allergies.includes(o.val) ? '600' : '400',fontSize:'0.85rem',cursor:'pointer',marginBottom:'6px',textAlign:'left',display:'flex',alignItems:'center',justifyContent:'space-between'}}
              onClick={() => setAllergies(prev => prev.includes(o.val) ? prev.filter(a => a !== o.val) : [...prev, o.val])}>
              <span>{o.label}</span>
              {allergies.includes(o.val) && <span style={{fontSize:'0.75rem',color:'#1a9e6e'}}>✓</span>}
            </button>
          ))}
        </div>

        {/* BOUTON SAUVEGARDER */}
        <button onClick={saveProfile} disabled={saving}
          style={{width:'100%',padding:'16px',borderRadius:'99px',border:'none',background: saved ? '#0d6b49' : '#1a9e6e',color:'white',fontWeight:'600',fontSize:'1rem',cursor:'pointer',marginBottom:'24px',transition:'background 0.3s'}}>
          {saving ? 'Sauvegarde...' : saved ? '✓ Profil mis à jour !' : 'Sauvegarder mes changements'}
        </button>

      </div>
    </div>
  )
}