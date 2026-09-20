import React from 'react';
import { useHabitStore } from '../store/useHabitStore';
import { Trash2 } from 'lucide-react';

const RemoveHabits = () => {
  const habits = useHabitStore(state => state.habits);
  const removeHabit = useHabitStore(state => state.removeHabit);

  return (
    <div className="container">
      <header className="header" style={{ padding: '0 0 20px 0', borderBottom: 'none' }}>
        <h1>Manage Habits</h1>
      </header>

      {habits.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '40px', color: 'var(--text-secondary)' }}>
          <p>No habits to manage.</p>
        </div>
      ) : (
        <div>
          {habits.map(habit => (
            <div key={habit.id} className="habit-card" style={{ cursor: 'default' }}>
              <div className="habit-info">
                <span className="habit-title">{habit.title}</span>
              </div>
              <button 
                className="btn btn-danger" 
                style={{ padding: '8px 12px' }}
                onClick={() => removeHabit(habit.id)}
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default RemoveHabits;
