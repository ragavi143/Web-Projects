import { useState } from "react";
import { Link } from "react-router-dom";
import CalendarGrid from "../components/CalendarGrid";
import TaskCard from "../components/TaskCard";
import EmptyState from "../components/EmptyState";

export default function Calendar({
  tasks,
  toggleComplete,
  deleteTask,
  updateTask,
}) {
  const [current, setCurrent] = useState(new Date());

  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );

  const year = current.getFullYear();
  const month = current.getMonth();

  const monthName = current.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  const moveMonth = (amount) => {
    setCurrent(new Date(year, month + amount, 1));
  };

  const selectedTasks = tasks.filter(
    (task) => task.dueDate === selectedDate
  );

  const selectedLabel = selectedDate
    ? new Date(selectedDate + "T00:00:00").toLocaleDateString(
        "en-IN",
        { weekday: "long", day: "numeric", month: "long" }
      )
    : "";

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <span className="eyebrow">PLAN AHEAD</span>
          <h1>Your calendar<span> ✦</span></h1>
          <p className="page-subtitle">
            See your deadlines and plans at a glance.
          </p>
        </div>

        <Link
          to={`/add?date=${selectedDate}`}
          className="btn btn-primary"
        >
          + Add Task
        </Link>
      </header>

      <div className="calendar-layout">
        <section className="panel calendar-panel">
          <div className="calendar-header">
            <div>
              <span className="eyebrow">YOUR SCHEDULE</span>
              <h2>{monthName}</h2>
            </div>

            <div className="calendar-controls">
              <button
                className="icon-btn"
                onClick={() => moveMonth(-1)}
                aria-label="Previous month"
              >
                ‹
              </button>

              <button
                className="icon-btn"
                onClick={() => moveMonth(1)}
                aria-label="Next month"
              >
                ›
              </button>
            </div>
          </div>

          <CalendarGrid
            year={year}
            month={month}
            tasks={tasks}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />

          <div className="calendar-legend">
            <span><i className="legend-dot" /> Has tasks</span>
            <span><i className="legend-dot legend-done" /> Completed</span>
          </div>
        </section>

        <aside className="panel selected-date-panel">
          <span className="eyebrow">SELECTED DAY</span>
          <h2>{selectedLabel}</h2>

          <div className="selected-date-count">
            <strong>{selectedTasks.length}</strong>
            <span>
              {selectedTasks.length === 1 ? "scheduled task" : "scheduled tasks"}
            </span>
          </div>

          <Link
            to={`/add?date=${selectedDate}`}
            className="btn btn-primary btn-full"
          >
            + Add for this day
          </Link>

          <div className="selected-day-tasks">
            {selectedTasks.length === 0 ? (
              <EmptyState
                title="A free day"
                message="No tasks scheduled for this date."
              />
            ) : (
              selectedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  toggleComplete={toggleComplete}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              ))
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}