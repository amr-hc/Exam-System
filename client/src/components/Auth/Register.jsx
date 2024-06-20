// import React, { useState } from "react";
// import axios from "axios";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     role: "student",
//     name: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const HTMLValidations = (e) => {
//     const form = e.target.closest("form");
//     e.preventDefault();
//     e.stopPropagation();
//     if (!form.checkValidity()) {
//       form.classList.add("was-validated");
//       return false;
//     } else {
//       form.classList.add("was-validated");
//       return true;
//     }
//   };
//   const sendRequsest = async () => {
//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/users",
//         formData
//       );
//       console.log("Registration successful:", response.data);
//       setStorageData(response.data);
//     } catch (error) {
//       console.error("Registration error:", error);
//     }
//   };

//   const setStorageData = (data) => {
//     localStorage.setItem("user_info", JSON.stringify(data));
//   };
//   const handleSubmit = async (e) => {
//     if (HTMLValidations(e)) {
//       sendRequsest();
//     }
//   };

//   return (
//     <div className="register row justify-content-center align-items-center">
//       <form
//         onSubmit={handleSubmit}
//         className="row flex-column justify-content-center align-items-center needs-validation"
//         noValidate
//       >
//         <div className="name col-md-10 p-0 row">
//           <div className="col-md-6">
//             <label htmlFor="name" className="form-label">
//               Name
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="name"
//               name="name"
//               pattern="^[a-zA-Z ,.'\-]+$"
//               placeholder="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//             <div className="invalid-feedback">
//               Please enter a valid name (letters, spaces, commas, periods,
//               single quotes, and hyphens).
//             </div>
//           </div>

//           <div className="col-md-6">
//             <label htmlFor="useremail" className="form-label">
//               Email
//             </label>
//             <input
//               type="email"
//               className="form-control"
//               id="useremail"
//               name="email"
//               pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
//               placeholder="example@example.com"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             <div className="invalid-feedback">
//               This email is either invalid or already associated with an
//               existing account.
//             </div>
//           </div>
//         </div>

//         <div className="name col-md-10 p-0 row">
//           <div className="col-md-6">
//             <label htmlFor="password" className="form-label">
//               Password
//             </label>
//             <input
//               type="password"
//               className="form-control"
//               id="password"
//               name="password"
//               pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
//               placeholder="enter password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//             <div className="invalid-feedback">
//               Please enter a valid password (Minimum eight characters, at least
//               one letter, one number, and one special character).
//             </div>
//           </div>
//         </div>

//         <div className="col-12 m-2 row">
//           <button className="btn btn-primary" type="submit">
//             Submit form
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Register;
