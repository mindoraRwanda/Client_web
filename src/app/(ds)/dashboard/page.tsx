'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, Heart, Waves, PlayCircle, ThermometerSun, AlertCircle, Activity, ArrowRight, PlusCircle, ChevronRight, X } from "lucide-react";
import { XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Area, AreaChart } from "recharts";
import { motion, AnimatePresence } from "framer-motion";

// Animated components
const AnimatedCard = motion(Card);
const AnimatedButton = motion(Button);

// Enhanced mock data with more data points
const mockStressData = [
  { day: "Mon", level: 65, average: 50 },
  { day: "Tue", level: 58, average: 52 },
  { day: "Wed", level: 72, average: 51 },
  { day: "Thu", level: 45, average: 49 },
  { day: "Fri", level: 50, average: 48 },
  { day: "Sat", level: 40, average: 45 },
  { day: "Sun", level: 35, average: 44 },
];

const quickExercises = [
  {
    title: "Deep Breathing",
    duration: "2 min",
    icon: Waves,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
    gradient: "from-blue-50 to-blue-100"
  },
  {
    title: "Focus Meditation",
    duration: "5 min",
    icon: Brain,
    color: "text-purple-500", 
    bgColor: "bg-purple-100",
    gradient: "from-purple-50 to-purple-100"
  },
  {
    title: "Shoulder Relief",
    duration: "3 min",
    icon: Heart,
    color: "text-rose-500",
    bgColor: "bg-rose-100",
    gradient: "from-rose-50 to-rose-100"
  },
];

