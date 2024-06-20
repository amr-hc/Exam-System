import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    device_name: navigator.appName,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const HTMLValidations = (e) => {
    const form = e.target.closest("form");
    e.preventDefault();
    e.stopPropagation();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return false;
    } else {
      form.classList.add("was-validated");
      return true;
    }
  };
  const setStorageData = (data) => {
    localStorage.setItem("user_info", JSON.stringify(data));
  };
  const sendRequest = async () => {
    try {
      console.log(formData);
      const response = await axios.post(
        "http://localhost:8000/api/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Login successful:", response.data);
      setStorageData(response.data);
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
        alert(
          `Error: ${
            error.response.data.message || "Unable to insert data to server."
          }`
        );
      } else if (error.request) {
        console.error("Error request:", error.request);
        alert("Error: No response from server.");
      } else {
        console.error("Error message:", error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    if (HTMLValidations(e)) {
      await sendRequest();
    }
  };

  return (
    <div className="login row justify-content-center align-items-center">
      <form
        onSubmit={handleSubmit}
        className="row flex-column justify-content-center align-items-center needs-validation"
        noValidate
      >
        <div className="col-md-10 p-0 row">
          <div className="col-md-6">
            <label htmlFor="useremail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="useremail"
              name="email"
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              placeholder="example@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">Please enter a valid email.</div>
          </div>

          <div className="col-md-6">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Please enter a valid password (Minimum eight characters, at least
              one letter and one number).
            </div>
          </div>
        </div>

        <div className="col-12 m-2 row">
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
