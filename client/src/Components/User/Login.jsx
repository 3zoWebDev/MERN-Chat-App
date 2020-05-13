import React, { Component } from "react";
import { Form, Container, Button } from "react-bootstrap";

export default class Login extends Component {
  state = {};

  loginHandler = () => {
    //props from Login in App.js
    //this.state reps cred in App.js
    this.props.login(this.state);
  };

  changeHandler = (e) => {
    // console.log("name of field", e.target["name"]);
    // console.log("value of field", e.target.value);
    let temp = { ...this.state }; //copy state object
    temp[e.target.name] = e.target.value;
    this.setState(temp);
  };
  render() {
    return (
      <div>
            <div>
              <h1 style={{ color: "black", backgroundColor: "#ffcc00" }}>
                LOGIN
              </h1>
              <p>We are HAPPY to have you back</p>
            </div>

        <Container
          style={{ marginTop: "20px", marginBottom: "30px", width: "40%" }}
        >
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" onChange={this.changeHandler} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              onChange={this.changeHandler}
            />
          </Form.Group>
          <Button variant="info" onClick={this.loginHandler} block>
            Login
          </Button>
        </Container>
      </div>
    );
  }
}
