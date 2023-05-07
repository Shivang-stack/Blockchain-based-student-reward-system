import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
import { getbalance } from "../user/helper/userapicalls";

const AdminDashBoard = () => {
  
  const [values, setValues] = useState({
    balance: "0",
  });
  
  const [error, setError] = useState(false);
  
  const {balance} =values;
  
  const fetchbalance = walletId => {
    getbalance(walletId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setValues({
          ...values,
          balance: data.balance
        });
      }
    });
  };

  const { user, token } = isAutheticated();
  
  useEffect(() => {
    fetchbalance(user.wallet);
  }, []);

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
            <Link to="/admin/view/event/qrcode" className="nav-link text-success">
              Get Event QrCode 
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/events" className="nav-link text-success">
              Manage Events
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/event/attendence" className="nav-link text-success">
              View Event Attendees
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/view/achievements" className="nav-link text-success">
              View Students Achievements 
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/view/transactions" className="nav-link text-success">
              View Transactions 
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
            <span className="badge badge-success mr-2">Name:</span> {user.name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email:</span> {user.email}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Balance:</span> {balance}
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
