'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Brain, Target, Shield, Leaf, Book, Mountain, Sun, Puzzle } from "lucide-react";

const exerciseData = [
  { id: 1, title: "Unmasking Your Authentic Self", icon: Sparkles, description: "Journey inward to discover your true essence and embrace your authentic being", theme: "bg-gradient-to-br from-purple-100 to-pink-100" },
  { id: 2, title: "Navigate Your Inner Landscape", icon: Brain, description: "Explore the depths of stress, burnout, and find your path to renewal", theme: "bg-gradient-to-br from-blue-100 to-cyan-100" },
  { id: 3, title: "Truth Mirror", icon: Heart, description: "Embrace radical honesty and unlock the power of your inner truth", theme: "bg-gradient-to-br from-red-100 to-orange-100" },
  { id: 4, title: "Future Self Connection", icon: Target, description: "Visualize and connect with your highest potential self", theme: "bg-gradient-to-br from-green-100 to-emerald-100" },
  { id: 5, title: "Courage Quest", icon: Shield, description: "Transform fear and doubt into stepping stones for growth", theme: "bg-gradient-to-br from-yellow-100 to-amber-100" },
  { id: 6, title: "Sacred Boundaries", icon: Leaf, description: "Nurture self-worth through mindful boundary setting", theme: "bg-gradient-to-br from-emerald-100 to-teal-100" },
  { id: 7, title: "Release & Renew", icon: Book, description: "Let go of past wounds and embrace emotional healing", theme: "bg-gradient-to-br from-indigo-100 to-violet-100" },
  { id: 8, title: "Purpose Compass", icon: Mountain, description: "Align with your authentic purpose and life direction", theme: "bg-gradient-to-br from-teal-100 to-cyan-100" },
  { id: 9, title: "Success Alchemy", icon: Sun, description: "Transform your relationship with success and failure", theme: "bg-gradient-to-br from-orange-100 to-yellow-100" },
  { id: 10, title: "Inner Sanctuary", icon: Puzzle, description: "Cultivate deep self-compassion and inner peace", theme: "bg-gradient-to-br from-rose-100 to-pink-100" }
];

export default function ReflectionJournal() {
  const [selectedExercise, setSelectedExercise] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white p-6">
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
              className={`transition-transform duration-300 hover:scale-105 cursor-pointer ${exercise.theme} border-none shadow-lg`}
              onClick={() => setSelectedExercise(exercise)}
            >
              <CardHeader className="space-y-1 flex items-center gap-3">
                <exercise.icon className="w-6 h-6 text-gray-700" />
                <CardTitle className="text-xl font-semibold text-gray-800">{exercise.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{exercise.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedExercise && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <Card className="max-w-2xl w-full p-6 shadow-xl bg-white rounded-lg">
              <CardHeader className="flex items-center gap-3">
                <selectedExercise.icon className="w-6 h-6 text-gray-700" />
                <CardTitle className="text-gray-900">{selectedExercise.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">{selectedExercise.description}</p>
                <Button 
                  onClick={() => setSelectedExercise(null)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 rounded-md py-2"
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
