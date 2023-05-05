import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { getRegisteredEventsByUserId } from "./helper/userapicalls";

const RegisteredEvents = ({ match }) => {
  const [registeredEvent, setRegisteredEvent] = useState([]);
  
  const [error, setError] = useState(false);

  const { user, token } = isAutheticated();

  
  const loadEvent = (userId) => {
    getRegisteredEventsByUserId(userId , token).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setRegisteredEvent(data);
      }
    });
  };

  useEffect(() => {
    loadEvent(match.params.userId);
  }, []);

  return (
    <Base title={`Welcome ${user.name}`} description="Manage Events Attendence here">
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Profile</span>
      </Link>
      <div className="row">
        <div className="col-12">
            <h2 className="text-center text-white my-3"></h2>
            {registeredEvent.map((event, index) => {
              if (!event.event_id) {
                return null; // skip this element
              }
            return (
                <div className="row text-center mb-2" key={index}>
                <div className="col-4">
                    <h3 className="text-white text-left">{event.event_id.name}</h3>
                </div>
                <div className="col-4">
                  <div className="btn btn-primary">
                    <span className="">Proof of Attendance</span>
                  </div>
                </div>
                </div>
            );
            })}
        </div>
        </div>
    </Base>
  );
};

export default RegisteredEvents;
