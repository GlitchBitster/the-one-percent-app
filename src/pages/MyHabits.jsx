import React from 'react';
import { useHabitStore } from '../store/useHabitStore';
import { useNavigate } from 'react-router-dom';
import { Check, X, Calendar, Activity } from 'lucide-react';
import confetti from 'canvas-confetti';

const MyHabits = () => {
  const habits = useHabitStore(state => state.habits);
  const toggleHabitHistory = useHabitStore(state => state.toggleHabitHistory);
  const navigate = useNavigate();

  const todayStr = new Date().toISOString().split('T')[0];
  
  const todayFormatted = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  const handleCardClick = (id, e) => {
    if (e.target.closest('.checkbox-wrapper')) return;
    navigate(`/habit/${id}`);
  };

  const handleDone = (habit) => {
    if (!habit.history?.includes(todayStr)) {
      toggleHabitHistory(habit.id, todayStr);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#10b981', '#f59e0b']
      });
    }
  };

  const handleNotDone = (habit) => {
    if (habit.history?.includes(todayStr)) {
      toggleHabitHistory(habit.id, todayStr);
    }
  };

  // Helper to calculate current streak
  const getStreak = (history) => {
    if (!history) return 0;
    let streak = 0;
    let d = new Date();
    while (true) {
      const dStr = d.toISOString().split('T')[0];
      if (history.includes(dStr)) {
        streak++;
        d.setDate(d.getDate() - 1);
      } else {
        // If today is missed but yesterday was done, streak is maintained
        if (streak === 0 && dStr === todayStr) {
           d.setDate(d.getDate() - 1);
        } else {
           break;
        }
      }
    }
    return streak;
  };

  return (
    <div className="container">
      <header className="header" style={{ padding: '0 0 24px 0', borderBottom: 'none', flexDirection: 'column', alignItems: 'flex-start', gap: '6px' }}>
        <h1 style={{ fontSize: '1.75rem' }}>My Habits</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
          <Calendar size={16} />
          <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{todayFormatted}</span>
        </div>
      </header>

      {habits.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '60px', color: 'var(--text-secondary)' }}>
          <Activity size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
          <p style={{ fontSize: '1.1rem', marginBottom: '8px' }}>No habits yet.</p>
          <p>Let's get 1% better today!</p>
          <button className="btn btn-primary" style={{ marginTop: '24px' }} onClick={() => navigate('/add')}>
            + Create First Habit
          </button>
        </div>
      ) : (
        <div>
          {habits.map(habit => {
            const isDoneToday = habit.history?.includes(todayStr);
            const currentStreak = getStreak(habit.history);
            
            return (
              <div key={habit.id} className="habit-card" onClick={(e) => handleCardClick(habit.id, e)}>
                <div className="habit-info">
                  <span className="habit-title">{habit.title}</span>
                  <span className="habit-streak" style={{ color: currentStreak > 2 ? 'var(--primary-color)' : 'var(--text-secondary)', fontWeight: currentStreak > 2 ? 600 : 400 }}>
                    🔥 Streak: {currentStreak} days
                  </span>
                </div>
                <div className="checkbox-wrapper">
                  <button
                    className={`habit-checkbox ${isDoneToday ? 'checked' : ''}`}
                    onClick={() => handleDone(habit)}
                    title="Done"
                  >
                    <Check size={18} />
                  </button>
                  <button
                    className="habit-checkbox"
                    onClick={() => handleNotDone(habit)}
                    title="Not Done"
                    style={{
                      borderColor: !isDoneToday ? 'var(--danger-color)' : 'var(--border-color)',
                      backgroundColor: !isDoneToday ? 'var(--danger-color)' : 'transparent',
                      color: !isDoneToday ? 'white' : 'var(--text-secondary)'
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyHabits;
