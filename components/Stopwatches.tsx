"use client";

import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Stopwatches() {
  const [whichTimerIsActive, setWhichTimerIsActive] = useState(null);
  const [newTimerName, setNewTimerName] = useState("");

  type Timer = { name: string; time: number };
  const [timers, setTimers] = useState<Timer[]>([
    // { name: "Task 1", time: 0 },
    // { name: "Task 2", time: 0 },
    // { name: "Task 3", time: 0 },
  ]);

  const handleDeleteTimer = (name: string) => {
    setTimers((prevTimers) =>
      prevTimers.filter((timer) => timer.name !== name)
    );
  };

  return (
    <section>
      <div className="flex space-x-4">
        {timers.map((stopwatch, index) => {
          return (
            <TimerButton
              key={stopwatch.name + index}
              name={stopwatch.name}
              timerActive={whichTimerIsActive == index}
              onClick={() =>
                whichTimerIsActive == index
                  ? setWhichTimerIsActive(null)
                  : setWhichTimerIsActive(index)
              }
              onDelete={() => handleDeleteTimer(stopwatch.name)}
            />
          );
        })}
        <button
          className={`bg-red-100 p-8 border-4 dark:text-black ${
            whichTimerIsActive == null ? "border-red-500" : ""
          }`}
          onClick={() => setWhichTimerIsActive(null)}
        >
          Stop All
        </button>
        <div className="bg-green-100 p-8 border-4 dark:text-black flex">
          <Popover>
            <PopoverTrigger>New Timer</PopoverTrigger>
            <PopoverContent>
              <div className="space-y-4">
                <p>Create a new timer</p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setTimers((prev) => [
                      ...prev,
                      { name: newTimerName, time: 0 },
                    ]);
                  }}
                  className="flex"
                >
                  <div className="flex justify-between w-full gap-2">
                    <input
                      type="text"
                      name="newTimer"
                      id="newTimer"
                      defaultValue={""}
                      className="p-3 w-full"
                      onChange={(e) => setNewTimerName(e.target.value)}
                    ></input>

                    <button className="text-sm bg-blue-400 p-2" type="submit">
                      create
                    </button>
                  </div>
                </form>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newName = e.target.timerName.value;
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
