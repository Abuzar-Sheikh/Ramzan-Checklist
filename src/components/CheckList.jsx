import React, { useState, useEffect } from "react";

const tasks = [
  "Have I prayed Tahajjud today?",
  "Have I recited the Holy Qur'an today?",
  "Have I offered 5 times prayer today?",
  "Have I offered my Nafl prayers today?",
  "Have I helped someone in need today?",
  "Have I reflected on the Qur'an today?",
  "Have I avoided backbiting today?",
  "Have I made any new intention for good deeds today?",
  "Have I sought forgiveness from Allah today?",
  "Have I done something beneficial for my family today?",
  "Have I fasted today?",
  "Have I avoided sins today?",
  "Have I recited today's adhkaar?",
  "Have I given charity today?",
  "Have I remembered death today?",
  "Have I reflected on the afterlife today?",
  "Have I lowered my gaze today?",
  "Have I spoken kind words today?",
  "Have I helped someone who asked for help today?",
  "Have I made someone smile today?",
];

const Checklist = () => {
  const initialChecklist =
    JSON.parse(localStorage.getItem("checklist")) ||
    Array(tasks.length)
      .fill()
      .map(() => Array(30).fill(null));

  const [checklist, setChecklist] = useState(initialChecklist);
  const [pendingUpdate, setPendingUpdate] = useState({
    taskIndex: null,
    dayIndex: null,
  });

  useEffect(() => {
    localStorage.setItem("checklist", JSON.stringify(checklist));
  }, [checklist]);

  const handleSelection = (taskIndex, dayIndex, value) => {
    const newChecklist = [...checklist];
    newChecklist[taskIndex][dayIndex] = value;
    setChecklist(newChecklist);
    setPendingUpdate({ taskIndex: null, dayIndex: null });
  };

  const confirmSelection = (taskIndex, dayIndex) => {
    setPendingUpdate({ taskIndex, dayIndex });
  };

  return (
    <div className="p-4">
      <div
        id="checklist-table"
        className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {tasks.map((task, taskIndex) => (
          <div
            key={taskIndex}
            className="border rounded-lg p-4 bg-green-100 flex flex-col justify-between min-h-[300px]"
          >
            <h2 className="font-bold text-lg mb-2">{task}</h2>
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 30 }, (_, dayIndex) => (
                <div key={dayIndex} className="relative">
                  <div
                    className={`h-10 w-10 flex items-center justify-center rounded-full cursor-pointer ${
                      checklist[taskIndex][dayIndex] === "yes"
                        ? "bg-green-500 text-white font-medium"
                        : checklist[taskIndex][dayIndex] === "no"
                        ? "bg-red-500 text-white font-medium"
                        : "bg-gray-200"
                    }`}
                    onClick={() => confirmSelection(taskIndex, dayIndex)}
                  >
                    {dayIndex + 1}
                  </div>

                  {pendingUpdate.taskIndex === taskIndex &&
                    pendingUpdate.dayIndex === dayIndex && (
                      <div className="absolute z-10 bg-white border rounded-lg shadow-md mt-2 left-0 right-0">
                        <button
                          onClick={() =>
                            handleSelection(taskIndex, dayIndex, "yes")
                          }
                          className="block px-4 py-2 text-green-600 hover:bg-green-200 w-full text-center"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() =>
                            handleSelection(taskIndex, dayIndex, "no")
                          }
                          className="block px-4 py-2 text-red-600 hover:bg-red-200 w-full text-center"
                        >
                          No
                        </button>
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checklist;
