import { useEffect, useState } from 'react'
import './App.css'

const SUBTEXTS = [
  "Should we stay in lockdown forever?",
  "But it'd be pretty cool if it were",
  "#tipofthespear",
  "But did you finish your CJA?",
  "But gateway to dominance",
  "Unless…",
  "Please",
  "Back to work",
  "But could be the move?",
]

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    }
  }, [setIsLoading]);

  const renderContent = () => {
    if (isLoading) {
      return <div className="loading">🤔</div>;
    }

    return (
      <div className="content">
        <div>NO</div>
        <div className="subtext">{SUBTEXTS[Math.floor(Math.random() * SUBTEXTS.length)]}</div>
      </div>
    );
  }

  return (
    <div className="container">
      {renderContent()}
    </div>
  )
}

export default App
