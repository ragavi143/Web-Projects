const categories = [
  { icon: '⌘', title: 'Programming', skills: ['Java', 'Python', 'DSA'] },
  { icon: '◫', title: 'Web Development', skills: ['HTML', 'CSS', 'JavaScript', 'React.js'] },
  { icon: '▤', title: 'Database', skills: ['DBMS', 'MongoDB', 'SQL Concepts'] },
  { icon: '☁', title: 'Cloud Computing', skills: ['Cloud Concepts', 'Cloud Services'] },
  { icon: '⚙', title: 'DevOps', skills: ['Git', 'GitHub', 'Development Workflow'] },
  { icon: '✦', title: 'Tools', skills: ['VS Code', 'GitHub', 'Vite'] },
]

function Skills() {
  return (
    <main className="page-shell inner-page">
      <section className="section-heading">
        <span className="eyebrow">Skills</span>
        <h1>Tools and technologies I&apos;m exploring.</h1>
        <p>My current toolkit is growing as I learn, practice and build more projects.</p>
      </section>

      <section className="skills-grid">
        {categories.map((category) => (
          <article className="skill-card" key={category.title}>
            <div className="skill-icon">{category.icon}</div>
            <h2>{category.title}</h2>
            <div className="skill-badges">{category.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
          </article>
        ))}
      </section>

      <section className="skill-note"><span>☁</span><div><strong>Always learning</strong><p>Technology changes quickly, so I&apos;m focused on building strong fundamentals and learning through projects.</p></div></section>
    </main>
  )
}

export default Skills
