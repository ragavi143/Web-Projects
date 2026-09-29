import { Link } from "react-router-dom";

export default function EmptyState({
  title = "Nothing here yet",
  message = "Your tasks will appear here when you add them.",
  button = false,
}) {
  return (
    <div className="empty-state">
      <div className="empty-illustration">✦</div>
      <h3>{title}</h3>
      <p>{message}</p>

      {button && (
        <Link to="/add" className="btn btn-primary">
          + Create your first task
        </Link>
      )}
    </div>
  );
}