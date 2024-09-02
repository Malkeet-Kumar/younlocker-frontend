import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect } from "react";
import styled from "@emotion/styled";
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
 * CustomAutoComplete component
 *
 * @param {object} props - The props for the component
 * @param {array} props.list - The list of options for the autocomplete, each option is an object with `value` and `label` properties
 * @param {string} props.value - The currently selected value
 * @param {function} props.onChange - The function to call when the selected value changes
 * @param {string} [props.placeholder] - The placeholder text for the input field
 * @param {object} [props.style]
 * @param {boolean} [props.disabled]
 * @returns {JSX.Element}
 */

const CustomAutoComplete = (props) => {
  const { list = [], disabled=false } = props;
  const [suggestions, setSuggestions] = useState(list);
  const [selectedValue, setSelectedValue] = useState(null);
  useEffect(() => {
    setSuggestions([...props.list]);
  }, [props.list, props.value]);

  useEffect(() => {
    if (suggestions.length <= 0) return;
    const val = suggestions.filter((ob) => ob.value == props.value);
    if (val.length > 0) {
      setSelectedValue((p) => val[0]);
    } else {
      setSelectedValue(p=>null)
    }
  }, [props.list,props.value]);

  return (
    <Autocomplete
      options={suggestions}
      disabled={disabled}
      getOptionLabel={(option) => {
        return option?.label;
      }}
      isOptionEqualToValue={(option, value) => option.value === props.value}
      renderInput={(params) => (
        <div ref={params.InputProps.ref}>
          <Input {...params.inputProps} style={props.style ?? {}} placeholder={props.placeholder} />
        </div>
      )}
      onChange={(e, v) => {
        if (v) {
          props.onChange(v.value);
          setSelectedValue(v);
        } else {
          props.onChange(null);
          setSelectedValue(null);
        }
      }}
      value={selectedValue}
    />
  );
};

CustomAutoComplete.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired
};

export default CustomAutoComplete;
