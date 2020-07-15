import React, { Component } from "react";
import "./Login.css";

import Input from "./UI/Input/Input";

import axios from "axios";

class Login extends Component {
  state = {
    loginForm: {
      email: {
        label: "Email",
        elementConfig: {
          type: "text",
          placeholder: "Your email",
        },
        value: "",
      },
      password: {
        label: "Password",
        elementConfig: {
          type: "password",
          placeholder: "Your password",
        },
        value: "",
      },
    },
    loggedIn: {
      status: false,
      access_token: "",
    },
    error: {
      status: false,
      correctMail: false,
      message: "",
    },
  };

  inputChangedHandler = (event, id) => {
    const updatedLoginForm = { ...this.state.loginForm };
    const updatetLoginElement = { ...updatedLoginForm[id] };

    updatetLoginElement.value = event.target.value;
    updatedLoginForm[id] = updatetLoginElement;
    this.setState({ loginForm: updatedLoginForm });
  };

  submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://dev.api.kabox.io/api/auth/login", {
        email: this.state.loginForm.email.value,
        password: this.state.loginForm.password.value,
      })
      .then((response) => {
        this.setState({
          loggedIn: {
            status: true,
            access_token: response.data.access_token,
          },
        });
        localStorage.setItem("access_token", this.state.loggedIn.access_token);
        this.props.history.push("/movies");
      })
      .catch((error) => {
        let validMail = false;
        if (error.response.status === 401) {
          validMail = true;
        }
        this.setState({
          error: {
            status: true,
            validMail: validMail,
            message: error.message,
          },
        });
      });
  };

  render() {
    let error = null;

    if (this.state.error.status) {
      error = (
        <div className="Error">
          <p>
            {this.state.error.validMail
              ? "Uneli ste pogresnu sifru"
              : "Uneli ste nepostojeci email"}
          </p>
          <p>{this.state.error.message}</p>
        </div>
      );
    }

    const formElementsArray = [];
    for (let key in this.state.loginForm) {
      formElementsArray.push({
        id: key,
        config: this.state.loginForm[key],
      });
    }

    let inputElements = formElementsArray.map((formElement) => {
      return (
        <Input
          key={formElement.id}
          label={formElement.config.label}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          changed={(event) => this.inputChangedHandler(event, formElement.id)}
        />
      );
    });

    return (
      <form className="Login" onSubmit={this.submitHandler}>
        <h1>Login</h1>
        {inputElements}
        <button type="submit">Login</button>
        {error}
      </form>
    );
  }
}

export default Login;
