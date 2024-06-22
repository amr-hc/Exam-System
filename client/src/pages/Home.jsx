import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-bg">
      <div className="container">
        <h1 className="text-light text-center">Welcome to the Exam System</h1>
        <p className="text-light text-center">
          {user ? (
            <>Hello, {user.name}. </>
          ) : (
            <>
              <Link to="/login">Login</Link> or{" "}
              <Link to="/register">Register</Link> to get started.
            </>
          )}
          {user && user.role === "admin" ? (
            <Link to="/admin/dashboard">Admin Dashboard</Link>
          ) : (
            <Link to="/dashboard">Dashboard</Link>
          )}
        </p>
      </div>
    </div>
  );
};

export default Home;
