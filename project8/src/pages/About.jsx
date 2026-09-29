function About() {
  return (
    <main className="page-shell inner-page">
      <section className="section-heading">
        <span className="eyebrow">About me</span>
        <h1>More than a student — a learner in progress.</h1>
        <p>I enjoy understanding how technology works and turning what I learn into small, practical projects.</p>
      </section>

      <section className="about-grid">
        <article className="glass-card about-story">
          <div className="large-icon">💡</div>
          <h2>My story</h2>
          <p>
            I&apos;m Ragavi, a B.E. Computer Science Engineering student at Prince Dr. K. Vasudevan
            College of Engineering and Technology. My interest in web development has encouraged me
            to explore programming, problem solving, databases and frontend development.
          </p>
          <p>
            I believe every project is a chance to learn something new. I like experimenting with
            interfaces, improving my coding skills and learning technologies that can turn an idea into a useful application.
          </p>
        </article>

        <div className="about-side">
          <article className="glass-card"><span className="mini-label">EDUCATION</span><h3>B.E. Computer Science</h3><p>Prince Dr. K. Vasudevan College of Engineering and Technology</p><strong>2nd Year</strong></article>
          <article className="glass-card"><span className="mini-label">INTEREST</span><h3>Web Development</h3><p>Exploring responsive interfaces, React applications and modern web technologies.</p></article>
        </div>
      </section>

      <section className="journey-banner">
        <div><span className="eyebrow">Learning journey</span><h2>Learn → Build → Improve → Repeat</h2></div>
        <p>From classroom concepts to hands-on projects, I&apos;m building my skills one step at a time.</p>
      </section>
    </main>
  )
}

export default About
