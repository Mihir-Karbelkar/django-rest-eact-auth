import React, { Component } from "react";
import Nav from "./components/Nav";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import "./bootstrap-4.3.1-dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: "login",
      logged_in: localStorage.getItem("token") ? true : false,
      username: "",
      errors: "",
      login: true
    };
  }

  componentDidMount() {
    if (this.state.logged_in) {
      fetch("http://localhost:8000/core/current_user/", {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username });
        });
    }
  }

  handle_login = data => {
    console.log(data);
    this.setState({ errors: "", login: true });

    fetch("http://localhost:8000/token-auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        if (json.non_field_errors) {
          this.setState({
            logged_in: false,
            displayed_form: "",
            errors: json.non_field_errors
          });
        } else {
          localStorage.setItem("token", json.token);
          this.setState({
            logged_in: true,
            displayed_form: "",
            username: json.user.username
          });
        }
      });
  };

  handle_signup = data => {
    this.setState({ errors: "", login: false });
    fetch("http://localhost:8000/core/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        localStorage.setItem("token", json.token);
        this.setState({
          logged_in: true,
          displayed_form: "",
          username: json.username
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem("token");
    this.setState({ logged_in: false, username: "", login: true });
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  render() {
    let form, text;
    switch (this.state.displayed_form) {
      case "login":
        text = "Login";
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case "signup":
        text = "Signup";
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      default:
        form = null;
        text = null;
    }

    return (
      <div className="App">
        <div className="container form">
          <Nav
            logged_in={this.state.logged_in}
            display_form={this.display_form}
            handle_logout={this.handle_logout}
          />

          <h3>{text}</h3>
          <h3>{this.state.logged_in ? `Hello, ${this.state.username}` : ""}</h3>
          {form}
        </div>
      </div>
    );
  }
}

export default App;
