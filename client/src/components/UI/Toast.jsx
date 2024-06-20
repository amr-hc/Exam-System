import { useState } from "react";
import PropTypes from "prop-types";
import Toast from "react-bootstrap/Toast";

function ToastComponent({ title, message }) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Toast show={show} onClose={handleClose}>
      <Toast.Header closeButton>
        <strong className="me-auto">{title}</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}

ToastComponent.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default ToastComponent;
