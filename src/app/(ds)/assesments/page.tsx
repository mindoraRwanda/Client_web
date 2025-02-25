'use client'
import React, { JSX, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Brain, Battery, HeartPulse, Zap, Activity, ArrowLeft, ArrowRight, Info, PlusCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

// Assessment data structure
interface AssessmentSection {
  id: string;
  title: string;
  icon: JSX.Element;
  color: string;
  description: string;
  questions: {
    id: string;
    text: string;
  }[];
  interpretation: {
    low: string;
    moderate: string;
    high: string;
    severe: string;
  };
}

const assessments: AssessmentSection[] = [
  {
    id: 'exhaustion',
    title: 'Exhaustion',
    icon: <Battery className="w-8 h-8" />,
    color: "from-amber-400 to-orange-500",
    description: 'Measures physical and mental exhaustion related to work',
    questions: [
      { id: 'q1', text: 'At work, I feel mentally exhausted' },
      { id: 'q2', text: 'Everything I do at work requires a great deal of effort' },
      { id: 'q3', text: 'After a day at work, I find it hard to recover my energy' },
      { id: 'q4', text: 'At work, I feel physically exhausted' },
      { id: 'q5', text: 'When I get up in the morning, I lack the energy to start a new day at work' },
      { id: 'q6', text: 'I want to be active at work, but somehow, I am unable to manage' },
      { id: 'q7', text: 'When I exert myself at work, I quickly get tired' },
      { id: 'q8', text: 'At the end of my working day, I feel mentally exhausted and drained' }
    ],
    interpretation: {
      low: 'Normal energy levels',
      moderate: 'Mild exhaustion signs',
      high: 'Significant exhaustion',
      severe: 'Critical exhaustion level'
    }
  },
  {
    id: 'mental-distance',
    title: 'Mental Distance',
    icon: <Brain className="w-8 h-8" />,
    color: "from-blue-400 to-indigo-600",
    description: 'Assesses emotional detachment and disengagement from work',
    questions: [
      { id: 'q9', text: 'I struggle to find any enthusiasm for my work' },
      { id: 'q10', text: 'At work, I do not think much about what I am doing and I function on autopilot' },
      { id: 'q11', text: 'I feel a strong aversion towards my job' },
      { id: 'q12', text: 'I feel indifferent about my job' },
      { id: 'q13', text: "I'm cynical about what my work means to others" }
    ],
    interpretation: {
      low: 'Healthy engagement',
      moderate: 'Mild disconnection',
      high: 'Significant detachment',
      severe: 'Severe work aversion'
    }
  },
  {
    id: 'cognitive-impairment',
    title: 'Cognitive Impairment',
    icon: <Zap className="w-8 h-8" />,
    color: "from-red-400 to-pink-600",
    description: 'Evaluates concentration and cognitive function at work',
    questions: [
      { id: 'q14', text: 'At work, I have trouble staying focused' },
      { id: 'q15', text: 'At work I struggle to think clearly' },
      { id: 'q16', text: "I'm forgetful and distracted at work" },
      { id: 'q17', text: "When I'm working, I have trouble concentrating" },
      { id: 'q18', text: 'I make mistakes in my work because I have my mind on other things' }
    ],
    interpretation: {
      low: 'Sharp cognitive function',
      moderate: 'Occasional focus issues',
      high: 'Frequent concentration problems',
      severe: 'Severe cognitive impairment'
    }
  },
  {
    id: 'emotional-impairment',
    title: 'Emotional Impairment',
    icon: <HeartPulse className="w-8 h-8" />,
    color: "from-violet-400 to-purple-600",
    description: 'Measures emotional control and stability at work',
    questions: [
      { id: 'q19', text: 'At work, I feel unable to control my emotions' },
      { id: 'q20', text: 'I do not recognize myself in the way I react emotionally at work' },
      { id: 'q21', text: 'During my work I become irritable when things don\'t go my way' },
      { id: 'q22', text: 'I get upset or sad at work without knowing why' },
      { id: 'q23', text: 'At work I may overreact unintentionally' }
    ],
    interpretation: {
      low: 'Emotional stability',
      moderate: 'Occasional emotional challenges',
      high: 'Frequent emotional dysregulation',
      severe: 'Severe emotional impairment'
    }
  },
  {
    id: 'psychological-complaints',
    title: 'Psychological Complaints',
    icon: <Activity className="w-8 h-8" />,
    color: "from-emerald-400 to-teal-600",
    description: 'Assesses general psychological well-being',
    questions: [
      { id: 'q24', text: 'I have trouble falling or staying asleep' },
      { id: 'q25', text: 'I tend to worry' },
      { id: 'q26', text: 'I feel tense and stressed' },
      { id: 'q27', text: 'I feel anxious and/or suffer from panic attacks' },
      { id: 'q28', text: 'Noise and crowds disturb me' }
    ],
    interpretation: {
      low: 'Good psychological health',
      moderate: 'Mild psychological strain',
      high: 'Significant psychological distress',
      severe: 'Severe psychological symptoms'
    }
  },
  {
    id: 'psychosomatic-complaints',
    title: 'Psychosomatic Complaints',
    icon: <PlusCircle className="w-8 h-8" />,
    color: "from-yellow-400 to-amber-600",
    description: 'Measures physical symptoms related to stress',
    questions: [
      { id: 'q29', text: 'I suffer from palpitations or chest pain' },
      { id: 'q30', text: 'I suffer from stomach and/or intestinal complaints' },
      { id: 'q31', text: 'I suffer from headaches' },
      { id: 'q32', text: 'I suffer from muscle pain, for example in the neck, shoulder or back' },
      { id: 'q33', text: 'I often get sick' }
    ],
    interpretation: {
      low: 'Good physical health',
      moderate: 'Mild physical symptoms',
      high: 'Frequent physical complaints',
      severe: 'Chronic physical symptoms'
    }
  }
];

const getScoreColor = (score: number) => {
  if (score <= 1) return "text-emerald-500";
  if (score <= 2) return "text-amber-500";
  if (score <= 3) return "text-orange-500";
  return "text-red-500";
};

const getProgressColor = (score: number) => {
  if (score <= 1) return "bg-emerald-500";
  if (score <= 2) return "bg-amber-500";
  if (score <= 3) return "bg-orange-500";
  return "bg-red-500";
};

export default function BurnoutAssessmentPage() {
  const [currentTest, setCurrentTest] = useState<AssessmentSection | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleStartTest = (assessment: AssessmentSection) => {
    setCurrentTest(assessment);
    setAnswers({});
    setShowResults(false);
    setCurrentQuestionIndex(0);
  };

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: parseInt(value) }));
  };

  const calculateScore = () => {
    if (!currentTest) return 0;
    const total = currentTest.questions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
    return total / currentTest.questions.length;
  };

  const getInterpretation = (score: number) => {
    if (!currentTest) return '';
    if (score <= 1) return currentTest.interpretation.low;
    if (score <= 2) return currentTest.interpretation.moderate;
    if (score <= 3) return currentTest.interpretation.high;
    return currentTest.interpretation.severe;
  };

  const nextQuestion = () => {
    if (currentTest && currentQuestionIndex < currentTest.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const canProgress = () => {
    if (!currentTest) return false;
    const currentQuestionId = currentTest.questions[currentQuestionIndex].id;
    return answers[currentQuestionId] !== undefined;
  };

  // Dashboard View
  if (!currentTest) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center mb-4"
            >
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-75 blur"></div>
                <div className="relative p-4 bg-white rounded-full">
                  <Brain className="w-12 h-12 text-purple-600" />
                </div>
              </div>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
            >
              Mindful Burnout Assessment
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-slate-600 mt-2 max-w-xl mx-auto"
            >
              Take a moment to check in with yourself. These assessments help identify areas that may need attention for your wellbeing.
            </motion.p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {assessments.map((assessment, index) => (
              <motion.div
                key={assessment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              >
                <Card
                  className="overflow-hidden cursor-pointer border-none shadow-lg"
                  onClick={() => handleStartTest(assessment)}
                >
                  <div className={`h-2 bg-gradient-to-r ${assessment.color}`}></div>
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${assessment.color} shadow-md`}>
                      {React.cloneElement(assessment.icon, { className: 'text-white' })}
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold">{assessment.title}</CardTitle>
                      <p className="text-sm text-slate-600 mt-1">{assessment.description}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500">{assessment.questions.length} questions</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                      >
                        Start Assessment <ArrowRight className="ml-1 w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    );
  }

  // Results View
  if (showResults) {
    const score = calculateScore();
    const interpretation = getInterpretation(score);
    const scoreColor = getScoreColor(score);
    const progressColor = getProgressColor(score);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
        <div className="max-w-3xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => setCurrentTest(null)} 
            className="mb-8 hover:bg-white/80"
          >
            <ArrowLeft className="mr-2" /> Back to Assessments
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-none shadow-xl overflow-hidden">
              <div className={`h-3 bg-gradient-to-r ${currentTest.color}`}></div>
              <CardHeader className="border-b bg-white/40 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${currentTest.color} shadow-md`}>
                    {React.cloneElement(currentTest.icon, { className: 'text-white' })}
                  </div>
                  <CardTitle className="text-2xl">{currentTest.title} Results</CardTitle>
                </div>
              </CardHeader>
              
              <CardContent className="py-10">
                <div className="text-center space-y-8">
                  <div className="relative inline-block">
                    <svg className="w-48 h-48" viewBox="0 0 100 100">
                      <circle 
                        cx="50" cy="50" r="45" 
                        fill="none" 
                        stroke="#e5e7eb" 
                        strokeWidth="8"
                      />
                      <circle 
                        cx="50" cy="50" r="45" 
                        fill="none" 
                        stroke={progressColor.replace('bg-', 'text-')}
                        strokeWidth="8"
                        strokeDasharray={`${Math.min(score / 4 * 283, 283)} 283`}
                        transform="rotate(-90 50 50)"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <div className={`text-6xl font-bold ${scoreColor}`}>
                        {score.toFixed(1)}
                      </div>
                      <div className="text-sm text-slate-500">out of 4.0</div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="font-bold text-xl mb-2">{interpretation}</h3>
                    <p className="text-slate-600">
                      Based on your responses to the {currentTest.title.toLowerCase()} assessment
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-100 inline-flex items-start text-left">
                    <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-sm text-blue-800">
                      Remember that this assessment is a tool for self-reflection, not a clinical diagnosis. 
                      Consider discussing these results with a healthcare professional if you have concerns.
                    </p>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between bg-white/40 backdrop-blur-sm">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowResults(false);
                    setCurrentQuestionIndex(0);
                  }}
                  className="border-slate-300 hover:bg-slate-50"
                >
                  Retake Test
                </Button>
                <Button 
                  onClick={() => setCurrentTest(null)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90"
                >
                  View Other Assessments
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  // Questionnaire View - Single Question at a Time
  const currentQuestion = currentTest.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / currentTest.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-3xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => setCurrentTest(null)} 
          className="mb-8 hover:bg-white/80"
        >
          <ArrowLeft className="mr-2" /> Back to Assessments
        </Button>

        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-none shadow-xl overflow-hidden">
            <div className={`h-3 bg-gradient-to-r ${currentTest.color}`}></div>
            
            <CardHeader className="border-b bg-white/40 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${currentTest.color} shadow-md`}>
                  {React.cloneElement(currentTest.icon, { className: 'text-white' })}
                </div>
                <div>
                  <CardTitle className="text-2xl">{currentTest.title}</CardTitle>
                  <div className="flex items-center mt-2">
                    <Progress 
                      value={progress} 
                      className="h-2 flex-1 mr-2" 
                    />
                    <span className="text-sm font-medium text-slate-500">
                      {currentQuestionIndex + 1}/{currentTest.questions.length}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="py-12">
              <div className="space-y-10">
                <Label className="text-2xl font-medium block text-center">
                  {currentQuestion.text}
                </Label>
                
                <RadioGroup
                  value={answers[currentQuestion.id]?.toString() || ''}
                  onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
                  className="flex justify-center space-x-1 pt-4"
                >
                  {[0, 1, 2, 3, 4].map((value) => (
                    <div key={value} className="flex flex-col items-center">
                      <RadioGroupItem
                        value={value.toString()}
                        id={`${currentQuestion.id}-${value}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`${currentQuestion.id}-${value}`}
                        className="flex flex-col items-center justify-center w-16 h-16 rounded-full border-2 border-slate-200 hover:border-purple-300 hover:bg-purple-50 peer-data-[state=checked]:border-purple-500 peer-data-[state=checked]:bg-purple-50 cursor-pointer transition-all"
                      >
                        <span className="text-xl font-bold">{value}</span>
                        <span className="text-xs text-slate-500 mt-1">
                          {value === 0 ? 'Never' : 
                           value === 1 ? 'Rarely' : 
                           value === 2 ? 'Sometimes' : 
                           value === 3 ? 'Often' : 'Always'}
                        </span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between bg-white/40 backdrop-blur-sm p-6">
              <Button 
                variant="outline" 
                onClick={prevQuestion}
                disabled={currentQuestionIndex === 0}
                className="border-slate-300 hover:bg-slate-50"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button 
                onClick={nextQuestion}
                disabled={!canProgress()}
                className={`${canProgress() ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-slate-300'} transition-all duration-300`}
              >
                {currentQuestionIndex < currentTest.questions.length - 1 ? (
                  <>Next <ArrowRight className="ml-2 h-4 w-4" /></>
                ) : (
                  <>Complete Assessment</>
                )}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}