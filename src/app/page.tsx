import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Brain, Battery, ArrowRight, Orbit, Leaf, Waves } from "lucide-react";
import Link from 'next/link';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Animated background elements */}
      <div className="absolute top-20 left-0 w-full h-full opacity-10 dark:opacity-5">
        <Leaf className="absolute top-1/4 left-10 animate-float w-24 h-24 text-purple-200" />
        <Orbit className="absolute top-1/3 right-20 animate-spin-slow w-32 h-32 text-blue-200" />
        <Waves className="absolute bottom-20 left-1/4 animate-pulse w-28 h-28 text-pink-200" />
      </div>

      <nav className="border-b bg-white/80 backdrop-blur-lg dark:bg-slate-900/80 fixed w-full top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Mindora
            </span>
          </div>
          <Button asChild variant="ghost" className="hover:bg-purple-100/50 dark:hover:bg-slate-800/50">
            <Link href='/login' className="group">
              <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Login
              </span>
              <ArrowRight className="ml-2 h-4 w-4 text-purple-600 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-32 pb-16 relative">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent leading-tight">
            Transform Stress into
            <span className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 rounded-2xl ml-3 transform -rotate-2 hover:rotate-2 transition-transform">
              Strength
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Harness neuroscience-backed techniques to thrive in your work environment. 
            <span className="block mt-2 font-medium text-purple-600 dark:text-purple-400">
              Because calm is your superpower.
            </span>
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white shadow-lg hover:shadow-purple-200/40 transition-all">
              <Link href='/signup' className="flex items-center">
                Start Free Journey
                <Sparkles className="ml-3 h-5 w-5 animate-pulse" />
              </Link>
            </Button>
            
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <Card className="bg-white/90 backdrop-blur-sm dark:bg-slate-900/90 border-purple-100 dark:border-purple-900 hover:shadow-xl transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="mb-5 relative">
                <div className="absolute -top-6 right-0 w-14 h-14 bg-purple-100 dark:bg-slate-800 rounded-xl transform rotate-12" />
                <Sparkles className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4 z-10 relative" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Instant Calm</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                90-second interventions designed for high-pressure moments in demanding work environments.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm dark:bg-slate-900/90 border-purple-100 dark:border-purple-900 hover:shadow-xl transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="mb-5 relative">
                <div className="absolute -top-6 right-0 w-14 h-14 bg-blue-100 dark:bg-slate-800 rounded-xl transform -rotate-12" />
                <Brain className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4 z-10 relative" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Cognitive Resilience</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Evidence-based training to enhance focus, emotional regulation, and decision-making under stress.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm dark:bg-slate-900/90 border-purple-100 dark:border-purple-900 hover:shadow-xl transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="mb-5 relative">
                <div className="absolute -top-6 right-0 w-14 h-14 bg-pink-100 dark:bg-slate-800 rounded-xl transform rotate-6" />
                <Battery className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4 z-10 relative" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Energy Optimization</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                AI-powered insights to manage your cognitive load and prevent burnout through smart energy allocation.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Floating CTA Section */}
        <div className="mt-20 p-8 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-500 text-center shadow-2xl transform hover:scale-[1.01] transition-transform">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Rewire Your Workday?
          </h2>
          <p className="text-purple-100 mb-6 max-w-xl mx-auto">
            Join thousands of professionals transforming stress into success
          </p>
          <Button 
            asChild
            size="lg" 
            className="bg-white text-purple-600 hover:bg-purple-50 hover:text-purple-700 shadow-lg"
          >
            <Link href="/signup">
              Start Free Journey
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Home;