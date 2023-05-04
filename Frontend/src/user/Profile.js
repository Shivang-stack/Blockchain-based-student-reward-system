// import React, { useState, useEffect } from "react";
// import Base from "../core/Base";
// import Titlebar from "./Titlebar";

// import { Link } from "react-router-dom";
// import { isAutheticated } from "../auth/helper";
// import { getbalance } from "./helper/userapicalls";
// import AdminDashBoard from "../admin/dashboard";


// const Profile = () => {
//   const [values, setValues] = useState({
//     balance: "0",
//   });
  
//   const [error, setError] = useState(false);
  
//   const {balance} =values;
  
//   const fetchbalance = walletId => {
//     getbalance(walletId).then(data => {
//       if (data.error) {
//         setError(data.error);
//       } else {
//         setValues({
//           ...values,
//           balance: data.balance
//         });
//       }
//     });
//   };

//   const{
//     user
//   } =isAutheticated();
 
//   useEffect(() => {
//     fetchbalance(user.walletId);
//   }, []);

//  const userRightSide = () => {
//   return (
//     <div className="card mb-4">
//       <h4 className="card-header">User Information</h4>
//       <ul className="list-group">
//         <li className="list-group-item">
//           <span className="badge badge-primary mr-2">Name:</span> {user.name}
//         </li>
//         <li className="list-group-item">
//           <span className="badge badge-primary mr-2">Email:</span> {user.email}
//         </li>
//         <li className="list-group-item">
//           <span className="badge badge-primary mr-2">Reward Balance:</span> {balance}
//         </li>
//         <li className="list-group-item">
//           <span className="badge badge-primary mr-2">Upload event proof:

//           </span>
//         </li>
//         {/* <li className="list-group-item">
//           <span className="badge badge-info">User Area</span>
//         </li> */}
//       </ul>
//     </div>
//   );
// };
 
//   return (
//     <Base
//       title="Welcome to Profile"
//       description="Manage all of your Information here"
//       className="container bg-secondary p-4"
//     >
   
//       <div className="container text-center">
//         <div className="">{userRightSide()}</div>
//         {/* <Link className="btn btn-dark" to={`/user/manageblogs/${user._id}`}>
//           <span className="">Manage Blogs</span>
//         </Link> */}
//       </div>

//     </Base>
   
//   );
// };

// export default Profile;
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
        <h4 className="card-header bg-dark text-white">User Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/event" className="nav-link text-success">
              Registered Events
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/events" className="nav-link text-success">
              Attendence Proof of the Events Atended
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/event/attendence" className="nav-link text-success">
              Upload Achievements Certificates
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/view/transactions" className="nav-link text-success">
              View Rewards
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">User Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Name:</span> {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email:</span> {email}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Balance:</span> 00
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Base
      title="Welcome to user area"
      description="Manage all of your events here"
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