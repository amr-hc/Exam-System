import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const Sidebar = ({ items }) => {
  const location = useLocation();

  return (
    <div className="sidebar">
      {items.map((item) => (
        <Link to={item.path} key={item.path}>
          <div
            className={`item ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            <span className="icon">{item.icon}</span>
            <span className="text">{item.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

Sidebar.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      icon: PropTypes.element,
    })
  ).isRequired,
};

export default Sidebar;
