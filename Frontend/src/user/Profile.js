import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
import { getbalance } from "./helper/userapicalls";


const Profile = () => {
  
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

  const userLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">User Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to={`/user/registered/event/${user._id}`} className="nav-link text-success">
              Registered Events
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/user/events" className="nav-link text-success">
              Attendence Proof of the Events Atended
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/user/upload/certificate" className="nav-link text-success">
              Upload Achievements Certificates
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/user/view/transactions" className="nav-link text-success">
              View Rewards
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">User Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-primary mr-2">Name:</span> {user.name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-primary mr-2">Email:</span> {user.email}
          </li>
          <li className="list-group-item">
            <span className="badge badge-primary mr-2">Reward Balance:</span> {balance}
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Base
      title="Welcome to Profile"
      description="Manage all of your events here"
      className="container bg-primary p-4"
    >
      <div className="row">
        <div className="col-3">{userLeftSide()}</div>
        <div className="col-9">{userRightSide()}</div>
      </div>
    </Base>
  );
};

export default Profile;