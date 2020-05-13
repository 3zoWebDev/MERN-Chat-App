import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Nave from "./Components/Nav";
import Welcome from "./Components/Welcome";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Components/User/Login";
import { decode } from "jsonwebtoken";
import { Alert } from "react-bootstrap";
import axios from "axios";
import PrivateRoute from "./PrivateRoute";
import Signup from "./Components/User/Signup";
import UpdateProfile from "./Components/User/UpdateProfile";
import Join from "./Components/chatApp/Join/Join"
// import StickyFooter from 'react-sticky-footer';
// import ErrorPage from "./ErrorPage";
import Chat from "./Components/chatApp/Chat/Chat"

export default class App extends Component {
  state = {
    isAuth: false,
    user: null,
    message: null,
  };

  loginHandler = async (cred) => {
    try {
      let data = await axios.post(
        "http://localhost:5000/api/users/login",
        cred
      );
      /* Set token if login is successful only */
      localStorage.setItem("token", data.data.token);

      this.getUser(data.data.token);
    } catch (err) {
      this.setState({
        isAuth: false,
        message: err.response.data.message,
        user: null,
      });
    }
  };

  updateUser = async (cred) => {
    let tempState = { ...this.state };
    try {
      /* put to update already exisiting method */
      await axios.put("http://localhost:5000/api/users/user/update", cred, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });

      this.getUser(localStorage.getItem("token"));
    } catch (err) {
      tempState.message = "Unable to update User data!";
      this.setState(tempState);
    }
  };

  logoutHandler = (e) => {
    e.preventDefault();
    //delete tokem and reset state
    localStorage.removeItem("token");
    this.setState({
      isAuth: false,
      user: null,
      message: null,
    });
  };

  getUser = async (token) => {
    try {
      let data = await axios.get("http://localhost:5000/api/users/user", {
        headers: {
          "x-auth-token": token,
        },
      });
      //if success set state to isAuth and
      // populate data with user data
      this.setState({
        isAuth: true,
        message: null,
        user: data.data.user,
      });
    } catch (err) {
      //If User details get request gets errors
      // remove token and print errors
      localStorage.removeItem("token");
      this.setState({
        isAuth: false,
        message: err.response.data.message,
        user: null,
      });
    }
  };

  componentDidMount() {
    //gets token from localstorage
    let token = localStorage.getItem("token");
    //check if token exists
    if (!(token == null)) {
      //decodes token
      let user = decode(token);

      //check it token is valid
      if (!user) {
        //remove token
        localStorage.removeItem("token");
      }
      //retrieves updated user from token
      this.getUser(token);
    }
  }
  render() {
    const { isAuth, message, user } = this.state;
    console.log(user)
    //used to display error message from API
    const errorMessage = message ? (
      <Alert variant="danger">{message}</Alert>
    ) : null;

    return (

      <div>

        <Nave user={user} logout={this.logoutHandler} />
        {errorMessage}
        <Switch>
          {/* This route needs exact so we dont get stuck viewing just this page */}
          <Route exact path="/" component={Welcome} />

          <PrivateRoute
            exact
            path="/Join"
            isAuth={isAuth}
            component={Join}
          />

          <PrivateRoute
            exact
            path="/chat"
            isAuth={isAuth}
            component={Chat}
          />


          <PrivateRoute
            exact
            path="/updateprofile"
            isAuth={isAuth}
            user={user}
            update={this.updateUser}
            component={UpdateProfile}
          />

          <Route path="/signup" component={Signup} />

          <Route
            path="/login"
            render={() =>
              isAuth ? <Redirect to="/" /> : <Login login={this.loginHandler} />
            }
          />

          {/* <Route exact path="/Trainers" component={Trainers} />
          <Route path="/LiveClass/:id" component={LiveClass} /> */}
          {/* catch all routes that dont match  */}
          {/* <Route path="*" component={ErrorPage} /> */}
        </Switch>
      </div>
    );
  }
}