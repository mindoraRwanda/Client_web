'use client';
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

interface Exercise {
  title: string;
  duration: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  gradient: string;
}

interface QuickExercisesProps {
  exercises: Exercise[];
}

export const QuickExercises = ({ exercises }: QuickExercisesProps) => (
  <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
    <Card className="bg-white dark:bg-slate-800 shadow-lg rounded-xl border-0">
      <CardHeader>
        <div className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          Recommended Exercises
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {exercises.map((exercise, index) => {
            const Icon = exercise.icon;
            return (
              <motion.div
                key={exercise.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-xl cursor-pointer bg-gradient-to-br ${exercise.gradient} border border-slate-100 dark:border-slate-600`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${exercise.bgColor}`}>
                        <Icon className={`h-6 w-6 ${exercise.color}`} />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 dark:text-slate-100">
                          {exercise.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {exercise.duration}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-purple-600 dark:text-purple-400">
                      <PlayCircle className="h-6 w-6" />
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);