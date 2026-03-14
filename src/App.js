import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, Cpu, HardDrive, Zap, Download, RefreshCcw, Bell } from 'lucide-react';

// test
const performanceData = [
  { time: '10:00', cpu: 40, ram: 65 },
  { time: '10:05', cpu: 55, ram: 68 },
  { time: '10:10', cpu: 48, ram: 72 },
  { time: '10:15', cpu: 70, ram: 70 },
  { time: '10:20', cpu: 62, ram: 75 },
  { time: '10:25', cpu: 85, ram: 80 },
];

function App() {
  const [status, setStatus] = useState("Monitoring Active");

  // Button 
  const handleExport = () => alert("System Logs Exported as CSV!");
  const handleReset = () => {
    setStatus("System Stats Resetting...");
    setTimeout(() => setStatus("Monitoring Active"), 2000);
  };

  return (
    <div style={{ backgroundColor: '#0b0e14', color: '#e0e0e0', minHeight: '100vh', padding: '30px', fontFamily: 'Inter, sans-serif' }}>
      
      {/* --- HEADER SECTION --- */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid #1f2937', paddingBottom: '20px' }}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: 0, fontSize: '28px', color: '#4ade80' }}>
            <Activity size={32} /> SENTINEL <span style={{ color: '#94a3b8', fontWeight: '300' }}>v1.0</span>
          </h1>
          <p style={{ color: '#64748b', margin: '5px 0 0 0' }}>{status}</p>
        </div>
        
        {/* ACTION BUTTONS */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleReset} style={buttonStyle('#1f2937')}>
            <RefreshCcw size={18} /> Reset Stats
          </button>
          <button onClick={handleExport} style={buttonStyle('#4ade80', '#064e3b')}>
            <Download size={18} /> Export Logs
          </button>
        </div>
      </header>

      {/* --- METRICS CARDS --- */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <Card icon={<Cpu color="#4ade80" />} title="CPU Usage" value="62%" color="#4ade80" />
        <Card icon={<Zap color="#3b82f6" />} title="RAM Consumption" value="5.8 GB" color="#3b82f6" />
        <Card icon={<HardDrive color="#f59e0b" />} title="Disk Health" value="Healthy" color="#f59e0b" />
        <Card icon={<Bell color="#ef4444" />} title="Active Alerts" value="02" color="#ef4444" />
      </div>

      {/* --- CHARTS SECTION --- */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* CPU GRAPH */}
        <div style={chartContainerStyle}>
          <h3 style={{ marginBottom: '20px', fontSize: '18px', color: '#94a3b8' }}>CPU Performance (%)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="time" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip contentStyle={{ backgroundColor: '#0b0e14', border: '1px solid #1f2937' }} />
              <Line type="monotone" dataKey="cpu" stroke="#4ade80" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* RAM GRAPH */}
        <div style={chartContainerStyle}>
          <h3 style={{ marginBottom: '20px', fontSize: '18px', color: '#94a3b8' }}>RAM Usage (MB)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="colorRam" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="time" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip contentStyle={{ backgroundColor: '#0b0e14', border: '1px solid #1f2937' }} />
              <Area type="monotone" dataKey="ram" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRam)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

// --- HELPER COMPONENTS & STYLES ---

const Card = ({ icon, title, value, color }) => (
  <div style={{ background: '#161b22', padding: '20px', borderRadius: '16px', border: '1px solid #30363d', display: 'flex', alignItems: 'center', gap: '15px' }}>
    <div style={{ background: '#0b0e14', padding: '12px', borderRadius: '12px' }}>{icon}</div>
    <div>
      <div style={{ color: '#8b949e', fontSize: '14px' }}>{title}</div>
      <div style={{ fontSize: '22px', fontWeight: 'bold', color: color }}>{value}</div>
    </div>
  </div>
);

const chartContainerStyle = {
  background: '#161b22',
  padding: '25px',
  borderRadius: '16px',
  border: '1px solid #30363d'
};

const buttonStyle = (bg, color = 'white') => ({
  backgroundColor: bg,
  color: color,
  border: 'none',
  padding: '10px 20px',
  borderRadius: '8px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontWeight: '600',
  transition: '0.3s'
});

export default App;