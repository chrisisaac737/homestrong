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
  const [budgetNutrition, setBudgetNutrition] = useState(profile?.budget_nutrition || 'economique')
  const [prenom, setPrenom] = useState(profile?.prenom || '')
  const [heureEntrainement, setHeureEntrainement] = useState(profile?.heure_entrainement || 'matin')
  const [frequenceSemaine, setFrequenceSemaine] = useState(profile?.frequence_semaine || 3)
  const [dureeSeance, setDureeSeance] = useState(profile?.duree_seance || '30min')
  const [repasParJour, setRepasParJour] = useState(profile?.repas_par_jour || 3)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const saveProfile = async () => {
    setSaving(true)
    await supabase.from('users').update({
      objectif,
      budget_equipement: budget,
      niveau,
      allergies,
      budget_nutrition: budgetNutrition,
      prenom,
      heure_entrainement: heureEntrainement,
      frequence_semaine: frequenceSemaine,
      duree_seance: dureeSeance,
      repas_par_jour: repasParJour,
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

  const sectionTitle = (label) => (
    <div style={{fontSize:'0.72rem',fontWeight:'700',color:'#6b7a6a',letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:'10px'}}>
      {label}
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:'#f8f5ef',fontFamily:'sans-serif'}}>

      {/* HEADER */}
      <div style={{background:'#1e2419',padding:'20px'}}>
        <button onClick={onBack} style={{background:'rgba(255,255,255,0.1)',color:'white',border:'none',borderRadius:'99px',padding:'7px 14px',fontSize:'0.78rem',cursor:'pointer',marginBottom:'12px'}}>
          ← Tableau de bord
        </button>
        <div style={{fontSize:'1.2rem',fontWeight:'800',color:'white',marginBottom:'4px'}}>⚙️ Mon Profil</div>
        <div style={{fontSize:'0.8rem',color:'rgba(255,255,255,0.5)'}}>
          {prenom || profile?.prenom || 'Champion(ne)'} — modifiez vos préférences à tout moment
        </div>
      </div>

      <div style={{padding:'16px'}}>

        {/* POINT 2 — MODIFIER PRÉNOM */}
        <div style={{background:'white',borderRadius:'16px',padding:'16px',marginBottom:'12px',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
          {sectionTitle('👤 Mon prénom')}
          <input
            type="text"
            value={prenom}
            onChange={e => setPrenom(e.target.value)}
            placeholder="Ton prénom..."
            style={{width:'100%',padding:'12px 14px',borderRadius:'12px',border:'1.5px solid #e8f7f1',fontSize:'0.9rem',color:'#111',outline:'none',boxSizing:'border-box'}}
          />
        </div>

        {/* POINT 1 — OBJECTIF */}
        <div style={{background:'white',borderRadius:'16px',padding:'16px',marginBottom:'12px',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
          {sectionTitle('🎯 Mon objectif')}
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
          {sectionTitle('💪 Mon niveau')}
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

        {/* POINT 3 — HEURE ENTRAÎNEMENT */}
        <div style={{background:'white',borderRadius:'16px',padding:'16px',marginBottom:'12px',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
          {sectionTitle('⏰ Heure préférée d\'entraînement')}
          <div style={{display:'flex',gap:'8px'}}>
            {[
              {val:'matin', label:'🌅 Matin', desc:'6h-12h'},
              {val:'midi', label:'☀️ Midi', desc:'12h-14h'},
              {val:'soir', label:'🌙 Soir', desc:'17h-22h'},
            ].map(o => (
              <button key={o.val} onClick={() => setHeureEntrainement(o.val)}
                style={{flex:1,padding:'12px 8px',borderRadius:'12px',border: heureEntrainement === o.val ? '2px solid #1a9e6e' : '1.5px solid #e8f7f1',background: heureEntrainement === o.val ? '#e8f7f1' : 'white',color: heureEntrainement === o.val ? '#0d6b49' : '#111',cursor:'pointer',textAlign:'center'}}>
                <div style={{fontSize:'0.85rem',fontWeight: heureEntrainement === o.val ? '600' : '400'}}>{o.label}</div>
                <div style={{fontSize:'0.7rem',color:'#6b7a6a',marginTop:'2px'}}>{o.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* POINT 4 — FRÉQUENCE HEBDOMADAIRE */}
        <div style={{background:'white',borderRadius:'16px',padding:'16px',marginBottom:'12px',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
          {sectionTitle('📅 Fréquence hebdomadaire')}
          <div style={{display:'flex',gap:'8px'}}>
            {[2,3,4,5].map(f => (
              <button key={f} onClick={() => setFrequenceSemaine(f)}
                style={{flex:1,padding:'14px 8px',borderRadius:'12px',border: frequenceSemaine === f ? '2px solid #1a9e6e' : '1.5px solid #e8f7f1',background: frequenceSemaine === f ? '#e8f7f1' : 'white',color: frequenceSemaine === f ? '#0d6b49' : '#111',cursor:'pointer',textAlign:'center',fontWeight: frequenceSemaine === f ? '600' : '400',fontSize:'0.85rem'}}>
                {f}x/sem
              </button>
            ))}
          </div>
        </div>

        {/* POINT 5 — DURÉE PRÉFÉRÉE */}
        <div style={{background:'white',borderRadius:'16px',padding:'16px',marginBottom:'12px',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
          {sectionTitle('⏱ Durée préférée des séances')}
          <div style={{display:'flex',gap:'8px'}}>
            {[
              {val:'15min', label:'15 min'},
              {val:'30min', label:'30 min'},
              {val:'45min', label:'45 min'},
              {val:'60min', label:'60 min+'},
            ].map(o => (
              <button key={o.val} onClick={() => setDureeSeance(o.val)}
                style={{flex:1,padding:'14px 8px',borderRadius:'12px',border: dureeSeance === o.val ? '2px solid #1a9e6e' : '1.5px solid #e8f7f1',background: dureeSeance === o.val ? '#e8f7f1' : 'white',color: dureeSeance === o.val ? '#0d6b49' : '#111',cursor:'pointer',textAlign:'center',fontWeight: dureeSeance === o.val ? '600' : '400',fontSize:'0.85rem'}}>
                {o.label}
              </button>
            ))}
          </div>
        </div>

        {/* POINT 6 — REPAS PAR JOUR */}
        <div style={{background:'white',borderRadius:'16px',padding:'16px',marginBottom:'12px',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
          {sectionTitle('🍽 Nombre de repas par jour')}
          <div style={{display:'flex',gap:'8px'}}>
            {[2,3,4,5].map(r => (
              <button key={r} onClick={() => setRepasParJour(r)}
                style={{flex:1,padding:'14px 8px',borderRadius:'12px',border: repasParJour === r ? '2px solid #1a9e6e' : '1.5px solid #e8f7f1',background: repasParJour === r ? '#e8f7f1' : 'white',color: repasParJour === r ? '#0d6b49' : '#111',cursor:'pointer',textAlign:'center',fontWeight: repasParJour === r ? '600' : '400',fontSize:'0.85rem'}}>
                {r} repas
              </button>
            ))}
          </div>
        </div>

        {/* POINT 1 — BUDGET ALIMENTATION */}
        <div style={{background:'white',borderRadius:'16px',padding:'16px',marginBottom:'12px',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
          {sectionTitle('🍎 Budget alimentation')}
          {[
            {val:'economique', label:'🟢 Économique', desc:'~$45/semaine — recettes simples et accessibles'},
            {val:'modere', label:'🟡 Modéré', desc:'~$60/semaine — plus de variété et de fraîcheur'},
            {val:'confortable', label:'🔵 Confortable', desc:'~$80/semaine — recettes élaborées et qualité'},
          ].map(o => (
            <button key={o.val} style={btnStyle(budgetNutrition, o.val)} onClick={() => setBudgetNutrition(o.val)}>
              <div>{o.label}</div>
              <div style={{fontSize:'0.72rem',color:'#6b7a6a',marginTop:'2px'}}>{o.desc}</div>
            </button>
          ))}
        </div>

        {/* BUDGET ÉQUIPEMENT */}
        <div style={{background:'white',borderRadius:'16px',padding:'16px',marginBottom:'12px',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
          {sectionTitle('🛒 Budget équipement')}
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
        <div style={{background:'white',borderRadius:'16px',padding:'16px',marginBottom:'12px',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
          {sectionTitle('🥗 Restrictions alimentaires')}
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

        {/* POINTS 7,8,9 — MON ABONNEMENT */}
        <div style={{background:'#1e2419',borderRadius:'16px',padding:'16px',marginBottom:'12px'}}>
          {sectionTitle('⭐ Mon abonnement')}
          <div style={{background:'rgba(255,255,255,0.08)',borderRadius:'12px',padding:'12px 14px',marginBottom:'12px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <div>
              <div style={{fontSize:'0.82rem',fontWeight:'700',color:'white'}}>Plan actuel</div>
              <div style={{fontSize:'0.75rem',color:'rgba(255,255,255,0.5)',marginTop:'2px'}}>
                {profile?.abonnement === 'pro' ? '⭐ Pro — Accès complet' : '🆓 Gratuit — 2 programmes + 2 semaines nutrition'}
              </div>
            </div>
            <div style={{fontSize:'1.2rem'}}>{profile?.abonnement === 'pro' ? '⭐' : '🔓'}</div>
          </div>

          {profile?.abonnement !== 'pro' ? (
            <>
              <div style={{background:'rgba(212,232,74,0.1)',borderRadius:'12px',padding:'12px 14px',marginBottom:'10px'}}>
                <div style={{fontSize:'0.78rem',color:'#d4e84a',fontWeight:'600',marginBottom:'4px'}}>Tu mérites mieux 💪</div>
                <div style={{fontSize:'0.75rem',color:'rgba(255,255,255,0.7)',lineHeight:'1.5'}}>
                  Débloque tous les programmes, 7 jours de nutrition complète, tous les badges et bien plus encore.
                </div>
              </div>
              <button style={{width:'100%',padding:'14px',borderRadius:'99px',border:'none',background:'#d4e84a',color:'#111',fontWeight:'700',fontSize:'0.9rem',cursor:'pointer',marginBottom:'8px'}}>
                🚀 Passer à Pro — $7.99/mois
              </button>
              <button style={{width:'100%',padding:'12px',borderRadius:'99px',border:'1px solid rgba(255,255,255,0.15)',background:'transparent',color:'rgba(255,255,255,0.7)',fontSize:'0.82rem',cursor:'pointer',marginBottom:'12px'}}>
                📅 Plan annuel — $59.99/an (économisez 37%)
              </button>
            </>
          ) : (
            <button style={{width:'100%',padding:'14px',borderRadius:'99px',border:'1px solid rgba(255,255,255,0.15)',background:'transparent',color:'rgba(255,255,255,0.7)',fontSize:'0.85rem',cursor:'pointer',marginBottom:'12px'}}>
              ⚙️ Gérer mon abonnement Pro
            </button>
          )}

          {/* ANNONCE SUBTILE V2 */}
          <div style={{background:'rgba(255,255,255,0.05)',borderRadius:'12px',padding:'10px 14px',borderLeft:'3px solid #d4e84a'}}>
            <div style={{fontSize:'0.7rem',color:'#d4e84a',fontWeight:'600',marginBottom:'2px'}}>🚀 Bientôt disponible</div>
            <div style={{fontSize:'0.75rem',color:'rgba(255,255,255,0.6)',lineHeight:'1.5'}}>
              Coach IA personnalisé ⭐ HomeStrong — ton entraîneur virtuel qui apprend et s'adapte à toi.
            </div>
          </div>
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