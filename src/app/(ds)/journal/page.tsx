'use client'
import React, { JSX, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Brain, Target, Shield, Leaf, Book, Mountain, Sun, Puzzle, AlertTriangle, CheckCircle, ArrowLeft, Save } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Exercise {
  id: number;
  title: string;
  icon: JSX.Element;
  description: string;
  theme: string;
  questions: string[];
  isAvailable: boolean;
}

// Added more specific typing for the timeout state
type TimeoutType = ReturnType<typeof setTimeout> | null;

const exerciseData: Exercise[] = [
  {
    id: 1,
    title: "Unmasking Your Authentic Self",
    icon: <Sparkles className="w-6 h-6 text-purple-500" />, 
    description: "Journey inward to discover your true essence and embrace your authentic being",
    theme: "bg-gradient-to-br from-purple-50 to-pink-50",
    questions: [
      "What does authenticity mean to you personally?",
      "When do you feel most like your true self, and what situations or people help you feel this way?",
      "What masks do you wear in different situations, and why do you think you need them?",
      "How might your life change if you were more authentic in all areas?",
      "What's one small step you can take today to express your authentic self more freely?"
    ],
    isAvailable: true
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
    ],
    isAvailable: true // Made available for better user experience
  },
  {
    id: 3,
    title: "Truth Mirror",
    icon: <Heart className="w-6 h-6 text-red-500" />, 
    description: "Embrace radical honesty and unlock the power of your inner truth",
    theme: "bg-gradient-to-br from-red-50 to-orange-50",
    questions: [
      "What is a truth you've been avoiding?",
      "How does honesty impact your relationships?",
      "What does self-truth mean to you?"
    ],
    isAvailable: true // Made available for better user experience
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
    ],
    isAvailable: false
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
    ],
    isAvailable: false
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
    ],
    isAvailable: false
  },
  {
    id: 7,
    title: "Wisdom Seeker",
    icon: <Book className="w-6 h-6 text-amber-600" />, // Fixed color to ensure proper display
    description: "Gather lessons from your experiences and shape your wisdom",
    theme: "bg-gradient-to-br from-amber-50 to-yellow-50", // Fixed gradient to ensure proper display
    questions: [
      "What is the most valuable lesson you've learned in life?",
      "Who has been a great teacher to you?",
      "How do you apply wisdom in your daily life?"
    ],
    isAvailable: false
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
    ],
    isAvailable: false
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
    ],
    isAvailable: false
  },
  {
    id: 10,
    title: "Creative Problem-Solving",
    icon: <Puzzle className="w-6 h-6 text-indigo-500" />,
    description: "Tap into creativity to solve problems in innovative ways",
    theme: "bg-gradient-to-br from-indigo-50 to-blue-50",
    questions: [
      "How do you approach difficult problems?",
      "What's a creative solution you've come up with?",
      "How can you think outside the box more often?"
    ],
    isAvailable: false
  }
];

// Function to persist data to localStorage
const saveToLocalStorage = (key: string, data: unknown) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

// Function to retrieve data from localStorage
const getFromLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  return null;
};

