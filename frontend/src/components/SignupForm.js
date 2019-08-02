import React from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

const signupSchema = yup.object().shape({
  username: yup.string().required("Username is a required field."),
  password: yup
    .string()
    .required("Password is a required field.")
    .max(13)
    .min(8),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required")
});

class SignupForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = e => {
    // const name = e.target.name;
    // const value = e.target.value;
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={signupSchema}
        onSubmit={fields => {
          this.props.handle_signup(fields);
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
                <div className="alert1 ">
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
                <div className="alert1 ">
                  <span>{props.errors.password}</span>
                </div>
              ) : (
                ""
              )}
            </div>
            <div class="form-group">
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className={
                  props.errors.confirmPassword && props.touched.confirmPassword
                    ? "err"
                    : ""
                }
              />
              {props.errors.confirmPassword && props.touched.confirmPassword ? (
                <div className="alert1">
                  <span>{props.errors.confirmPassword}</span>
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

export default SignupForm;

SignupForm.propTypes = {
  handle_signup: PropTypes.func.isRequired
};
