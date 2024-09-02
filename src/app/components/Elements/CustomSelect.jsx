import { styled } from "@mui/material";
import PropTypes from "prop-types";

const Select = styled("select")(() => ({
    padding: "4px 8px",
    border: "1px solid grey",
    borderRadius: "0",
    width: "100%",
    backgroundColor: "white",
}));

/**
 * 
 * @param {object} props 
 * @param {string} props.defaultValue - The default selected value of the select element
 * @param {string} props.value - The current selected value of the select element
 * @param {function} props.onChange - The function to call when the selected value changes
 * @param {array} props.list - The array of options to display in the select element, each option is an object with `value` and `label` properties
 * @param {object} propps.style
 * @returns {JSX.Element}
 */

const CSelect = (props) => {
  const { defaultValue="", value, onChange=(val)=>console.log(val), list = [] } = props
  return (
    <Select {...props} defaultValue={defaultValue} value={value} onChange={e => onChange(e.target.value)}>
      {list.length > 0 ? 
        list.map((ob, index) => <option key={index} value={ob.value}>{ob.label.toUpperCase()}</option>) : 
        <option value="">{"No Options Available".toUpperCase()}</option>
      }
    </Select>
  );
};

CSelect.propTypes = {
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  style:PropTypes.object,
  list: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }))
};

export default CSelect;
