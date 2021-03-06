import React from "react";
import Select, { components } from "react-select";
import icon_dropdown from "../../img/icon_dropdown_select.svg";
import icon_anchor from "../../img/outdoor_furniture/filter_icons/bx-ancor.svg";

const DropdownIndicator = (props) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <img src={icon_dropdown} alt="" />
      </components.DropdownIndicator>
    )
  );
};

const ValueContainer = ({ children, ...props }) => {
  return (
    components.ValueContainer && (
      <components.ValueContainer {...props}>
        {!!children && (
          <span style={{ position: "absolute", left: 16 }}>
            <img src={icon_anchor} alt="" />
          </span>
        )}
        {children}
      </components.ValueContainer>
    )
  );
};

const customStyles = {
  placeholder: (styles) => {
    return {
      ...styles,
      color: "#a2a2a2",
      paddingLeft: 30,
      fontSize: 14,
    };
  },

  container: (styles) => ({
    ...styles,
    width: "100%",
    padding: 0,
    marginBottom: 20,
  }),
  control: (styles) => ({
    ...styles,
    width: "100%",
    border: "1px solid #cecece",
    height: "40px",
    padding: 0,
    "&:hover": {
      borderColor: "#000 !important",
    },
    // boxShadow: '#3f51b5 !important',

    "&:active": {
      borderColor: "none !important",
    },
    "&:focus": {
      borderColor: "none !important",
    },
  }),

  indicatorSeparator: (styles) => ({
    ...styles,
    display: "none",
  }),
  singleValue: (styles) => ({
    ...styles,
    paddingLeft: 40,
  }),
};

export default function SelectAnchor(props) {
  return (
    <Select
      components={{ DropdownIndicator, ValueContainer }}
      styles={customStyles}
      options={props.options}
      width="200px"
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  );
}
