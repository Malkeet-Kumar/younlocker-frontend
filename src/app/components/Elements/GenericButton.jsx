import { Opacity } from "@mui/icons-material";
import { Icon, styled } from "@mui/material";
import PropTypes from "prop-types";
const Button = styled("button")(() => ({
  height: "28px",
  minWidth: "40px",
  width:'100%',
  padding: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "none",
  gap: "5px",
  fontWeight: "600",
}));

/**
 *
 * @param {object} props
 * @param {function} props.onClick
 * @param {string} [props.id]
 * @param {string} [props.name]
 * @param {string} props.text
 * @param {string} props.icon
 * @param {object} props.style
 * @returns {JSX.Element}
 */

const GButton = (props) => {
  return (
    <Button {...props}>
      <Icon style={{fontSize:"17px",fontWeight:'900'}}>{props.icon}</Icon> <span>{props.text}</span>
    </Button>
  );
};

GButton.prototype = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  style: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.string,
};

export default GButton;
