import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Settings, Trash2 } from 'lucide-react';

const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <LayoutDashboard size={24} />
        <span>My Habits</span>
      </NavLink>
      <NavLink to="/add" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <PlusCircle size={24} />
        <span>Add</span>
      </NavLink>
      <NavLink to="/remove" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Trash2 size={24} />
        <span>Manage</span>
      </NavLink>
      <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Settings size={24} />
        <span>Settings</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
