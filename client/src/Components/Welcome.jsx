import React from "react";
import classes from "./BackgroundVideo.module.css";
import { NavLink } from "react-router-dom";

const Welcome = () => {
  return (
    <>
      <div className={classes.Container}>
        <img src="https://images.unsplash.com/photo-1560092056-5669e776fc68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=752&q=80" alt="" srcset="" width="100%"/>

        <div className={classes.Content}>
          <div className={classes.SubContent}>
            <div
              style={{
                textAlign: "justify",
                color: "#ffcc00",
                // "#ffcc00",
                // "#ff3300",
                //  "#cf111d"
                letterSpacing: "5px",
                fontWeight: "900",
                fontSize: "60pt",
                marginBottom: "10px",
              }}
            >
              <div>Chat Pivately</div>
              <div>By Creating</div>
              <div>Your Own Room.</div>
            </div>

            {/* <p>Stay HOME. Stay SAFE. Stay FIT with our live classes</p> */}
            {/* <button type="button" className="btn btn-outline-dark">
              View Classes
            </button> */}
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "blue",
          height: "100%",
          width: "100%",
          color: "white",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h2>
          Create Your Own Room to chat{" "}
          <span className="pull-right">
            <NavLink
              to={`/Join`}
              className="btn btn-warning"
              variant="outline-warning"
              style={{ marginLeft: "200px", width: "100px" }}
            >
              JOIN
            </NavLink>
          </span>
        </h2>{" "}
      </div>
    </>
  );
};

export default Welcome;
