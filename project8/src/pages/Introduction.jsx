function Introduction() {
  const steps = [
    { number: '01', title: 'Started with Computer Science', text: 'My degree introduced me to programming fundamentals, logical thinking and the building blocks of software.' },
    { number: '02', title: 'Exploring the Web', text: 'I became interested in how websites work and started learning HTML, CSS, JavaScript and React.' },
    { number: '03', title: 'Building Projects', text: 'Small applications helped me connect theory with practice and understand how different technologies work together.' },
    { number: '04', title: 'Looking Ahead', text: 'I want to continue improving my web development skills and grow toward a professional web development career.' },
  ]

  return (
    <main className="page-shell inner-page">
      <section className="section-heading">
        <span className="eyebrow">My introduction</span>
        <h1>The journey behind the code.</h1>
        <p>A simple timeline of where I started, what I&apos;m learning and where I want to grow.</p>
      </section>

      <section className="timeline">
        {steps.map((step) => (
          <article className="timeline-item" key={step.number}>
            <div className="timeline-number">{step.number}</div>
            <div className="timeline-line"></div>
            <div className="timeline-content">
              <h2>{step.title}</h2>
              <p>{step.text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="learning-grid">
        <article className="gradient-card"><span>Currently learning</span><h2>React + Web Development</h2><p>Creating reusable components, routing pages and responsive interfaces.</p></article>
        <article className="glass-card"><span className="mini-label">INTERESTS</span><h2>Build useful things</h2><p>Web development, problem solving, programming and learning new technologies.</p></article>
      </section>
    </main>
  )
}

export default Introduction
