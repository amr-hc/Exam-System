import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-bg ">
      <h1>Welcome to the Exam System</h1>
      <p>
        <Link to="/login">Login</Link> or <Link to="/register">Register</Link>{" "}
        to get started.
      </p>
    </div>
  );
};

export default Home;
