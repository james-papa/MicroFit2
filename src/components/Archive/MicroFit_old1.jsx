import React, { useState, useEffect } from 'react';
import { Dumbbell } from 'lucide-react';

export default function MicroFit() {
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [goals, setGoals] = useState({
    posture: true,
    strength: false,
    stretch: false
  });
  const [strengthFocus, setStrengthFocus] = useState('abs');
  const [stretchFocus, setStretchFocus] = useState('neck and shoulders');
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(workDuration * 60);
  const [onBreak, setOnBreak] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  // Timer and mode switching logic
  useEffect(() => {
    setTimeLeft((onBreak ? breakDuration : workDuration) * 60);
  }, [workDuration, breakDuration, onBreak]);

  useEffect(() => {
    if (!isRunning) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          const nextIsBreak = !onBreak;
          setOnBreak(nextIsBreak);
          setIsRunning(false);
          
          if (!nextIsBreak) {
            setCompletedSessions(prev => prev + 1);
          }
          
          return (nextIsBreak ? breakDuration : workDuration) * 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, workDuration, breakDuration, onBreak]);

  // Time formatting utility
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Progress calculation
  const calculateProgress = () => {
    const totalDuration = !onBreak ? workDuration * 60 : breakDuration * 60;
    return ((totalDuration - timeLeft) / totalDuration) * 100;
  };

  // Toggle goal
  const toggleGoal = (goal) => {
    setGoals(prev => ({
      ...prev,
      [goal]: !prev[goal]
    }));
  };

  // Switch mode handler
  const switchMode = () => {
    setOnBreak(prev => !prev);
    setIsRunning(false);
  };

  // Start/Stop timer
  const toggleTimer = () => {
    setIsRunning(prev => !prev);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${!onBreak ? 'bg-slate-800' : 'bg-white'}`}>
      <div className="w-full max-w-md mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
        {/* Header with Task and Sessions */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Dumbbell className={`mr-2 ${!onBreak ? 'text-white' : 'text-slate-700'}`} size={24} />
            <h1 className={`text-xl font-semibold ${!onBreak ? 'text-white' : 'text-slate-800'}`}>MicroFit</h1>
          </div>
          <div className={`text-sm ${!onBreak ? 'text-gray-300' : 'text-slate-600'}`}>
            #{completedSessions} Sessions
          </div>
        </div>

        {/* Timer and Progress */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
          <div 
            className="absolute inset-0 bg-slate-700 dark:bg-white rounded-full" 
            style={{
              clipPath: `polygon(0 0, ${calculateProgress()}% 0, ${calculateProgress()}% 100%, 0 100%)`,
              opacity: 0.2
            }}
          ></div>
          <div className="relative z-10 text-center py-8">
            <div className={`text-6xl font-bold mb-2 ${!onBreak ? 'text-white' : 'text-slate-900'}`}>
              {formatTime(timeLeft)}
            </div>
            <div className={`text-xl font-light tracking-tight ${!onBreak ? 'text-gray-300' : 'text-slate-600'}`}>
              {onBreak ? "Break Time" : "Focus Time"}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mb-6">
          <button 
            onClick={toggleTimer}
            className={`px-6 py-2 rounded-full transition uppercase tracking-wider font-semibold ${!onBreak 
              ? 'bg-white text-slate-900 hover:bg-gray-100' 
              : 'bg-slate-700 text-white hover:bg-slate-800'}`}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button 
            onClick={switchMode}
            className={`px-6 py-2 rounded-full transition uppercase tracking-wider font-semibold ${!onBreak 
              ? 'bg-white text-slate-900 hover:bg-gray-100' 
              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
          >
            {onBreak ? 'Focus' : 'Break'}
          </button>
        </div>

        {/* Settings Accordion */}
        <div className="space-y-4">
          {/* Focus Duration */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${!onBreak ? 'text-white' : 'text-slate-700'}`}>
              Focus Duration
            </label>
            <div className="flex items-center space-x-4">
              <input 
                type="range"
                min="1"
                max="60"
                value={workDuration}
                onChange={(e) => setWorkDuration(Number(e.target.value))}
                className={`flex-grow ${!onBreak ? 'accent-white' : 'accent-slate-700'}`}
              />
              <span className={`w-12 text-right ${!onBreak ? 'text-gray-300' : 'text-slate-600'}`}>
                {workDuration} min
              </span>
            </div>
          </div>

          {/* Break Duration */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${!onBreak ? 'text-white' : 'text-slate-700'}`}>
              Break Duration
            </label>
            <div className="flex items-center space-x-4">
              <input 
                type="range"
                min="1"
                max="30"
                value={breakDuration}
                onChange={(e) => setBreakDuration(Number(e.target.value))}
                className={`flex-grow ${!onBreak ? 'accent-white' : 'accent-slate-700'}`}
              />
              <span className={`w-12 text-right ${!onBreak ? 'text-gray-300' : 'text-slate-600'}`}>
                {breakDuration} min
              </span>
            </div>
          </div>

          {/* Fitness Goals */}
          <div>
            <h3 className={`text-sm font-medium mb-2 ${!onBreak ? 'text-white' : 'text-slate-700'}`}>
              Fitness Goals
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {Object.keys(goals).map((goal) => (
                <label 
                  key={goal} 
                  className={`flex items-center justify-center p-2 rounded-md cursor-pointer ${
                    goals[goal] 
                      ? (!onBreak ? 'bg-white text-slate-900' : 'bg-slate-700 text-white')
                      : (!onBreak ? 'bg-slate-600 text-gray-300' : 'bg-gray-200 text-slate-600')
                  }`}
                >
                  <input 
                    type="checkbox"
                    checked={goals[goal]}
                    onChange={() => toggleGoal(goal)}
                    className="hidden"
                  />
                  <span className="capitalize">{goal}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Focused Exercise Options */}
          {goals.strength && (
            <div>
              <label className={`block text-sm font-medium mb-2 ${!onBreak ? 'text-white' : 'text-slate-700'}`}>
                Strength Focus
              </label>
              <select 
                value={strengthFocus}
                onChange={(e) => setStrengthFocus(e.target.value)}
                className={`w-full p-2 rounded-md ${!onBreak 
                  ? 'bg-slate-600 text-white border-gray-600' 
                  : 'bg-white text-black border-gray-300'}`}
              >
                {['abs', 'back', 'chest', 'legs', 'shoulders'].map((focus) => (
                  <option key={focus} value={focus}>
                    {focus.charAt(0).toUpperCase() + focus.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          )}

          {goals.stretch && (
            <div>
              <label className={`block text-sm font-medium mb-2 ${!onBreak ? 'text-white' : 'text-slate-700'}`}>
                Stretch Focus
              </label>
              <select 
                value={stretchFocus}
                onChange={(e) => setStretchFocus(e.target.value)}
                className={`w-full p-2 rounded-md ${!onBreak 
                  ? 'bg-slate-600 text-white border-gray-600' 
                  : 'bg-white text-black border-gray-300'}`}
              >
                {['hips', 'legs', 'lower back', 'neck and shoulders', 'upper back'].map((focus) => (
                  <option key={focus} value={focus}>
                    {focus.charAt(0).toUpperCase() + focus.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}