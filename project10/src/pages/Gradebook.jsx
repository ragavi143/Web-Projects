import { useMemo, useState } from "react";
import { PageTitle, Empty, subjects, grade } from "../components/Ui.jsx";

const blankScores = () => subjects.map(() => "");
const makeResult = (student, values, oldId) => {
  const scores = values.map(Number);
  const total = scores.reduce((a, v) => a + v, 0);
  const percentage = total / subjects.length;
  return {
    id: oldId || crypto.randomUUID(),
    studentId: student.id,
    name: student.name,
    roll: student.roll,
    className: student.className,
    academicYear: "2026–27",
    scores,
    total,
    percentage,
    grade: grade(percentage),
    updatedAt: new Date().toISOString()
  };
};

export default function Gradebook({ students, marks, setMarks }) {
  const classes = [...new Set(students.map(s => s.className).filter(Boolean))];
  const [className, setClassName] = useState(classes[0] || "");
  const [studentId, setStudentId] = useState("");
  const [scores, setScores] = useState(blankScores());
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [report, setReport] = useState(null);
  const [search, setSearch] = useState("");

  const selectedClass = className || "All classes";
  const classStudents = useMemo(
    () => students.filter(s => selectedClass === "All classes" || s.className === selectedClass),
    [students, selectedClass]
  );

  const visibleMarks = useMemo(
    () => marks.filter(m =>
      (selectedClass === "All classes" || m.className === selectedClass) &&
      (m.name + m.roll).toLowerCase().includes(search.toLowerCase())
    ),
    [marks, selectedClass, search]
  );

  const total = scores.reduce((a, v) => a + (v === "" ? 0 : Number(v)), 0);
  const percentage = total / subjects.length;

  function resetForm() {
    setStudentId("");
    setScores(blankScores());
    setEditingId(null);
    setError("");
  }

  function loadForEdit(mark) {
    setClassName(mark.className);
    setStudentId(mark.studentId);
    setScores(mark.scores.map(String));
    setEditingId(mark.id);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function validate(values) {
    return values.some(v => v === "" || !Number.isFinite(Number(v)) || Number(v) < 0 || Number(v) > 100);
  }

  function saveOne(e) {
    e.preventDefault();
    if (!studentId) return setError("Choose a learner first.");
    if (validate(scores)) return setError("Enter a mark from 0 to 100 for every subject.");
    const student = students.find(s => s.id === studentId);
    if (!student) return setError("Learner not found.");

    const result = makeResult(student, scores, editingId);
    setMarks(old => editingId
      ? old.map(m => m.id === editingId ? result : m)
      : [...old.filter(m => m.studentId !== studentId), result]
    );
    resetForm();
  }

  function remove(id) {
    if (confirm("Delete this report card? It will also disappear from Performance Insights.")) {
      setMarks(old => old.filter(m => m.id !== id));
      if (editingId === id) resetForm();
    }
  }

  function printReport(mark) {
    setReport(mark);
    setTimeout(() => window.print(), 100);
  }

  return (
    <>
      <PageTitle
        kicker="ASSESSMENT & EXAMINATIONS"
        title="Marks & gradebook"
        desc="Enter class results, correct mistakes, and print individual report cards."
      />

      <div className="grade-toolbar paper-section">
        <label>
          Class
          <select value={className} onChange={e => { setClassName(e.target.value); resetForm(); }}>
            {classes.length === 0 && <option value="">No classes yet</option>}
            {classes.length > 0 && classes.map(c => <option key={c}>{c}</option>)}
          </select>
        </label>
        <div>
          <span className="eyebrow">ACADEMIC YEAR</span>
          <b>2026–27</b>
        </div>
        <div>
          <span className="eyebrow">CLASS LEARNERS</span>
          <b>{classStudents.length}</b>
        </div>
        <div>
          <span className="eyebrow">SAVED RESULTS</span>
          <b>{marks.filter(m => selectedClass === "All classes" || m.className === selectedClass).length}</b>
        </div>
      </div>

      <div className="grade-layout">
        <section className="paper-section form-paper">
          <span className="eyebrow">{editingId ? "EDIT RESULT" : "RESULT ENTRY"}</span>
          <h3>{editingId ? "Correct examination marks" : "Enter student marks"}</h3>
          <form className="stack-form" onSubmit={saveOne}>
            <label>
              Learner
              <select value={studentId} onChange={e => setStudentId(e.target.value)}>
                <option value="">Select student</option>
                {classStudents.map(s => <option value={s.id} key={s.id}>{s.name} — Roll {s.roll}</option>)}
              </select>
            </label>

            {studentId && (
              <div className="selected-student-note">
                <b>{classStudents.find(s => s.id === studentId)?.name}</b>
                <span>Roll {classStudents.find(s => s.id === studentId)?.roll} · {selectedClass}</span>
              </div>
            )}

            <div className="subject-fields">
              {subjects.map((s, i) => (
                <label key={s}>
                  {s}
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    placeholder="Enter marks / 100"
                    value={scores[i]}
                    onChange={e => setScores(scores.map((v, j) => j === i ? e.target.value : v))}
                  />
                </label>
              ))}
            </div>

            <div className="score-preview">
              <span>TOTAL <b>{total} / 500</b></span>
              <span>PERCENTAGE <b>{percentage.toFixed(1)}%</b></span>
              <span>GRADE <b>{grade(percentage)}</b></span>
            </div>

            {error && <p className="form-error">{error}</p>}
            <div className="form-actions">
              <button className="button primary" type="submit">{editingId ? "Update Marks" : "Save Marks"}</button>
              {editingId && <button className="button secondary-button" type="button" onClick={resetForm}>Cancel</button>}
            </div>
          </form>
        </section>

        <section className="table-paper">
          <div className="table-heading grade-list-heading">
            <div>
              <span className="eyebrow">CLASS REPORT CARD</span>
              <h3>{selectedClass || "Select a class"} <span className="count">{visibleMarks.length}</span></h3>
            </div>
            <input className="grade-search" placeholder="Search student / roll..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          {visibleMarks.length === 0 ? (
            <Empty
              title={students.length ? "No results for this class" : "Add learners first"}
              desc={students.length ? "Enter marks above and the saved student will appear in this class report." : "Go to Learner Directory and register students before entering marks."}
            />
          ) : (
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>ROLL NO.</th><th>STUDENT</th><th>TAMIL</th><th>ENGLISH</th><th>MATHS</th><th>SCIENCE</th><th>SOCIAL</th><th>TOTAL</th><th>%</th><th>GRADE</th><th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleMarks.map(m => (
                    <tr key={m.id}>
                      <td>{m.roll}</td>
                      <td><b>{m.name}</b><small className="cell-sub">{m.className}</small></td>
                      {m.scores.map((score, i) => <td key={subjects[i]}>{score}</td>)}
                      <td><b>{m.total}/500</b></td>
                      <td>{m.percentage.toFixed(1)}%</td>
                      <td><span className="grade-pill">{m.grade}</span></td>
                      <td>
                        <div className="row-actions">
                          <button className="small-action" onClick={() => loadForEdit(m)}>Edit</button>
                          <button className="small-action" onClick={() => printReport(m)}>Print</button>
                          <button className="icon-button danger" onClick={() => remove(m.id)} title="Delete report card">×</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      <section className="paper-section bulk-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">CLASS-WISE BULK ENTRY</span>
            <h3>Enter marks for the whole class</h3>
          </div>
          <span className="muted">Save each row when complete.</span>
        </div>

        {classStudents.length === 0 ? (
          <Empty title="No learners in this class" desc="Register students in Learner Directory first." />
        ) : (
          <div className="bulk-table-wrap">
            <table className="bulk-table">
              <thead><tr><th>ROLL</th><th>STUDENT</th>{subjects.map(s => <th key={s}>{s}</th>)}<th>TOTAL</th><th>GRADE</th><th></th></tr></thead>
              <tbody>
                {classStudents.map(student => (
                  <BulkRow
                    key={student.id}
                    student={student}
                    mark={marks.find(m => m.studentId === student.id)}
                    onSave={(values) => {
                      if (validate(values)) return;
                      setMarks(old => [...old.filter(m => m.studentId !== student.id), makeResult(student, values, marks.find(m => m.studentId === student.id)?.id)]);
                    }}
                    onEdit={loadForEdit}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {report && (
        <div className="report-modal no-print" onClick={() => setReport(null)}>
          <div className="report-card" onClick={e => e.stopPropagation()}>
            <div className="report-head">
              <div><span className="eyebrow">CAMPUS LEDGER</span><h2>Student Report Card</h2><p>Academic Year 2026–27</p></div>
              <button className="modal-close" onClick={() => setReport(null)}>×</button>
            </div>
            <div className="report-student">
              <div><b>{report.name}</b><span>Roll No. {report.roll} · {report.className}</span></div>
              <span className="grade-pill">{report.grade}</span>
            </div>
            <table>
              <thead><tr><th>SUBJECT</th><th>MARKS</th><th>MAXIMUM</th></tr></thead>
              <tbody>{subjects.map((s, i) => <tr key={s}><td>{s}</td><td>{report.scores[i]}</td><td>100</td></tr>)}</tbody>
            </table>
            <div className="report-summary"><b>Total: {report.total} / 500</b><b>Percentage: {report.percentage.toFixed(1)}%</b><b>Grade: {report.grade}</b></div>
            <button className="button primary no-print" onClick={() => window.print()}>Print Report Card</button>
          </div>
        </div>
      )}
    </>
  );
}

function BulkRow({ student, mark, onSave, onEdit }) {
  const [values, setValues] = useState(mark ? mark.scores.map(String) : blankScores());
  const total = values.reduce((a, v) => a + (v === "" ? 0 : Number(v)), 0);
  const valid = values.every(v => v !== "" && Number.isFinite(Number(v)) && Number(v) >= 0 && Number(v) <= 100);

  return (
    <tr>
      <td>{student.roll}</td>
      <td><b>{student.name}</b></td>
      {values.map((v, i) => (
        <td key={subjects[i]}>
          <input className="bulk-input" type="number" min="0" max="100" value={v} onChange={e => setValues(values.map((x, j) => j === i ? e.target.value : x))} />
        </td>
      ))}
      <td><b>{total}/500</b></td>
      <td><span className="grade-pill">{valid ? grade(total / 5) : "—"}</span></td>
      <td><button className="small-action" disabled={!valid} onClick={() => onSave(values)}>{mark ? "Update" : "Save"}</button></td>
    </tr>
  );
}
