import { useState } from 'react'

function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="page-shell inner-page contact-page">
      <section className="section-heading">
        <span className="eyebrow">Contact</span>
        <h1>Let&apos;s connect and create something.</h1>
        <p>Have a project idea, feedback or just want to say hello? Send me a message.</p>
      </section>

      <section className="contact-grid">
        <div className="contact-info">
          <div className="contact-cloud">☁</div>
          <h2>Reach me online</h2>
          <p>I&apos;m always interested in learning, collaborating and discovering new web development ideas.</p>
          <a href="mailto:ragavi20092006@gmail.com"><span>✉</span> ragavi20092006@gmail.com</a>
          <a href="https://github.com/" target="_blank" rel="noreferrer"><span>◉</span> GitHub</a>
          <a href="https://www.linkedin.com/feed/" target="_blank" rel="noreferrer"><span>in</span> LinkedIn</a>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Name<input type="text" name="name" placeholder="Your name" required /></label>
          <label>Email<input type="email" name="email" placeholder="you@example.com" required /></label>
          <label>Message<textarea name="message" rows="6" placeholder="Write your message..." required></textarea></label>
          <button className="primary-btn" type="submit">Send Message →</button>
          {submitted && <p className="form-success">Thank you! Your message is ready to be connected to a backend/email service.</p>}
        </form>
      </section>
    </main>
  )
}

export default Contact
