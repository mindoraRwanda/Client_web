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
    theme: "bg-gradient-to-br from-purple-50 to-pink-50",
    questions: [
      "What does authenticity mean to you?",
      "When do you feel most like your true self?",
      "What masks do you wear in different situations?"
    ]
  },
  {
    id: 2,
    title: "Navigate Your Inner Landscape",
    icon: <Brain className="w-6 h-6 text-blue-500" />, 
    description: "Explore the depths of stress, burnout, and find your path to renewal",
    theme: "bg-gradient-to-br from-blue-50 to-cyan-50",
    questions: [
      "What situations cause you the most stress?",
      "How do you currently manage stress?",
      "What is one small change you can make to improve your well-being?"
    ]
  },
  {
    id: 3,
    title: "Truth Mirror",
    icon: <Heart className="w-6 h-6 text-red-500" />, 
    description: "Embrace radical honesty and unlock the power of your inner truth",
    theme: "bg-gradient-to-br from-red-50 to-orange-50",
    questions: [
      "What is a truth you’ve been avoiding?",
      "How does honesty impact your relationships?",
      "What does self-truth mean to you?"
    ]
  },
  {
    id: 4,
    title: "Future Self Connection",
    icon: <Target className="w-6 h-6 text-green-500" />, 
    description: "Visualize and connect with your highest potential self",
    theme: "bg-gradient-to-br from-green-50 to-emerald-50",
    questions: [
      "How do you see your future self in five years?",
      "What habits do you need to develop to reach that vision?",
      "What advice would your future self give you today?"
    ]
  },
  {
    id: 5,
    title: "Courage Quest",
    icon: <Shield className="w-6 h-6 text-yellow-500" />, 
    description: "Transform fear and doubt into stepping stones for growth",
    theme: "bg-gradient-to-br from-yellow-50 to-amber-50",
    questions: [
      "What is a fear you want to overcome?",
      "How has fear held you back in life?",
      "What is one step you can take today to build courage?"
    ]
  },
  {
    id: 6,
    title: "Growth Mindset Shift",
    icon: <Leaf className="w-6 h-6 text-green-500" />,
    description: "Unlock the power of a growth mindset for continuous learning and resilience",
    theme: "bg-gradient-to-br from-green-50 to-lime-50",
    questions: [
      "What is one challenge that helped you grow?",
      "How do you react to failure?",
      "What steps can you take to develop a growth mindset?"
    ]
  },
  {
    id: 7,
    title: "Wisdom Seeker",
    icon: <Book className="w-6 h-6 text-brown-500" />,
    description: "Gather lessons from your experiences and shape your wisdom",
    theme: "bg-gradient-to-br from-brown-50 to-yellow-50",
    questions: [
      "What is the most valuable lesson you’ve learned in life?",
      "Who has been a great teacher to you?",
      "How do you apply wisdom in your daily life?"
    ]
  },
  {
    id: 8,
    title: "Resilience Building",
    icon: <Mountain className="w-6 h-6 text-gray-500" />,
    description: "Cultivate inner strength to rise above adversity",
    theme: "bg-gradient-to-br from-gray-50 to-slate-50",
    questions: [
      "What has been your greatest challenge so far?",
      "How did you overcome a difficult situation?",
      "What strategies help you build resilience?"
    ]
  },
  {
    id: 9,
    title: "Inner Light Discovery",
    icon: <Sun className="w-6 h-6 text-orange-500" />,
    description: "Shine your unique light and inspire those around you",
    theme: "bg-gradient-to-br from-orange-50 to-yellow-50",
    questions: [
      "What makes you feel truly alive?",
      "What is your unique strength?",
      "How do you want to impact the world?"
    ]
  },
  {
    id: 10,
    title: "Creative Problem-Solving",
    icon: <Puzzle className="w-6 h-6 text-indigo-500" />,
    description: "Tap into creativity to solve problems in innovative ways",
    theme: "bg-gradient-to-br from-indigo-50 to-blue-50",
    questions: [
      "How do you approach difficult problems?",
      "What’s a creative solution you’ve come up with?",
      "How can you think outside the box more often?"
    ]
  }
];

export default function ReflectionJournal() {
  const [selectedExercise, setSelectedExercise] = useState<typeof exerciseData[0] | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [showReport, setShowReport] = useState(false);

  const handleNext = () => {
    setAnswers([...answers, userAnswer]);
    setUserAnswer("");
    
    if (selectedExercise && currentQuestionIndex < selectedExercise.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowReport(true);
    }
  };

  const restartExercise = () => {
    setSelectedExercise(null);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowReport(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Inner Journey</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Welcome to your sacred space for self-discovery and growth.
          </p>
        </header>
        
        {!selectedExercise ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exerciseData.map((exercise) => (
              <Card key={exercise.id} onClick={() => setSelectedExercise(exercise)}>
                <CardHeader>{exercise.icon}<CardTitle>{exercise.title}</CardTitle></CardHeader>
                <CardContent><p>{exercise.description}</p></CardContent>
              </Card>
            ))}
          </div>
        ) : showReport ? (
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold text-gray-800">Reflection Report</h2>
            <ul className="text-left mt-4">
              {selectedExercise.questions.map((question, index) => (
                <li key={index} className="mb-2">
                  <strong>{question}</strong>
                  <p className="text-gray-600">{answers[index]}</p>
                </li>
              ))}
            </ul>
            <Button onClick={restartExercise} className="mt-4">Try Another Exercise</Button>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold text-gray-800">{selectedExercise.title}</h2>
            <p className="text-gray-600">{selectedExercise.questions[currentQuestionIndex]}</p>
            <textarea 
              className="w-full p-2 border rounded mt-4" 
              value={userAnswer} 
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your answer here..."
            />
            <Button onClick={handleNext} className="mt-4">{currentQuestionIndex < selectedExercise.questions.length - 1 ? "Next" : "Finish"}</Button>
          </div>
        )}
      </div>
    </div>
  );
}
