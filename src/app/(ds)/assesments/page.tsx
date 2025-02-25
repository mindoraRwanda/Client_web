'use client'
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Brain, ArrowRight, ArrowLeft, Battery, BatteryCharging, Zap, HeartPulse, Brain as BrainIcon, Heart, Activity } from "lucide-react";
import { useRouter } from 'next/navigation';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";

const BurnoutAssessmentPage = () => {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  interface Results {
    categories: { [key: string]: { score: number, level: string } };
    overall: { score: number, level: string };
  }
  
  const [results, setResults] = useState<Results | null>(null);

  const sections = [
    {
      title: "Exhaustion",
      icon: <Battery className="w-6 h-6 text-orange-500" />,
      color: "from-orange-500 to-red-500",
      questions: [
        { id: "q1", text: "At work, I feel mentally exhausted" },
        { id: "q2", text: "Everything I do at work requires a great deal of effort" },
        { id: "q3", text: "After a day at work, I find it hard to recover my energy" },
        { id: "q4", text: "At work, I feel physically exhausted" },
        { id: "q5", text: "When I get up in the morning, I lack the energy to start a new day at work" },
        { id: "q6", text: "I want to be active at work, but somehow, I am unable to manage" },
        { id: "q7", text: "When I exert myself at work, I quickly get tired" },
        { id: "q8", text: "At the end of my working day, I feel mentally exhausted and drained" }
      ]
    },
    {
      title: "Mental Distance",
      icon: <BrainIcon className="w-6 h-6 text-blue-500" />,
      color: "from-blue-500 to-indigo-500",
      questions: [
        { id: "q9", text: "I struggle to find any enthusiasm for my work" },
        { id: "q10", text: "At work, I do not think much about what I am doing and I function on autopilot" },
        { id: "q11", text: "I feel a strong aversion towards my job" },
        { id: "q12", text: "I feel indifferent about my job" },
        { id: "q13", text: "I'm cynical about what my work means to others" }
      ]
    },
    {
      title: "Cognitive Impairment",
      icon: <Zap className="w-6 h-6 text-purple-500" />,
      color: "from-purple-500 to-violet-500",
      questions: [
        { id: "q14", text: "At work, I have trouble staying focused" },
        { id: "q15", text: "At work I struggle to think clearly" },
        { id: "q16", text: "I'm forgetful and distracted at work" },
        { id: "q17", text: "When I'm working, I have trouble concentrating" },
        { id: "q18", text: "I make mistakes in my work because I have my mind on other things" }
      ]
    },
    {
      title: "Emotional Impairment",
      icon: <Heart className="w-6 h-6 text-pink-500" />,
      color: "from-pink-500 to-rose-500",
      questions: [
        { id: "q19", text: "At work, I feel unable to control my emotions" },
        { id: "q20", text: "I do not recognize myself in the way I react emotionally at work" },
        { id: "q21", text: "During my work I become irritable when things don't go my way" },
        { id: "q22", text: "I get upset or sad at work without knowing why" },
        { id: "q23", text: "At work I may overreact unintentionally" }
      ]
    },
    {
      title: "Psychological Complaints",
      icon: <Activity className="w-6 h-6 text-teal-500" />,
      color: "from-teal-500 to-emerald-500",
      questions: [
        { id: "q24", text: "I have trouble falling or staying asleep" },
        { id: "q25", text: "I tend to worry" },
        { id: "q26", text: "I feel tense and stressed" },
        { id: "q27", text: "I feel anxious and/or suffer from panic attacks" },
        { id: "q28", text: "Noise and crowds disturb me" }
      ]
    },
    {
      title: "Psychosomatic Complaints",
      icon: <HeartPulse className="w-6 h-6 text-red-500" />,
      color: "from-red-500 to-orange-500",
      questions: [
        { id: "q29", text: "I suffer from palpitations or chest pain" },
        { id: "q30", text: "I suffer from stomach and/or intestinal complaints" },
        { id: "q31", text: "I suffer from headaches" },
        { id: "q32", text: "I suffer from muscle pain, for example in the neck, shoulder or back" },
        { id: "q33", text: "I often get sick" }
      ]
    }
  ];

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers({
      ...answers,
      [questionId]: parseInt(value)
    });
  };

  const calculateResults = () => {
    const categories = {
      "Exhaustion": ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"],
      "Mental Distance": ["q9", "q10", "q11", "q12", "q13"],
      "Cognitive Impairment": ["q14", "q15", "q16", "q17", "q18"],
      "Emotional Impairment": ["q19", "q20", "q21", "q22", "q23"],
      "Psychological Complaints": ["q24", "q25", "q26", "q27", "q28"],
      "Psychosomatic Complaints": ["q29", "q30", "q31", "q32", "q33"]
    };

    const results: { [key: string]: { score: number, level: string } } = {};
    let totalScore = 0;
    let totalQuestions = 0;

    Object.entries(categories).forEach(([category, questionIds]) => {
      let categoryScore = 0;
      let answeredQuestions = 0;

      questionIds.forEach(id => {
        if (answers[id] !== undefined) {
          categoryScore += answers[id];
          answeredQuestions++;
        }
      });

      const categoryAverage = answeredQuestions > 0 
        ? (categoryScore / answeredQuestions) 
        : 0;
      
      results[category] = {
        score: categoryAverage,
        level: getCategoryLevel(categoryAverage)
      };

      totalScore += categoryScore;
      totalQuestions += answeredQuestions;
    });

    const overallScore = totalQuestions > 0 ? (totalScore / totalQuestions) : 0;
    
    setResults({
      categories: results,
      overall: {
        score: overallScore,
        level: getOverallLevel(overallScore)
      }
    });
  };

  const getCategoryLevel = (score: number) => {
    if (score <= 1) return "Low";
    if (score <= 2) return "Moderate";
    if (score <= 3) return "High";
    return "Very High";
  };

  const getOverallLevel = (score: number) => {
    if (score <= 1) return "No Burnout";
    if (score <= 2) return "Mild Burnout";
    if (score <= 3) return "Moderate Burnout";
    return "Severe Burnout";
  };

  const getLevelColor = (level: string) => {
    switch(level) {
      case "Low":
      case "No Burnout":
        return "text-green-500";
      case "Moderate":
      case "Mild Burnout":
        return "text-yellow-500";
      case "High":
      case "Moderate Burnout":
        return "text-orange-500";
      case "Very High":
      case "Severe Burnout":
        return "text-red-500";
      default:
        return "text-slate-500";
    }
  };

  const getProgressColor = (score: number) => {
    if (score <= 1) return "bg-green-500";
    if (score <= 2) return "bg-yellow-500";
    if (score <= 3) return "bg-orange-500";
    return "bg-red-500";
  };

  const handleNext = () => {
    if (currentSection < sections.length) {
      setCurrentSection(currentSection + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setResults(null);
    setCurrentSection(0);
  };

  const totalQuestions = sections.reduce((sum, section) => sum + section.questions.length, 0);
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col">
      <nav className="border-b bg-white/80 backdrop-blur-lg dark:bg-slate-900/80">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Mindora
            </span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400 ml-2 px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800">
              Burnout Assessment
            </span>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl bg-white/90 backdrop-blur-sm dark:bg-slate-900/90 border-purple-100 dark:border-purple-900 hover:shadow-xl transition-shadow duration-300">
          {results ? (
            <>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  Your Burnout Assessment Results
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Overall Burnout Level: 
                  <span className={`font-bold ml-2 ${getLevelColor(results.overall.level)}`}>
                    {results.overall.level} ({results.overall.score.toFixed(1)})
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(results.categories).map(([category, data]) => (
                    <div key={category} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-slate-700 dark:text-slate-300">{category}</h3>
                        <span className={`font-bold ${getLevelColor(data.level)}`}>
                          {data.level}
                        </span>
                      </div>
                      <Progress 
                        value={data.score * 25} 
                        className="h-2"
                        indicatorClassName={getProgressColor(data.score)}
                      />
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Score: {data.score.toFixed(1)} / 4
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-purple-50 dark:bg-slate-800 rounded-lg p-4 mt-6">
                  <h3 className="font-medium text-purple-700 dark:text-purple-300 mb-2">What to do next</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    This assessment provides insights into your current burnout levels. Mindora offers personalized 
                    tools and exercises to help address these specific areas. Continue your journey 
                    to better mental wellbeing with our guided programs.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handleRestart}
                  className="border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-900 dark:text-purple-300 dark:hover:bg-purple-900/30"
                >
                  Take Assessment Again
                </Button>
                <Button
                  onClick={() => router.push('/dashboard')}
                  className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white shadow-lg"
                >
                  View Recommended Programs <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </>
          ) : (
            <>
              <CardHeader className="space-y-1">
                <div className="flex items-center">
                  <div className={`p-2 rounded-full mr-3 bg-gradient-to-tr ${sections[currentSection]?.color || "from-purple-600 to-pink-500"}`}>
                    {sections[currentSection]?.icon || <BatteryCharging className="w-6 h-6 text-white" />}
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                      {currentSection < sections.length ? sections[currentSection].title : "Almost Done!"}
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400">
                      {currentSection < sections.length 
                        ? `Section ${currentSection + 1} of ${sections.length}` 
                        : "Review your answers before submitting"}
                    </CardDescription>
                  </div>
                </div>
                <div className="mt-2">
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-right mt-1 text-slate-500">
                    {answeredQuestions} of {totalQuestions} questions answered
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                {currentSection < sections.length ? (
                  <div className="space-y-6">
                    {sections[currentSection].questions.map((question) => (
                      <div key={question.id} className="space-y-2">
                        <Label className="text-slate-700 dark:text-slate-200">{question.text}</Label>
                        <RadioGroup
                          value={answers[question.id]?.toString() || ""}
                          onValueChange={(value) => handleAnswerChange(question.id, value)}
                          className="flex space-x-1 pt-2"
                        >
                          {[0, 1, 2, 3, 4].map((value) => (
                            <div key={value} className="flex flex-col items-center">
                              <RadioGroupItem
                                value={value.toString()}
                                id={`${question.id}-${value}`}
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor={`${question.id}-${value}`}
                                className="px-3 py-2 rounded-full cursor-pointer peer-data-[state=checked]:bg-gradient-to-r peer-data-[state=checked]:from-purple-600 peer-data-[state=checked]:to-pink-500 peer-data-[state=checked]:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                              >
                                {value}
                              </Label>
                              {value === 0 && <span className="text-xs mt-1 text-slate-500">Never</span>}
                              {value === 4 && <span className="text-xs mt-1 text-slate-500">Always</span>}
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="p-4 bg-purple-50 dark:bg-slate-800 rounded-lg">
                      <p className="text-slate-700 dark:text-slate-300">
                        You&apos;ve completed all questions. Click &quot;Submit&quot; to view your personalized burnout assessment.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {sections.map((section, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentSection(index)}
                          className="text-left justify-start"
                        >
                          <div className="mr-2">{section.icon}</div>
                          <span className="truncate">{section.title}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentSection === 0}
                  className="border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-900 dark:text-purple-300 dark:hover:bg-purple-900/30"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                {currentSection < sections.length ? (
                  <Button
                    onClick={handleNext}
                    className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white shadow-lg"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={calculateResults}
                    className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white shadow-lg"
                  >
                    Submit Assessment <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default BurnoutAssessmentPage;