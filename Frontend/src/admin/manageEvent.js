import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { getEvents } from "./helper/adminapicall";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);

  const { user, token } = isAutheticated();

  const preload = () => {
    getEvents().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setEvents(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Base title="Welcome admin" description="Manage events here">
      <h2 className="mb-4">All events:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
            <h2 className="text-center text-white my-3">Total events</h2>
            {events.map((event, index) => {
            return (
                <div className="row text-center mb-2" key={index}>
                <div className="col-4">
                    <h3 className="text-white text-left">{event.name}</h3>
                </div>
                <div className="col-4">
                    <Link
                    className="btn btn-success"
                    to={`/admin/event/update/${event._id}`}
                    >
                    <span className="">Update</span>
                    </Link>
                </div>
                <div className="col-4">
                    <button
                    onClick={() => {
                        //   deleteThisEvent(blog._id);
                    }}
                    className="btn btn-danger"
                    >
                    Delete
                    </button>
                </div>
                </div>
            );
            })}
        </div>
        </div>
    </Base>
  );
};

export default ManageEvents;
