import { useMemo, useState } from "react";
import TaskCard from "../components/TaskCard";
import EmptyState from "../components/EmptyState";

export default function MyTasks({
  tasks,
  toggleComplete,
  deleteTask,
  updateTask,
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [category, setCategory] = useState("All");

  const today = new Date().toLocaleDateString("en-CA");

  const filtered = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        (task.description || "").toLowerCase().includes(search.toLowerCase());

      const taskStatus = task.completed
        ? "Completed"
        : task.dueDate < today
        ? "Overdue"
        : "Pending";

      return (
        matchesSearch &&
        (status === "All" || status === taskStatus) &&
        (priority === "All" || priority === task.priority) &&
        (category === "All" || category === task.category)
      );
    });
  }, [tasks, search, status, priority, category, today]);

  const tabs = ["All", "Pending", "Completed", "Overdue"];

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <span className="eyebrow">YOUR WORK, YOUR WAY</span>
          <h1>My Tasks<span> ✦</span></h1>
          <p className="page-subtitle">
            Organize, prioritize, and get things done.
          </p>
        </div>
        <a href="/add" className="btn btn-primary">+ Add Task</a>
      </header>

      <div className="panel tasks-toolbar">
        <input
          className="search-input"
          type="search"
          placeholder="⌕  Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="filter-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`filter-tab ${status === tab ? "active" : ""}`}
              onClick={() => setStatus(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="filter-selects">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            aria-label="Filter by priority"
          >
            <option value="All">All priorities</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter by category"
          >
            <option value="All">All categories</option>
            <option>College</option>
            <option>Personal</option>
            <option>Work</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <div className="list-heading">
        <h2>{status} tasks</h2>
        <span>{filtered.length} tasks found</span>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No matching tasks"
          message={
            tasks.length
              ? "Try changing your filters or search term."
              : "Create your first task to get started."
          }
          button={tasks.length === 0}
        />
      ) : (
        <div className="task-list">
          {filtered.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              toggleComplete={toggleComplete}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </div>
      )}
    </div>
  );
}