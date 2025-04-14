import React, { useState, useEffect, useRef } from 'react';
import { Dumbbell, Settings, ChevronRight, ChevronLeft } from 'lucide-react';

// Exercise Animation Component
const ExerciseAnimation = ({ goal, strengthFocus, stretchFocus, completedSessions }) => {
  // Exercise data for different goals and focus areas - simplified to one exercise per type
  const exerciseData = {
    strength: {
      chest: [
        { name: "Push-up", description: "Bring your chest to the ground and all the way up, use your knees if needed" },
        { name: "Wide Push-up", description: "Place hands wider than shoulders to target outer chest" },
        { name: "Incline Push-up", description: "Place hands on elevated surface for an easier variation" }
      ],
      abs: [
        { name: "Crunch", description: "Lift shoulders from floor, engage abs, don't pull on neck" },
        { name: "Plank", description: "Maintain straight line from head to heels, engage core" },
        { name: "Mountain Climber", description: "Alternate bringing knees to chest while in plank position" }
      ],
      back: [
        { name: "Superman", description: "Lift arms and legs off the ground while lying on stomach" },
        { name: "Reverse Snow Angel", description: "Lie face down, move arms in snow angel pattern" },
        { name: "Doorway Row", description: "Use a towel in a doorway to perform rowing motion" }
      ],
      legs: [
        { name: "Bodyweight Squat", description: "Keep weight in heels, lower until thighs are parallel to floor" },
        { name: "Walking Lunge", description: "Step forward into lunge position, alternate legs" },
        { name: "Calf Raise", description: "Lift heels off ground while standing, use support if needed" }
      ],
      shoulders: [
        { name: "Pike Push-up", description: "Form an inverted V with your body, lower head toward ground" },
        { name: "Wall Walk", description: "Walk feet up wall while in plank position" },
        { name: "Arm Circles", description: "Make circular motions with arms extended out to sides" }
      ]
    },
    stretch: {
      "neck and shoulders": [
        { name: "Neck Roll", description: "Slowly roll head in circular motion, keeping shoulders relaxed" },
        { name: "Shoulder Rolls", description: "Roll shoulders forward and backward in circular motion" },
        { name: "Cross Arm Stretch", description: "Pull one arm across chest with opposite hand" }
      ],
      "upper back": [
        { name: "Cat-Cow", description: "Alternate between arching and rounding your back on hands and knees" },
        { name: "Thread the Needle", description: "Reach one arm under and across body while on hands and knees" },
        { name: "Thoracic Spine Rotation", description: "Rotate upper back while on side with arms extended" }
      ],
      "lower back": [
        { name: "Child's Pose", description: "Sit back on heels and reach arms forward, relaxing lower back" },
        { name: "Supine Twist", description: "Lie on back and gently twist knees to one side, then the other" },
        { name: "Pelvic Tilt", description: "Gently rock pelvis forward and backward while standing" }
      ],
      hips: [
        { name: "Hip Flexor Stretch", description: "Kneel with one foot forward, press hips forward gently" },
        { name: "Butterfly Stretch", description: "Sit with soles of feet together, gently press knees down" },
        { name: "Figure Four Stretch", description: "Cross ankle over opposite knee while seated or lying down" }
      ],
      legs: [
        { name: "Hamstring Stretch", description: "Extend leg forward and reach toward toes while seated" },
        { name: "Quad Stretch", description: "Hold foot behind you, pulling heel toward buttocks" },
        { name: "Calf Stretch", description: "Step one foot back, press heel down while keeping leg straight" }
      ]
    },
    posture: {
      default: [
        { name: "Seated Posture Check", description: "Sit tall with shoulders back, feet flat on floor" },
        { name: "Wall Stand", description: "Stand with back against wall, heels, buttocks, shoulders touching" },
        { name: "Chin Tuck", description: "Gently draw chin back to create 'double chin', hold briefly" }
      ]
    }
  };

  // Get available exercises based on goal and focus
  const getCurrentExercises = () => {
    if (goal === 'strength') {
      return exerciseData.strength[strengthFocus] || [];
    } else if (goal === 'stretch') {
      return exerciseData.stretch[stretchFocus] || [];
    } else {
      return exerciseData.posture.default || [];
    }
  };

  const exercises = getCurrentExercises();
  
  // Get current exercise based on completed sessions
  const currentExercise = (() => {
    if (exercises.length === 0) return null;
    // Use completedSessions to cycle through exercises
    const index = completedSessions % exercises.length;
    return exercises[index];
  })();

  // Render exercise visual based on type and availability of GIF
  const renderExerciseVisual = () => {
    if (!currentExercise) return null;
    
    // Check if this is a push-up exercise (any variation)
    const isPushup = currentExercise.name.toLowerCase().includes('push-up') || 
                     currentExercise.name.toLowerCase().includes('pushup');
    
    if (goal === 'strength' && strengthFocus === 'chest' && isPushup) {
      let gifName = currentExercise.name.toLowerCase().replace(' ', '-');
      return (
        <div className="w-full bg-white rounded-lg flex flex-col items-center justify-center relative overflow-hidden p-4">
          <img 
            src={`/animations/${gifName}.gif`}
            alt={currentExercise.name} 
            className="h-56 object-contain"
            onError={(e) => {
              console.error(`Error loading GIF for ${currentExercise.name}`);
              e.target.src = "/animations/pushup.gif"; // Fallback to default pushup
              e.target.onerror = (e2) => {
                e2.target.style.display = 'none';
                e2.target.parentNode.innerHTML += `
                  <div class="text-center">
                    <div class="text-slate-500 mb-2">Animation Not Found</div>
                    <div class="text-sm text-slate-400 italic">
                      Place ${gifName}.gif in public/animations folder
                    </div>
                    <div class="mt-4 w-16 h-16 border-4 border-slate-300 border-t-slate-700 rounded-full mx-auto animate-spin"></div>
                  </div>
                `;
              };
            }}
          />
          <div className="text-slate-700 text-sm italic mt-3 text-center">
            {currentExercise.description}
          </div>
        </div>
      );
    }
    
    // Default exercise card for other exercises
    return (
      <div className="w-full bg-white rounded-lg flex flex-col items-center justify-center p-4">
        <div className="text-center mb-4">
          <div className="text-slate-700 font-medium mb-2 text-lg">{currentExercise.name}</div>
          <div className="w-20 h-1 bg-slate-300 mx-auto mb-4"></div>
          <div className="h-32 flex items-center justify-center">
            <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-slate-300 rounded-full mx-auto animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="text-slate-700 text-sm italic mt-2 text-center max-w-xs">
          {currentExercise.description}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-2 font-medium text-slate-800">
        {currentExercise ? currentExercise.name : "Rest"}
      </div>
      
      <div className="w-full">
        {renderExerciseVisual()}
      </div>
      
      <div className="mt-2 text-sm text-slate-600">
        Exercise {(completedSessions % exercises.length) + 1} of {exercises.length}
      </div>
    </div>
  );
};

export default function MicroFit() {
  // Core settings
  const [workDuration, setWorkDuration] = useState(30);
  const [breakDuration, setBreakDuration] = useState(5);
  const [goal, setGoal] = useState('posture');
  const [strengthFocus, setStrengthFocus] = useState('abs');
  const [stretchFocus, setStretchFocus] = useState('neck and shoulders');
  
  // Timer states
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [onBreak, setOnBreak] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  
  // UI states
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [autoSwitch, setAutoSwitch] = useState(true);
  
  // Timer tracking
  const startTimeRef = useRef(null);
  const timerRef = useRef(null);
  const totalDurationRef = useRef(30 * 60);
  const pausedTimeRef = useRef(null); // New ref to track paused time
  
  // Initial setup 
  useEffect(() => {
    // Only update timeLeft when not running
    if (!isRunning) {
      // Don't reset if we're paused
      if (pausedTimeRef.current === null) {
        const seconds = (onBreak ? breakDuration : workDuration) * 60;
        setTimeLeft(seconds);
        totalDurationRef.current = seconds;
      }
    }
  }, [workDuration, breakDuration, onBreak, isRunning]);
  
  // Main timer logic
  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    if (!isRunning) return;
    
    // Set start reference point when starting
    const startTime = startTimeRef.current;
    const totalSeconds = totalDurationRef.current;
    
    timerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = Math.max(0, totalSeconds - elapsed);
      
      setTimeLeft(remaining);
      
      if (remaining <= 0) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        pausedTimeRef.current = null; // Clear pause state when timer completes
        
        if (autoSwitch) {
          // Switch modes
          const nextIsBreak = !onBreak;
          setOnBreak(nextIsBreak);
          
          // Update session counter if completing a break
          if (!nextIsBreak) {
            setCompletedSessions(prev => prev + 1);
          }
          
          // Setup next session
          const nextDuration = (nextIsBreak ? breakDuration : workDuration) * 60;
          totalDurationRef.current = nextDuration;
          setTimeLeft(nextDuration);
          
          // Restart timer
          startTimeRef.current = Date.now();
        } else {
          // Stop timer
          setIsRunning(false);
        }
      }
    }, 100);
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRunning, onBreak, autoSwitch]);

  // Time formatting utility
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Progress calculation (0-100%)
  const calculateProgress = () => {
    if (!isRunning && timeLeft === totalDurationRef.current) {
      return 0; // Show empty when not started
    }
    
    const elapsed = totalDurationRef.current - timeLeft;
    return Math.min(100, Math.max(0, (elapsed / totalDurationRef.current) * 100));
  };

  // Start/Stop timer
  const toggleTimer = () => {
    if (isRunning) {
      // Pausing - store the current timeLeft value
      pausedTimeRef.current = timeLeft;
    } else {
      // Starting or resuming
      if (pausedTimeRef.current !== null) {
        // This is a resume from pause
        const adjustedStartTime = Date.now() - ((totalDurationRef.current - pausedTimeRef.current) * 1000);
        startTimeRef.current = adjustedStartTime;
      } else {
        // This is a fresh start
        totalDurationRef.current = (onBreak ? breakDuration : workDuration) * 60;
        startTimeRef.current = Date.now();
        setTimeLeft(totalDurationRef.current);
      }
    }
    setIsRunning(prev => !prev);
  };

  // Switch between focus/break
  const switchMode = () => {
    setOnBreak(prev => !prev);
    
    // Reset pause tracking
    pausedTimeRef.current = null;
    
    // If timer is running, reset it for the new mode
    if (isRunning) {
      // Reset timer for new mode
      const newDuration = (!onBreak ? breakDuration : workDuration) * 60;
      totalDurationRef.current = newDuration;
      setTimeLeft(newDuration);
      startTimeRef.current = Date.now();
    }
  };

  // Toggle settings panel
  const toggleSettings = () => {
    setIsSettingsOpen(prev => !prev);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${!onBreak ? 'bg-slate-800' : 'bg-slate-50'}`}>
      <div className={`w-full max-w-md mx-auto rounded-2xl shadow-xl p-6 relative transition-colors duration-300 ${!onBreak ? 'bg-slate-800' : 'bg-white'}`}>
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
        <div className="relative mb-10 mt-12">
          {/* Circular Progress */}
          <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-90" width="250" height="250">
            <circle 
              cx="125" 
              cy="125" 
              r="120" 
              className={`fill-none stroke-current ${!onBreak ? 'text-slate-700' : 'text-slate-200'}`} 
              strokeWidth="10"
            />
            <circle 
              cx="125" 
              cy="125" 
              r="120" 
              className={`fill-none stroke-current transition-all duration-300 ${!onBreak ? 'text-white' : 'text-slate-700'}`} 
              strokeWidth="10" 
              strokeDasharray="753" 
              strokeDashoffset={753 * (1 - calculateProgress() / 100)}
            />
          </svg>

          <div className="relative z-10 text-center py-12">
            <div className={`text-6xl font-bold mb-2 ${!onBreak ? 'text-white' : 'text-slate-800'}`}>
              {formatTime(timeLeft)}
            </div>
            <div className={`text-xl font-light tracking-tight ${!onBreak ? 'text-gray-300' : 'text-slate-600'}`}>
              {onBreak ? "Break Time" : "Focus Time"}
            </div>
          </div>
        </div>

        {/* Exercise Animation (only show during break) */}
        {onBreak && (
          <div className="mb-8 mt-4">
            <ExerciseAnimation 
              goal={goal} 
              strengthFocus={strengthFocus} 
              stretchFocus={stretchFocus}
              completedSessions={completedSessions}
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mb-8 mt-6">
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

        {/* Settings Toggle */}
        <div className="relative">
          <button 
            onClick={toggleSettings}
            className={`w-full flex items-center justify-center py-2 rounded-b-xl transition-all duration-300 ${!onBreak 
              ? 'bg-white/10 text-white hover:bg-white/20' 
              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
          >
            <Settings className="mr-2" size={20} />
            Settings
          </button>

          {/* Settings Panel */}
          <div 
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isSettingsOpen 
                ? 'max-h-96 opacity-100' 
                : 'max-h-0 opacity-0'
            }`}
          >
            <div className="space-y-4 pt-4">
              {/* Focus Duration */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${!onBreak ? 'text-white' : 'text-slate-700'}`}>
                  Focus Duration
                </label>
                <div className="flex items-center space-x-4">
                  <input 
                    type="range"
                    min="1"
                    max="90"
                    value={workDuration}
                    onChange={(e) => {
                      setWorkDuration(Number(e.target.value));
                    }}
                    className="flex-grow"
                    style={{
                      accentColor: !onBreak ? 'white' : '#334155'
                    }}
                  />
                  <span className={`w-16 text-right ${!onBreak ? 'text-gray-300' : 'text-slate-600'}`}>
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
                    onChange={(e) => {
                      setBreakDuration(Number(e.target.value));
                    }}
                    className="flex-grow"
                    style={{
                      accentColor: !onBreak ? 'white' : '#334155'
                    }}
                  />
                  <span className={`w-16 text-right ${!onBreak ? 'text-gray-300' : 'text-slate-600'}`}>
                    {breakDuration} min
                  </span>
                </div>
              </div>

              {/* Auto Switch Toggle */}
              <div className="flex items-center justify-between">
                <label className={`text-sm font-medium ${!onBreak ? 'text-white' : 'text-slate-700'}`}>
                  Auto Start Timer
                </label>
                <div 
                  className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
                    autoSwitch 
                      ? (!onBreak ? 'bg-white' : 'bg-slate-700') 
                      : 'bg-gray-400'
                  }`} 
                  onClick={() => setAutoSwitch(prev => !prev)}
                >
                  <div 
                    className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                      autoSwitch ? 'translate-x-5' : ''
                    } ${!onBreak && autoSwitch ? 'border border-slate-300 shadow-lg' : ''}`}
                  />
                </div>
              </div>

              {/* Single Fitness Goal */}
              <div>
                <h3 className={`text-sm font-medium mb-2 ${!onBreak ? 'text-white' : 'text-slate-700'}`}>
                  Fitness Goal
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {['posture', 'strength', 'stretch'].map((goalOption) => (
                    <label 
                      key={goalOption} 
                      className={`flex items-center justify-center p-2 rounded-md cursor-pointer ${
                        goal === goalOption
                          ? (!onBreak ? 'bg-white text-slate-900' : 'bg-slate-700 text-white')
                          : (!onBreak ? 'bg-slate-600 text-gray-300' : 'bg-gray-200 text-slate-600')
                      }`}
                    >
                      <input 
                        type="radio"
                        name="goal"
                        checked={goal === goalOption}
                        onChange={() => setGoal(goalOption)}
                        className="hidden"
                      />
                      <span className="capitalize">{goalOption}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Focused Exercise Options */}
              {goal === 'strength' && (
                <div>
                  <label className={`block text-sm font-medium mb-2 ${!onBreak ? 'text-white' : 'text-slate-700'}`}>
                    Strength Focus
                  </label>
                  <select 
                    value={strengthFocus}
                    onChange={(e) => setStrengthFocus(e.target.value)}
                    className={`w-full p-2 rounded-md focus:outline-none ${!onBreak 
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

              {goal === 'stretch' && (
                <div>
                  <label className={`block text-sm font-medium mb-2 ${!onBreak ? 'text-white' : 'text-slate-700'}`}>
                    Stretch Focus
                  </label>
                  <select 
                    value={stretchFocus}
                    onChange={(e) => setStretchFocus(e.target.value)}
                    className={`w-full p-2 rounded-md focus:outline-none ${!onBreak 
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
      </div>
    </div>
  );
}