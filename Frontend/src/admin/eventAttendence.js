import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { getEventAttendeesByEventId } from "./helper/adminapicall";

const EventAttendence = ({ match }) => {
  const [eventAttendees, setEventAttendees] = useState([]);
  
  const [error, setError] = useState(false);

  const { user, token } = isAutheticated();

  
  const loadEvent = (eventId) => {
    getEventAttendeesByEventId(eventId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setEventAttendees(data);
      }
    });
  };

  useEffect(() => {
    loadEvent(match.params.eventId);
  }, []);

  return (
    <Base title="Welcome admin" description="Manage Events Attendence here">
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
            <h2 className="text-center text-white my-3"></h2>
            {eventAttendees.map((event, index) => {
            return (
                <div className="row bg-dark rounded p-2 text-center mb-2" key={index}>
                <div className="col-4">
                    <h3 className="text-white text-left">{event.event_id.name}</h3>
                </div>
                <div className="col-4">
                    <h3 className="text-white text-left">{event.student_id.usn}</h3>
                </div>
                <div className="col-4">
                    <h3 className="text-white text-left">isAttended :{ event.isAttended ? "Yes": "No"}</h3>
                </div>
                </div>
            );
            })}
        </div>
        </div>
    </Base>
  );
};

export default EventAttendence;
