import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { getAchievementsByUserId } from "./helper/userapicalls";
import CertificateImageHelper from "./helper/CertificateImagehelper";


const ViewAchievements = () => {
  const [achievements, setAchievements] = useState([]);

  const { user, token } = isAutheticated();

  const preload = (userId) => {
    getAchievementsByUserId(userId).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setAchievements(data);
      }
    });
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
  
    preload(user._id, signal);
  
    // Clean up function
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <Base title={`Welcome ${user.name}`} description="View Your Achievements Here">
      <Link className="btn btn-info" to={`/user/profile`}>
        <span className="">Profile</span>
      </Link>
      <div className="row">
        <div className="col-12">
            <h2 className="text-center text-white my-3">All achievements</h2>
            {achievements.map((achievement, index) => {
            return (
                <div className="row text-center mb-2" key={index}>
                    <div className="col-6">
                        <h3>Certificate</h3>
                        <CertificateImageHelper achievement={achievement} />
                    </div>
                    <div className="col-6">
                        <h3>Details</h3>
                        <p className="text-white text-left">{achievement.details}</p>
                    </div>
                </div>
            );
            })}
        </div>
        </div>
    </Base>
  );
};

export default ViewAchievements;
