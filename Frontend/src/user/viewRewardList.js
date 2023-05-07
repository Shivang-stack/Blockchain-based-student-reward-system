import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { getUsers } from "./helper/userapicalls";

const ViewRewards = () => {
  const [rewards, setRewards] = useState([]);

  const { user, token } = isAutheticated();

  const preload = () => {
    getUsers().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        const filteredData = data.filter(item => item.role !== 1);
        filteredData.sort((a, b) => b.wallet.balance - a.wallet.balance);
        setRewards(filteredData);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Base title={`Welcome ${user.name}`} description="View Your Rewards Here">
      <Link className="btn btn-info" to={`/user/profile`}>
        <span className="">Profile</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Reward list</h2>
          {rewards.map((reward, index) => {
            return (
              <div className="row bg-dark rounded p-2 text-center mb-2" key={index}>
                <div className="col-4">
                  <h4 className="text-white text-center">{reward.name}</h4>
                </div>
                <div className="col-4">
                  <h4 className="text-white text-center">{reward.usn}</h4>
                </div>
                <div className="col-4">
                  <h4 className="text-white text-center">{reward.wallet.balance}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ViewRewards;
