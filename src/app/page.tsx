import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Brain, Battery, ArrowRight} from "lucide-react";
import Link from 'next/link';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 dark:from-slate-950 dark:to-slate-900">
      <nav className="border-b bg-white/50 backdrop-blur-sm dark:bg-slate-900/50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
              Mindora
            </span>
          </div>
          <Button variant="outline" className="hover:bg-purple-50 dark:hover:bg-slate-800">
            <Link href='/login'>
            Login
            </Link>
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
            Find Peace in Your Workday
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8">
            Mindora helps you manage workplace stress with proven techniques, guided exercises, and personalized support.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
            <Link href='/signup'>
              Get Started Free
            </Link>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-purple-200 dark:border-purple-800">
              Learn More
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <Card className="bg-white/50 backdrop-blur-sm dark:bg-slate-900/50 border-purple-100 dark:border-purple-900">
            <CardContent className="pt-6">
              <Sparkles className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quick Relief</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Access instant stress-relief exercises designed for busy professionals.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur-sm dark:bg-slate-900/50 border-purple-100 dark:border-purple-900">
            <CardContent className="pt-6">
              <Brain className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Mindfulness at Work</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Learn techniques to stay focused and calm during challenging workdays.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur-sm dark:bg-slate-900/50 border-purple-100 dark:border-purple-900">
            <CardContent className="pt-6">
              <Battery className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Energy Management</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Track your stress levels and get personalized recommendations.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Home;