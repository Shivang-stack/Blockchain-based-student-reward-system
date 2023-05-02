import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My desription",
  className = "bg-secondary text-black p-4",
  children
}) => (
  <div>
    <Menu />
    <div className="container-fluid">
      <div className="jumbotron bg-dark text-white text-center">
        <h2 className="display-4 font-weight-bold">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer className="footer bg-dark mt-auto py-3 ">
      <div className="container-fluid bg-dark text-white text-center my-3">
        <h4>If you got any questions, feel free to reach out!</h4>
        <button className="btn btn-primary btn-lg">Contact Us</button>
      </div>
      <div className="container">
        <span className="text-muted">
          The <span className="text-black">AMC Student Engagement Program</span> Blockchain Based Student Reward System
        </span>
      </div>
    </footer>
  </div>
);

export default Base;
