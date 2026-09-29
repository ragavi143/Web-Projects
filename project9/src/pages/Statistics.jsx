import StatCard from "../components/StatCard";
import EmptyState from "../components/EmptyState";

function BarChart({ title, data, color = "green" }) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="panel chart-panel">
      <h3>{title}</h3>

      {data.length === 0 ? (
        <p className="muted">No data available yet.</p>
      ) : (
        <div className="bar-chart">
          {data.map((item) => (
            <div className="bar-row" key={item.label}>
              <span className="bar-label">{item.label}</span>

              <div className="bar-track">
                <div
                  className={`bar-fill bar-${color}`}
                  style={{
                    width: `${(item.value / max) * 100}%`,
                  }}
                />
              </div>

              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Statistics({ tasks }) {
  const today = new Date().toLocaleDateString("en-CA");

  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.filter((t) => !t.completed).length;
  const overdue = tasks.filter(
    (t) => !t.completed && t.dueDate < today
  ).length;

  const percentage = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;

  const categories = ["College", "Personal", "Work", "Other"].map(
    (name) => ({
      label: name,
      value: tasks.filter((t) => t.category === name).length,
    })
  );

  const priorities = ["High", "Medium", "Low"].map((name) => ({
    label: name,
    value: tasks.filter((t) => t.priority === name).length,
  }));

  const lastSevenDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));

    const key = date.toLocaleDateString("en-CA");

    return {
      label: date.toLocaleDateString("en-IN", { weekday: "short" }),
      value: tasks.filter(
        (t) => t.completed && t.completedAt?.slice(0, 10) === key
      ).length,
    };
  });

  const completionData = [
    { label: "Completed", value: completed },
    { label: "Pending", value: pending },
  ];

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <span className="eyebrow">YOUR PROGRESS, VISUALIZED</span>
          <h1>Statistics<span> ✦</span></h1>
          <p className="page-subtitle">
            Understand your productivity and progress.
          </p>
        </div>
      </header>

      <section className="stats-grid">
        <StatCard label="Total tasks" value={tasks.length} icon="▤" />
        <StatCard label="Completed" value={completed} icon="✓" color="purple" />
        <StatCard label="Pending" value={pending} icon="◷" color="orange" />
        <StatCard label="Overdue" value={overdue} icon="!" color="red" />
      </section>

      {tasks.length === 0 ? (
        <EmptyState
          title="Your statistics will appear here"
          message="Start creating tasks to see your productivity insights."
          button
        />
      ) : (
        <>
          <section className="panel overall-progress">
            <div>
              <span className="eyebrow">OVERALL COMPLETION</span>
              <h2>{percentage}%</h2>
              <p className="muted">
                You've completed {completed} out of {tasks.length} tasks.
              </p>
            </div>

            <div className="progress-track large-track">
              <div
                className="progress-fill"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </section>

          <section className="charts-grid">
            <BarChart title="Tasks by category" data={categories} />
            <BarChart title="Tasks by priority" data={priorities} color="orange" />
            <BarChart title="Completed vs pending" data={completionData} color="purple" />
            <BarChart title="Completed in the last 7 days" data={lastSevenDays} />
          </section>
        </>
      )}
    </div>
  );
}