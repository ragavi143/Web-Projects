import { useState } from "react";
import { Link } from "react-router-dom";

export default function TaskCard({
  task,
  toggleComplete,
  deleteTask,
  updateTask,
}) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    title: task.title,
    description: task.description || "",
    dueDate: task.dueDate,
    dueTime: task.dueTime || "",
    priority: task.priority,
    category: task.category,
    reminder: task.reminder,
  });

  const today = new Date().toLocaleDateString("en-CA");

  const overdue =
    !task.completed && task.dueDate < today;

  const saveEdit = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.dueDate) {
      alert("Please enter a title and due date.");
      return;
    }

    updateTask(task.id, {
      ...form,
      title: form.title.trim(),
    });

    setEditing(false);
  };

  const formatDate = (date) => {
    if (!date) return "No date";
    return new Date(date + "T00:00:00").toLocaleDateString(
      "en-IN",
      { day: "numeric", month: "short", year: "numeric" }
    );
  };

  if (editing) {
    return (
      <form className="edit-task-form" onSubmit={saveEdit}>
        <input
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          placeholder="Task title"
          required
        />

        <textarea
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          placeholder="Description"
        />

        <div className="form-row">
          <input
            type="date"
            value={form.dueDate}
            onChange={(e) =>
              setForm({ ...form, dueDate: e.target.value })
            }
            required
          />

          <input
            type="time"
            value={form.dueTime}
            onChange={(e) =>
              setForm({ ...form, dueTime: e.target.value })
            }
          />
        </div>

        <div className="form-row">
          <select
            value={form.priority}
            onChange={(e) =>
              setForm({ ...form, priority: e.target.value })
            }
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <select
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          >
            <option>College</option>
            <option>Personal</option>
            <option>Work</option>
            <option>Other</option>
          </select>
        </div>

        <div className="task-actions">
          <button className="btn btn-primary" type="submit">
            Save changes
          </button>

          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => setEditing(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <article className={`task-card ${task.completed ? "task-done" : ""}`}>
      <div className="task-check">
        <button
          className={`check-button ${task.completed ? "checked" : ""}`}
          onClick={() => toggleComplete(task.id)}
          aria-label="Toggle task completion"
        >
          {task.completed ? "✓" : ""}
        </button>
      </div>

      <div className="task-main">
        <h4>{task.title}</h4>

        {task.description && (
          <p className="task-description">{task.description}</p>
        )}

        <div className="task-meta">
          <span>◷ {formatDate(task.dueDate)}</span>

          {task.dueTime && <span>{task.dueTime}</span>}

          <span className="category-badge">{task.category}</span>
        </div>
      </div>

      <div className="task-side">
        <span className={`priority priority-${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>

        <span
          className={`status-badge ${
            task.completed
              ? "status-completed"
              : overdue
              ? "status-overdue"
              : "status-pending"
          }`}
        >
          {task.completed
            ? "Completed"
            : overdue
            ? "Overdue"
            : "Pending"}
        </span>

        <div className="task-actions">
          <button
            className="icon-btn"
            title="Edit task"
            onClick={() => setEditing(true)}
          >
            ✎
          </button>

          <button
            className="icon-btn delete-btn"
            title="Delete task"
            onClick={() => {
              if (window.confirm("Delete this task?")) {
                deleteTask(task.id);
              }
            }}
          >
            ×
          </button>
        </div>
      </div>
    </article>
  );
}