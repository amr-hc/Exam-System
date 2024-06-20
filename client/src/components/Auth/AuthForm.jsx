import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";

const AuthForm = ({ isLogin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: isLogin ? "" : "student",
    name: "",
    device_name: isLogin ? navigator.appName : "",
  });
  const setIsLogin = () => {
    navigate(isLogin ? "/register" : "/login");
  };

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

  const sendRequest = async (url) => {
    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Success:", response.data);
      const user = response.data.user;
      setStorageData(user);
      dispatch(setUser(user));
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error) => {
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
  };

  const setStorageData = (data) => {
    localStorage.setItem("user_info", JSON.stringify(data));
  };

  const handleSubmit = async (e) => {
    if (HTMLValidations(e)) {
      const url = isLogin
        ? "http://localhost:8000/api/login"
        : "http://localhost:8000/api/users";
      sendRequest(url);
    }
  };

  return (
    <div className="home-bg">
      <div className="container py-5 auth-form">
        <form
          onSubmit={handleSubmit}
          className="row flex-column justify-content-center align-items-center needs-validation"
          noValidate
        >
          <div className="col-md-10 p-0 row">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control w-100"
                  id="name"
                  name="name"
                  pattern="^[a-zA-Z ,.'\-]+$"
                  placeholder="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">
                  Please enter a valid name (letters, spaces, commas, periods,
                  single quotes, and hyphens).
                </div>
              </div>
            )}

            <div>
              <label htmlFor="useremail" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control w-100"
                id="useremail"
                name="email"
                pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                placeholder="example@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">
                This email is either invalid or already associated with an
                existing account.
              </div>
            </div>
          </div>

          <div className="col-md-10 p-0 row">
            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">
                Please enter a valid password (Minimum eight characters, at
                least one letter, one number, and one special character).
              </div>
            </div>
          </div>

          <div className="col-6 m-2 row">
            <button className="btn btn-primary" type="submit">
              {isLogin ? "Login" : "Register"}
            </button>
          </div>

          <div className=" m-2 d-flex justify-content-center align-items-center">
            <p className="m-0">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <button
              className="btn btn-link "
              type="button"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
