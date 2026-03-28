import { useState } from 'react'

const equipements = {
  0: {
    label: '$0 — Sans équipement',
    couleur: '#1a9e6e',
    bg: '#e8f7f1',
    icone: '💪',
    description: "Ton corps est ton meilleur équipement. Commence dès aujourd'hui sans rien dépenser.",
    items: [
      { nom: 'Tapis de sol', prix: '$0', desc: 'Utilisez une serviette épaisse ou une couverture pliée.', tag: 'Gratuit', icone: '🧘', exercices: ['Gainage planche', 'Abdominaux', 'Étirements', 'Yoga & mobilité'] },
      { nom: 'Chaise solide', prix: '$0', desc: 'Pour les dips, les step-ups et les étirements.', tag: 'Gratuit', icone: '🪑', exercices: ['Dips sur chaise', 'Step-ups', 'Pike push-ups', 'Étirements dos'] },
      { nom: 'Mur plat', prix: '$0', desc: 'Pour les pompes murales, le gainage vertical et les flexions.', tag: 'Gratuit', icone: '🏠', exercices: ['Pompes murales', 'Flexions verticales', 'Gainage mural', 'Étirements'] },
    ]
  },
  100: {
    label: '$0 à $100 — Débutant',
    couleur: '#d4e84a',
    bg: '#f9ffe0',
    icone: '🌱',
    description: 'Un petit investissement pour de grands résultats. Ces équipements durent des années.',
    items: [
      {
        nom: 'Bandes élastiques', prix: '$15-$30',
        desc: 'Idéales pour squats, fentes, pompes résistées. Légères et transportables.',
        tag: 'Recommandé', icone: '🔗',
        exercices: ['Squats avec bandes', 'Fentes résistées', 'Pompes avec bandes', 'Hip thrust', 'Flexions bras'],
        liens: {
          amazon: 'https://www.amazon.ca/s?k=bandes+elastiques+fitness+resistance',
          decathlon: 'https://www.decathlon.ca/fr/search?q=bandes+elastiques+fitness',
        }
      },
      {
        nom: 'Corde à sauter', prix: '$10-$20',
        desc: 'Cardio intense en 15 minutes. Brûle autant de calories que la course.',
        tag: 'Populaire', icone: '⚡',
        exercices: ['Corde à sauter HIIT', 'Double saut', 'Corde vitesse', 'Intervalles cardio'],
        liens: {
          amazon: 'https://www.amazon.ca/s?k=corde+a+sauter+fitness',
          decathlon: 'https://www.decathlon.ca/fr/search?q=corde+a+sauter',
        }
      },
      {
        nom: 'Tapis de yoga', prix: '$20-$50',
        desc: 'Confort et stabilité pour tous vos exercices au sol.',
        tag: 'Essentiel', icone: '🧘',
        exercices: ['Yoga & mobilité', 'Gainage planche', 'Abdominaux', 'Pompes au sol', 'Étirements'],
        liens: {
          amazon: 'https://www.amazon.ca/s?k=tapis+yoga+fitness+antiderapant',
          decathlon: 'https://www.decathlon.ca/fr/search?q=tapis+yoga',
          sportchek: 'https://www.sportchek.ca/en/search/yoga-mat',
        }
      },
      {
        nom: 'Haltères légers (2x5kg)', prix: '$30-$60',
        desc: 'Parfaits pour débuter le renforcement musculaire des bras et épaules.',
        tag: 'Débutant', icone: '🏋️',
        exercices: ['Curl biceps', 'Développé épaules', 'Pompes lestées', 'Flexions avant-bras', 'Rowing'],
        liens: {
          amazon: 'https://www.amazon.ca/s?k=halteres+5kg+fitness+paire',
          decathlon: 'https://www.decathlon.ca/fr/search?q=halteres+5kg',
        }
      },
    ]
  },
  300: {
    label: '$100 à $300 — Intermédiaire',
    couleur: '#EF9F27',
    bg: '#fff8e8',
    icone: '💪',
    description: 'Passez au niveau supérieur avec des équipements qui transforment votre entraînement.',
    items: [
      {
        nom: 'Kettlebell (16kg)', prix: '$40-$80',
        desc: "L'outil le plus complet du fitness — force, cardio et mobilité en un seul objet.",
        tag: 'Polyvalent', icone: '🔔',
        exercices: ['Kettlebell swing', 'Goblet squat', 'Turkish get-up', 'Pompes kettlebell', 'Flexions lestées'],
        liens: {
          amazon: 'https://www.amazon.ca/s?k=kettlebell+16kg+fonte+fitness',
          decathlon: 'https://www.decathlon.ca/fr/search?q=kettlebell',
        }
      },
      {
        nom: 'Haltères ajustables', prix: '$80-$150',
        desc: "Remplacent 10 paires d'haltères. Idéaux si vous manquez d'espace.",
        tag: '⭐ HomeStrong Force', icone: '🏋️',
        exercices: ['Full body haltères', 'Curl biceps', 'Développé couché', 'Rowing incliné', 'Flexions lestées', 'Pompes lestées'],
        liens: {
          amazon: 'https://www.amazon.ca/s?k=halteres+ajustables+fitness+reglables',
          sportchek: 'https://www.sportchek.ca/en/search/adjustable-dumbbells',
        }
      },
      {
        nom: 'Barre de traction murale', prix: '$30-$60',
        desc: 'Dos, biceps et abdominaux — le plus complet pour le haut du corps.',
        tag: 'Efficace', icone: '🔩',
        exercices: ['Tractions pronation', 'Tractions supination', 'L-sit suspendu', 'Pompes déclinées', 'Flexions barre'],
        liens: {
          amazon: 'https://www.amazon.ca/s?k=barre+traction+porte+murale+fitness',
          decathlon: 'https://www.decathlon.ca/fr/search?q=barre+traction+murale',
        }
      },
      {
        nom: 'Vélo stationnaire entrée de gamme', prix: '$150-$300',
        desc: 'Cardio sans impact articulaire. Parfait pour la perte de poids.',
        tag: 'Cardio', icone: '🚴',
        exercices: ['Cardio vélo', 'Intervalles vélo', 'Cardio doux énergie', 'Récupération active'],
        liens: {
          amazon: 'https://www.amazon.ca/s?k=velo+stationnaire+interieur+fitness',
          decathlon: 'https://www.decathlon.ca/fr/search?q=velo+appartement',
          sportchek: 'https://www.sportchek.ca/en/search/stationary-exercise-bike',
        }
      },
    ]
  },
  500: {
    label: '$300 à $500+ — Avancé',
    couleur: '#1e2419',
    bg: '#f0f0eb',
    icone: '🔥',
    description: 'Équipements premium pour des résultats professionnels à la maison.',
    items: [
      {
        nom: 'Vélo stationnaire premium', prix: '$300-$500',
        desc: 'Résistance magnétique, silencieux, écran de suivi. La référence cardio à domicile.',
        tag: '⭐ HomeStrong Cardio',icone: '🚴',
        exercices: ['Cardio vélo intensif', 'HIIT vélo', 'Endurance longue durée', 'Intervalles sprint'],
        liens: {
          amazon: 'https://www.amazon.ca/s?k=velo+stationnaire+magnetique+premium',
          decathlon: 'https://www.decathlon.ca/fr/search?q=velo+appartement+premium',
          sportchek: 'https://www.sportchek.ca/en/search/indoor-cycling-bike',
        }
      },
      {
        nom: 'Tapis de course', prix: '$400-$800',
        desc: 'Course, marche rapide, HIIT et intervalles sans quitter la maison.',
        tag: 'Treadmill Factory', icone: '🏃',
        exercices: ['Course endurance', 'Marche rapide inclinée', 'HIIT tapis de course', 'Intervalles sprint/marche', 'Course fractionnée', 'Marche active énergie'],
        liens: {
          amazon: 'https://www.amazon.ca/s?k=tapis+de+course+maison+pliable',
          treadmill: 'https://www.treadmillfactory.ca/treadmills',
        }
      },
      {
        nom: 'Banc de musculation', prix: '$100-$200',
        desc: 'Développé couché, rowing, curl incliné — multiplie les exercices possibles.',
        tag: 'Polyvalent', icone: '🏋️',
        exercices: ['Développé couché haltères', 'Rowing incliné', 'Curl incliné', 'Pompes déclinées sur banc', 'Flexions banc'],
        liens: {
          amazon: 'https://www.amazon.ca/s?k=banc+musculation+reglable+fitness',
          decathlon: 'https://www.decathlon.ca/fr/search?q=banc+musculation',
          sportchek: 'https://www.sportchek.ca/en/search/adjustable-weight-bench',
        }
      },
      {
        nom: 'Rack à haltères', prix: '$150-$300',
        desc: 'Rangement organisé et accès rapide pendant vos entraînements.',
        tag: 'Organisation', icone: '🗄️',
        exercices: ['Accès rapide multi-haltères', 'Organisation espace entraînement'],
        liens: {
          amazon: 'https://www.amazon.ca/s?k=rack+rangement+halteres+fitness',
          sportchek: 'https://www.sportchek.ca/en/search/dumbbell-rack-storage',
        }
      },
    ]
  }
}

