import { createRoot } from 'react-dom/client'
import Hero from './sections/Hero.jsx'

function mountHero() {
  const heroEl = document.querySelector('[data-react-root="hero"]')
  if (!heroEl) return
  const data = (window.__CTM__ && window.__CTM__.hero) || {}
  createRoot(heroEl).render(<Hero data={data} />)
}

// Falls Script im Footer lädt, ist DOM meist ready – trotzdem sicherheitshalber:
if (document.readyState !== 'loading') {
  mountHero()
} else {
  document.addEventListener('DOMContentLoaded', mountHero)
}
