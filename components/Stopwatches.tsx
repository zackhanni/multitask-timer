"use client";

import React, { useEffect, useState } from "react";
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
import Image from "next/image";

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
        if (!timer.isRunning) {
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
    <section className="container">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="">
        <TabsList className="grid w-full grid-cols-2 h-12">
          <TabsTrigger value="timers" className="h-10 text-base">
            Timers
          </TabsTrigger>
          <TabsTrigger value="downloads" className="h-10 text-base text-black">
            Downloads
          </TabsTrigger>
        </TabsList>
        <TabsContent value="timers">
          <div className="flex mb-4">
            <Input
              type="input"
              placeholder="Timer name"
              value={newTimerName}
              onChange={(e) => setNewTimerName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTimer()}
              className="mr-2 text-base h-12"
            />
            <Button
              onClick={addTimer}
              className="h-12 text-base bg-accent hover:bg-accent-foreground hover:text-black"
            >
              Add Timer
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {timers.map((timer) => (
              <Card
                key={timer.id}
                className={`transition-colors border-4 ${
                  timer.isRunning ? "bg-green-100 border-green-500" : ""
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
                    className={`${
                      timer.isRunning
                        ? "hover:bg-gray-100 hover:text-black hover:border-yellow-500"
                        : "hover:bg-gray-100 hover:text-black hover:border-green-500"
                    }`}
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
                    className="hover:bg-gray-100 hover:text-black hover:border-blue-500"
                    onClick={() => resetTimer(timer.id)}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="hover:bg-gray-100 hover:text-black hover:border-red-500"
                        onClick={() => setTimerToDelete(timer.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete the timer &quot;
                          {timer.name}&quot;? This action cannot be undone.
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
        <TabsContent value="downloads">
          <Card>
            <CardHeader>
              <CardTitle>Downloads</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Export in a spreadsheet format</p>
              <div>
                <Button
                  onClick={exportCSV}
                  className="w-full disabled:bg-gray-400 bg-accent hover:bg-accent-foreground hover:text-black"
                  disabled={timers.length === 0}
                >
                  <Download className="mr-2 h-4 w-4" /> Export Timer Data (CSV)
                </Button>
              </div>
              <hr />
              <p>Download standalone application</p>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={exportCSV}
                  className=" bg-accent hover:bg-accent-foreground hover:text-black flex-col h-24"
                >
                  <Image
                    src={"/mac.svg"}
                    alt="apple logo"
                    width={40}
                    height={40}
                  />
                  Mac
                </Button>
                <Button
                  onClick={exportCSV}
                  className=" bg-accent hover:bg-accent-foreground hover:text-black flex-col h-24"
                >
                  <Image
                    src={"/windows.svg"}
                    alt="windows logo"
                    width={40}
                    height={40}
                  />
                  PC
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
