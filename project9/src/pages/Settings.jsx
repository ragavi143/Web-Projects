export default function Settings({
  settings,
  changeSettings,
  clearCompleted,
  clearAll,
}) {
  const handleClearAll = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete ALL tasks? This action cannot be undone."
    );

    if (confirmed) {
      clearAll();
      alert("All tasks have been deleted.");
    }
  };

  const handleClearCompleted = () => {
    if (window.confirm("Delete all completed tasks?")) {
      clearCompleted();
    }
  };

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <span className="eyebrow">MAKE IT YOURS</span>
          <h1>Settings<span> ✦</span></h1>
          <p className="page-subtitle">
            Customize your TaskNest workspace.
          </p>
        </div>
      </header>

      <div className="settings-layout">
        <section className="panel settings-panel">
          <div className="settings-section-title">
            <span className="settings-icon">◐</span>
            <div>
              <h3>Appearance</h3>
              <p>Choose how TaskNest looks on your device.</p>
            </div>
          </div>

          <div className="setting-row">
            <div>
              <strong>Dark mode</strong>
              <p>Use a darker theme that's easier on the eyes.</p>
            </div>

            <label className="switch">
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={(e) =>
                  changeSettings({ darkMode: e.target.checked })
                }
              />
              <span className="switch-slider" />
            </label>
          </div>

          <div className="settings-section-title">
            <span className="settings-icon">♧</span>
            <div>
              <h3>Notifications</h3>
              <p>Manage your reminder preferences.</p>
            </div>
          </div>

          <div className="setting-row">
            <div>
              <strong>Enable notifications</strong>
              <p>Allow browser notifications for reminders.</p>
            </div>

            <label className="switch">
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={async (e) => {
                  const enabled = e.target.checked;

                  if (
                    enabled &&
                    "Notification" in window &&
                    Notification.permission === "default"
                  ) {
                    const permission =
                      await Notification.requestPermission();

                    if (permission !== "granted") {
                      alert("Please allow browser notifications.");
                      return;
                    }
                  }

                  if (
                    enabled &&
                    "Notification" in window &&
                    Notification.permission === "denied"
                  ) {
                    alert("Notifications are blocked in your browser settings.");
                    return;
                  }

                  changeSettings({ notifications: enabled });
                }}
              />
              <span className="switch-slider" />
            </label>
          </div>

          <div className="settings-section-title">
            <span className="settings-icon">⌫</span>
            <div>
              <h3>Manage data</h3>
              <p>Remove tasks from your local workspace.</p>
            </div>
          </div>

          <div className="setting-row">
            <div>
              <strong>Clear completed tasks</strong>
              <p>Remove all tasks marked as completed.</p>
            </div>

            <button
              className="btn btn-ghost"
              onClick={handleClearCompleted}
            >
              Clear completed
            </button>
          </div>

          <div className="setting-row">
            <div>
              <strong>Clear all tasks</strong>
              <p>Delete all tasks stored in this browser.</p>
            </div>

            <button
              className="btn btn-danger"
              onClick={handleClearAll}
            >
              Delete all
            </button>
          </div>
        </section>

        <aside className="panel settings-info">
          <div className="brand-icon">T</div>
          <h3>TaskNest</h3>
          <p>A simple space for your everyday goals.</p>
          <div className="info-divider" />
          <p><strong>Version</strong><span>1.0.0</span></p>
          <p><strong>Storage</strong><span>Browser localStorage</span></p>
          <p><strong>Backend</strong><span>Not required</span></p>
        </aside>
      </div>
    </div>
  );
}