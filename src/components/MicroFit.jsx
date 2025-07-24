import React, { useState, useEffect, useRef } from 'react';
import { Dumbbell, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

// Exercise Animation Component
const ExerciseDisplay = ({ goal, strengthFocus, stretchFocus, exerciseIndex }) => {
  // Exercise data
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
        { name: "Mountain Climber", description: "Alternate bringing knees to chest while in plank position" },
        { name: "Bicycle Crunch", description: "Lie on back, alternate bringing opposite elbow to opposite knee in cycling motion" },
        { name: "Leg Raises", description: "Lie on back, lift straight legs up to 90 degrees, lower slowly without touching ground" },
        { name: "Side Plank", description: "Balance on one forearm and side of foot, keep body in straight line, engage obliques" }
      ],
      back: [
        {
          name: "Overhand Grip Pull-Up (Wide)",
          description: "Palms facing away from you, wide grip. Targets: upper lats and teres major."
        },
        {
          name: "Overhand Grip Pull-Up (Shoulder-Width)",
          description: "Palms facing away from you, shoulder-width grip. Balanced back and arm activation."
        },
        {
          name: "Overhand Grip Pull-Up (Close)",
          description: "Palms facing away from you, close grip. More biceps and mid-back involvement."
        },
        {
          name: "Underhand Grip Chin-Up (Close)",
          description: "Palms facing toward you, close grip. Heavy biceps engagement."
        },
        {
          name: "Underhand Grip Chin-Up (Medium)",
          description: "Palms facing toward you, medium grip. Balanced lats and biceps."
        },
        {
          name: "Neutral Grip (Hammer) Pull-Up",
          description: "Palms facing each other (parallel bars, towel, or rings). Easier on wrists and shoulders. Balanced lats and biceps."
        }
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

  // Get current exercise list
  const getCurrentExercises = () => {
    if (goal === 'strength') {
      if (strengthFocus === 'randomized') {
        // For randomized strength, cycle through all categories
        const categories = Object.keys(exerciseData.strength);
        const categoryIndex = Math.floor(exerciseIndex / 3) % categories.length; // Change category every 3 exercises
        const currentCat = categories[categoryIndex];
        return exerciseData.strength[currentCat] || [];
      } else {
        return exerciseData.strength[strengthFocus] || [];
      }
    } else if (goal === 'stretch') {
      if (stretchFocus === 'randomized') {
        // For randomized stretch, cycle through all categories
        const categories = Object.keys(exerciseData.stretch);
        const categoryIndex = Math.floor(exerciseIndex / 3) % categories.length; // Change category every 3 exercises
        const currentCat = categories[categoryIndex];
        return exerciseData.stretch[currentCat] || [];
      } else {
        return exerciseData.stretch[stretchFocus] || [];
      }
    } else {
      return exerciseData.posture.default || [];
    }
  };

  const exercises = getCurrentExercises();
  
  // Calculate current category for display
  const getCurrentCategory = () => {
    if (goal === 'strength') {
      if (strengthFocus === 'randomized') {
        const categories = Object.keys(exerciseData.strength);
        const categoryIndex = Math.floor(exerciseIndex / 3) % categories.length;
        return categories[categoryIndex];
      } else {
        return strengthFocus;
      }
    } else if (goal === 'stretch') {
      if (stretchFocus === 'randomized') {
        const categories = Object.keys(exerciseData.stretch);
        const categoryIndex = Math.floor(exerciseIndex / 3) % categories.length;
        return categories[categoryIndex];
      } else {
        return stretchFocus;
      }
    } else {
      return 'default';
    }
  };
  
  const currentCategory = getCurrentCategory();
  
  // Get current exercise based on exercise index - simplified logic
  const currentExercise = exercises.length > 0 
    ? exercises[exerciseIndex % exercises.length] 
    : null;
    


  // Check if this is an exercise with a GIF
  const isPushup = currentExercise?.name.toLowerCase().includes('push-up') || 
                  currentExercise?.name.toLowerCase().includes('pushup');
  const isSitup = currentExercise?.name.toLowerCase().includes('crunch') || 
                 currentExercise?.name.toLowerCase().includes('situp');
  const isSquat = currentExercise?.name.toLowerCase().includes('squat');
  
  const hasAnimation = (goal === 'strength' && strengthFocus === 'chest' && isPushup) ||
                      (goal === 'strength' && strengthFocus === 'abs' && isSitup) ||
                      (goal === 'strength' && strengthFocus === 'legs' && isSquat);
  
  // Determine which GIF to show
  let gifName = "pushup"; // Default
  if (isPushup) gifName = "pushup";
  if (isSitup) gifName = "situp";
  if (isSquat) gifName = "squat";

  // Render exercise 
  return (
    <div className="flex flex-col items-center">
      
      <div className="w-full">
        {hasAnimation ? (
          <div className="w-full bg-white rounded-lg flex flex-col items-center justify-center relative overflow-hidden p-4">
            <div className="text-center mb-4">
              <div className="text-slate-700 font-medium mb-2 text-lg">{currentExercise?.name}</div>
              <div className="w-20 h-1 bg-slate-300 mx-auto mb-4"></div>
            </div>
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
        ) : (
          <div className="w-full bg-white rounded-lg flex flex-col items-center justify-center p-4">
            <div className="text-center mb-4">
              <div className="text-slate-700 font-medium mb-2 text-lg">{currentExercise?.name}</div>
              <div className="w-20 h-1 bg-slate-300 mx-auto mb-4"></div>
              <div className="h-32 flex items-center justify-center">
                <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-slate-300 rounded-full mx-auto animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="text-slate-700 text-sm italic mt-2 text-center max-w-xs">
              {currentExercise?.description}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Audio notification component - 5 Modern Smartphone style variations
const SOUND_OPTIONS = [
  {
    label: 'Bells',
    value: 'synth',
    src: null // handled by Web Audio API
  },
  {
    label: 'Alarm Clock',
    value: 'alarm',
    src: '/sounds/alarm.mp3'
  },
  {
    label: 'Sports Whistle',
    value: 'whistle',
    src: '/sounds/whistle.mp3'
  }
];

const AudioAlert = ({ play, sound }) => {
  useEffect(() => {
    if (play) {
      if (sound === 'synth') {
        try {
          const audioContext = new (window.AudioContext || window.webkitAudioContext)();
          const masterGain = audioContext.createGain();
          masterGain.gain.value = 0.5;
          masterGain.connect(audioContext.destination);
          
          const now = audioContext.currentTime;
          let currentTime = now;
          
          // Helper function to create a basic tone with harmonic
          const createTone = (startTime, freq, duration, type, harmonicRatio, mainGain, harmonicGain) => {
            // Main oscillator
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            
            osc.type = type;
            osc.frequency.value = freq;
            
            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(mainGain, startTime + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
            
            osc.connect(gain);
            gain.connect(masterGain);
            
            osc.start(startTime);
            osc.stop(startTime + duration);
            
            // Harmonic oscillator
            const harmonic = audioContext.createOscillator();
            const hGain = audioContext.createGain();
            
            harmonic.type = type;
            harmonic.frequency.value = freq * harmonicRatio;
            
            hGain.gain.setValueAtTime(0, startTime);
            hGain.gain.linearRampToValueAtTime(harmonicGain, startTime + 0.02);
            hGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration * 0.8);
            
            harmonic.connect(hGain);
            hGain.connect(masterGain);
            
            harmonic.start(startTime);
            harmonic.stop(startTime + duration * 0.8);
          };
          
          // ===== VARIATION 1: Classic Marimba Style =====
          // Ascending C major arpeggio
          const notes1 = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
          for (let i = 0; i < notes1.length; i++) {
            createTone(currentTime + i * 0.25, notes1[i], 0.7, 'sine', 3.0, 0.8, 0.15);
          }
          currentTime += 2.0; // Pause between variations
          
          // ===== VARIATION 2: Descending Xylophone Style =====
          // Descending pattern
          const notes2 = [880, 783.99, 659.25, 523.25]; // A5, G5, E5, C5
          for (let i = 0; i < notes2.length; i++) {
            createTone(currentTime + i * 0.22, notes2[i], 0.5, 'sine', 2.0, 0.7, 0.2);
          }
          currentTime += 2.0; // Pause between variations
          
          // ===== VARIATION 3: Bell-like Tones =====
          // Major triad with more bell-like qualities
          const notes3 = [440, 550, 660, 880]; // A4, C#5, E5, A5
          for (let i = 0; i < notes3.length; i++) {
            // Use different harmonics for bell-like quality
            createTone(currentTime + i * 0.3, notes3[i], 0.8, 'sine', 2.76, 0.6, 0.25);
            // Add a secondary harmonic
            setTimeout(() => {
              const osc = audioContext.createOscillator();
              const gain = audioContext.createGain();
              
              osc.type = 'sine';
              osc.frequency.value = notes3[i] * 1.5;
              
              gain.gain.setValueAtTime(0, 0);
              gain.gain.linearRampToValueAtTime(0.2, 0.03);
              gain.gain.exponentialRampToValueAtTime(0.001, 0.6);
              
              osc.connect(gain);
              gain.connect(masterGain);
              
              osc.start();
              osc.stop(0.6);
            }, (currentTime + i * 0.3 + 0.05) * 1000);
          }
          currentTime += 2.0; // Pause between variations
          
          // ===== VARIATION 4: Gentle Chime Pattern =====
          // Pentatonic scale (D, E, G, A, C)
          const notes4 = [587.33, 659.25, 783.99, 880, 1046.50];
          for (let i = 0; i < 4; i++) {
            // Play pairs of notes for a pleasing harmony
            createTone(currentTime + i * 0.4, notes4[i % notes4.length], 0.9, 'sine', 2.0, 0.6, 0.1);
            createTone(currentTime + i * 0.4 + 0.15, notes4[(i + 2) % notes4.length], 0.7, 'sine', 1.5, 0.5, 0.1);
          }
          currentTime += 2.0; // Pause between variations
          
          // ===== VARIATION 5: Minimalist Modern Style =====
          // Simple rising three-note pattern with clean tones
          const notes5 = [392, 523.25, 783.99]; // G4, C5, G5
          for (let i = 0; i < notes5.length; i++) {
            createTone(currentTime + i * 0.35, notes5[i], 0.6, 'sine', 1.5, 0.7, 0.12);
          }
          
          // Add a final chord for resolution
          setTimeout(() => {
            const baseFreq = 523.25; // C5
            const chord = [1, 1.25, 1.5]; // C, E, G
            
            for (let i = 0; i < chord.length; i++) {
              const osc = audioContext.createOscillator();
              const gain = audioContext.createGain();
              
              osc.type = 'sine';
              osc.frequency.value = baseFreq * chord[i];
              
              gain.gain.setValueAtTime(0, 0);
              gain.gain.linearRampToValueAtTime(0.3, 0.05);
              gain.gain.exponentialRampToValueAtTime(0.001, 1.0);
              
              osc.connect(gain);
              gain.connect(masterGain);
              
              osc.start();
              osc.stop(1.0);
            }
          }, (currentTime + notes5.length * 0.35 + 0.1) * 1000);
          
        } catch (err) {
          console.error("Error playing notification sound:", err);
        }
      } else {
        // Play audio file
        const option = SOUND_OPTIONS.find(opt => opt.value === sound);
        if (option && option.src) {
          const audio = new window.Audio(option.src);
          audio.volume = 0.7;
          audio.play();
        }
      }
    }
  }, [play, sound]);

  return null;
};

// Toast Notification Component
function Toast({ message, visible }) {
  return (
    <div
      style={{
        position: 'fixed',
        left: '50%',
        bottom: visible ? 32 : -100,
        transform: 'translateX(-50%)',
        zIndex: 9999,
        minWidth: 260,
        background: 'rgba(30,41,59,0.98)',
        color: 'white',
        padding: '16px 32px',
        borderRadius: 12,
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
        fontSize: 18,
        fontWeight: 500,
        opacity: visible ? 1 : 0,
        transition: 'bottom 0.5s cubic-bezier(.4,2,.6,1), opacity 0.5s',
        pointerEvents: 'none',
      }}
      aria-live="polite"
    >
      {message}
    </div>
  );
}

// Main App Component
export default function MicroFit() {
  // Core settings
  const [workDuration, setWorkDuration] = useState(30);
  const [breakDuration, setBreakDuration] = useState(60);
  const [goal, setGoal] = useState('posture');
  const [strengthFocus, setStrengthFocus] = useState('abs');
  const [stretchFocus, setStretchFocus] = useState('neck and shoulders');
  const [activeTab, setActiveTab] = useState('timer');
  
  // Progress tracking
  const [selectedDate, setSelectedDate] = useState(new Date());
  // Example data for demonstration
  const [dailyStats, setDailyStats] = useState({
    "2025-04-15": { focusTime: 4800, breakTime: 1200, sessions: 6 },
    "2025-04-16": { focusTime: 2400, breakTime: 720, sessions: 3 },
    "2025-04-17": { focusTime: 1800, breakTime: 540, sessions: 2 }
  });
  
  // Timer states
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [onBreak, setOnBreak] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(11);
  
  // Statistics tracking
  const [totalFocusTime, setTotalFocusTime] = useState(9000);
  const [totalBreakTime, setTotalBreakTime] = useState(2460);
  
  // UI states
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [autoSwitch, setAutoSwitch] = useState(true);
  const [shouldPlaySound, setShouldPlaySound] = useState(false);
  
  // Timer tracking
  const startTimeRef = useRef(null);
  const timerRef = useRef(null);
  const totalDurationRef = useRef(30 * 60);
  const pausedTimeRef = useRef(null);
  
  // Add a state to track which back exercise to show
  const [backExerciseIndex, setBackExerciseIndex] = useState(0);

  // Add state for exercise cycling - track current exercise index for each goal/focus
  const [exerciseIndex, setExerciseIndex] = useState(0);
  
  // Reset exercise index when goal or focus changes
  useEffect(() => {
    setExerciseIndex(0);
  }, [goal, strengthFocus, stretchFocus]);
  
  // Function to cycle to next exercise
  const cycleToNextExercise = () => {
    setExerciseIndex(prev => prev + 1);
  };
  
  // Ref to prevent multiple rapid calls
  const cycleInProgressRef = useRef(false);
  
  // Debounced function to cycle to next exercise
  const debouncedCycleToNextExercise = () => {
    if (cycleInProgressRef.current) {
      return;
    }
    
    cycleInProgressRef.current = true;
    cycleToNextExercise();
    
    // Reset after a short delay
    setTimeout(() => {
      cycleInProgressRef.current = false;
    }, 100);
  };
  


  // Add state for selected sound
  const [selectedSound, setSelectedSound] = useState('synth');
  
  // Add state for toast notifications
  const [toast, setToast] = useState({ message: '', visible: false });
  const toastTimeoutRef = useRef(null);
  
  // Add state for notification permission
  const [notificationPermission, setNotificationPermission] = useState('default');
  
  // Request notification permission on app start
  useEffect(() => {
    if (window.Notification) {
      setNotificationPermission(Notification.permission);
      if (Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
          setNotificationPermission(permission);
        });
      }
    }
  }, []);
  
  // Load project history and stats from localStorage on component mount
  useEffect(() => {
    // Load saved statistics
    const savedFocusTime = localStorage.getItem('microfit-total-focus-time');
    const savedBreakTime = localStorage.getItem('microfit-total-break-time');
    const savedSessions = localStorage.getItem('microfit-completed-sessions');
    
    if (savedFocusTime) setTotalFocusTime(parseInt(savedFocusTime, 10));
    if (savedBreakTime) setTotalBreakTime(parseInt(savedBreakTime, 10));
    if (savedSessions) setCompletedSessions(parseInt(savedSessions, 10));
    
    // Load daily stats
    const savedDailyStats = localStorage.getItem('microfit-daily-stats');
    if (savedDailyStats) {
      try {
        setDailyStats(JSON.parse(savedDailyStats));
      } catch (e) {
        console.error('Error parsing saved daily stats', e);
      }
    }
  }, []);
  
  // Save statistics to localStorage when they change
  useEffect(() => {
    localStorage.setItem('microfit-total-focus-time', totalFocusTime.toString());
    localStorage.setItem('microfit-total-break-time', totalBreakTime.toString());
    localStorage.setItem('microfit-completed-sessions', completedSessions.toString());
  }, [totalFocusTime, totalBreakTime, completedSessions]);
  
  // Save daily stats to localStorage when they change
  useEffect(() => {
    if (Object.keys(dailyStats).length > 0) {
      localStorage.setItem('microfit-daily-stats', JSON.stringify(dailyStats));
    }
  }, [dailyStats]);
  
  // Main timer logic
  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    if (!isRunning) return;
    
    const startTime = startTimeRef.current;
    const totalSeconds = totalDurationRef.current;
    
    timerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = Math.max(0, totalSeconds - elapsed);
      
      setTimeLeft(remaining);
      
      // Increment time counters
      if (onBreak) {
        setTotalBreakTime(prev => prev + 1);
        
        // Update daily stats for break time
        const today = new Date().toISOString().split('T')[0];
        setDailyStats(prev => {
          const updatedStats = {...prev};
          if (!updatedStats[today]) {
            updatedStats[today] = { focusTime: 0, breakTime: 0, sessions: 0 };
          }
          updatedStats[today].breakTime += 1;
          return updatedStats;
        });
      } else {
        setTotalFocusTime(prev => prev + 1);
        
        // Update daily stats for focus time
        const today = new Date().toISOString().split('T')[0];
        setDailyStats(prev => {
          const updatedStats = {...prev};
          if (!updatedStats[today]) {
            updatedStats[today] = { focusTime: 0, breakTime: 0, sessions: 0 };
          }
          updatedStats[today].focusTime += 1;
          return updatedStats;
        });
      }
      
      if (remaining <= 0) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        pausedTimeRef.current = null;
        
        // Play notification sound when timer ends (for both focus and break)
        if (!onBreak) {
          setShouldPlaySound(true);
          setTimeout(() => setShouldPlaySound(false), 1000);
        } else {
          setShouldPlaySound(true);
          setTimeout(() => setShouldPlaySound(false), 1000);
        }
        
        if (autoSwitch) {
          // Switch modes
          const nextIsBreak = !onBreak;
          // === NOTIFICATION LOGIC ===
          let toastMsg = '';
          if (nextIsBreak) {
            toastMsg = `Break start ${breakDuration} seconds remaining`;
          } else {
            toastMsg = `Focus start ${workDuration} minutes remaining`;
          }
          // Show in-app toast
          setToast({ message: toastMsg, visible: true });
          if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
          toastTimeoutRef.current = setTimeout(() => setToast(t => ({ ...t, visible: false })), 3500);
          // Show browser notification with proper options
          if (window.Notification && Notification.permission === 'granted') {
            new Notification('MicroFit', { 
              body: toastMsg,
              icon: '/favicon.ico', // Add an icon if you have one
              badge: '/favicon.ico',
              tag: 'microfit-timer', // Prevents duplicate notifications
              requireInteraction: false,
              silent: false
            });
          }
          // === END NOTIFICATION LOGIC ===
          setOnBreak(nextIsBreak);
          
          // Update sessions
          if (!nextIsBreak) {
            setCompletedSessions(prev => prev + 1);
            
            // Update daily stats for completed session
            const today = new Date().toISOString().split('T')[0];
            setDailyStats(prev => {
              const updatedStats = {...prev};
              if (!updatedStats[today]) {
                updatedStats[today] = { focusTime: 0, breakTime: 0, sessions: 0 };
              }
              updatedStats[today].sessions += 1;
              return updatedStats;
            });
          }
          
          // Cycle to next exercise when entering break mode
          // Note: Removed this to prevent double increment
          // if (nextIsBreak) {
          //   cycleToNextExercise();
          // }
          
          // If entering a break and strengthFocus is back, increment backExerciseIndex
          if (nextIsBreak && goal === 'strength' && strengthFocus === 'back') {
            setBackExerciseIndex(prev => (prev + 1) % 6); // 6 back exercises
          }
          
          // Setup next session
          const nextDuration = nextIsBreak ? breakDuration : (workDuration * 60);
          totalDurationRef.current = nextDuration;
          setTimeLeft(nextDuration);
          
          // Restart timer
          startTimeRef.current = Date.now();
        } else {
          // Stop timer
          setIsRunning(false);
        }
      }
    }, 1000);
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRunning, onBreak, autoSwitch, breakDuration, workDuration, goal, strengthFocus]);
  
  // Helper functions for date navigation
  const formatDate = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[date.getDay()];
    const formattedDate = date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
    return `${dayName}, ${formattedDate}`;
  };
  
  const goToNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setSelectedDate(nextDay);
  };
  
  const goToPrevDay = () => {
    const prevDay = new Date(selectedDate);
    prevDay.setDate(prevDay.getDate() - 1);
    setSelectedDate(prevDay);
  };
  
  // Get stats for selected date
  const getSelectedDayStats = () => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    return dailyStats[dateKey] || { focusTime: 0, breakTime: 0, sessions: 0 };
  };

  // Utility: format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Utility: format time as Xh Ym Zs
  const formatTimeHMS = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  };
  
  // Calculate progress percentage
  const calculateProgress = () => {
    if (!isRunning && timeLeft === totalDurationRef.current) return 0;
    
    const elapsed = totalDurationRef.current - timeLeft;
    return Math.min(100, Math.max(0, (elapsed / totalDurationRef.current) * 100));
  };

  // Calculate percentage for stats
  const calculateFocusPercentage = (focusTime, breakTime) => {
    const total = focusTime + breakTime;
    if (total === 0) return 0;
    return Math.round((focusTime / total) * 100);
  };
  
  const calculateBreakPercentage = (focusTime, breakTime) => {
    const total = focusTime + breakTime;
    if (total === 0) return 0;
    return Math.round((breakTime / total) * 100);
  };

  // Start/Stop timer
  const toggleTimer = () => {
    if (isRunning) {
      // Pausing - store the current timeLeft value
      pausedTimeRef.current = timeLeft;
    } else {
      // Starting or resuming
      if (pausedTimeRef.current !== null) {
        // Resume from pause
        const adjustedStartTime = Date.now() - ((totalDurationRef.current - pausedTimeRef.current) * 1000);
        startTimeRef.current = adjustedStartTime;
      } else {
        // Fresh start
        totalDurationRef.current = onBreak ? breakDuration : (workDuration * 60);
        startTimeRef.current = Date.now();
        setTimeLeft(totalDurationRef.current);
      }
    }
    setIsRunning(prev => !prev);
  };

  // Switch between focus/break
  const switchMode = () => {
    setOnBreak(prev => {
      const nextIsBreak = !prev;
      // Cycle to next exercise when manually switching to break mode
      if (nextIsBreak) {
        debouncedCycleToNextExercise();
      }
      // If switching to break and strengthFocus is back, increment backExerciseIndex
      if (nextIsBreak && goal === 'strength' && strengthFocus === 'back') {
        setBackExerciseIndex(prevIdx => (prevIdx + 1) % 6); // 6 back exercises
      }
      return nextIsBreak;
    });
    // Reset pause tracking
    pausedTimeRef.current = null;
    // Update time left based on the new mode
    const newDuration = !onBreak ? breakDuration : (workDuration * 60);
    totalDurationRef.current = newDuration;
    setTimeLeft(newDuration);
    if (isRunning) {
      // If timer is running, reset it for the new mode
      clearInterval(timerRef.current);
      timerRef.current = null;
      startTimeRef.current = Date.now();
    }
  };

  // Toggle settings panel
  const toggleSettings = () => {
    setIsSettingsOpen(prev => !prev);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${!onBreak ? 'bg-slate-800' : 'bg-slate-50'}`}>
      {/* Audio notification */}
      <AudioAlert play={shouldPlaySound} sound={selectedSound} />
      {/* Toast Notification */}
      <Toast message={toast.message} visible={toast.visible} />
      
      <div className={`w-full max-w-md mx-auto rounded-2xl shadow-xl p-6 relative transition-colors duration-300 ${!onBreak ? 'bg-slate-800' : 'bg-white'}`}>
        {/* Tabs */}
        <div className="flex mb-6 border-b border-gray-600">
          <button
            onClick={() => setActiveTab('timer')}
            className={`py-2 px-4 mr-2 text-sm font-medium transition-colors ${
              activeTab === 'timer'
                ? (!onBreak ? 'text-white border-b-2 border-white' : 'text-slate-800 border-b-2 border-slate-800')
                : (!onBreak ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700')
            }`}
          >
            Timer
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`py-2 px-4 text-sm font-medium transition-colors ${
              activeTab === 'stats'
                ? (!onBreak ? 'text-white border-b-2 border-white' : 'text-slate-800 border-b-2 border-slate-800')
                : (!onBreak ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700')
            }`}
          >
            Statistics
          </button>
        </div>
        
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

        {activeTab === 'timer' ? (
          <>
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
                <ExerciseDisplay 
                  goal={goal} 
                  strengthFocus={strengthFocus} 
                  stretchFocus={stretchFocus}
                  exerciseIndex={exerciseIndex}
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
                    ? (goal === 'strength' || goal === 'stretch' ? 'max-h-[28rem] opacity-100' : 'max-h-96 opacity-100')
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
                        min="5"
                        max="90"
                        step="5"
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

                  {/* Exercise Duration */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${!onBreak ? 'text-white' : 'text-slate-700'}`}>
                      Exercise Duration
                    </label>
                    <div className="flex items-center space-x-4">
                      <input 
                        type="range"
                        min="10"
                        max="120"
                        step="5"
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
                        {breakDuration} sec
                      </span>
                    </div>
                  </div>

                  {/* Auto Start Timer */}
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
                        className={`bg-white w-5 h-5 rounded-full transform transition-transform duration-300 ${
                          autoSwitch ? 'translate-x-5' : ''
                        } ${!onBreak && autoSwitch ? 'border-2 border-slate-300 shadow-lg' : 'shadow-md'}`}
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
                        {['abs', 'back', 'chest', 'legs', 'shoulders', 'randomized'].map((focus) => (
                          <option key={focus} value={focus}>
                            {focus === 'randomized' ? 'Randomized' : focus.charAt(0).toUpperCase() + focus.slice(1)}
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
                        {['hips', 'legs', 'lower back', 'neck and shoulders', 'upper back', 'randomized'].map((focus) => (
                          <option key={focus} value={focus}>
                            {focus === 'randomized' ? 'Randomized' : focus.charAt(0).toUpperCase() + focus.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Alarm Sound - Always show this option */}
                  <div className="alarm-sound-section" style={{ display: 'block !important', visibility: 'visible !important' }}>
                    <label className={`block text-sm font-medium mb-2 ${!onBreak ? 'text-white' : 'text-slate-700'}`}>
                      Alarm Sound
                    </label>
                    <select
                      value={selectedSound}
                      onChange={e => setSelectedSound(e.target.value)}
                      className={`w-full p-2 rounded-md focus:outline-none border ${!onBreak ? 'bg-slate-600 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
                      style={{ 
                        minHeight: '40px',
                        display: 'block !important',
                        visibility: 'visible !important',
                        opacity: '1 !important',
                        position: 'relative',
                        zIndex: 10
                      }}
                    >
                      {SOUND_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>


                </div>
              </div>
            </div>
          </>
        ) : (
          // Statistics Tab Content
          <div className="py-6">
            {/* Date Navigation */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={goToPrevDay}
                className={`p-2 rounded-full ${!onBreak ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'}`}
              >
                <ChevronLeft size={20} />
              </button>
              
              <h2 className={`text-lg font-medium ${!onBreak ? 'text-white' : 'text-slate-800'}`}>
                {formatDate(selectedDate)}
              </h2>
              
              <button
                onClick={goToNextDay}
                className={`p-2 rounded-full ${!onBreak ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'}`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
            
            {/* Daily Stats */}
            <div className="mb-6">
              <div className={`text-sm mb-4 ${!onBreak ? 'text-gray-400' : 'text-gray-500'}`}>
                {getSelectedDayStats().sessions === 0 
                  ? 'No sessions completed on this day' 
                  : `${getSelectedDayStats().sessions} session${getSelectedDayStats().sessions !== 1 ? 's' : ''} completed`
                }
              </div>
              
              {/* Focus Time Stats */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className={`text-sm font-medium ${!onBreak ? 'text-gray-300' : 'text-slate-600'}`}>
                    Focus Time
                  </span>
                  <span className={`text-sm font-bold ${!onBreak ? 'text-white' : 'text-slate-800'}`}>
                    {formatTimeHMS(getSelectedDayStats().focusTime)}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-blue-500 h-2.5 rounded-full" 
                    style={{ width: `${calculateFocusPercentage(getSelectedDayStats().focusTime, getSelectedDayStats().breakTime)}%` }}
                  ></div>
                </div>
                <div className="text-right mt-1">
                  <span className={`text-xs ${!onBreak ? 'text-gray-400' : 'text-gray-500'}`}>
                    {calculateFocusPercentage(getSelectedDayStats().focusTime, getSelectedDayStats().breakTime)}% of daily time
                  </span>
                </div>
              </div>
              
              {/* Break Time Stats */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className={`text-sm font-medium ${!onBreak ? 'text-gray-300' : 'text-slate-600'}`}>
                    Exercise Time
                  </span>
                  <span className={`text-sm font-bold ${!onBreak ? 'text-white' : 'text-slate-800'}`}>
                    {formatTimeHMS(getSelectedDayStats().breakTime)}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-green-500 h-2.5 rounded-full" 
                    style={{ width: `${calculateBreakPercentage(getSelectedDayStats().focusTime, getSelectedDayStats().breakTime)}%` }}
                  ></div>
                </div>
                <div className="text-right mt-1">
                  <span className={`text-xs ${!onBreak ? 'text-gray-400' : 'text-gray-500'}`}>
                    {calculateBreakPercentage(getSelectedDayStats().focusTime, getSelectedDayStats().breakTime)}% of daily time
                  </span>
                </div>
              </div>
            </div>
            
            {/* Total Stats Section */}
            <div className="pt-4 mt-6 border-t border-gray-700">
              <h3 className={`text-sm font-medium mb-4 ${!onBreak ? 'text-white' : 'text-slate-800'}`}>
                All-Time Stats
              </h3>
              
              {/* Total Focus Time */}
              <div className="flex justify-between mb-2">
                <span className={`text-sm ${!onBreak ? 'text-gray-300' : 'text-slate-600'}`}>
                  Total Focus Time
                </span>
                <span className={`text-sm font-bold ${!onBreak ? 'text-white' : 'text-slate-800'}`}>
                  {formatTimeHMS(totalFocusTime)}
                </span>
              </div>
              
              {/* Total Exercise Time */}
              <div className="flex justify-between mb-2">
                <span className={`text-sm ${!onBreak ? 'text-gray-300' : 'text-slate-600'}`}>
                  Total Exercise Time
                </span>
                <span className={`text-sm font-bold ${!onBreak ? 'text-white' : 'text-slate-800'}`}>
                  {formatTimeHMS(totalBreakTime)}
                </span>
              </div>
              
              {/* Total Sessions */}
              <div className="flex justify-between mb-2">
                <span className={`text-sm ${!onBreak ? 'text-gray-300' : 'text-slate-600'}`}>
                  Total Sessions Completed
                </span>
                <span className={`text-sm font-bold ${!onBreak ? 'text-white' : 'text-slate-800'}`}>
                  {completedSessions}
                </span>
              </div>
            </div>
            
            {/* Reset Stats Button */}
            <div className="mt-10">
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to reset all statistics?')) {
                    setTotalFocusTime(0);
                    setTotalBreakTime(0);
                    setCompletedSessions(0);
                    setDailyStats({});
                  }
                }}
                className={`w-full py-2 rounded-md transition text-white ${!onBreak ? 'bg-red-700 hover:bg-red-800' : 'bg-red-600 hover:bg-red-700'}`}
              >
                Reset All Statistics
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}