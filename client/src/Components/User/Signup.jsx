import React, { Component } from "react";
import { Form, Container, Button } from "react-bootstrap";
import axios from "axios";

export default class Signup extends Component {
  state = {};

  registerHandler = async () => {
    try {
      let data = await axios
        .post("http://localhost:5000/api/users/signup", this.state)
        .then((res) => {
          this.props.history.push("/login");
        });
    } catch (err) {
      console.log(err);
    }
  };

  changeHandler = (e) => {
    // console.log("name of field", e.target["name"]);
    // console.log("value of field", e.target.value);
    let temp = { ...this.state }; //copy state object
    temp[e.target.name] = e.target.value;
    this.setState(temp);
  };

  render() {
    console.log(this.state);
    return (
        <div>
         

        <Container
          style={{ marginTop: "20px", marginBottom: "30px", width: "40%" }}
        >
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" onChange={this.changeHandler} />
          </Form.Group>

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
          <Button variant="info" onClick={this.registerHandler} block>
            Sign Up
          </Button>
        </Container>
      </div>
    );
  }
}
