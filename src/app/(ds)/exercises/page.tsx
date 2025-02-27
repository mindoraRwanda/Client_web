/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Waves, Brain, Heart, PlayCircle, PauseCircle, Moon, Music, ActivitySquare, X, Search, LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

interface Exercise {
  id: number;
  title: string;
  description: string;
  duration: string;
  icon: React.ComponentType<LucideProps>;
  color: string;
  bgClass: string;
  borderClass: string;
  category: string;
  steps: string[];
  stepTiming: number[];
  stepTransitions?: number[];
}

// Make sure all icons are available in lucide-react
const exerciseCategories = [
  { id: 'breathing', name: 'Breathing', icon: (props: LucideProps) => <Waves {...props} />, color: 'text-blue-500' },
  { id: 'meditation', name: 'Meditation', icon: (props: LucideProps) => <Brain {...props} />, color: 'text-purple-500' },
  { id: 'movement', name: 'Movement', icon: (props: LucideProps) => <ActivitySquare {...props} />, color: 'text-rose-500' },
  { id: 'sleep', name: 'Sleep & Rest', icon: (props: LucideProps) => <Moon {...props} />, color: 'text-indigo-500' },
  { id: 'nature', name: 'Nature Sounds', icon: (props: LucideProps) => <Music {...props} />, color: 'text-green-500' },
];

const exercises: Exercise[] = [
  // Breathing Exercises
  {
    id: 1,
    title: "4-7-8 Breathing",
    description: "Inhale for 4 seconds, hold for 7, exhale for 8. A natural tranquilizer for the nervous system.",
    duration: "5",
    icon: Waves,
    color: "text-blue-500",
    bgClass: "bg-blue-50",
    borderClass: "border-blue-100",
    category: "breathing",
    steps: [
      "Find a comfortable sitting position",
      "Inhale quietly through the nose for 4 seconds",
      "Hold breath for 7 seconds",
      "Exhale completely through mouth for 8 seconds",
      "Repeat cycle 4 times"
    ],
    // Custom timing for breathing exercises (in seconds)
    stepTiming: [30, 30, 30, 30, 180]
  },
  {
    id: 2,
    title: "Box Breathing",
    description: "Equal duration breathing pattern used by Navy SEALs for stress management.",
    duration: "4",
    icon: Waves,
    color: "text-blue-500",
    bgClass: "bg-blue-50",
    borderClass: "border-blue-100",
    category: "breathing",
    steps: [
      "Exhale completely",
      "Inhale for 4 counts",
      "Hold for 4 counts",
      "Exhale for 4 counts",
      "Hold empty for 4 counts"
    ],
    stepTiming: [20, 40, 40, 40, 100]
  },
  // Meditation Exercises
  {
    id: 3,
    title: "Body Scan Meditation",
    description: "Progressive relaxation through focused attention on different body parts.",
    duration: "10",
    icon: Brain,
    color: "text-purple-500",
    bgClass: "bg-purple-50",
    borderClass: "border-purple-100",
    category: "meditation",
    steps: [
      "Lie down comfortably",
      "Close your eyes and take deep breaths",
      "Focus attention on your toes",
      "Slowly move attention up through body",
      "Release tension in each area"
    ],
    stepTiming: [60, 90, 120, 180, 150]
  },
  {
    id: 4,
    title: "Loving-Kindness Meditation",
    description: "Develop compassion for yourself and others through guided visualization.",
    duration: "15",
    icon: Heart,
    color: "text-purple-500",
    bgClass: "bg-purple-50",
    borderClass: "border-purple-100",
    category: "meditation",
    steps: [
      "Start with self-compassion",
      "Extend to loved ones",
      "Include neutral people",
      "Include difficult people",
      "Extend to all beings"
    ],
    stepTiming: [180, 180, 180, 180, 180]
  },
  // Movement Exercises
  {
    id: 5,
    title: "Desk Stretches",
    description: "Simple stretches to release tension while working.",
    duration: "3",
    icon: ActivitySquare,
    color: "text-rose-500",
    bgClass: "bg-rose-50",
    borderClass: "border-rose-100",
    category: "movement",
    steps: [
      "Neck rolls",
      "Shoulder shrugs",
      "Wrist stretches",
      "Ankle rotations",
      "Seated twists"
    ],
    stepTiming: [36, 36, 36, 36, 36]
  },
  // Sleep & Rest
  {
    id: 6,
    title: "Progressive Relaxation",
    description: "Systematically relax muscle groups for better sleep.",
    duration: "12",
    icon: Moon,
    color: "text-indigo-500",
    bgClass: "bg-indigo-50",
    borderClass: "border-indigo-100",
    category: "sleep",
    steps: [
      "Tense and relax feet",
      "Move to calves and thighs",
      "Focus on core and back",
      "Relax arms and hands",
      "Release facial tension"
    ],
    stepTiming: [144, 144, 144, 144, 144]
  },
  // Nature Sounds
  {
    id: 7,
    title: "Forest Soundscape",
    description: "Immerse yourself in calming forest sounds.",
    duration: "10",
    icon: Music,
    color: "text-green-500",
    bgClass: "bg-green-50",
    borderClass: "border-green-100",
    category: "nature",
    steps: [
      "Find a quiet space",
      "Put on headphones",
      "Close eyes",
      "Focus on nature sounds",
      "Breathe naturally"
    ],
    stepTiming: [60, 30, 30, 300, 180]
  }
];

