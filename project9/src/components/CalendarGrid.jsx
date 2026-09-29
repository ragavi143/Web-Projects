export default function CalendarGrid({
  year,
  month,
  tasks,
  selectedDate,
  onSelectDate,
}) {
  const firstDay = new Date(year, month, 1).getDay();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  while (cells.length % 7 !== 0) cells.push(null);

  const dateKey = (day) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  return (
    <div className="calendar-grid">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
        (day) => (
          <div className="calendar-weekday" key={day}>
            {day}
          </div>
        )
      )}

      {cells.map((day, index) => {
        const key = day ? dateKey(day) : "";
        const dayTasks = tasks.filter((task) => task.dueDate === key);

        const today = new Date().toLocaleDateString("en-CA");

        return (
          <button
            key={index}
            disabled={!day}
            className={[
              "calendar-day",
              day && key === selectedDate ? "selected-day" : "",
              day && key === today ? "today" : "",
            ].join(" ")}
            onClick={() => day && onSelectDate(key)}
          >
            {day && (
              <>
                <span className="day-number">{day}</span>

                {dayTasks.length > 0 && (
                  <span className="day-task-count">
                    {dayTasks.length} {dayTasks.length === 1 ? "task" : "tasks"}
                  </span>
                )}

                <div className="day-dots">
                  {dayTasks.slice(0, 3).map((task) => (
                    <span
                      key={task.id}
                      className={`day-dot ${
                        task.completed ? "dot-completed" : ""
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}