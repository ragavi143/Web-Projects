import { Link } from 'react-router-dom'
import photo from '../assets/ragavi.jpg'

function Home() {
  return (
    <main>
      <section className="hero-section page-shell">
        <div className="hero-content">
          <span className="eyebrow">Hello, I&apos;m Ragavi 👋</span>
          <h1>Turning ideas into <span>digital experiences.</span></h1>
          <p className="hero-text">
            I&apos;m a second-year Computer Science Engineering student who enjoys
            building clean, useful and interactive web applications.
          </p>
          <div className="button-row">
            <Link className="primary-btn" to="/projects">View My Projects <span>→</span></Link>
            <Link className="secondary-btn" to="/contact">Contact Me</Link>
          </div>
          <div className="hero-tech">
            <span>React</span><span>Java</span><span>Python</span><span>Web Technology</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="cloud-orbit orbit-one"></div>
          <div className="cloud-orbit orbit-two"></div>
          <div className="photo-card">
            <div className="status-dot"><span></span> Open to learning</div>
            <img src={photo} alt="Ragavi" />
          </div>
          <div className="floating-card floating-card-one">☁️ <strong>Cloud</strong><small>Explore • Build • Learn</small></div>
          <div className="floating-card floating-card-two">&lt;/&gt; <strong>Code</strong><small>Ideas into interfaces</small></div>
        </div>
      </section>

      <section className="quick-section page-shell">
        <div className="section-heading compact">
          <span className="eyebrow">A little about me</span>
          <h2>Curious mind. Creative builder.</h2>
        </div>
        <div className="quick-grid">
          <article className="info-card"><span className="card-icon">🎓</span><h3>Computer Science</h3><p>Learning programming, databases, DSA and modern web technologies.</p></article>
          <article className="info-card"><span className="card-icon">🌐</span><h3>Web Development</h3><p>Interested in creating responsive and user-friendly web experiences.</p></article>
          <article className="info-card"><span className="card-icon">🚀</span><h3>Future Goal</h3><p>Growing my skills step by step toward a career as a web developer.</p></article>
        </div>
      </section>
    </main>
  )
}

export default Home
