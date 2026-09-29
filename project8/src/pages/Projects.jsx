const projects = [
  { icon: '◈', title: 'Personal Portfolio Website', description: 'A responsive portfolio website that presents my journey, skills, projects and contact information.', tech: ['React.js', 'CSS', 'JavaScript', 'React Router DOM'] },
  { icon: '✓', title: 'Student Attendance Management System', description: 'A web application concept for organizing student attendance information through a simple interface.', tech: ['React.js', 'Node.js', 'MongoDB'] },
  { icon: '🍔', title: 'Online Food Delivery Application', description: 'A food delivery application concept focused on browsing food items, placing orders and creating a smooth user experience.', tech: ['React.js', 'JavaScript', 'Web Technology'] },
  { icon: '▣', title: 'Calculator', description: 'A simple interactive calculator project built to practice user input, events and application logic.', tech: ['HTML', 'CSS', 'JavaScript'] },
  { icon: '☑', title: 'To-Do Application', description: 'A task management application for adding, tracking and completing everyday tasks.', tech: ['React.js', 'CSS', 'JavaScript'] },
]

function Projects() {
  return (
    <main className="page-shell inner-page">
      <section className="section-heading">
        <span className="eyebrow">Projects</span>
        <h1>Things I&apos;ve built while learning.</h1>
        <p>Each project is a practical way for me to turn concepts into working applications.</p>
      </section>

      <section className="projects-grid">
        {projects.map((project, index) => (
          <article className="project-card" key={project.title}>
            <div className="project-top"><span className="project-icon">{project.icon}</span><span className="project-number">0{index + 1}</span></div>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <div className="tech-list">{project.tech.map((item) => <span key={item}>{item}</span>)}</div>
            <div className="project-actions"><a href="https://github.com/" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://github.com/" target="_blank" rel="noreferrer">Demo ↗</a></div>
          </article>
        ))}
      </section>
    </main>
  )
}

export default Projects
