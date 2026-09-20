import React, { useState } from 'react';
import { useHabitStore } from '../store/useHabitStore';
import { useNavigate } from 'react-router-dom';
import { Save } from 'lucide-react';

const AddHabit = () => {
  const [title, setTitle] = useState('');
  const addHabit = useHabitStore(state => state.addHabit);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    addHabit({ title });
    navigate('/');
  };

  return (
    <div className="container">
      <header className="header" style={{ padding: '0 0 20px 0', borderBottom: 'none' }}>
        <h1>Add New Habit</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="habitName">What do you want to improve?</label>
          <input
            id="habitName"
            type="text"
            className="input-field"
            placeholder="e.g., Read 10 pages, Meditate..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        </div>
        
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={!title.trim()}>
          <Save size={20} />
          Save Habit
        </button>
      </form>
    </div>
  );
};

export default AddHabit;
