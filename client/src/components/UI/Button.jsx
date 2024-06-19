import PropTypes from "prop-types";

const Button = ({ children, ...props }) => {
  return (
    <button className="btn btn-primary" {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Button;
