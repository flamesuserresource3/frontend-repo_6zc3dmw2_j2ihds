import React from 'react';
import SwipeContainer from './components/SwipeContainer.jsx';
import Dashboard from './components/Dashboard.jsx';
import RankDisplay from './components/RankDisplay.jsx';
import CalendarManager from './components/CalendarManager.jsx';

export default function App() {
  return (
    <div className="min-h-screen w-full bg-[#0b0d13] text-white overflow-hidden">
      <SwipeContainer
        pages={[
          <Dashboard key="dash" />, 
          <RankDisplay key="rank" />, 
          <CalendarManager key="cal" />
        ]}
      />
    </div>
  );
}
