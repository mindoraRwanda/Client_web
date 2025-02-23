
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Sample data for progress charts.
const stressProgressData = [
  { week: "Week 1", stress: 65 },
  { week: "Week 2", stress: 60 },
  { week: "Week 3", stress: 55 },
  { week: "Week 4", stress: 50 },
];

const sessionProgressData = [
  { week: "Week 1", sessions: 3 },
  { week: "Week 2", sessions: 5 },
  { week: "Week 3", sessions: 4 },
  { week: "Week 4", sessions: 6 },
];

export default function ProgressPage() {
  return (
    <div className="space-y-6 p-4">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Your Progress</h1>
          <p className="text-muted-foreground">
            See how far you&apos;ve come in managing your stress and enhancing your well-being.
          </p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          View Detailed Report
        </Button>
      </div>

      {/* Key Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Stress Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">55%</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <ArrowDown className="h-4 w-4 mr-1" />
              5% improvement
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Weekly Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4 per week</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <ArrowUp className="h-4 w-4 mr-1" />
              2 more this month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7 days</div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Stress Progress Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Stress Level Over Time</CardTitle>
            <CardDescription>
              Weekly average stress levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stressProgressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="week" stroke="#718096" />
                  <YAxis stroke="#718096" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="stress"
                    stroke="#9333ea"
                    strokeWidth={2}
                    dot={{ fill: "#9333ea" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Sessions Progress Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Sessions</CardTitle>
            <CardDescription>
              Number of wellness sessions each week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sessionProgressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="week" stroke="#718096" />
                  <YAxis stroke="#718096" />
                  <Tooltip />
                  <Bar dataKey="sessions" fill="#9333ea" barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
