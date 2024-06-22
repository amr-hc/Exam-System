import PropTypes from "prop-types";

const ExamItem = ({ name, duration, expireAt }) => {
  return (
    <div className="card">
      <img src="..." className="card-img-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Duration: {duration}</p>
        <p className="card-text">Expires at: {expireAt}</p>
      </div>
    </div>
  );
};
ExamItem.propTypes = {
  name: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  expireAt: PropTypes.string.isRequired,
};

export default ExamItem;
