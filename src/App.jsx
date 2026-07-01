import { useEffect, useState } from 'react'
import './App.css'

const TARGET_DATE = new Date('2026-07-01T09:05:00-07:00').getTime();

function getTimeRemaining() {
  const now = Date.now();
  const diff = Math.max(0, TARGET_DATE - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, expired: diff === 0 };
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [time, setTime] = useState(getTimeRemaining);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    }
  }, [setIsLoading]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeRemaining());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  const renderContent = () => {
    if (isLoading) {
      return <div className="loading">🤔</div>;
    }

    if (time.expired) {
      return (
        <div className="content">
          <div className="heading expired-heading">🧘 Yes 🧘</div>
        </div>
      );
    }

    return (
      <div className="content">
        <div className="heading">The wait is almost over...</div>
        <div className="countdown">
          {time.days > 0 && <span className="time-segment">{time.days}<span className="time-label">d</span></span>}
          <span className="time-segment">{pad(time.hours)}<span className="time-label">h</span></span>
          <span className="time-segment">{pad(time.minutes)}<span className="time-label">m</span></span>
          <span className="time-segment">{pad(time.seconds)}<span className="time-label">s</span></span>
        </div>
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
