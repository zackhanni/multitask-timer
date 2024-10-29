"use client";

import React, { useEffect, useState } from "react";

export default function Stopwatches() {
  const [whichStopwatch, setWhichStopwatch] = useState(0);
  return (
    <section>
      <div className="flex space-x-4">
        <StopwatchButton
          name="Task 1"
          timerActive={whichStopwatch == 1}
          onClick={() =>
            whichStopwatch == 1 ? setWhichStopwatch(0) : setWhichStopwatch(1)
          }
        />
        <StopwatchButton
          name="Task 2"
          timerActive={whichStopwatch == 2}
          onClick={() =>
            whichStopwatch == 2 ? setWhichStopwatch(0) : setWhichStopwatch(2)
          }
        />
        <StopwatchButton
          name="Task 3"
          timerActive={whichStopwatch == 3}
          onClick={() =>
            whichStopwatch == 3 ? setWhichStopwatch(0) : setWhichStopwatch(3)
          }
        />
        <button
          className={`bg-red-100 p-8 border-4 dark:text-black ${
            whichStopwatch == 0 ? "border-red-500" : ""
          }`}
          onClick={() => setWhichStopwatch(0)}
        >
          Stop All
        </button>
      </div>
    </section>
  );
}

function StopwatchButton({
  name,
  timerActive,
  onClick,
}: {
  name: string;
  timerActive: boolean;
  onClick: () => void;
}) {
  const [time, setTime] = useState(0);
  const [editing, setEditing] = useState(false);
  const [stopwatchName, setStopwatchName] = useState(name);
  //   const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    if (timerActive) {
      setTimeout(() => {
        setTime(time + 1);
      }, 1000);
    }
  }, [time, timerActive]);

  return (
    <div>
      <button
        onClick={onClick}
        className={`bg-blue-300 p-8 border-4 dark:text-black ${
          timerActive ? " border-green-600" : ""
        } `}
      >
        <div className="flex flex-col">
          <p
            className="text-sm bg-blue-400 p-2"
            onClick={() => setEditing(!editing)}
          >
            rename
          </p>
          <br />
          {editing ? (
            <form>
              <input
                type="text"
                name="stopwatchName"
                id="stopwatchName"
                defaultValue="Type a new name"
                onChange={(e) => setStopwatchName(e)}
              ></input>
            </form>
          ) : (
            stopwatchName
          )}

          <br />
          {time}
        </div>
      </button>
    </div>
  );
}
