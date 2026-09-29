import { useState } from "react";
import "./App.css";

function Valid() {
  const [formData, setFormData] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    joiningDate: "",
    gender: "",
    jobRole: "",
    department: "",
    experience: "",
    salary: "",
    address: "",
    city: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: ""
    });

    setSubmitted(false);
  };

  // Form validation
  const validateForm = () => {
    let newErrors = {};

    // 1. Employee ID
    if (formData.employeeId.trim() === "") {
      newErrors.employeeId = "Employee ID is required";
    } else if (!/^EMP[0-9]{4}$/.test(formData.employeeId)) {
      newErrors.employeeId =
        "Employee ID must be in format EMP1234";
    }

    // 2. First Name
    if (formData.firstName.trim() === "") {
      newErrors.firstName = "First name is required";
    } else if (!/^[A-Za-z]+$/.test(formData.firstName)) {
      newErrors.firstName =
        "First name should contain only letters";
    }

    // 3. Last Name
    if (formData.lastName.trim() === "") {
      newErrors.lastName = "Last name is required";
    } else if (!/^[A-Za-z]+$/.test(formData.lastName)) {
      newErrors.lastName =
        "Last name should contain only letters";
    }

    // 4. Email
    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    // 5. Phone
    if (formData.phone.trim() === "") {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone =
        "Phone number must contain exactly 10 digits";
    }

    // 6. Joining Date
    if (formData.joiningDate === "") {
      newErrors.joiningDate = "Joining date is required";
    }

    // 7. Gender
    if (formData.gender === "") {
      newErrors.gender = "Please select your gender";
    }

    // 8. Job Role
    if (formData.jobRole === "") {
      newErrors.jobRole = "Please select a job role";
    }

    // 9. Department
    if (formData.department === "") {
      newErrors.department = "Please select a department";
    }

    // 10. Experience
    if (formData.experience === "") {
      newErrors.experience = "Experience is required";
    } else if (
      Number(formData.experience) < 0 ||
      Number(formData.experience) > 40
    ) {
      newErrors.experience =
        "Experience must be between 0 and 40 years";
    }

    // 11. Salary
    if (formData.salary === "") {
      newErrors.salary = "Salary is required";
    } else if (Number(formData.salary) <= 0) {
      newErrors.salary = "Salary must be greater than 0";
    }

    // 12. Address
    if (formData.address.trim() === "") {
      newErrors.address = "Address is required";
    } else if (formData.address.length < 10) {
      newErrors.address =
        "Address must contain at least 10 characters";
    }

    // 13. City
    if (formData.city.trim() === "") {
      newErrors.city = "City is required";
    } else if (!/^[A-Za-z ]+$/.test(formData.city)) {
      newErrors.city =
        "City should contain only letters";
    }

    // 14. Password
    if (formData.password === "") {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password =
        "Password must contain at least 8 characters";
    } else if (
      !/[A-Z]/.test(formData.password) ||
      !/[a-z]/.test(formData.password) ||
      !/[0-9]/.test(formData.password)
    ) {
      newErrors.password =
        "Password must contain uppercase, lowercase and number";
    }

    // 15. Confirm Password
    if (formData.confirmPassword === "") {
      newErrors.confirmPassword =
        "Please confirm your password";
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setSubmitted(true);
      console.log("Employee Data:", formData);
    } else {
      setSubmitted(false);
    }
  };

  // Reset
  const handleReset = () => {
    setFormData({
      employeeId: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      joiningDate: "",
      gender: "",
      jobRole: "",
      department: "",
      experience: "",
      salary: "",
      address: "",
      city: "",
      password: "",
      confirmPassword: ""
    });

    setErrors({});
    setSubmitted(false);
  };

  return (
    <div className="page">
      <div className="form-container">

        <h1>Employee Registration Form</h1>

        <p className="subtitle">
          Enter your professional details
        </p>

        {submitted && (
          <div className="success-message">
            ✓ Employee registered successfully!
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* 1 Employee ID */}
          <div className="form-group">
            <label>1. Employee ID</label>

            <input
              type="text"
              name="employeeId"
              placeholder="Example: EMP1234"
              value={formData.employeeId}
              onChange={handleChange}
            />

            {errors.employeeId && (
              <span className="error">
                {errors.employeeId}
              </span>
            )}
          </div>

          {/* 2 First Name */}
          <div className="form-group">
            <label>2. First Name</label>

            <input
              type="text"
              name="firstName"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleChange}
            />

            {errors.firstName && (
              <span className="error">
                {errors.firstName}
              </span>
            )}
          </div>

          {/* 3 Last Name */}
          <div className="form-group">
            <label>3. Last Name</label>

            <input
              type="text"
              name="lastName"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleChange}
            />

            {errors.lastName && (
              <span className="error">
                {errors.lastName}
              </span>
            )}
          </div>

          {/* 4 Email */}
          <div className="form-group">
            <label>4. Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleChange}
            />

            {errors.email && (
              <span className="error">
                {errors.email}
              </span>
            )}
          </div>

          {/* 5 Phone */}
          <div className="form-group">
            <label>5. Phone Number</label>

            <input
              type="text"
              name="phone"
              placeholder="Enter 10 digit phone number"
              value={formData.phone}
              onChange={handleChange}
            />

            {errors.phone && (
              <span className="error">
                {errors.phone}
              </span>
            )}
          </div>

          {/* 6 Joining Date */}
          <div className="form-group">
            <label>6. Date of Joining</label>

            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
            />

            {errors.joiningDate && (
              <span className="error">
                {errors.joiningDate}
              </span>
            )}
          </div>

          {/* 7 Gender */}
          <div className="form-group">
            <label>7. Gender</label>

            <div className="radio-group">

              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                />
                Male
              </label>

              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                />
                Female
              </label>

              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={formData.gender === "Other"}
                  onChange={handleChange}
                />
                Other
              </label>

            </div>

            {errors.gender && (
              <span className="error">
                {errors.gender}
              </span>
            )}
          </div>

          {/* 8 Job Role */}
          <div className="form-group">
            <label>8. Job Role</label>

            <select
              name="jobRole"
              value={formData.jobRole}
              onChange={handleChange}
            >
              <option value="">
                -- Select Job Role --
              </option>

              <option value="Software Developer">
                Software Developer
              </option>

              <option value="Web Developer">
                Web Developer
              </option>

              <option value="Data Analyst">
                Data Analyst
              </option>

              <option value="UI Designer">
                UI Designer
              </option>

              <option value="Tester">
                Software Tester
              </option>
            </select>

            {errors.jobRole && (
              <span className="error">
                {errors.jobRole}
              </span>
            )}
          </div>

          {/* 9 Department */}
          <div className="form-group">
            <label>9. Department</label>

            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="">
                -- Select Department --
              </option>

              <option value="IT">IT</option>
              <option value="Development">Development</option>
              <option value="Testing">Testing</option>
              <option value="HR">Human Resources</option>
              <option value="Finance">Finance</option>
            </select>

            {errors.department && (
              <span className="error">
                {errors.department}
              </span>
            )}
          </div>

          {/* 10 Experience */}
          <div className="form-group">
            <label>10. Experience (Years)</label>

            <input
              type="number"
              name="experience"
              placeholder="Enter years of experience"
              value={formData.experience}
              onChange={handleChange}
            />

            {errors.experience && (
              <span className="error">
                {errors.experience}
              </span>
            )}
          </div>

          {/* 11 Salary */}
          <div className="form-group">
            <label>11. Monthly Salary</label>

            <input
              type="number"
              name="salary"
              placeholder="Enter monthly salary"
              value={formData.salary}
              onChange={handleChange}
            />

            {errors.salary && (
              <span className="error">
                {errors.salary}
              </span>
            )}
          </div>

          {/* 12 Address */}
          <div className="form-group">
            <label>12. Address</label>

            <textarea
              name="address"
              placeholder="Enter complete address"
              rows="3"
              value={formData.address}
              onChange={handleChange}
            ></textarea>

            {errors.address && (
              <span className="error">
                {errors.address}
              </span>
            )}
          </div>

          {/* 13 City */}
          <div className="form-group">
            <label>13. City</label>

            <input
              type="text"
              name="city"
              placeholder="Enter city"
              value={formData.city}
              onChange={handleChange}
            />

            {errors.city && (
              <span className="error">
                {errors.city}
              </span>
            )}
          </div>

          {/* 14 Password */}
          <div className="form-group">
            <label>14. Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />

            {errors.password && (
              <span className="error">
                {errors.password}
              </span>
            )}
          </div>

          {/* 15 Confirm Password */}
          <div className="form-group">
            <label>15. Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            {errors.confirmPassword && (
              <span className="error">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="button-group">

            <button
              type="submit"
              className="submit-btn"
            >
              Register Employee
            </button>

            <button
              type="button"
              className="reset-btn"
              onClick={handleReset}
            >
              Reset
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default Valid;