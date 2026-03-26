import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import Onboarding from './Onboarding'

const supabase = createClient(
  'https://ibrqwdhrzlrihczfovmp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlicnF3ZGhyemxyaWhjemZvdm1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NDc0NTIsImV4cCI6MjA4OTQyMzQ1Mn0.cb_nF1bJtFQ6v7TBI2f-BLTYYGq7y24qzCQpPMzWI1Q'
)

function App() {
  const [screen, setScreen] = useState('welcome')
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [prenom, setPrenom] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user)
        loadProfile(session.user.id)
      }
    })
  }, [])

  const loadProfile = async (userId) => {
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    if (data) {
      setProfile(data)
      if (!data.objectif) {
        setScreen('onboarding')
      } else {
        setScreen('dashboard')
      }
    } else {
      setScreen('onboarding')
    }
  }

  const handleSignUp = async () => {
    setLoading(true)
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setMessage('Erreur : ' + error.message)
    } else {
      setUser(data.user)
      await supabase.from('users').update({ prenom }).eq('id', data.user.id)
      setScreen('onboarding')
    }
    setLoading(false)
  }

  const handleSignIn = async () => {
    setLoading(true)
    const { data, error } = 
    if (error) {await new Promise(resolve => setTimeout(resolve, 1000))
await supabase.from('users').update({ prenom }).eq('id', data.user.id)
      setMessage('Erreur : ' + error.message)
    } else {
      setUser(data.user)
      loadProfile(data.user.id)
    }
    setLoading(false)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
    setScreen('welcome')
    setEmail('')
    setPassword('')
    setPrenom('')
    setMessage('')
  }

  if (screen === 'welcome') return (
    <div style={{minHeight:'100vh',background:'#1e2419',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'2rem',fontFamily:'sans-serif'}}>
      <div style={{width:'10px',height:'10px',borderRadius:'50%',background:'#d4e84a',marginBottom:'12px'}}></div>
      <h1 style={{color:'white',fontSize:'2.5rem',fontWeight:'800',marginBottom:'8px',textAlign:'center'}}>HomeStrong</h1>
      <p style={{color:'rgba(255,255,255,0.5)',marginBottom:'40px',textAlign:'center'}}>Ton corps. Ta maison. Ton rythme.</p>
      <div style={{display:'flex',gap:'12px'}}>
        <button onClick={() => setScreen('signup')} style={{background:'#d4e84a',color:'#111',border:'none',borderRadius:'99px',padding:'14px 28px',fontWeight:'600',fontSize:'1rem',cursor:'pointer'}}>
          Créer un compte
        </button>
        <button onClick={() => setScreen('signin')} style={{background:'transparent',color:'white',border:'1px solid rgba(255,255,255,0.3)',borderRadius:'99px',padding:'14px 28px',fontSize:'1rem',cursor:'pointer'}}>
          Se connecter
        </button>
      </div>
    </div>
  )

  if (screen === 'signup') return (
    <div style={{minHeight:'100vh',background:'#f8f5ef',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'2rem',fontFamily:'sans-serif'}}>
      <div style={{background:'white',borderRadius:'20px',padding:'2rem',width:'100%',maxWidth:'380px',boxShadow:'0 8px 32px rgba(0,0,0,0.08)'}}>
        <h2 style={{fontWeight:'800',marginBottom:'4px',color:'#111'}}>Créer un compte</h2>
        <p style={{color:'#6b7a6a',fontSize:'0.85rem',marginBottom:'24px'}}>Rejoindre HomeStrong — c'est gratuit</p>
        <input placeholder="Prénom" value={prenom} onChange={e => setPrenom(e.target.value)}
          style={{width:'100%',padding:'12px',borderRadius:'10px',border:'1.5px solid #e8f7f1',marginBottom:'10px',fontSize:'0.95rem',boxSizing:'border-box'}} />
        <input placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)}
          style={{width:'100%',padding:'12px',borderRadius:'10px',border:'1.5px solid #e8f7f1',marginBottom:'10px',fontSize:'0.95rem',boxSizing:'border-box'}} />
        <input placeholder="Mot de passe" type="password" value={password} onChange={e => setPassword(e.target.value)}
          style={{width:'100%',padding:'12px',borderRadius:'10px',border:'1.5px solid #e8f7f1',marginBottom:'16px',fontSize:'0.95rem',boxSizing:'border-box'}} />
        {message && <p style={{color:'red',fontSize:'0.82rem',marginBottom:'12px'}}>{message}</p>}
        <button onClick={handleSignUp} disabled={loading}
          style={{width:'100%',padding:'14px',borderRadius:'99px',border:'none',background:'#1a9e6e',color:'white',fontWeight:'600',fontSize:'0.95rem',cursor:'pointer',marginBottom:'12px'}}>
          {loading ? 'Création...' : "S'inscrire →"}
        </button>
        <button onClick={() => setScreen('welcome')}
          style={{width:'100%',padding:'10px',borderRadius:'99px',border:'1px solid #e8f7f1',background:'transparent',color:'#6b7a6a',cursor:'pointer',fontSize:'0.85rem'}}>
          Retour
        </button>
      </div>
    </div>
  )

  if (screen === 'signin') return (
    <div style={{minHeight:'100vh',background:'#f8f5ef',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'2rem',fontFamily:'sans-serif'}}>
      <div style={{background:'white',borderRadius:'20px',padding:'2rem',width:'100%',maxWidth:'380px',boxShadow:'0 8px 32px rgba(0,0,0,0.08)'}}>
        <h2 style={{fontWeight:'800',marginBottom:'4px',color:'#111'}}>Se connecter</h2>
        <p style={{color:'#6b7a6a',fontSize:'0.85rem',marginBottom:'24px'}}>Bon retour sur HomeStrong 👋</p>
        <input placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)}
          style={{width:'100%',padding:'12px',borderRadius:'10px',border:'1.5px solid #e8f7f1',marginBottom:'10px',fontSize:'0.95rem',boxSizing:'border-box'}} />
        <input placeholder="Mot de passe" type="password" value={password} onChange={e => setPassword(e.target.value)}
          style={{width:'100%',padding:'12px',borderRadius:'10px',border:'1.5px solid #e8f7f1',marginBottom:'16px',fontSize:'0.95rem',boxSizing:'border-box'}} />
        {message && <p style={{color:'red',fontSize:'0.82rem',marginBottom:'12px'}}>{message}</p>}
        <button onClick={handleSignIn} disabled={loading}
          style={{width:'100%',padding:'14px',borderRadius:'99px',border:'none',background:'#1a9e6e',color:'white',fontWeight:'600',fontSize:'0.95rem',cursor:'pointer',marginBottom:'12px'}}>
          {loading ? 'Connexion...' : 'Se connecter →'}
        </button>
        <button onClick={() => setScreen('welcome')}
          style={{width:'100%',padding:'10px',borderRadius:'99px',border:'1px solid #e8f7f1',background:'transparent',color:'#6b7a6a',cursor:'pointer',fontSize:'0.85rem'}}>
          Retour
        </button>
      </div>
    </div>
  )

  if (screen === 'onboarding') return (
    <Onboarding user={user} onComplete={() => loadProfile(user.id)} />
  )

  if (screen === 'dashboard') return (
    <div style={{minHeight:'100vh',background:'#f8f5ef',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'2rem',fontFamily:'sans-serif',textAlign:'center'}}>
      <div style={{width:'10px',height:'10px',borderRadius:'50%',background:'#1a9e6e',marginBottom:'12px'}}></div>
      <h2 style={{fontWeight:'800',color:'#111',marginBottom:'8px'}}>
        Bonjour {profile?.prenom || 'champion(ne)'} 👋
      </h2>
      <div style={{background:'white',borderRadius:'16px',padding:'16px 20px',marginBottom:'16px',boxShadow:'0 4px 16px rgba(0,0,0,0.06)'}}>
        <div style={{fontSize:'0.78rem',color:'#6b7a6a',marginBottom:'4px'}}>Objectif</div>
        <div style={{fontWeight:'600',color:'#1a9e6e'}}>
          {profile?.objectif === 'poids' ? '🔥 Perte de poids' : profile?.objectif === 'muscle' ? '💪 Musculation' : '⚡ Énergie'}
        </div>
      </div>
      <div style={{background:'white',borderRadius:'16px',padding:'16px 20px',marginBottom:'24px',boxShadow:'0 4px 16px rgba(0,0,0,0.06)'}}>
        <div style={{fontSize:'0.78rem',color:'#6b7a6a',marginBottom:'4px'}}>Budget équipement</div>
        <div style={{fontWeight:'600',color:'#1a9e6e'}}>${profile?.budget_equipement || 0}</div>
      </div>
      <p style={{color:'#6b7a6a',marginBottom:'32px',fontSize:'0.9rem'}}>Votre espace HomeStrong est prêt. Les écrans arrivent bientôt !</p>
      <button onClick={handleSignOut}
        style={{background:'#1a9e6e',color:'white',border:'none',borderRadius:'99px',padding:'12px 24px',cursor:'pointer',fontSize:'0.9rem'}}>
        Se déconnecter
      </button>
    </div>
  )
}

export default App