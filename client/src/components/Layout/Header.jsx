import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Header = () => {
  const { user, logout } = useAuth();

  // Check if the user object exists and if it contains the necessary user details
  // const isLoggedIn = user;

  return (
    <header>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">
            <Link className="text-dark" to="/">
              Home
            </Link>
          </span>
          {user ? (
            <>
              {user.role === "admin" ? (
                <Link to="/admin">Admin</Link>
              ) : (
                <Link to="/dashboard">Dashboard</Link>
              )}
              <div className="d-flex justify-content-center align-items-center text-muted">
                <h6 className="m-0">Hello, {user.name}</h6>
                <span className="mx-2"> | </span>
                <span>{user.role}</span>
                <button className="ms-3 btn btn-primary" onClick={logout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div>
              <Link to="/login">Login</Link>
              <span> | </span>
              <Link to="/register">Register</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
