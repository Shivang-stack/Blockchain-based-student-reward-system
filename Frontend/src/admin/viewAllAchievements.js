import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { getAllAchievement } from "./helper/adminapicall";
import CertificateImageHelper from "../user/helper/CertificateImagehelper";


const ViewAllAchievements = () => {
  const [achievements, setAchievements] = useState([]);

  const { user, token } = isAutheticated();

  const preload = () => {
    getAllAchievement().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setAchievements(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Base title={`Welcome Admin`} description="View All Students Achievements Here">
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
            <h2 className="text-center text-white my-3">All achievements</h2>
            {achievements.map((achievement, index) => {
            return (
                <div className="row text-center mb-2" key={index}>
                    <div className="col-5">
                        <h3>Certificate</h3>
                        <CertificateImageHelper achievement={achievement} />
                    </div>
                    <div className="col-6 ">
                        <h3>Details</h3>
                        <h4 className="text-white text-left">Certificate Details: {achievement.details}</h4>
                        <h4 className="text-white text-left">Student Name : {achievement.student_id.name}</h4>
                        <h4 className="text-white text-left">Student USN : {achievement.student_id.usn}</h4>
                    </div>
                </div>
            );
            })}
        </div>
        </div>
    </Base>
  );
};

export default ViewAllAchievements;