// Mood Temperature Assessment Questions
const questions = [
  {
    text: "How would you rate your stress level right now?",
    options: [
      { text: "Completely relaxed", score: 1 },
      { text: "Mildly stressed", score: 2 },
      { text: "Moderately stressed", score: 3 },
      { text: "Highly stressed", score: 4 },
      { text: "Extremely overwhelmed", score: 5 },
    ]
  },
  {
    text: "How focused do you feel on your work today?",
    options: [
      { text: "Extremely focused", score: 1 },
      { text: "Mostly focused", score: 2 },
      { text: "Somewhat distracted", score: 3 },
      { text: "Very distracted", score: 4 },
      { text: "Unable to concentrate", score: 5 },
    ]
  },
  {
    text: "How energetic do you feel right now?",
    options: [
      { text: "Very energetic", score: 1 },
      { text: "Fairly energetic", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Somewhat tired", score: 4 },
      { text: "Completely exhausted", score: 5 },
    ]
  },
  {
    text: "How satisfied are you with your work-life balance today?",
    options: [
      { text: "Very satisfied", score: 1 },
      { text: "Somewhat satisfied", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Somewhat dissatisfied", score: 4 },
      { text: "Very dissatisfied", score: 5 },
    ]
  }
];

// Daily wellbeing tips
const wellbeingTips = [
  "Take a 5-minute break every hour to rest your eyes and stretch",
  "Stay hydrated throughout your workday for better focus",
  "Practice the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds",
  "Schedule time for deep work with no distractions",
  "Set clear boundaries between work time and personal time"
];

export default function DashboardPage() {
  const [showAssessment, setShowAssessment] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [temperature, setTemperature] = useState(2.8);
  const [showTip, setShowTip] = useState(true);
  const [dailyTip] = useState(wellbeingTips[Math.floor(Math.random() * wellbeingTips.length)]);

  const getTemperatureText = (temp: number) => {
    if (!temp) return "Not measured";
    if (temp <= 2) return "Doing Great";
    if (temp <= 3) return "Balanced";
    if (temp <= 4) return "Slightly Stressed";
    return "Needs Attention";
  };

  const handleStartAssessment = () => {
    setShowAssessment(true);
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate temperature - average of all answers
      const avgScore = newAnswers.reduce((sum, score) => sum + score, 0) / newAnswers.length;
      setTemperature(avgScore);
      setShowAssessment(false);
    }
  };

  const getTemperatureColor = (temp: number) => {
    if (!temp) return "bg-gradient-to-br from-gray-200 to-gray-300";
    if (temp <= 2) return "bg-gradient-to-br from-green-400 to-emerald-300";
    if (temp <= 3) return "bg-gradient-to-br from-yellow-400 to-amber-300";
    return "bg-gradient-to-br from-red-400 to-rose-300";
  };

  return (
    <div className="space-y-8 p-6 pt-8 bg-gradient-to-b from-purple-50 via-purple-50/50 to-white min-h-screen dark:from-slate-900 dark:via-slate-900/70 dark:to-slate-800">
      <AnimatePresence mode="wait">
        {/* Welcome Section with enhanced styling */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Welcome back, John
            </h1>
            <p className="text-muted-foreground mt-2">
              Track your wellness and maintain a healthy work balance
            </p>
          </div>
          <AnimatedButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white shadow-md rounded-full px-6 py-2 font-medium"
            onClick={handleStartAssessment}
          >
            <span>Start Mood Check</span>
            <PlusCircle className="ml-2 h-4 w-4" />
          </AnimatedButton>
        </motion.div>

        {showAssessment ? (
          <motion.div
            key="assessment"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatedCard className="max-w-2xl mx-auto bg-white dark:bg-slate-800 shadow-xl rounded-2xl border-0">
              <CardHeader className="pb-4 border-b border-slate-100 dark:border-slate-700">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl font-bold text-slate-800 dark:text-slate-100">Mood Temperature Check</CardTitle>
                    <CardDescription className="text-slate-500 dark:text-slate-400">Question {currentQuestion + 1} of {questions.length}</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setShowAssessment(false)} className="rounded-full">
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-lg font-medium text-slate-700 dark:text-slate-200"
                  >
                    {questions[currentQuestion].text}
                  </motion.div>
                </AnimatePresence>
                <div className="grid gap-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <AnimatedButton
                      key={option.text}
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(147, 51, 234, 0.05)" }}
                      whileTap={{ scale: 0.98 }}
                      variant="outline"
                      className="w-full justify-start text-left h-auto p-4 rounded-xl border-slate-200 dark:border-slate-700 hover:bg-purple-50 dark:hover:bg-slate-700 group transition-all"
                      onClick={() => handleAnswer(option.score)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-slate-600 flex items-center justify-center text-sm font-medium text-purple-600 dark:text-purple-300">
                          {index + 1}
                        </div>
                        <span className="group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                          {option.text}
                        </span>
                      </div>
                      <ChevronRight className="ml-auto h-5 w-5 text-slate-400 group-hover:text-purple-500 dark:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </AnimatedButton>
                  ))}
                </div>
                <div className="space-y-2 pt-4">
                  <Progress 
                    value={(currentQuestion / questions.length) * 100} 
                    className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  />
                  <div className="text-sm text-muted-foreground flex justify-between">
                    <span>Progress: {Math.round((currentQuestion / questions.length) * 100)}%</span>
                    <span>{currentQuestion + 1} of {questions.length}</span>
                  </div>
                </div>
              </CardContent>
            </AnimatedCard>
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Temperature and Stats Overview */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <AnimatedCard 
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.2 }}
                className="col-span-2 bg-white dark:bg-slate-800 shadow-lg rounded-xl border-0"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base font-medium text-slate-700 dark:text-slate-300">
                    Mood Temperature
                  </CardTitle>
                  <div className="p-2 rounded-full bg-purple-100 dark:bg-slate-700">
                    <ThermometerSun className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6 pt-2">
                    <motion.div 
                      className={`w-20 h-20 rounded-full ${getTemperatureColor(temperature)} flex items-center justify-center shadow-lg`}
                      animate={{ scale: temperature ? [1, 1.1, 1] : 1 }}
                      transition={{ duration: 0.5, repeat: 0 }}
                    >
                      <span className="text-white text-2xl font-bold">
                        {temperature ? temperature.toFixed(1) : '-'}
                      </span>
                    </motion.div>
                    <div>
                      <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">{getTemperatureText(temperature)}</div>
                      <p className="text-sm text-muted-foreground">Last measured: 10 minutes ago</p>
                      
                      <div className="mt-3">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 px-0 -ml-2 flex items-center gap-1"
                          onClick={handleStartAssessment}
                        >
                          <span>Check again</span>
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard 
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-slate-800 shadow-lg rounded-xl border-0"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base font-medium text-slate-700 dark:text-slate-300">
                    Focus Score
                  </CardTitle>
                  <div className="p-2 rounded-full bg-blue-100 dark:bg-slate-700">
                    <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center pt-2">
                    <div className="relative w-24 h-24">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle 
                          className="text-slate-100 dark:text-slate-700" 
                          strokeWidth="8"
                          stroke="currentColor"
                          fill="transparent"
                          r="40"
                          cx="50"
                          cy="50"
                        />
                        <circle 
                          className="text-blue-500 dark:text-blue-400" 
                          strokeWidth="8"
                          stroke="currentColor"
                          fill="transparent"
                          r="40"
                          cx="50"
                          cy="50"
                          strokeDasharray={`${2 * Math.PI * 40 * 0.82} ${2 * Math.PI * 40 * (1 - 0.82)}`}
                          strokeDashoffset={2 * Math.PI * 40 * 0.25}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">82%</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">Above average</p>
                  </div>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard 
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-slate-800 shadow-lg rounded-xl border-0"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base font-medium text-slate-700 dark:text-slate-300">
                    Energy Level
                  </CardTitle>
                  <div className="p-2 rounded-full bg-amber-100 dark:bg-slate-700">
                    <Activity className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center pt-2">
                    <div className="mb-4">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div key={level} className={`w-6 h-12 mx-1 rounded-md ${level <= 3 ? "bg-amber-500" : "bg-slate-200 dark:bg-slate-700"}`} />
                        ))}
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">Moderate</div>
                    <p className="text-sm text-muted-foreground">Consider a short break</p>
                  </div>
                </CardContent>
              </AnimatedCard>
            </div>

            {/* Charts and Quick Actions */}
            <div className="grid gap-6 md:grid-cols-7">
              <AnimatedCard 
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.2 }}
                className="md:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-xl border-0"
              >
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-100">Stress Level Trends</CardTitle>
                      <CardDescription className="text-slate-500 dark:text-slate-400">Your stress levels compared to average</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="text-sm">
                      View Report
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mockStressData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#9333ea" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#9333ea" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid stroke="#f0f0f0" strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="day" stroke="#6b7280" axisLine={false} tickLine={false} />
                        <YAxis stroke="#6b7280" axisLine={false} tickLine={false} />
                        <Tooltip 
                          contentStyle={{ 
                            background: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                          }}
                          labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
                        />
                        <Area
                          type="monotone"
                          dataKey="average"
                          stroke="#4f46e5"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorAvg)"
                          name="Team Average"
                        />
                        <Area
                          type="monotone"
                          dataKey="level"
                          stroke="#9333ea"
                          strokeWidth={3}
                          fillOpacity={1}
                          fill="url(#colorLevel)"
                          name="Your Stress Level"
                          dot={{ fill: '#9333ea', strokeWidth: 2, r: 4 }}
                          activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard 
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.2 }}
                className="md:col-span-3 bg-white dark:bg-slate-800 shadow-lg rounded-xl border-0"
              >
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-100">Recommended Exercises</CardTitle>
                  <CardDescription className="text-slate-500 dark:text-slate-400">Based on your mood temperature</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {quickExercises.map((exercise, index) => {
                      const Icon = exercise.icon;
                      return (
                        <motion.div
                          key={exercise.title}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <motion.div
                            whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)" }}
                            className={`p-4 rounded-xl cursor-pointer bg-gradient-to-br ${exercise.gradient} dark:bg-slate-700 border border-slate-100 dark:border-slate-600`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-lg ${exercise.bgColor} dark:bg-opacity-20`}>
                                  <Icon className={`h-6 w-6 ${exercise.color}`} />
                                </div>
                                <div>
                                  <p className="font-medium text-slate-800 dark:text-slate-100">{exercise.title}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {exercise.duration}
                                  </p>
                                </div>
                              </div>
                              <Button variant="ghost" size="icon" className="text-purple-600 dark:text-purple-400 rounded-full hover:bg-purple-50 dark:hover:bg-slate-600">
                                <PlayCircle className="h-6 w-6" />
                              </Button>
                            </div>
                          </motion.div>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </AnimatedCard>
            </div>

            {/* Wellness Tip Card */}
            <AnimatePresence>
              {showTip && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <AnimatedCard className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 border-0 shadow-md rounded-xl">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          <div className="mt-1 p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/50">
                            <AlertCircle className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-1">Daily Wellness Tip</h3>
                            <p className="text-slate-600 dark:text-slate-300">{dailyTip}</p>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="mt-1 rounded-full hover:bg-white/50 dark:hover:bg-slate-800/50"
                          onClick={() => setShowTip(false)}
                        >
                          <X className="h-5 w-5 text-slate-500" />
                        </Button>
                      </div>
                    </CardContent>
                  </AnimatedCard>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}