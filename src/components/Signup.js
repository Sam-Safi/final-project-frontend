import React, { Component } from "react";

export class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      firstnameErrorMsg: "",
      lastnameErrorMsg: "",
      emailErrorMsg: "",
      passwordErrorMsg: "",
      formValid: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
      [`${event.target.name}ErrorMsg`]: ""
    });
  }

  checkValidation() {
    let formValid = true;
    if (!this.state.firstname) {
      this.setState({
        firstnameErrorMsg: "Please specify First name "
      });
      formValid = false;
    }
    if (!this.state.lastname) {
      this.setState({
        lastnameErrorMsg: "Please specify Last name "
      });
      formValid = false;
    }
    if (!this.state.email) {
      this.setState({
        emailErrorMsg: "Please specify Enter email "
      });
      formValid = false;
    }
    if (!this.state.password) {
      this.setState({
        passwordErrorMsg: "Please specify Enter password "
      });
      formValid = false;
    }

    return formValid;
  }

  handleSubmit(event) {
    event.preventDefault();

    if (!this.checkValidation()) {
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", "Basic U2FtOmRvZG8=");

    const urlencoded = new URLSearchParams();
    urlencoded.append("firstname", this.state.firstname);
    urlencoded.append("lastname", this.state.lastname);
    urlencoded.append("email", this.state.email);
    urlencoded.append("password", this.state.password);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow"
    };

    fetch("/public/newUser", requestOptions)
      .then(response => {
        if (+response.status >= 200 && +response.status < 300) {
          this.props.history.push("/sign-in");
          console.log(response.json());
        }
        // redirect is here
      })

      .catch(error => console.log("error", error));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Sign Up</h3>

        <div className="form-group">
          <label>First name</label>
          <input
            type="text"
            className={`form-control ${this.state.firstnameErrorMsg &&
              "is-invalid"}`}
            placeholder="First name"
            name="firstname"
            value={this.state.firstname}
            onChange={this.handleChange}
          />
          <div className="invalid-feedback">{this.state.firstnameErrorMsg}</div>
        </div>

        <div className="form-group">
          <label>Last name</label>
          <input
            type="text"
            className={`form-control ${this.state.lastnameErrorMsg &&
              "is-invalid"}`}
            placeholder="Last name"
            name="lastname"
            value={this.state.lastname}
            onChange={this.handleChange}
          />
          <div className="invalid-feedback">{this.state.lastnameErrorMsg}</div>
        </div>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className={`form-control ${this.state.emailErrorMsg &&
              "is-invalid"}`}
            placeholder="Enter email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <div className="invalid-feedback">{this.state.emailErrorMsg}</div>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className={`form-control ${this.state.passwordErrorMsg &&
              "is-invalid"}`}
            placeholder="Enter password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <div className="invalid-feedback">{this.state.passwordErrorMsg}</div>
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Sign Up
        </button>
        <p className="forgot-password text-right">
          Already registered <a href="#">sign in?</a>
        </p>
      </form>
    );
  }
}
