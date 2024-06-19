import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-bg">
      <div className="container">
        <h1 className="text-light text-center">Welcome to the Exam System</h1>
        <p className="text-light text-center">
          <Link to="/login">Login</Link> or <Link to="/register">Register</Link>{" "}
          to get started.
        </p>
      </div>
    </div>
  );
};

export default Home;
