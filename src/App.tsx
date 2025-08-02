import { useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [validationMessage, setValidationMessage] = useState<string>("");

  const handleAddTask = (): void => {
    if (newTask.trim().length < 5) {
      setValidationMessage("Task must be minimum 5 characters");
      return;
    }
    setTasks([
      ...tasks,
      { id: Date.now(), text: newTask.trim(), completed: false },
    ]);
    setNewTask("");
    setValidationMessage("");
  };

  const toggleTask = (id: number): void => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number): void => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewTask(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") handleAddTask();
  };

  return (
    <div className="grid place-content-center h-[100vh] w-[100vw] bg-primary-foreground">
      <div className="w-[70vw] p-4">
        <Input
          value={newTask}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          className="bg-secondary"
          placeholder="Create New Task"
          type="text"
        />
        {validationMessage && (
          <p className="text-red-500 text-sm mt-2">{validationMessage}</p>
        )}

        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-2 flex justify-between items-center bg-background rounded-md my-2"
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Checkbox
                  className="bg-secondary"
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                />
              </div>
              <div className="flex items-center">
                <p
                  className={`font-semibold ${
                    task.completed ? "line-through opacity-50" : ""
                  }`}
                >
                  {task.text}
                </p>
              </div>
            </div>
            <div>
              <Trash2
                size={18}
                onClick={() => deleteTask(task.id)}
                className="cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
