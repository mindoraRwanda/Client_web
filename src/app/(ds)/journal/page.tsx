'use client'
import React, { JSX, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Brain, Target, Shield, Leaf, Book, Mountain, Sun, Puzzle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

interface Exercise {
  id: number;
  title: string;
  icon: JSX.Element;
  description: string;
  theme: string;
  questions: string[];
}

const exerciseData: Exercise[] = [
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
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            Inner Journey
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Welcome to your sacred space for self-discovery and growth.
          </p>
        </header>

        {!selectedExercise ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exerciseData.map((exercise) => (
              <Card 
                key={exercise.id}
                onClick={() => setSelectedExercise(exercise)}
                className={`${exercise.theme} cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg duration-300 group border-0`}
              >
                <CardHeader className="flex flex-row items-center space-y-0 space-x-4">
                  <div className="p-3 rounded-lg bg-white/50 group-hover:bg-white/80 transition-colors">
                    {exercise.icon}
                  </div>
                  <CardTitle className="text-lg font-semibold text-slate-800">
                    {exercise.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {exercise.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : showReport ? (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg animate-pop-in">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                {selectedExercise.title} Report
              </h2>
              <p className="text-slate-500">Your reflection journey</p>
            </div>
            <ul className="space-y-6">
              {selectedExercise.questions.map((question, index) => (
                <li key={index} className="border-l-4 border-purple-600 pl-4">
                  <h3 className="font-medium text-slate-700 mb-2">{question}</h3>
                  <p className="text-slate-600 bg-slate-50 rounded-lg p-3 text-sm">
                    {answers[index] || "No answer provided"}
                  </p>
                </li>
              ))}
            </ul>
            <Button 
              onClick={restartExercise}
              className="w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              Start New Journey
            </Button>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg animate-pop-in">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
                {selectedExercise.icon}
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                {selectedExercise.title}
              </h2>
              <Progress 
                value={(currentQuestionIndex + 1) / selectedExercise.questions.length * 100} 
                className="h-2 bg-slate-100"
              />
              <p className="text-sm text-slate-500 mt-2">
                Question {currentQuestionIndex + 1} of {selectedExercise.questions.length}
              </p>
            </div>
            
            <div className="space-y-6">
              <p className="text-lg text-slate-700 font-medium text-center">
                {selectedExercise.questions[currentQuestionIndex]}
              </p>
              <Textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Write your thoughts here..."
                className="min-h-[150px] text-lg focus-visible:ring-purple-500 border-slate-200"
              />
              <Button 
                onClick={handleNext}
                disabled={!userAnswer.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white disabled:opacity-50 transition-opacity"
              >
                {currentQuestionIndex < selectedExercise.questions.length - 1 ? 
                  "Continue Journey" : "Complete Reflection"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}