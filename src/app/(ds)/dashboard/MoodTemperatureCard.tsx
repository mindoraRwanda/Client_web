'use client';
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThermometerSun, ArrowRight } from "lucide-react";

interface MoodTemperatureCardProps {
  temperature: number;
  onRetake: () => void;
}

export const MoodTemperatureCard = ({ temperature, onRetake }: MoodTemperatureCardProps) => {
  const getTemperatureColor = (temp: number) => temp >= 3.5 ? "bg-gradient-to-br from-red-400 to-rose-300" :
    temp >= 2.5 ? "bg-gradient-to-br from-yellow-400 to-amber-300" :
    "bg-gradient-to-br from-green-400 to-emerald-300";

  const getTemperatureText = (temp: number) => {
    if (!temp) return "Not measured";
    if (temp <= 2) return "Doing Great";
    if (temp <= 3) return "Balanced";
    if (temp <= 4) return "Slightly Stressed";
    return "Needs Attention";
  };

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="col-span-2 bg-white dark:bg-slate-800 shadow-lg rounded-xl border-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="text-base font-medium text-slate-700 dark:text-slate-300">
            Mood Temperature
          </div>
          <div className="p-2 rounded-full bg-purple-100 dark:bg-slate-700">
            <ThermometerSun className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6 pt-2">
            <motion.div 
              className={`w-20 h-20 rounded-full ${getTemperatureColor(temperature)} flex items-center justify-center shadow-lg`}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: 0 }}
            >
              <span className="text-white text-2xl font-bold">
                {temperature.toFixed(1)}
              </span>
            </motion.div>
            <div>
              <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                {getTemperatureText(temperature)}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-purple-600 dark:text-purple-400 mt-3"
                onClick={onRetake}
              >
                <span>Check again</span>
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};