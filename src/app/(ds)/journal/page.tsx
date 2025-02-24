'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Brain, Target, Shield, Leaf, Book, Mountain, Sun, Puzzle } from "lucide-react";

const exerciseData = [
  {
    id: 1,
    title: "Unmasking Your Authentic Self",
    icon: <Sparkles className="w-6 h-6 text-purple-500" />,
    description: "Journey inward to discover your true essence and embrace your authentic being",
    theme: "bg-gradient-to-br from-purple-50 to-pink-50"
  },
  {
    id: 2,
    title: "Navigate Your Inner Landscape",
    icon: <Brain className="w-6 h-6 text-blue-500" />,
    description: "Explore the depths of stress, burnout, and find your path to renewal",
    theme: "bg-gradient-to-br from-blue-50 to-cyan-50"
  },
  {
    id: 3,
    title: "Truth Mirror",
    icon: <Heart className="w-6 h-6 text-red-500" />,
    description: "Embrace radical honesty and unlock the power of your inner truth",
    theme: "bg-gradient-to-br from-red-50 to-orange-50"
  },
  {
    id: 4,
    title: "Future Self Connection",
    icon: <Target className="w-6 h-6 text-green-500" />,
    description: "Visualize and connect with your highest potential self",
    theme: "bg-gradient-to-br from-green-50 to-emerald-50"
  },
  {
    id: 5,
    title: "Courage Quest",
    icon: <Shield className="w-6 h-6 text-yellow-500" />,
    description: "Transform fear and doubt into stepping stones for growth",
    theme: "bg-gradient-to-br from-yellow-50 to-amber-50"
  },
  {
    id: 6,
    title: "Sacred Boundaries",
    icon: <Leaf className="w-6 h-6 text-emerald-500" />,
    description: "Nurture self-worth through mindful boundary setting",
    theme: "bg-gradient-to-br from-emerald-50 to-teal-50"
  },
  {
    id: 7,
    title: "Release & Renew",
    icon: <Book className="w-6 h-6 text-indigo-500" />,
    description: "Let go of past wounds and embrace emotional healing",
    theme: "bg-gradient-to-br from-indigo-50 to-violet-50"
  },
  {
    id: 8,
    title: "Purpose Compass",
    icon: <Mountain className="w-6 h-6 text-teal-500" />,
    description: "Align with your authentic purpose and life direction",
    theme: "bg-gradient-to-br from-teal-50 to-cyan-50"
  },
  {
    id: 9,
    title: "Success Alchemy",
    icon: <Sun className="w-6 h-6 text-orange-500" />,
    description: "Transform your relationship with success and failure",
    theme: "bg-gradient-to-br from-orange-50 to-yellow-50"
  },
  {
    id: 10,
    title: "Inner Sanctuary",
    icon: <Puzzle className="w-6 h-6 text-rose-500" />,
    description: "Cultivate deep self-compassion and inner peace",
    theme: "bg-gradient-to-br from-rose-50 to-pink-50"
  }
];

export default function ReflectionJournal() {
  interface Exercise {
    id: number;
    title: string;
    icon: React.JSX.Element;
    description: string;
    theme: string;
  }
  
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Inner Journey</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Welcome to your sacred space for self-discovery and growth. Each exercise is a doorway to deeper understanding and authentic living.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exerciseData.map((exercise) => (
            <Card 
              key={exercise.id}
              className={`transform transition-all duration-300 hover:scale-105 cursor-pointer ${exercise.theme} border-none shadow-lg`}
              onClick={() => setSelectedExercise(exercise)}
            >
              <CardHeader className="space-y-1">
                <div className="flex items-center gap-3">
                  {exercise.icon}
                  <CardTitle className="text-xl font-semibold">{exercise.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{exercise.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedExercise && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <Card className="max-w-2xl w-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  {selectedExercise.icon}
                  <CardTitle>{selectedExercise.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>{selectedExercise.description}</p>
                <Button 
                  onClick={() => setSelectedExercise(null)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                >
                  Begin Journey
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}