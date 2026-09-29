import { NavLink } from "react-router-dom";

const links = [
  { to: "/", icon: "⌂", label: "Dashboard", end: true },
  { to: "/add", icon: "＋", label: "Add Task" },
  { to: "/tasks", icon: "▤", label: "My Tasks" },
  { to: "/calendar", icon: "▦", label: "Calendar" },
  { to: "/statistics", icon: "◒", label: "Statistics" },
  { to: "/settings", icon: "⚙", label: "Settings" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/" className="brand">
        <span className="brand-icon">T</span>
        <span>TaskNest<span className="brand-dot">.</span></span>
      </NavLink>

      <p className="nav-label">WORKSPACE</p>

      <nav className="side-nav">
        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-tip">
          <span className="tip-icon">✦</span>
          <h4>Small steps, big wins.</h4>
          <p>Every completed task brings you closer to your goals.</p>
        </div>

        <div className="profile">
          <div className="avatar">R</div>
          <div>
            <strong>My Workspace</strong>
            <span>Personal planner</span>
          </div>
        </div>
      </div>
    </aside>
  );
}