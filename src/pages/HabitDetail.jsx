import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHabitStore } from '../store/useHabitStore';
import { ArrowLeft, Flame, Target, Trophy } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

const HabitDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const habit = useHabitStore(state => state.habits.find(h => h.id === id));
  
  if (!habit) {
    return <div className="container">Habit not found</div>;
  }

  // Memoize data calculations so it doesn't recalculate on every render
  const { chartData, stats } = useMemo(() => {
    const today = new Date();
    const labels = [];
    const dataPoints = [];
    let completionsLast30 = 0;
    
    // Generate last 30 days
    for(let i=29; i>=0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        
        labels.push(d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }));
        
        if (habit.history?.includes(dateStr)) {
            completionsLast30 += 1;
        }

        // Calculate 7-day rolling average
        let rollingCount = 0;
        for(let j=0; j<7; j++) {
            const pastDay = new Date(d);
            pastDay.setDate(d.getDate() - j);
            if (habit.history?.includes(pastDay.toISOString().split('T')[0])) {
                rollingCount++;
            }
        }
        dataPoints.push(Math.round((rollingCount / 7) * 100));
    }

    const currentStreak = (() => {
      let streak = 0;
      let d = new Date();
      while (true) {
        const dStr = d.toISOString().split('T')[0];
        if (habit.history?.includes(dStr)) {
          streak++;
          d.setDate(d.getDate() - 1);
        } else if (streak === 0 && dStr === today.toISOString().split('T')[0]) {
          d.setDate(d.getDate() - 1); // allow missing today without breaking
        } else {
          break;
        }
      }
      return streak;
    })();

    const data = {
      labels,
      datasets: [
        {
          label: '7-Day Consistency',
          data: dataPoints,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(0, 'rgba(59, 130, 246, 0.4)');
            gradient.addColorStop(1, 'rgba(59, 130, 246, 0.0)');
            return gradient;
          },
          fill: true,
          tension: 0.4,
          pointRadius: 2,
          pointHoverRadius: 5,
        },
      ],
    };

    return { 
      chartData: data, 
      stats: {
        total: habit.history?.length || 0,
        streak: currentStreak,
        rate: Math.round((completionsLast30 / 30) * 100)
      }
    };
  }, [habit.history]);

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleFont: { family: 'Outfit', size: 13 },
        bodyFont: { family: 'Outfit', size: 13 },
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { family: 'Outfit' }, maxTicksLimit: 6 }
      },
      y: {
        min: 0,
        max: 100,
        beginAtZero: true,
        ticks: { 
          precision: 0, 
          font: { family: 'Outfit' },
          callback: function(value) {
            return value + '%';
          }
        },
        border: { display: false }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  return (
    <div className="container">
      <header className="header" style={{ padding: '0 0 24px 0', borderBottom: 'none', justifyContent: 'flex-start', gap: '16px' }}>
        <button className="btn-icon" onClick={() => navigate(-1)}><ArrowLeft /></button>
        <h1 style={{ fontSize: '1.5rem' }}>{habit.title}</h1>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
        <div style={{ backgroundColor: 'var(--surface-color)', padding: '16px', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
            <Flame size={16} color="var(--primary-color)" />
            <span style={{ fontSize: '0.85rem' }}>Current Streak</span>
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 600 }}>{stats.streak} <span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--text-secondary)' }}>days</span></span>
        </div>
        
        <div style={{ backgroundColor: 'var(--surface-color)', padding: '16px', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
            <Trophy size={16} color="var(--success-color)" />
            <span style={{ fontSize: '0.85rem' }}>Total Done</span>
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 600 }}>{stats.total} <span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--text-secondary)' }}>times</span></span>
        </div>
      </div>
      
      <div style={{ backgroundColor: 'var(--surface-color)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>30 Day Progress</h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Target size={14}/> {stats.rate}% Rate
            </span>
         </div>
         <Line options={options} data={chartData} />
      </div>
    </div>
  );
};
export default HabitDetail;
