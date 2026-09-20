import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyHabits from './pages/MyHabits';
import AddHabit from './pages/AddHabit';
import HabitDetail from './pages/HabitDetail';
import RemoveHabits from './pages/RemoveHabits';
import Settings from './pages/Settings';
import BottomNav from './components/BottomNav';
import './index.css';

function App() {
  return (
    <Router>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Routes>
          <Route path="/" element={<MyHabits />} />
          <Route path="/add" element={<AddHabit />} />
          <Route path="/habit/:id" element={<HabitDetail />} />
          <Route path="/remove" element={<RemoveHabits />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
      <BottomNav />
    </Router>
  );
}

export default App;
