import GButton from "./GenericButton";
import PropTypes from "prop-types";
/**
 *
 * @param {object} props
 * @param {string} [props.id]
 * @param {string} [props.name]
 * @param {function} props.onClick
 * @param {object} props.style
 * @returns {JSX.Element}
 */

const ResetButton = (props) => {
  const {text = "Reset", icon = "refresh"} = props
  return (
    <GButton
      {...props}
      style={{ backgroundColor: "#F58329", color: "white",...props.style }}
      icon={icon}
      text={text}
    />
  );
};

ResetButton.propTypes = {
  id: PropTypes.string, // Optional id for the button
  name: PropTypes.string, // Optional name for the button
  onClick: PropTypes.func.isRequired, // onClick function is required
  style: PropTypes.object, // Optional custom styles
};

export default ResetButton;