// Calculate total times and validate step timings
const processedExercises = exercises.map(exercise => {
  const exerciseCopy = {...exercise};
  // If stepTiming is not provided or total doesn't match duration, create equal step timing
  const totalSeconds = parseInt(exerciseCopy.duration) * 60;
  
  if (!exerciseCopy.stepTiming || exerciseCopy.stepTiming.reduce((a, b) => a + b, 0) !== totalSeconds) {
    const equalStepTime = Math.floor(totalSeconds / exerciseCopy.steps.length);
    const remainder = totalSeconds % exerciseCopy.steps.length;
    exerciseCopy.stepTiming = exerciseCopy.steps.map((_, index) => 
      index === 0 ? equalStepTime + remainder : equalStepTime
    );
  }
  
  exerciseCopy.stepTransitions = [];
  let cumulativeTime = 0;
  exerciseCopy.stepTiming.forEach(time => {
    cumulativeTime += time;
    exerciseCopy.stepTransitions?.push(cumulativeTime);
  });

  return exerciseCopy;
});

const ExercisePlayer = ({ exercise, onClose }: { exercise: Exercise; onClose: () => void }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(parseInt(exercise.duration) * 60);
  const [currentStepTimeLeft, setCurrentStepTimeLeft] = useState(exercise.stepTiming[0]);
  const totalTime = parseInt(exercise.duration) * 60;

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTimeLeft => {
          // Calculate next time values
          const nextTimeLeft = prevTimeLeft - 1;
          
          // Update current step if needed
          const timeElapsed = totalTime - nextTimeLeft;
          const nextStep = exercise.stepTransitions?.findIndex(point => timeElapsed < point) ?? -1;
          const newStep = nextStep === -1 ? exercise.steps.length - 1 : nextStep;
          
          if (newStep !== currentStep) {
            setCurrentStep(newStep);
            setCurrentStepTimeLeft(exercise.stepTiming[newStep]);
          } else {
            setCurrentStepTimeLeft(prevStepTime => prevStepTime - 1);
          }
          
          // Handle exercise completion
          if (nextTimeLeft <= 0) {
            setIsPlaying(false);
            clearInterval(timer);
            return 0;
          }
          
          return nextTimeLeft;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, currentStep, exercise.stepTransitions, exercise.stepTiming, exercise.steps.length, timeLeft, totalTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage for the entire exercise
  const totalProgress = ((totalTime - timeLeft) / totalTime) * 100;
  
  // Calculate progress for current step
  const currentStepTotalTime = exercise.stepTiming[currentStep];
  const currentStepProgress = 
    ((currentStepTotalTime - currentStepTimeLeft) / currentStepTotalTime) * 100;

  // Get color classes for step indicators based on exercise color
  const getStepClasses = (index: number) => {
    if (index === currentStep) {
      if (exercise.color.includes('blue')) return 'bg-blue-500 scale-125';
      if (exercise.color.includes('purple')) return 'bg-purple-500 scale-125';
      if (exercise.color.includes('rose')) return 'bg-rose-500 scale-125';
      if (exercise.color.includes('indigo')) return 'bg-indigo-500 scale-125';
      if (exercise.color.includes('green')) return 'bg-green-500 scale-125';
      return 'bg-purple-500 scale-125';
    } else if (index < currentStep) {
      if (exercise.color.includes('blue')) return 'bg-blue-300';
      if (exercise.color.includes('purple')) return 'bg-purple-300';
      if (exercise.color.includes('rose')) return 'bg-rose-300';
      if (exercise.color.includes('indigo')) return 'bg-indigo-300';
      if (exercise.color.includes('green')) return 'bg-green-300';
      return 'bg-purple-300';
    }
    return 'bg-accent';
  };

  return (
    <div className="relative rounded-2xl shadow-xl overflow-hidden animate-fadeIn">
      <div className={`absolute inset-0 bg-gradient-to-br ${exercise.color.replace('text', 'from')}/20 to-white/50`} />
      <Card className="relative bg-background/80 backdrop-blur-sm border-0">
        <CardHeader className="flex flex-row items-center justify-between px-6 pt-6 pb-4">
          <CardTitle className="text-2xl font-bold">{exercise.title}</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="rounded-full hover:bg-accent/50"
          >
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6 px-6 pb-6">
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              {formatTime(timeLeft)}
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsPlaying(!isPlaying)}
              className="rounded-full h-14 w-14 shadow-lg bg-background/80 backdrop-blur-sm"
            >
              {isPlaying ? 
                <PauseCircle className="h-6 w-6" /> : 
                <PlayCircle className="h-6 w-6" />
              }
            </Button>
          </div>
          
          <div className="space-y-4">
            {/* Overall progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm font-medium">
                <span>Overall Progress</span>
                <span>{Math.round(totalProgress)}%</span>
              </div>
              <div className="relative h-2 rounded-full bg-accent overflow-hidden">
                <div 
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                  style={{ width: `${totalProgress}%` }}
                />
              </div>
            </div>
            
            {/* Current step info */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm font-medium">
                <span>Current Step</span>
                <span>{currentStep + 1}/{exercise.steps.length}</span>
              </div>
              <div className="relative h-2 rounded-full bg-accent overflow-hidden">
                <div 
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-300"
                  style={{ width: `${currentStepProgress}%` }}
                />
              </div>
            </div>
            
            {/* Step timing */}
            <div className="flex items-center justify-between text-sm font-medium">
              <span>Step Time Remaining</span>
              <span>{formatTime(currentStepTimeLeft)}</span>
            </div>
            
            {/* Current step display */}
            <div className="p-6 bg-background/70 backdrop-blur-sm rounded-lg border border-accent/50 shadow-md">
              <p className="text-lg font-medium text-center">
                {exercise.steps[currentStep]}
              </p>
            </div>
            
            {/* Step indicators */}
            <div className="flex justify-center space-x-2 pt-2">
              {exercise.steps.map((_, index) => (
                <div 
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${getStepClasses(index)}`}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ExerciseCard = ({ exercise, onClick }: { exercise: Exercise; onClick: () => void }) => {
  const Icon = exercise.icon;
  
  return (
    <Card
      className={cn(
        "group relative overflow-hidden border shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer",
        exercise.bgClass
      )}
      onClick={onClick}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${exercise.color.replace('text', 'from')}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <CardTitle className="text-lg font-semibold">
          {exercise.title}
        </CardTitle>
        <div className={`p-2 rounded-lg ${exercise.bgClass} border ${exercise.borderClass}`}>
          <Icon className={`h-5 w-5 ${exercise.color}`} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm">
          {exercise.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium px-3 py-1 rounded-full bg-accent">
            {exercise.duration} min
          </span>
          <Button 
            variant="outline" 
            size="sm"
            className="rounded-full gap-1 bg-background/80 backdrop-blur-sm group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-500 group-hover:text-white transition-all duration-300"
          >
            <PlayCircle className="h-4 w-4" />
            Start
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const CategoryFilter = ({ selectedCategory, setSelectedCategory }: { selectedCategory: string, setSelectedCategory: React.Dispatch<React.SetStateAction<string>> }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
      <Button
        variant={selectedCategory === 'all' ? 'default' : 'outline'}
        onClick={() => setSelectedCategory('all')}
        className={cn(
          "rounded-full gap-2 transition-all duration-300",
          selectedCategory === 'all' && 'bg-gradient-to-r from-purple-600 to-pink-500 text-white'
        )}
      >
        All Practices
      </Button>
      {exerciseCategories.map(category => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? 'default' : 'outline'}
          onClick={() => setSelectedCategory(category.id)}
          className={cn(
            "rounded-full gap-2 transition-all duration-300",
            selectedCategory === category.id && `bg-gradient-to-r ${category.color.replace('text', 'from')} to-${category.color.split('-')[1]}-300 text-white`
          )}
        >
          <category.icon className="h-4 w-4" />
          {category.name}
        </Button>
      ))}
    </div>
  );
};

const ExercisesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredExercises = processedExercises.filter(exercise => 
    (selectedCategory === 'all' || exercise.category === selectedCategory) &&
    (exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     exercise.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {activeExercise ? (
        <ExercisePlayer 
          exercise={activeExercise} 
          onClose={() => setActiveExercise(null)} 
        />
      ) : (
        <>
          {/* Page Header */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  Wellness Toolkit
                </h1>
                <p className="text-muted-foreground text-lg">
                  Curated practices for mental clarity and physical well-being
                </p>
              </div>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search practices..."
                  className="w-full pl-9 pr-4 py-2 rounded-full border bg-background focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Categories */}
            <CategoryFilter 
              selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory} 
            />
          </div>

          {/* Exercise Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExercises.length > 0 ? (
              filteredExercises.map((exercise) => (
                <ExerciseCard 
                  key={exercise.id}
                  exercise={exercise}
                  onClick={() => setActiveExercise(exercise)}
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-12 bg-accent/20 rounded-lg">
                <p className="text-xl text-muted-foreground">No exercises found matching your search.</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="mt-4"
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Add custom CSS for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ExercisesPage;