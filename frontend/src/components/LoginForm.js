import React from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

const userSchema = yup.object().shape({
  username: yup.string().required("Username is a required field."),
  password: yup
    .string()
    .required("Password is a required field")
    .max(13)
    .min(8)
});

class LoginForm extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={userSchema}
        onSubmit={fields => {
          this.props.handle_login(fields);
        }}
      >
        {props => (
          <Form>
            <div class="form-group">
              <Field
                type="text"
                placeholder="Enter Username"
                name="username"
                className={
                  props.errors.username && props.touched.username ? "err" : ""
                }
              />
              {props.errors.username && props.touched.username ? (
                <div className="alert1">
                  {" "}
                  <span>{props.errors.username}</span>{" "}
                </div>
              ) : (
                ""
              )}
            </div>
            <div class="form-group">
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className={
                  props.errors.password && props.touched.password ? "err" : ""
                }
              />
              {props.errors.password && props.touched.password ? (
                <div className="alert1">
                  <span>{props.errors.password}</span>
                </div>
              ) : (
                ""
              )}
            </div>
            <button
              type="submit"
              className="btn btn-dark"
              disabled={!props.dirty && !props.isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    );
  }
}

export default LoginForm;

LoginForm.propTypes = {
  handle_login: PropTypes.func.isRequired
};
