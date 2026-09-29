export default function StatCard({
  label,
  value,
  icon,
  color = "green",
  note,
}) {
  return (
    <div className={`stat-card stat-${color}`}>
      <div className="stat-top">
        <span>{label}</span>
        <span className="stat-icon">{icon}</span>
      </div>

      <h2>{value}</h2>

      {note && <p className="stat-note">{note}</p>}
    </div>
  );
}