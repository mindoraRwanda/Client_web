'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Waves, Brain, Heart, PlayCircle, PauseCircle, Moon, Music, ActivitySquare, X, Search } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
// Make sure all icons are available in lucide-react
const exerciseCategories = [
  { id: 'breathing', name: 'Breathing', icon: Waves, color: 'text-blue-500' },
  { id: 'meditation', name: 'Meditation', icon: Brain, color: 'text-purple-500' },
  { id: 'movement', name: 'Movement', icon: ActivitySquare, color: 'text-rose-500' },
  { id: 'sleep', name: 'Sleep & Rest', icon: Moon, color: 'text-indigo-500' },
  { id: 'nature', name: 'Nature Sounds', icon: Music, color: 'text-green-500' },
];

const exercises = [
  // Breathing Exercises
  {
    id: 1,
    title: "4-7-8 Breathing",
    description: "Inhale for 4 seconds, hold for 7, exhale for 8. A natural tranquilizer for the nervous system.",
    duration: "5 min",
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
    ]
  },
  {
    id: 2,
    title: "Box Breathing",
    description: "Equal duration breathing pattern used by Navy SEALs for stress management.",
    duration: "4 min",
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
    ]
  },
  // Meditation Exercises
  {
    id: 3,
    title: "Body Scan Meditation",
    description: "Progressive relaxation through focused attention on different body parts.",
    duration: "10 min",
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
    ]
  },
  {
    id: 4,
    title: "Loving-Kindness Meditation",
    description: "Develop compassion for yourself and others through guided visualization.",
    duration: "15 min",
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
    ]
  },
  // Movement Exercises
  {
    id: 5,
    title: "Desk Stretches",
    description: "Simple stretches to release tension while working.",
    duration: "3 min",
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
    ]
  },
  // Sleep & Rest
  {
    id: 6,
    title: "Progressive Relaxation",
    description: "Systematically relax muscle groups for better sleep.",
    duration: "12 min",
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
    ]
  },
  // Nature Sounds
  {
    id: 7,
    title: "Forest Soundscape",
    description: "Immerse yourself in calming forest sounds.",
    duration: "10 min",
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
    ]
  }
];

interface Exercise {
  id: number;
  title: string;
  description: string;
  duration: string;
  icon: React.ComponentType;
  color: string;
  bgClass: string;
  borderClass: string;
  category: string;
  steps: string[];
}

const ExercisePlayer: React.FC<{ exercise: Exercise; onClose: () => void }> = ({ exercise, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(parseInt(exercise.duration) * 60);

  React.useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsPlaying(false);
            return 0;
          }
          // Update step every 20% of total time
          const stepDuration = (parseInt(exercise.duration) * 60) / 5;
          if (prev % stepDuration === 0 && currentStep < 4) {
            setCurrentStep(prev => prev + 1);
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, exercise.duration, currentStep]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

 return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-2xl shadow-xl overflow-hidden"
    >
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
            <div className="flex items-center justify-between text-sm font-medium">
              <span>Current Step</span>
              <span>{currentStep + 1}/{exercise.steps.length}</span>
            </div>
            <div className="relative h-3 rounded-full bg-accent overflow-hidden">
              <motion.div 
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep + 1) * 20}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-lg font-medium text-center">
              {exercise.steps[currentStep]}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ExercisesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredExercises = exercises.filter(exercise => 
    (selectedCategory === 'all' || exercise.category === selectedCategory) &&
    (exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     exercise.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8 p-4 max-w-7xl mx-auto">
      {activeExercise ? (
        <ExercisePlayer 
          exercise={activeExercise} 
          onClose={() => setActiveExercise(null)} 
        />
      ) : (
        <>
          {/* Page Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
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
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('all')}
                  className={cn(
                    "rounded-full gap-2",
                    selectedCategory === 'all' && 'bg-gradient-to-r from-purple-600 to-pink-500 text-white'
                  )}
                >
                  All Practices
                </Button>
              </motion.div>
              {exerciseCategories.map(category => (
                <motion.div key={category.id} whileHover={{ scale: 1.05 }}>
                  <Button
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category.id)}
                    className={cn(
                      "rounded-full gap-2",
                      selectedCategory === category.id && `bg-gradient-to-r ${category.color.replace('text', 'from')} to-${category.color.split('-')[1]}-300 text-white`
                    )}
                  >
                    <category.icon className="h-4 w-4" />
                    {category.name}
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Exercise Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filteredExercises.map((exercise) => {
              const Icon = exercise.icon;
              return (
                <motion.div 
                  key={exercise.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    className={cn(
                      "group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow",
                      exercise.bgClass
                    )}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${exercise.color}/20 opacity-0 group-hover:opacity-100 transition-opacity`} />
                    <CardHeader className="flex flex-row items-start justify-between pb-2">
                      <CardTitle className="text-lg font-semibold">
                        {exercise.title}
                      </CardTitle>
                      <div className={`p-2 rounded-lg ${exercise.bgClass}`}>
                        <Icon className={`h-5 w-5 ${exercise.color}`} />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        {exercise.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium px-3 py-1 rounded-full bg-accent">
                          {exercise.duration}
                        </span>
                        <motion.div whileHover={{ scale: 1.05 }}>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setActiveExercise(exercise)}
                            className="rounded-full gap-1 bg-background/80 backdrop-blur-sm"
                          >
                            <PlayCircle className="h-4 w-4" />
                            Start
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </>
      )}
    </div>
  );
};

export default ExercisesPage;