const budgetOptions = [0, 100, 300, 500]

export default function Equipements({ user, profile, onBack }) {
  const budgetProfil = profile?.budget_equipement || 0
  const budgetInitial = budgetOptions.reduce((prev, curr) =>
    Math.abs(curr - budgetProfil) < Math.abs(prev - budgetProfil) ? curr : prev
  )
  const [budgetActif, setBudgetActif] = useState(budgetInitial)
  const [itemOuvert, setItemOuvert] = useState(null)
  const categorie = equipements[budgetActif]

  return (
    <div style={{minHeight:'100vh',background:'#f8f5ef',fontFamily:'sans-serif'}}>
      <div style={{background:'#1e2419',padding:'20px'}}>
        <button onClick={onBack} style={{background:'rgba(255,255,255,0.1)',color:'white',border:'none',borderRadius:'99px',padding:'7px 14px',fontSize:'0.78rem',cursor:'pointer',marginBottom:'12px'}}>
          ← Tableau de bord
        </button>
        <div style={{fontSize:'1.2rem',fontWeight:'800',color:'white',marginBottom:'4px'}}>Équipements</div>
        <div style={{fontSize:'0.8rem',color:'rgba(255,255,255,0.5)'}}>Budget déclaré : ${budgetProfil}</div>
      </div>

      <div style={{background:'white',padding:'12px',borderBottom:'1px solid #e8f7f1'}}>
        <div style={{fontSize:'0.7rem',color:'#6b7a6a',marginBottom:'8px',fontWeight:'600',textTransform:'uppercase',letterSpacing:'0.06em'}}>
          Filtrer par budget
        </div>
        <div style={{display:'flex',gap:'6px',overflowX:'auto'}}>
          {budgetOptions.map(b => (
            <button key={b} onClick={() => { setBudgetActif(b); setItemOuvert(null) }}
              style={{padding:'6px 12px',borderRadius:'99px',border:'none',background: budgetActif === b ? '#1a9e6e' : '#f0f0eb',color: budgetActif === b ? 'white' : '#6b7a6a',fontSize:'0.75rem',fontWeight: budgetActif === b ? '600' : '400',cursor:'pointer',flexShrink:0,whiteSpace:'nowrap'}}>
              {b === 0 ? '$0' : b === 100 ? '$0-$100' : b === 300 ? '$100-$300' : '$300+'}
            </button>
          ))}
        </div>
      </div>

      <div style={{padding:'14px'}}>
        <div style={{background: categorie.bg, borderRadius:'14px', padding:'12px 14px', marginBottom:'12px', border:`1px solid ${categorie.couleur}22`}}>
          <div style={{fontSize:'1.1rem', marginBottom:'4px'}}>{categorie.icone}</div>
          <div style={{fontSize:'0.88rem', fontWeight:'700', color:'#111', marginBottom:'4px'}}>{categorie.label}</div>
          <div style={{fontSize:'0.76rem', color:'#6b7a6a', lineHeight:'1.5'}}>{categorie.description}</div>
        </div>

        <div style={{fontSize:'0.7rem',fontWeight:'700',color:'#6b7a6a',letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:'8px'}}>
          Équipements recommandés
        </div>

        {categorie.items.map((item, i) => (
          <div key={i} style={{background:'white',borderRadius:'16px',marginBottom:'10px',boxShadow:'0 2px 8px rgba(0,0,0,0.06)',overflow:'hidden'}}>
            <div onClick={() => setItemOuvert(itemOuvert === i ? null : i)}
              style={{padding:'14px',display:'flex',alignItems:'flex-start',gap:'12px',cursor:'pointer'}}>
              <div style={{width:'44px',height:'44px',borderRadius:'12px',background: categorie.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.3rem',flexShrink:0}}>
                {item.icone}
              </div>
              <div style={{flex:1}}>
                <div style={{display:'flex',alignItems:'center',gap:'6px',marginBottom:'2px',flexWrap:'wrap'}}>
                  <div style={{fontWeight:'700',color:'#111',fontSize:'0.88rem'}}>{item.nom}</div>
                  <span style={{fontSize:'0.6rem',background: item.tag === 'Treadmill Factory' || item.tag.includes('HomeStrong') ? '#1e2419' : categorie.bg,color: item.tag === 'Treadmill Factory' ? '#d4e84a' : categorie.couleur,padding:'2px 7px',borderRadius:'99px',fontWeight:'600'}}>{item.tag}</span>
                </div>
                <div style={{fontSize:'0.8rem',fontWeight:'600',color:'#1a9e6e',marginBottom:'4px'}}>{item.prix}</div>
                <div style={{fontSize:'0.74rem',color:'#6b7a6a',lineHeight:'1.5'}}>{item.desc}</div>
              </div>
              <div style={{color:'#6b7a6a',fontSize:'0.9rem'}}>{itemOuvert === i ? '▲' : '▼'}</div>
            </div>

            {itemOuvert === i && (
              <div style={{padding:'0 14px 14px',borderTop:'1px solid #f0f0eb'}}>
                <div style={{marginTop:'10px',marginBottom:'10px'}}>
                  <div style={{fontSize:'0.7rem',fontWeight:'600',color:'#111',marginBottom:'6px'}}>💪 Exercices associés dans HomeStrong</div>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'5px'}}>
                    {item.exercices.map((ex, j) => (
                      <span key={j} style={{fontSize:'0.68rem',background:'#e8f7f1',color:'#0d6b49',padding:'3px 9px',borderRadius:'99px'}}>{ex}</span>
                    ))}
                  </div>
                </div>
                {item.liens && (
                  <div>
                    <div style={{fontSize:'0.7rem',fontWeight:'600',color:'#111',marginBottom:'6px'}}>🛒 Acheter maintenant</div>
                    <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
                      {item.liens.amazon && (
                        <a href={item.liens.amazon} target="_blank" rel="noreferrer"
                          style={{fontSize:'0.68rem',padding:'6px 12px',borderRadius:'99px',background:'#fff8e8',color:'#EF9F27',fontWeight:'600',textDecoration:'none',border:'1px solid #EF9F2733'}}>
                          🛒 Amazon
                        </a>
                      )}
                      {item.liens.decathlon && (
                        <a href={item.liens.decathlon} target="_blank" rel="noreferrer"
                          style={{fontSize:'0.68rem',padding:'6px 12px',borderRadius:'99px',background:'#e8f0ff',color:'#1a56db',fontWeight:'600',textDecoration:'none',border:'1px solid #1a56db22'}}>
                          🏪 Decathlon
                        </a>
                      )}
                      {item.liens.sportchek && (
                        <a href={item.liens.sportchek} target="_blank" rel="noreferrer"
                          style={{fontSize:'0.68rem',padding:'6px 12px',borderRadius:'99px',background:'#ffe8e8',color:'#e53e3e',fontWeight:'600',textDecoration:'none',border:'1px solid #e53e3e22'}}>
                          🏅 Sport Chek
                        </a>
                      )}
                      {item.liens.treadmill && (
                        <a href={item.liens.treadmill} target="_blank" rel="noreferrer"
                          style={{fontSize:'0.68rem',padding:'6px 12px',borderRadius:'99px',background:'#1e2419',color:'#d4e84a',fontWeight:'600',textDecoration:'none'}}>
                          🏃 Treadmill Factory
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        <div style={{background:'#1e2419',borderRadius:'14px',padding:'12px 14px',marginBottom:'24px'}}>
          <div style={{fontSize:'0.68rem',color:'#d4e84a',fontWeight:'600',marginBottom:'4px'}}>💡 Conseil HomeStrong</div>
          <div style={{fontSize:'0.78rem',color:'rgba(255,255,255,0.8)',lineHeight:'1.5'}}>
            {budgetActif === 0
              ? 'Commencez avec $0 — les pompes, flexions et squats au poids du corps sont aussi efficaces que la salle. Vos premiers résultats arrivent dès la première semaine.'
              : budgetActif === 100
              ? 'Les bandes élastiques et la corde à sauter sont les meilleurs investissements pour débuter. Résistants, peu encombrants et redoutablement efficaces.'
              : budgetActif === 300
              ? "Un kettlebell et des haltères ajustables remplacent un abonnement de salle à $60/mois. Rentabilisés en moins de 3 mois."
              : "Un tapis de course ou un vélo premium c'est un investissement sur 10 ans. Moins de $0.25 par jour — moins cher qu'un café."}
          </div>
        </div>
      </div>
    </div>
  )
}