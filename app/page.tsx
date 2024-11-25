"use client";

import { useState } from "react";
import { Plus, Mic, Bike, Book, Brain, Pen, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "@/components/calendar";
import { EntriesPanel } from "@/components/entries-panel";
import RecordingModal from "@/components/recording-modal";
import { Goal, Entry, initialGoals, initialEntries } from "@/app/data/initial-data";

export default function JournalApp() {
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [entries, setEntries] = useState<Entry[]>(initialEntries);
  const [latestEntry, setLatestEntry] = useState<Entry | null>(null);

  const handleAddGoal = () => {
    const newGoalText = prompt("Enter a new goal:");
    if (newGoalText) {
      const newGoal: Goal = {
        id: Date.now().toString(),
        text: newGoalText,
      };
      setGoals([...goals, newGoal]);
    }
  };

  const handleEditEntry = () => {
    setIsRecording(true);
  };

  const filteredEntries = selectedGoal
    ? entries
        .filter((entry) => entry.goalId === selectedGoal.id)
        .reverse()
    : [];

  const getIconForSummary = (summary: string) => {
    if (
      summary.toLowerCase().includes("bike") ||
      summary.toLowerCase().includes("exercise")
    )
      return <Bike className="w-5 h-5 mr-2 text-white bg-white fill-white" />;
    if (summary.toLowerCase().includes("read"))
      return <Book className="w-5 h-5 mr-2 text-white" />;
    if (summary.toLowerCase().includes("meditate"))
      return <Brain className="w-5 h-5 mr-2" />;
    if (
      summary.toLowerCase().includes("write") ||
      summary.toLowerCase().includes("journal")
    )
      return <Pen className="w-5 h-5 mr-2" />;
    return <Lightbulb className="w-5 h-5 mr-2" />;
  };

  const getEntriesForGoal = (goalId: string) => {
    return entries
      .filter(entry => entry.goalId === goalId)
      .map(entry => entry.date);
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <header className="p-4 bg-primary text-primary-foreground">
        <h1 className="text-2xl font-bold">Journal App</h1>
      </header>
      <main className="flex-1 p-4 overflow-hidden relative bg-gray-900 text-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-300">Goals</h2>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-gray-800 text-gray-200 hover:bg-gray-700"
            onClick={handleAddGoal}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add Custom Goal</span>
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-10rem)]">
          <div className="grid gap-4">
            {goals.map((goal) => (
              <Card
                key={goal.id}
                className={`cursor-pointer transition-colors shadow-none ${
                  selectedGoal?.id === goal.id ? "bg-gray-700" : "bg-gray-800"
                }`}
                onClick={() => setSelectedGoal(goal)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <p className="font-medium text-gray-100">{goal.text}</p>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="bg-gray-700 text-gray-200 hover:bg-gray-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedGoal(goal);
                        setIsRecording(true);
                      }}
                    >
                      <Mic className="h-4 w-4" />
                      <span>{entries.filter(entry => entry.goalId === goal.id).length} entries</span>
                    </Button>
                  </div>
                  <div className="w-full">
                    <Calendar entries={selectedGoal ? getEntriesForGoal(goal.id) : []} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
        {latestEntry && (
          <Card className="mt-4 bg-gray-800 shadow-none">
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                {getIconForSummary(latestEntry.summary)}
                <h3 className="text-lg font-semibold text-gray-100">
                  Latest Entry
                </h3>
              </div>
              <p className="text-sm text-gray-300 mb-2">
                {latestEntry.summary}
              </p>
              <p className="text-xs text-gray-400">{latestEntry.text}</p>
            </CardContent>
          </Card>
        )}
        <EntriesPanel
          entries={filteredEntries}
          isOpen={!!selectedGoal}
          goalName={selectedGoal?.text || ""}
          onClose={() => setSelectedGoal(null)}
          onEditEntry={handleEditEntry}
        />
      </main>

      <RecordingModal
        isOpen={isRecording}
        onClose={() => {
          setIsRecording(false);
        }}
        goal={selectedGoal}
        onEntryComplete={(newEntry) => {
          const today = new Date().toISOString().split("T")[0];
          const fullNewEntry: Entry = {
            id: Date.now().toString(),
            date: today,
            ...newEntry,
          };
          setEntries([...entries, fullNewEntry]);
          setLatestEntry(fullNewEntry);
          setIsRecording(false);
        }}
      />
    </div>
  );
}
