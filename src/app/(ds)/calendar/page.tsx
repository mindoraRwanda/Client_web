"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Create an array for days in a month (e.g., 31 days)
const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

// Dummy events data for select days
const eventsData: { [key: number]: { id: number; title: string; time: string; }[] } = {
  10: [
    { id: 1, title: "Morning Meditation", time: "8:00 AM" },
    { id: 2, title: "Yoga Session", time: "5:00 PM" },
  ],
  15: [
    { id: 3, title: "Desk Stretch", time: "2:00 PM" },
  ],
  20: [
    { id: 4, title: "Evening Walk", time: "7:00 PM" },
  ],
};

export default function CalendarPage() {
  // Use current day as the initial selected day.
  const today = new Date().getDate();
  const [selectedDay, setSelectedDay] = useState<number>(today);

  // Get events for the selected day or an empty array if none exist.
  const events = eventsData[selectedDay] || [];

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="h-6 w-6 text-purple-600" />
          <h1 className="text-2xl font-bold tracking-tight">
            Calendar & Planner
          </h1>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          Add New Event
        </Button>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="ghost">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-lg font-medium">August 2025</h2>
        <Button variant="ghost">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Main Grid: Calendar + Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Calendar Grid */}
        <Card>
          <CardHeader>
            <CardTitle>Month View</CardTitle>
            <CardDescription>
              Select a day to view scheduled events
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Days of Week Headers */}
            <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-muted-foreground mb-2">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>
            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-2">
              {daysInMonth.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`py-2 rounded-md text-sm font-medium transition-colors
                    ${
                      day === selectedDay
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Events List */}
        <Card>
          <CardHeader>
            <CardTitle>Events on {selectedDay} August 2025</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {events.length > 0 ? (
              events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 rounded-md border hover:bg-accent transition-colors"
                >
                  <div>
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {event.time}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Details
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No events scheduled for this day.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Extra Section: Daily Reflection (Non-calendar functionality) */}
      <Card className="bg-purple-50 dark:bg-purple-950/20 border-purple-100 dark:border-purple-900">
        <CardHeader>
          <CardTitle className="text-purple-700 dark:text-purple-300">
            Daily Reflection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-purple-600 dark:text-purple-400">
            Beyond just scheduling, take a moment each day to reflect on your
            feelings or set a personal goal. Consider jotting down one thing
            you&apos;re grateful for or a thought for the day.
          </p>
          <Button variant="outline" size="sm" className="mt-3">
            Write Reflection
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
