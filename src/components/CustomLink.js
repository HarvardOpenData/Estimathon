import { Link as RouterLink } from "react-router-dom";
import { Link } from "@material-ui/core";
import React from "react";

function CustomLink(props) {
  const { to, children } = props;
  return (
    <Link to={to} component={RouterLink} variant="body2">
      {children}
    </Link>
  );
}

export default CustomLink;
