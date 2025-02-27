'use client';
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, X } from "lucide-react";

interface WellnessTipProps {
  tip: string;
  onClose: () => void;
}

export const WellnessTip = ({ tip, onClose }: WellnessTipProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
  >
    <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 border-0 shadow-md rounded-xl">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <div className="mt-1 p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/50">
              <AlertCircle className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-1">
                Daily Wellness Tip
              </h3>
              <p className="text-slate-600 dark:text-slate-300">{tip}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="mt-1"
            onClick={onClose}
          >
            <X className="h-5 w-5 text-slate-500" />
          </Button>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);