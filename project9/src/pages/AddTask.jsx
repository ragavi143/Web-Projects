import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function AddTask({ addTask }) {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: params.get("date") || "",
    dueTime: "",
    priority: "Medium",
    category: "College",
    reminder: false,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      setError("Please enter a task title.");
      return;
    }

    if (!form.dueDate) {
      setError("Please select a due date.");
      return;
    }

    addTask({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
    });

    navigate("/tasks");
  };

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <span className="eyebrow">MAKE IT HAPPEN</span>
          <h1>Create a task<span> ✦</span></h1>
          <p className="page-subtitle">
            Break your goals into manageable steps.
          </p>
        </div>
      </header>

      <div className="form-layout">
        <form className="panel task-form" onSubmit={handleSubmit}>
          <div className="form-heading">
            <div className="form-heading-icon">＋</div>
            <div>
              <h2>Task details</h2>
              <p>Fill in the details of your new task.</p>
            </div>
          </div>

          {error && <div className="form-error">{error}</div>}

          <label htmlFor="title">Task title *</label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Complete DBMS assignment"
            maxLength={120}
            required
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Add more details (optional)"
            rows="4"
          />

          <div className="form-row">
            <div>
              <label htmlFor="dueDate">Due date *</label>
              <input
                id="dueDate"
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="dueTime">Due time</label>
              <input
                id="dueTime"
                type="time"
                name="dueTime"
                value={form.dueTime}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div>
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                value={form.priority}
                onChange={handleChange}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div>
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option>College</option>
                <option>Personal</option>
                <option>Work</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <label className="reminder-option">
            <input
              type="checkbox"
              name="reminder"
              checked={form.reminder}
              onChange={handleChange}
            />
            <span>
              <strong>Enable reminder</strong>
              <small>Save a reminder preference for this task.</small>
            </span>
          </label>

          <div className="form-footer">
            <Link to="/tasks" className="btn btn-ghost">Cancel</Link>
            <button className="btn btn-primary" type="submit">
              Create Task →
            </button>
          </div>
        </form>

        <aside className="form-aside">
          <div className="form-aside-art">✦</div>
          <h3>Plan with purpose.</h3>
          <p>
            Give every task a clear deadline and priority.
            A little planning goes a long way.
          </p>
          <div className="mini-tip">
            <strong>Quick tip</strong>
            <p>Start with one important task, then build your momentum.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}