import React from 'react';
import { useHabitStore } from '../store/useHabitStore';
import { Moon, Sun, Heart } from 'lucide-react';

const Settings = () => {
  const theme = useHabitStore(state => state.theme);
  const setTheme = useHabitStore(state => state.setTheme);

  return (
    <div className="container">
      <header className="header" style={{ padding: '0 0 20px 0', borderBottom: 'none' }}>
        <h1>Settings</h1>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="habit-card" style={{ cursor: 'default', flexDirection: 'column', alignItems: 'flex-start' }}>
          <h3 style={{ marginBottom: '16px' }}>Theme</h3>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className={`btn ${theme === 'light' ? 'btn-primary' : ''}`} onClick={() => setTheme('light')}><Sun size={18} /> Light</button>
            <button className={`btn ${theme === 'dark' ? 'btn-primary' : ''}`} onClick={() => setTheme('dark')}><Moon size={18} /> Dark</button>
          </div>
        </div>

        <div className="habit-card" style={{ cursor: 'default', flexDirection: 'column', alignItems: 'flex-start' }}>
          <h3 style={{ marginBottom: '16px' }}>About</h3>
          <p style={{ color: 'var(--text-secondary)' }}>The One Percent App is designed to help you get 1% better every day through consistent habits.</p>
        </div>

        <div className="habit-card" style={{ cursor: 'default', flexDirection: 'column', alignItems: 'flex-start' }}>
          <h3 style={{ marginBottom: '16px' }}>Support</h3>
          <button className="btn btn-primary" style={{ backgroundColor: 'var(--danger-color)' }}><Heart size={18} /> Donate</button>
        </div>
      </div>
    </div>
  );
};
export default Settings;
