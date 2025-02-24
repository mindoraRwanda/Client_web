"use client"
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  Heart,
  Timer,
  Waves,
  ArrowUp,
  PlayCircle,
  ThermometerSun,
  AlertCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// Mock data from previous implementation
const mockStressData = [
  { day: "Mon", level: 65 },
  { day: "Tue", level: 58 },
  { day: "Wed", level: 72 },
  { day: "Thu", level: 45 },
  { day: "Fri", level: 50 },
  { day: "Sat", level: 40 },
  { day: "Sun", level: 35 },
];

const quickExercises = [
  {
    title: "Breathing Exercise",
    duration: "2 min",
    icon: Waves,
    color: "text-blue-500",
  },
  {
    title: "Quick Meditation",
    duration: "5 min",
    icon: Brain,
    color: "text-purple-500",
  },
  {
    title: "Desk Stretch",
    duration: "3 min",
    icon: Heart,
    color: "text-rose-500",
  },
];

// Mood Temperature Assessment Questions
const questions = [
  {
    id: 1,
    text: "How would you rate your current stress level?",
    options: [
      { text: "I feel calm and relaxed", score: 1 },
      { text: "Slightly stressed", score: 2 },
      { text: "Moderately stressed", score: 3 },
      { text: "Very stressed", score: 4 },
      { text: "Extremely stressed", score: 5 }
    ]
  },
  {
    id: 2,
    text: "How well did you sleep last night?",
    options: [
      { text: "Very well", score: 1 },
      { text: "Fairly well", score: 2 },
      { text: "Average", score: 3 },
      { text: "Poorly", score: 4 },
      { text: "Very poorly", score: 5 }
    ]
  },
  {
    id: 3,
    text: "How easy is it to concentrate today?",
    options: [
      { text: "Very easy", score: 1 },
      { text: "Somewhat easy", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Somewhat difficult", score: 4 },
      { text: "Very difficult", score: 5 }
    ]
  },
  {
    id: 4,
    text: "How would you describe your energy level?",
    options: [
      { text: "Very energetic", score: 1 },
      { text: "Somewhat energetic", score: 2 },
      { text: "Neutral", score: 3 },
      { text: "Somewhat tired", score: 4 },
      { text: "Very tired", score: 5 }
    ]
  }
];

export default function DashboardPage() {
  const [showAssessment, setShowAssessment] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [temperature, setTemperature] = useState<number | null>(null);

  const handleStartAssessment = () => {
    setShowAssessment(true);
    setCurrentQuestion(0);
    setScores([]);
    setTemperature(null);
  };

  const handleAnswer = (score: number) => {
    const newScores = [...scores, score];
    setScores(newScores);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const avgScore = newScores.reduce((a, b) => a + b, 0) / newScores.length;
      setTemperature(avgScore);
      setShowAssessment(false);
    }
  };

  const getTemperatureColor = (temp: number | null) => {
    if (!temp) return "bg-gray-200";
    if (temp <= 2) return "bg-green-500";
    if (temp <= 3.5) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getTemperatureText = (temp: number | null) => {
    if (!temp) return "Not measured yet";
    if (temp <= 2) return "Green - Managing Well";
    if (temp <= 3.5) return "Yellow - Moderate Stress";
    return "Red - High Stress";
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome back, John
          </h1>
          <p className="text-muted-foreground">
            Track your stress levels and maintain workplace wellness
          </p>
        </div>
        <Button 
          className="bg-purple-600 hover:bg-purple-700"
          onClick={handleStartAssessment}
        >
          Start Mood Check
        </Button>
      </div>

      {showAssessment ? (
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Mood Temperature Check</CardTitle>
            <CardDescription>Question {currentQuestion + 1} of {questions.length}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-lg font-medium">
              {questions[currentQuestion].text}
            </h3>
            <div className="grid gap-2">
              {questions[currentQuestion].options.map((option) => (
                <Button
                  key={option.text}
                  variant="outline"
                  className="w-full justify-start text-left h-auto p-4"
                  onClick={() => handleAnswer(option.score)}
                >
                  {option.text}
                </Button>
              ))}
            </div>
            <Progress value={(currentQuestion / questions.length) * 100} />
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Temperature and Stats Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="col-span-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Mood Temperature
                </CardTitle>
                <ThermometerSun className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-full ${getTemperatureColor(temperature)} flex items-center justify-center`}>
                    <span className="text-white text-lg font-bold">
                      {temperature ? temperature.toFixed(1) : '-'}
                    </span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{getTemperatureText(temperature)}</div>
                    <p className="text-sm text-muted-foreground">Last measured: Just now</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Weekly Sessions</CardTitle>
                <Brain className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-sm text-green-600 flex items-center">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    8%
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
                <Timer className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45 mins</div>
                <p className="text-xs text-muted-foreground">this week</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Quick Actions */}
          <div className="grid gap-4 md:grid-cols-7">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Stress Level Trends</CardTitle>
                <CardDescription>Your stress levels over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockStressData}>
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="level"
                        stroke="#9333ea"
                        strokeWidth={2}
                        dot={{ fill: "#9333ea" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Recommended Exercises</CardTitle>
                <CardDescription>Based on your mood temperature</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quickExercises.map((exercise) => {
                    const Icon = exercise.icon;
                    return (
                      <div
                        key={exercise.title}
                        className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <Icon className={`h-5 w-5 ${exercise.color}`} />
                          <div>
                            <p className="font-medium">{exercise.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {exercise.duration}
                            </p>
                          </div>
                        </div>
                        <PlayCircle className="h-5 w-5 text-purple-600" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Daily Tip */}
          {temperature !== null && temperature > 3.5 && (
            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-red-700 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Stress Alert
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-600">
                  Your stress levels are high. Consider taking a break, doing a breathing exercise, 
                  or reaching out to someone you trust. Remember, it&apos;s okay to take time for yourself.
                </p>
              </CardContent>
            </Card>
          )}

          <Card className="bg-purple-50 dark:bg-purple-950/20 border-purple-100 dark:border-purple-900">
            <CardHeader>
              <CardTitle className="text-purple-700 dark:text-purple-300">
                Today&apos;s Wellness Tip
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-600 dark:text-purple-400">
                Try the &quot;5-4-3-2-1&quot; grounding technique: Name 5 things you can see,
                4 things you can touch, 3 things you can hear, 2 things you can
                smell, and 1 thing you can taste.
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}