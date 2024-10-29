"use client";

import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Download, Edit2, Pause, Play, RefreshCw, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

interface Timer {
  id: number;
  name: string;
  time: number;
  isRunning: boolean;
}

export default function Stopwatches() {
  const [activeTab, setActiveTab] = useState("timers");
  const [newTimerName, setNewTimerName] = useState("");
  const [timers, setTimers] = useState<Timer[]>([]);
  const [timerToDelete, setTimerToDelete] = useState<number | null>(null);
  const [singleTimerMode, setSingleTimerMode] = useState(true); // only 1 timer can run at a time

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers.map((timer) =>
          timer.isRunning ? { ...timer, time: timer.time + 1 } : timer
        )
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const addTimer = () => {
    if (newTimerName.trim()) {
      setTimers([
        ...timers,
        { id: Date.now(), name: newTimerName, time: 0, isRunning: false },
      ]);
      setNewTimerName("");
    }
  };

  const renameTimer = (id: number, newName: string) => {
    setTimers(
      timers.map((timer) =>
        timer.id === id ? { ...timer, name: newName } : timer
      )
    );
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const toggleTimer = (id: number) => {
    setTimers(
      timers.map((timer) => {
        if (timer.id === id) {
          return { ...timer, isRunning: !timer.isRunning };
        }
        if (singleTimerMode && !timer.isRunning) {
          return timer;
        }
        return { ...timer, isRunning: false };
      })
    );
  };

  const resetTimer = (id: number) => {
    setTimers(
      timers.map((timer) =>
        timer.id === id ? { ...timer, time: 0, isRunning: false } : timer
      )
    );
  };

  const deleteTimer = () => {
    if (timerToDelete !== null) {
      setTimers(timers.filter((timer) => timer.id !== timerToDelete));
      setTimerToDelete(null);
    }
  };

  const exportCSV = () => {
    const headers = ["Timer Name", "Time (seconds)", "Time (formatted)"];
    const csvContent = [
      headers.join(","),
      ...timers.map(
        (timer) => `"${timer.name}",${timer.time},"${formatTime(timer.time)}"`
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "timer_data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <section className="container mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="timers">Timers</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="timers">
          <div className="flex mb-4">
            <Input
              type="input"
              placeholder="Timer name"
              value={newTimerName}
              onChange={(e) => setNewTimerName(e.target.value)}
              className="mr-2"
            />
            <Button onClick={addTimer}>Add Timer</Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {timers.map((timer) => (
              <Card
                key={timer.id}
                className={`transition-colors ${
                  timer.isRunning
                    ? "bg-green-100 border-green-500 border-2"
                    : ""
                }`}
              >
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{timer.name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const newName = prompt("Enter new name", timer.name);
                        if (newName) renameTimer(timer.id, newName);
                      }}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-center mb-4">
                    {formatTime(timer.time)}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toggleTimer(timer.id)}
                  >
                    {timer.isRunning ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => resetTimer(timer.id)}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setTimerToDelete(timer.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete the timer "
                          {timer.name}"? This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setTimerToDelete(null)}
                        >
                          Cancel
                        </Button>
                        <Button variant="destructive" onClick={deleteTimer}>
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="single-timer-mode"
                  checked={singleTimerMode}
                  onCheckedChange={setSingleTimerMode}
                />
                <Label htmlFor="single-timer-mode">
                  Only one timer can run at a time
                </Label>
              </div>
              <div>
                <Button
                  onClick={exportCSV}
                  className="w-full"
                  disabled={timers.length === 0}
                >
                  <Download className="mr-2 h-4 w-4" /> Export Timer Data (CSV)
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}

function TimerButton({
  name,
  timerActive,
  onClick,
  onDelete,
}: {
  name: string;
  timerActive: boolean;
  onClick: () => void;
  onDelete: () => void;
}) {
  const [time, setTime] = useState(0);
  const [timerName, setTimerName] = useState(name);

  useEffect(() => {
    if (timerActive) {
      setTimeout(() => {
        setTime(time + 1);
      }, 1000);
    }
  }, [time, timerActive]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newName = e.currentTarget.timerName.value;
    setTimerName(newName);
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <div className="flex flex-col">
      <button
        onClick={onClick}
        className={`bg-blue-300 p-8 border-4 dark:text-black ${
          timerActive ? " border-green-600" : ""
        } `}
      >
        <div className="flex flex-col">
          {timerName}
          <br />
          {time}
          <br />
        </div>
      </button>
      <Popover>
        <PopoverTrigger>Edit</PopoverTrigger>
        <PopoverContent>
          <div className="space-y-4">
            <p className="font-bold">Edit timer</p>
            <form onSubmit={handleSubmit} className="flex">
              <div className="flex w-full gap-2">
                <input
                  type="text"
                  name="timerName"
                  id="timerName"
                  defaultValue={timerName}
                  className="p-3 w-full"
                  onChange={(e) => setTimerName(e.target.value)}
                ></input>
                <button className="text-sm bg-blue-300 p-2" type="submit">
                  rename
                </button>
              </div>
            </form>
            <button
              className="border-4 border-red-500 bg-red-300 rounded-md p-2 w-full"
              onClick={() => setTime(0)}
            >
              Reset count
            </button>
            <button
              className="border-4 border-red-500 bg-red-300 rounded-md p-2 w-full"
              onClick={handleDelete}
            >
              DELETE TIMER
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
