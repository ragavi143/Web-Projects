import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";
import TaskCard from "../components/TaskCard";
import EmptyState from "../components/EmptyState";

export default function Dashboard({
  tasks,
  toggleComplete,
  deleteTask,
  updateTask,
}) {
  const today = new Date().toLocaleDateString("en-CA");

  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.filter((t) => !t.completed).length;

  const overdue = tasks.filter(
    (t) => !t.completed && t.dueDate < today
  ).length;

  const progress = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;

  const todaysTasks = tasks.filter(
    (t) => t.dueDate === today && !t.completed
  );

  const upcoming = tasks
    .filter((t) => t.dueDate > today && !t.completed)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 4);

  const date = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const shared = { toggleComplete, deleteTask, updateTask };

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <span className="eyebrow">YOUR PERSONAL WORKSPACE</span>
          <h1>Good day, Ragavi <span>✦</span></h1>
          <p className="page-subtitle">
            A little progress each day adds up to big results.
          </p>
        </div>

        <Link to="/add" className="btn btn-primary">
          + Add Task
        </Link>
      </header>

      <div className="date-line">◷ {date}</div>

      <section className="stats-grid">
        <StatCard
          label="Total Tasks"
          value={tasks.length}
          icon="▤"
          color="green"
          note="All your tasks"
        />

        <StatCard
          label="Completed"
          value={completed}
          icon="✓"
          color="purple"
          note="Tasks finished"
        />

        <StatCard
          label="Pending"
          value={pending}
          icon="◷"
          color="orange"
          note="Still to do"
        />

        <StatCard
          label="Overdue"
          value={overdue}
          icon="!"
          color="red"
          note="Past due date"
        />
      </section>

      <section className="dashboard-columns">
        <div className="panel progress-panel">
          <div className="section-heading">
            <div>
              <span className="eyebrow">YOUR MOMENTUM</span>
              <h2>Task progress</h2>
            </div>
            <span className="progress-percent">{progress}%</span>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="muted">
            {completed} of {tasks.length} tasks completed.
            Keep going!
          </p>

          <div className="progress-footer">
            <span>Completed: {completed}</span>
            <span>Remaining: {pending}</span>
          </div>
        </div>

        <div className="panel focus-panel">
          <span className="eyebrow">A GENTLE REMINDER</span>
          <div className="focus-art">✦</div>
          <h3>One thing at a time.</h3>
          <p>Focus on what matters today. You don't need to do everything at once.</p>
          <Link to="/tasks" className="text-link">
            View all tasks →
          </Link>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <span className="eyebrow">YOUR DAILY FOCUS</span>
            <h2>Today's tasks</h2>
          </div>
          <Link to="/tasks" className="text-link">View all →</Link>
        </div>

        {todaysTasks.length === 0 ? (
          <EmptyState
            title="Your day is clear!"
            message="No pending tasks due today. Add a task whenever you need to."
            button
          />
        ) : (
          <div className="task-list">
            {todaysTasks.map((task) => (
              <TaskCard key={task.id} task={task} {...shared} />
            ))}
          </div>
        )}
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <span className="eyebrow">COMING UP NEXT</span>
            <h2>Upcoming tasks</h2>
          </div>
          <Link to="/calendar" className="text-link">Open calendar →</Link>
        </div>

        {upcoming.length === 0 ? (
          <EmptyState
            title="Nothing scheduled ahead"
            message="Your future is open. Add upcoming tasks to plan ahead."
          />
        ) : (
          <div className="task-list">
            {upcoming.map((task) => (
              <TaskCard key={task.id} task={task} {...shared} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}