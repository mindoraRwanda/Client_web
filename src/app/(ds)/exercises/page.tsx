"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Waves, Brain, Heart, PlayCircle } from "lucide-react";

const exercises = [
  {
    id: 1,
    title: "Deep Breathing",
    description:
      "Calm your mind with controlled deep breathing techniques. Perfect to reset during a busy day.",
    duration: "5 min",
    icon: Waves,
    color: "text-blue-500",
    bgClass: "bg-blue-50",
    borderClass: "border-blue-100",
  },
  {
    id: 2,
    title: "Mindful Meditation",
    description:
      "Focus on the present moment and clear your thoughts. An ideal practice for reducing anxiety.",
    duration: "10 min",
    icon: Brain,
    color: "text-purple-500",
    bgClass: "bg-purple-50",
    borderClass: "border-purple-100",
  },
  {
    id: 3,
    title: "Desk Stretch",
    description:
      "Relieve tension and boost circulation with a few quick stretches you can do right at your desk.",
    duration: "3 min",
    icon: Heart,
    color: "text-rose-500",
    bgClass: "bg-rose-50",
    borderClass: "border-rose-100",
  },
  // Add more exercises as needed...
];

export default function ExercisesPage() {
  return (
    <div className="space-y-6 p-4">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Explore Exercises
          </h1>
          <p className="text-muted-foreground">
            Enhance your well-being with guided practices
          </p>
        </div>
        <Button className="mt-4 md:mt-0 bg-purple-600 hover:bg-purple-700">
          Start New Exercise
        </Button>
      </div>

      {/* Featured Exercises Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Featured Exercises</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {exercises.map((exercise) => {
            const Icon = exercise.icon;
            return (
              <Card
                key={exercise.id}
                className={`${exercise.bgClass} border ${exercise.borderClass}`}
              >
                <CardHeader className="flex items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    {exercise.title}
                  </CardTitle>
                  <Icon className={`h-5 w-5 ${exercise.color}`} />
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {exercise.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {exercise.duration}
                    </span>
                    <Button variant="outline" size="sm">
                      <PlayCircle className="h-4 w-4 mr-1" />
                      Start
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* All Exercises Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">All Exercises</h2>
        <div className="space-y-4">
          {exercises.map((exercise) => {
            const Icon = exercise.icon;
            return (
              <Card key={exercise.id} className="flex items-center p-4">
                <Icon className={`h-6 w-6 ${exercise.color} mr-4`} />
                <div className="flex-1">
                  <h3 className="text-md font-bold">{exercise.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {exercise.description}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">
                    {exercise.duration}
                  </span>
                  <Button variant="outline" size="sm">
                    <PlayCircle className="h-4 w-4 mr-1" />
                    Start
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}


