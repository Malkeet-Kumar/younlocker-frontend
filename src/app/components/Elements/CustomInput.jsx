import { styled } from "@mui/material";
import PropTypes from "prop-types";

const Input = styled("input")(() => ({
  border: "1px solid grey",
  padding: "4px 8px",
  borderRadius: "0px",
  width: "100%",
  ":focus": {
    outline: "none"
  }
}));

/**
 *
 * @param {object} props
 * @param {string} props.value
 * @param {function} props.onChange
 * @param {function} props.onChecked
 * @param {function} props.onInput
 * @param {function} props.onEnter
 * @param {function} props.onDateSelect
 * @param {object} [props.style]
 * @param {string} [props.placeholder]
 * @param {string} [props.id]
 * @param {string} [props.name]
 * @returns {JSX.Element}
 */

const CInput = (props) => {
  const {
    onChange = () => {},
    onInput = () => {},
    onDateSelect = () => {},
    onChecked = () => {},
    onEnter = () => {},
    value = null,
    disabled=false,
    type="text"
  } = props;
  return (
    <Input
      {...props}
      disabled={disabled}
      onChange={(e) => {
        if (type == "date") {
          const date = e.target.valueAsDate;
          if (date) {
            const newDate = setDateWithoutChangingTime(value, date);
            onDateSelect(newDate);
          } else {
            onDateSelect(null);
          }
        } else if (type.toLowerCase() == "checkbox") {
          onChecked(e.target.checked);
        } else {
          onChange(e);
        }
      }}
      onKeyDown={(e)=>{
        if (e.key === "Enter") {
          onEnter(e.target.value)
        } 
      }}
      onInput={(e) => onInput(e.target.value) ?? {}}
    />
  );
};

const setDateWithoutChangingTime = (originalDate, newDate) => {
  if (!originalDate) {
    return newDate;
  }
  const updatedDate = new Date();
  updatedDate.setFullYear(newDate.getFullYear());
  updatedDate.setMonth(newDate.getMonth());
  updatedDate.setDate(newDate.getDate());
  return updatedDate;
};

CInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onInput: PropTypes.func,
  onChecked: PropTypes.func,
  onEnter: PropTypes.func,
  onDateSelect: PropTypes.func,
  style: PropTypes.object,
  placeholder: PropTypes.string,
  disabled:PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string
};

export default CInput;
