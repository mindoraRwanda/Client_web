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
  ArrowDown,
  PlayCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

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

export default function DashboardPage() {
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
        <Button className="bg-purple-600 hover:bg-purple-700">
          Start Check-in
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Current Stress Level
            </CardTitle>
            <Timer className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-bold">45%</div>
              <div className="text-sm text-green-600 flex items-center">
                <ArrowDown className="h-4 w-4 mr-1" />
                12%
              </div>
            </div>
            <Progress value={45} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Weekly Sessions
            </CardTitle>
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
            <CardTitle className="text-sm font-medium">Streak</CardTitle>
            <Waves className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 days</div>
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
            <CardDescription>
              Your stress levels over the past week
            </CardDescription>
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
            <CardTitle>Quick Exercises</CardTitle>
            <CardDescription>Recommended for right now</CardDescription>
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
    </div>
  );
}
