"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Calendar } from "lucide-react";

// Sample data for journal entries.
const journalEntries = [
  {
    id: 1,
    title: "A Fresh Start",
    date: "2025-02-10",
    excerpt:
      "Today marks the beginning of my journaling journey. I feel excited and ready to explore my thoughts.",
  },
  {
    id: 2,
    title: "Reflecting on Challenges",
    date: "2025-02-09",
    excerpt:
      "It’s been a tough day, but reflecting on my challenges has given me new insights on how to move forward.",
  },
  {
    id: 3,
    title: "Gratitude and Growth",
    date: "2025-02-08",
    excerpt:
      "I took a moment to appreciate the little things. Being grateful truly helps in overcoming obstacles.",
  },
  // Add more entries as needed...
];

export default function JournalPage() {
  return (
    <div className="space-y-6 p-4">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Journal</h1>
          <p className="text-muted-foreground">
            Document your thoughts and feelings
          </p>
        </div>
        <Button className="mt-4 md:mt-0 bg-purple-600 hover:bg-purple-700">
          <Pencil className="h-4 w-4 mr-2" />
          New Entry
        </Button>
      </div>

      {/* Journal Entries */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {journalEntries.map((entry) => (
          <Card key={entry.id}>
            <CardHeader className="flex flex-col items-start justify-between space-y-1 pb-2">
              <CardTitle className="text-lg font-semibold">
                {entry.title}
              </CardTitle>
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{entry.date}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{entry.excerpt}</p>
              <Button variant="outline" size="sm" className="mt-3">
                Read More
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
