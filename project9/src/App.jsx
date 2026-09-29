import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import AddTask from "./pages/AddTask";
import MyTasks from "./pages/MyTasks";
import Calendar from "./pages/Calendar";
import Statistics from "./pages/Statistics";
import Settings from "./pages/Settings";

const TASK_KEY = "tasknest_tasks";
const SETTINGS_KEY = "tasknest_settings";

const readStorage = (key, fallback) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
};

export default function App() {
  const [tasks, setTasks] = useState(() =>
    readStorage(TASK_KEY, [])
  );

  const [settings, setSettings] = useState(() =>
    readStorage(SETTINGS_KEY, {
      darkMode: false,
      notifications: false,
    })
  );

  useEffect(() => {
    localStorage.setItem(TASK_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify(settings)
    );

    document.documentElement.dataset.theme =
      settings.darkMode ? "dark" : "light";
  }, [settings]);

  const addTask = (task) => {
    setTasks((prev) => [
      {
        ...task,
        id: crypto.randomUUID(),
        completed: false,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const updateTask = (id, changes) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...changes } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
  setTasks((prev) =>
    prev.map((task) => {
      if (task.id !== id) return task;

      const completed = !task.completed;

      return {
        ...task,
        completed,
        completedAt: completed ? new Date().toISOString() : null,
      };
    })
  );
};

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  const clearAll = () => setTasks([]);

  const changeSettings = (changes) => {
    setSettings((prev) => ({ ...prev, ...changes }));
  };

  const shared = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
  };

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={<Dashboard {...shared} />}
          />

          <Route
            path="/add"
            element={<AddTask {...shared} />}
          />

          <Route
            path="/tasks"
            element={<MyTasks {...shared} />}
          />

          <Route
            path="/calendar"
            element={<Calendar {...shared} />}
          />

          <Route
            path="/statistics"
            element={<Statistics tasks={tasks} />}
          />

          <Route
            path="/settings"
            element={
              <Settings
                settings={settings}
                changeSettings={changeSettings}
                clearCompleted={clearCompleted}
                clearAll={clearAll}
              />
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}