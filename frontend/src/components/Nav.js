import React from "react";
import PropTypes from "prop-types";

function Nav(props) {
  const logged_out_nav = (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
      <a
        className="navbar-brand"
        href="javascript:void(0)"
        onClick={() => props.display_form("login")}
      >
        Login
      </a>
      <a
        className="navbar-brand"
        href="javascript:void(0)"
        onClick={() => props.display_form("signup")}
      >
        Signup
      </a>
    </nav>
  );

  const logged_in_nav = (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark justify-right">
      <a
        a
        className="navbar-brand"
        href="javascript:void(0)"
        onClick={props.handle_logout}
      >
        logout
      </a>
    </nav>
  );
  return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default Nav;

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};
