import React from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper/index";
import { Link } from "react-router-dom";

const AdminDashBoard = () => {
  const {
    user: { name, email, role }
  } = isAutheticated();

  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/event" className="nav-link text-success">
              Create Event
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/events" className="nav-link text-success">
              Manage Events
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/event/attendence" className="nav-link text-success">
              Manage Event Attendence
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/view/transactions" className="nav-link text-success">
              View Transactions 
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/view/event/qrcode" className="nav-link text-success">
              Get Event QrCode 
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Admin Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Name:</span> {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email:</span> {email}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Balance:</span> 100000
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Base
      title="Welcome to admin area"
      description="Manage all of your products here"
      className="container bg-primary p-4"
    >
      <div className="row">
        <div className="col-3">{adminLeftSide()}</div>
        <div className="col-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