export default function ReflectionJournal() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [showReport, setShowReport] = useState(false);
  const [showServerError, setShowServerError] = useState(false);
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<TimeoutType>(null);
  const [userProgress, setUserProgress] = useState<Record<number, string[]>>({});
  const [savedExercises, setSavedExercises] = useState<number[]>([]);

  // Load user progress from localStorage on initial render
  useEffect(() => {
    const progress = getFromLocalStorage('reflectionProgress');
    const completed = getFromLocalStorage('completedExercises');
    
    if (progress) setUserProgress(progress);
    if (completed) setSavedExercises(completed);
  }, []);

  // Handle auto-save effect for user answers
  useEffect(() => {
    if (userAnswer && isTyping && selectedExercise) {
      if (typingTimeout) clearTimeout(typingTimeout);
      
      const timeout = setTimeout(() => {
        // Create updated answers array
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = userAnswer;
        
        // Update progress in state and localStorage
        const updatedProgress = {
          ...userProgress,
          [selectedExercise.id]: newAnswers
        };
        
        setUserProgress(updatedProgress);
        saveToLocalStorage('reflectionProgress', updatedProgress);
        
        setShowSaveToast(true);
        setTimeout(() => setShowSaveToast(false), 2000);
        setIsTyping(false);
      }, 1500);
      
      setTypingTimeout(timeout);
    }
    
    return () => {
      if (typingTimeout) clearTimeout(typingTimeout);
    };
  }, [userAnswer, isTyping, selectedExercise, currentQuestionIndex, answers, userProgress]);

  const handleExerciseSelect = (exercise: Exercise) => {
    if (exercise.isAvailable) {
      setSelectedExercise(exercise);
      setCurrentQuestionIndex(0);
      
      // Check if we have saved progress for this exercise
      const savedAnswers = userProgress[exercise.id] || Array(exercise.questions.length).fill("");
      setAnswers(savedAnswers);
      setUserAnswer(savedAnswers[0] || "");
      setShowReport(false);
    } else {
      setShowServerError(true);
      setTimeout(() => {
        setShowServerError(false);
      }, 5000);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserAnswer(e.target.value);
    setIsTyping(true);
    
    // Update the answers array in real-time
    if (selectedExercise) {
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = e.target.value;
      setAnswers(newAnswers);
    }
  };

  const handleNext = () => {
    if (selectedExercise && currentQuestionIndex < selectedExercise.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer(answers[currentQuestionIndex + 1] || "");
    } else {
      completeExercise();
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setUserAnswer(answers[currentQuestionIndex - 1] || "");
    }
  };

  const completeExercise = () => {
    if (selectedExercise) {
      // Add to completed exercises if not already there
      if (!savedExercises.includes(selectedExercise.id)) {
        const updated = [...savedExercises, selectedExercise.id];
        setSavedExercises(updated);
        saveToLocalStorage('completedExercises', updated);
      }
      setShowReport(true);
    }
  };

  const restartExercise = () => {
    setSelectedExercise(null);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setUserAnswer("");
    setShowReport(false);
  };

  const getCompletionStatus = () => {
    if (!selectedExercise) return 0;
    return (answers.filter(a => a.trim().length > 0).length / selectedExercise.questions.length) * 100;
  };

  const hasStartedExercise = (exerciseId: number) => {
    return !!userProgress[exerciseId]?.some(answer => answer.trim().length > 0);
  };

  const hasCompletedExercise = (exerciseId: number) => {
    return savedExercises.includes(exerciseId);
  };

  const manualSave = () => {
    if (selectedExercise) {
      // Create updated answers array
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = userAnswer;
      
      // Update progress in state and localStorage
      const updatedProgress = {
        ...userProgress,
        [selectedExercise.id]: newAnswers
      };
      
      setUserProgress(updatedProgress);
      saveToLocalStorage('reflectionProgress', updatedProgress);
      
      setShowSaveToast(true);
      setTimeout(() => setShowSaveToast(false), 2000);
    }
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

        {showServerError && (
          <Alert className="mb-6 border-red-200 bg-red-50 text-red-800 animate-pop-in max-w-2xl mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Server Error</AlertTitle>
            <AlertDescription>
              Sorry, this exercise is currently unavailable due to server maintenance. Please try again later or choose another exercise.
            </AlertDescription>
          </Alert>
        )}

        {showSaveToast && (
          <div className="fixed top-4 right-4 bg-green-50 border border-green-200 text-green-800 rounded-md p-3 shadow-md flex items-center space-x-2 animate-fade-in z-50">
            <CheckCircle className="h-4 w-4" />
            <div>
              <p className="text-sm font-medium">Progress saved</p>
              <p className="text-xs opacity-90">Your reflection has been saved</p>
            </div>
          </div>
        )}

        {!selectedExercise ? (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">Available Exercises</h2>
              <p className="text-slate-600 mb-6">Choose an exercise to begin your reflection journey</p>
              
              {savedExercises.length > 0 && (
                <div className="mb-4 p-4 bg-purple-50 rounded-lg">
                  <h3 className="text-purple-800 font-semibold mb-2">Your Progress</h3>
                  <p className="text-slate-600 text-sm">
                    You&apos;ve completed {savedExercises.length} out of {exerciseData.filter(e => e.isAvailable).length} available exercises.
                  </p>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exerciseData.map((exercise) => (
                <Card 
                  key={exercise.id}
                  onClick={() => handleExerciseSelect(exercise)}
                  className={`${exercise.theme} cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg duration-300 group border-0 ${!exercise.isAvailable ? 'opacity-75' : ''}`}
                >
                  <CardHeader className="flex flex-row items-center space-y-0 space-x-4">
                    <div className="p-3 rounded-lg bg-white/50 group-hover:bg-white/80 transition-colors">
                      {exercise.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold text-slate-800 flex items-center">
                        {exercise.title}
                        {!exercise.isAvailable && (
                          <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                            Coming Soon
                          </span>
                        )}
                        {hasCompletedExercise(exercise.id) && (
                          <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Completed
                          </span>
                        )}
                        {!hasCompletedExercise(exercise.id) && hasStartedExercise(exercise.id) && (
                          <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            In Progress
                          </span>
                        )}
                      </CardTitle>
                      <p className="text-xs text-slate-500 mt-1">
                        {exercise.questions.length} reflection questions
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {exercise.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : showReport ? (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg animate-pop-in">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                {selectedExercise.icon}
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                {selectedExercise.title} Report
              </h2>
              <p className="text-slate-500">Your reflection journey</p>
              <div className="mt-4 bg-purple-50 text-purple-800 p-3 rounded-lg text-sm">
                <p className="font-medium">Reflection complete!</p>
                <p>You've answered {answers.filter(a => a.trim().length > 0).length} of {selectedExercise.questions.length} questions</p>
              </div>
            </div>
            <ul className="space-y-6 mt-8">
              {selectedExercise.questions.map((question, index) => (
                <li key={index} className="border-l-4 border-purple-600 pl-4 py-2">
                  <h3 className="font-medium text-slate-700 mb-2">{question}</h3>
                  <div className="text-slate-600 bg-slate-50 rounded-lg p-4 text-sm">
                    {answers[index] ? (
                      <p className="whitespace-pre-wrap">{answers[index]}</p>
                    ) : (
                      <p className="italic text-slate-400">No answer provided</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 space-y-4">
              <div className="flex gap-4">
                <Button 
                  onClick={() => {
                    setShowReport(false);
                    setCurrentQuestionIndex(0);
                    setUserAnswer(answers[0] || "");
                  }}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Edit Responses
                </Button>
                <Button 
                  onClick={restartExercise}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  Return to Exercises
                </Button>
              </div>
              <p className="text-center text-sm text-slate-500">
                Your progress has been saved and you can return to this reflection anytime
              </p>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg animate-pop-in">
            <div className="flex items-center mb-6">
              <Button 
                onClick={restartExercise}
                variant="ghost" 
                className="text-slate-600 hover:text-slate-800 -ml-2"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to exercises
              </Button>
            </div>
            
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
              <div className="flex justify-between text-sm text-slate-500 mt-2">
                <span>Question {currentQuestionIndex + 1} of {selectedExercise.questions.length}</span>
                <span>{Math.round(getCompletionStatus())}% complete</span>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-lg text-purple-900 font-medium">
                  {selectedExercise.questions[currentQuestionIndex]}
                </p>
              </div>
              <Textarea
                value={userAnswer}
                onChange={handleTextareaChange}
                placeholder="Write your thoughts here..."
                className="min-h-[180px] text-lg focus-visible:ring-purple-500 border-slate-200"
              />
              <div className="flex justify-between items-center">
                <Button 
                  onClick={manualSave}
                  variant="outline" 
                  className="text-purple-600 border-purple-200 hover:bg-purple-50"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                
                <div className="text-xs text-slate-500">
                  {isTyping ? "Typing..." : "Auto-save enabled"}
                </div>
              </div>
              <div className="flex space-x-4">
                {currentQuestionIndex > 0 && (
                  <Button 
                    onClick={handleBack}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800"
                  >
                    Back
                  </Button>
                )}
                <Button 
                  onClick={handleNext}
                  className={`flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-opacity ${currentQuestionIndex === 0 && !userAnswer.trim() ? 'w-full' : ''}`}
                  disabled={currentQuestionIndex > 0 && !userAnswer.trim()}
                >
                  {currentQuestionIndex < selectedExercise.questions.length - 1 ? 
                    "Continue" : "Complete Reflection"}
                </Button>
              </div>
              <div className="text-center">
                {currentQuestionIndex < selectedExercise.questions.length - 1 ? (
                  <button 
                    onClick={() => setShowReport(true)}
                    className="text-sm text-purple-600 hover:text-purple-800 transition-colors"
                  >
                    Skip to summary
                  </button>
                ) : (
                  <p className="text-sm text-slate-500">
                    This is the final question of this reflection
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}