"use client";

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Waves, 
  Brain, 
  Heart, 
  PlayCircle, 
  PauseCircle, 
  Moon, 
  Music, 
  ActivitySquare,
  X
} from "lucide-react";

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
    <Card className={`${exercise.bgClass} border ${exercise.borderClass}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{exercise.title}</span>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold mb-2">{formatTime(timeLeft)}</div>
          <div className="flex justify-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? 
                <PauseCircle className="h-4 w-4" /> : 
                <PlayCircle className="h-4 w-4" />
              }
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <p className="font-medium">Current Step:</p>
          <p className="text-lg">{exercise.steps[currentStep]}</p>
          <div className="w-full bg-white rounded-full h-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all"
              style={{ width: `${(currentStep + 1) * 20}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
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
    <div className="space-y-6 p-4">
      {activeExercise ? (
        <ExercisePlayer 
          exercise={activeExercise} 
          onClose={() => setActiveExercise(null)} 
        />
      ) : (
        <>
          {/* Page Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Explore Exercises
              </h1>
              <p className="text-muted-foreground">
                Enhance your well-being with guided practices
              </p>
            </div>
            <input
              type="text"
              placeholder="Search exercises..."
              className="mt-4 md:mt-0 p-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className="whitespace-nowrap"
            >
              All Exercises
            </Button>
            {exerciseCategories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className="whitespace-nowrap"
              >
                <category.icon className={`h-4 w-4 mr-2 ${category.color}`} />
                {category.name}
              </Button>
            ))}
          </div>

          {/* Exercise Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExercises.map((exercise) => {
              const Icon = exercise.icon;
              return (
                <Card
                  key={exercise.id}
                  className={`${exercise.bgClass} border ${exercise.borderClass}`}
                >
                  <CardHeader className="flex items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      {exercise.title}
                    </CardTitle>
                    <Icon className={`h-5 w-5 ${exercise.color}`} />
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {exercise.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {exercise.duration}
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setActiveExercise(exercise)}
                      >
                        <PlayCircle className="h-4 w-4 mr-1" />
                        Start
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default ExercisesPage;