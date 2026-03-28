import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import Programme from './Programme'
import Nutrition from './Nutrition'

const supabase = createClient(
  'https://ibrqwdhrzlrihczfovmp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlicnF3ZGhyemxyaWhjemZvdm1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NDc0NTIsImV4cCI6MjA4OTQyMzQ1Mn0.cb_nF1bJtFQ6v7TBI2f-BLTYYGq7y24qzCQpPMzWI1Q'
)

export default function Dashboard({ user, profile, onSignOut }) {
  const [stats, setStats] = useState({ seances: 0, calories: 0, streak: 0 })
  const [loading, setLoading] = useState(true)
 const [showProgramme, setShowProgramme] = useState(false)
const [showNutrition, setShowNutrition] = useState(false)
  useEffect(() => {
    if (user) loadStats()
  }, [user])

  const loadStats = async () => {
    setLoading(true)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    const { data: workouts } = await supabase
      .from('workouts')
      .select('duree_min, calories, date')
      .eq('user_id', user.id)
      .gte('date', weekAgo.toISOString().split('T')[0])
      .order('date', { ascending: false })
    if (workouts) {
      const seances = workouts.length
      const calories = workouts.reduce((sum, w) => sum + (w.calories || 0), 0)
      const streak = calcStreak(workouts)
      setStats({ seances, calories, streak })
    }
    setLoading(false)
  }

  const calcStreak = (workouts) => {
    if (!workouts || workouts.length === 0) return 0
    const dates = [...new Set(workouts.map(w => w.date))].sort().reverse()
    let streak = 0
    let current = new Date()
    current.setHours(0, 0, 0, 0)
    for (const dateStr of dates) {
      const d = new Date(dateStr)
      d.setHours(0, 0, 0, 0)
      const diff = Math.round((current - d) / (1000 * 60 * 60 * 24))
      if (diff <= 1) { streak++; current = d }
      else break
    }
    return streak
  }

  const objectifLabel = {
    poids: '🔥 Perte de poids',
    muscle: '💪 Musculation',
    energie: '⚡ Énergie'
  }

  const encouragement = {
    poids: 'Chaque séance te rapproche de ton objectif — continue !',
    muscle: 'La régularité construit les muscles — tu es sur la bonne voie !',
    energie: 'Ton énergie grandit à chaque séance — garde le rythme !'
  } 
  if (showNutrition) return (
  <Nutrition
    user={user}
    profile={profile}
    onBack={() => setShowNutrition(false)}
  />
) 
  if (showProgramme) return (
    <Programme
      user={user}
      profile={profile}
      onBack={() => { setShowProgramme(false); loadStats(); }}
    />
  )

  return (
    <div style={{minHeight:'100vh',background:'#f8f5ef',fontFamily:'sans-serif'}}>

      <div style={{background:'#1e2419',padding:'20px 20px 24px'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'16px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
            <div style={{width:'7px',height:'7px',borderRadius:'50%',background:'#d4e84a'}}></div>
            <span style={{color:'white',fontWeight:'700',fontSize:'0.95rem'}}>HomeStrong</span>
          </div>
          <button onClick={onSignOut} style={{background:'rgba(255,255,255,0.1)',color:'rgba(255,255,255,0.7)',border:'none',borderRadius:'99px',padding:'6px 14px',fontSize:'0.75rem',cursor:'pointer'}}>
            Déconnexion
          </button>
        </div>
        <div style={{fontSize:'0.78rem',color:'rgba(255,255,255,0.4)',marginBottom:'4px'}}>Bonjour 👋</div>
        <div style={{fontSize:'1.4rem',fontWeight:'800',color:'white',marginBottom:'8px'}}>
          {profile?.prenom || 'Champion(ne)'}
        </div>
        <div style={{background:'rgba(255,255,255,0.08)',borderRadius:'10px',padding:'10px 14px',display:'inline-block'}}>
          <span style={{fontSize:'0.82rem',color:'rgba(255,255,255,0.7)'}}>
            {objectifLabel[profile?.objectif] || '🎯 Objectif non défini'}
          </span>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'10px',padding:'16px 16px 0'}}>
        {[
          { val: stats.streak, lbl: 'Jours streak', icon: '🔥' },
          { val: stats.seances, lbl: 'Séances / sem.', icon: '💪' },
          { val: stats.calories, lbl: 'Calories', icon: '⚡' },
        ].map((s, i) => (
          <div key={i} style={{background:'white',borderRadius:'14px',padding:'12px 10px',textAlign:'center',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
            <div style={{fontSize:'1.1rem',marginBottom:'4px'}}>{s.icon}</div>
            <div style={{fontWeight:'800',fontSize:'1.3rem',color:'#111'}}>{loading ? '...' : s.val}</div>
            <div style={{fontSize:'0.62rem',color:'#6b7a6a',marginTop:'2px'}}>{s.lbl}</div>
          </div>
        ))}
      </div>

      <div style={{margin:'12px 16px 0',background:'#1e2419',borderRadius:'14px',padding:'14px'}}>
        <div style={{fontSize:'0.8rem',color:'rgba(255,255,255,0.75)',lineHeight:'1.6',fontStyle:'italic'}}>
          "{encouragement[profile?.objectif] || 'Bienvenue sur HomeStrong !'}"
        </div>
      </div>

      <div style={{padding:'16px 16px 0'}}>
        <div style={{fontSize:'0.72rem',fontWeight:'700',color:'#6b7a6a',letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:'8px'}}>
          Séance du jour
        </div>
        <div style={{background:'#1e2419',borderRadius:'16px',padding:'16px'}}>
          <div style={{fontSize:'0.72rem',padding:'3px 10px',borderRadius:'99px',background:'rgba(212,232,74,0.15)',color:'#d4e84a',fontWeight:'500',display:'inline-block',marginBottom:'8px'}}>
            Recommandé pour toi
          </div>
          <div style={{fontSize:'1.05rem',fontWeight:'800',color:'white',marginBottom:'6px'}}>
            {profile?.objectif === 'poids' ? 'Cardio à la maison' : profile?.objectif === 'muscle' ? 'Renforcement musculaire' : 'Yoga & énergie'}
          </div>
          <div style={{display:'flex',gap:'12px',marginBottom:'14px'}}>
            <span style={{fontSize:'0.75rem',color:'rgba(255,255,255,0.5)'}}>⏱ 25 min</span>
            <span style={{fontSize:'0.75rem',color:'rgba(255,255,255,0.5)'}}>🔥 180 kcal</span>
          </div>
          <button onClick={() => setShowProgramme(true)} style={{background:'#1a9e6e',color:'white',border:'none',borderRadius:'99px',padding:'11px 20px',fontWeight:'500',fontSize:'0.85rem',cursor:'pointer'}}>
  Voir tous mes programmes →
</button>
<div style={{fontSize:'0.72rem',color:'rgba(255,255,255,0.5)',marginTop:'8px'}}>
  💪 Séances aujourd'hui : {stats.seances}
</div>
        </div>
      </div>

      <div style={{padding:'12px 16px 24px'}}>
        <div style={{fontSize:'0.72rem',fontWeight:'700',color:'#6b7a6a',letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:'8px'}}>
          Budget équipement
        </div>
        <div style={{background:'white',borderRadius:'14px',padding:'14px',boxShadow:'0 2px 8px rgba(0,0,0,0.06)',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div>
            <div style={{fontWeight:'800',fontSize:'1.3rem',color:'#1a9e6e'}}>${profile?.budget_equipement || 0}</div>
            <div style={{fontSize:'0.72rem',color:'#6b7a6a',marginTop:'2px'}}>disponible pour l'équipement</div>
          </div>
          <div style={{fontSize:'1.5rem'}}>🛒</div>
        </div>
      </div>

    <div style={{padding:'0 16px 24px'}}>
        <button onClick={() => setShowNutrition(true)} style={{width:'100%',padding:'14px',borderRadius:'99px',border:'none',background:'#e8f7f1',color:'#0d6b49',fontWeight:'600',fontSize:'0.9rem',cursor:'pointer'}}>
          🍎 Voir mon plan nutrition →
        </button>
      </div>

    </div>
  )
}