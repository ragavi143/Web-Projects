import { useState } from "react";
import "./App.css";

function FormValidation() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [message, setMessage] = useState("");

  function submitForm(e) {
    e.preventDefault();

    if (name === "") {
      setMessage("Please enter your name");
      return;
    }

    if (!email.includes("@")) {
      setMessage("Please enter a valid email");
      return;
    }

    if (mobile.length !== 10) {
      setMessage("Mobile number must contain 10 digits");
      return;
    }

    if (password.length < 8) {
      setMessage("Password must contain at least 8 characters");
      return;
    }

    if (password !== confirm) {
      setMessage("Passwords do not match");
      return;
    }

    setMessage("Registration successful!");
  }

  return (
    <div className="page">
      <div className="card">

        <h2>Student Registration</h2>

        <form onSubmit={submitForm}>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          <button type="submit">Register</button>

          <p className="message">{message}</p>

        </form>

      </div>
    </div>
  );
}

export default FormValidation;