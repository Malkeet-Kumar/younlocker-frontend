import { CircularProgress, Icon, styled } from "@mui/material";
import GButton from "./GenericButton";
import PropTypes from "prop-types"

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
  backgroundColor:"green",color:"white"
}));

/**
 * 
 * @param {object} props 
 * @param {string} [props.id]
 * @param {string} [props.name]
 * @param {boolean} [props.isSubmitting]
 * @param {function} props.onClick
 * @param {object} props.style
 * @returns {JSX.Element}
 */

const SaveButton=(props)=>{
    const {text = "Save", icon = "done", isSubmitting=false} = props
    return <Button onClick={props.onClick} disabled={isSubmitting} style={{backgroundColor:isSubmitting?"#fff5f5e3":"",...props.style}}><Icon style={{fontSize:"17px",fontWeight:'900'}}>{icon}</Icon>{text}</Button>
}

SaveButton.propTypes = {
    id: PropTypes.string, // Optional id for the button
    name: PropTypes.string, // Optional name for the button
    isSubmitting:PropTypes.bool,
    onClick: PropTypes.func.isRequired, // onClick function is required
    style: PropTypes.object, // Optional custom styles
  };

export default SaveButton