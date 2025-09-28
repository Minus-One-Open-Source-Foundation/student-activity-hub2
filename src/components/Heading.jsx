import React from "react";
import PropTypes from "prop-types";

export default function Heading({ text, alignment = "center", style = {} }) {
  const headingStyle = {
    textAlign: alignment,
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#000",
    marginBottom: "0.5rem",
    ...style,
  };

  return <h1 style={headingStyle}>{text}</h1>;
}

Heading.propTypes = {
  text: PropTypes.string.isRequired,
  alignment: PropTypes.oneOf(["left", "center", "right"]),
  style: PropTypes.object,
};