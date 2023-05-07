import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { getEvents } from "./helper/adminapicall";
import ImageHelper from "./helper/ImageHelper";


const EventQrcode = () => {
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
    <Base title="Welcome admin" description="Generate QRCode For you event here">
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
            <h2 className="text-center text-white my-3">Total events</h2>
            {events.map((event, index) => {
            return (
                <div className="row text-center mb-2" key={index}>
                <div className="col-6">
                    <h3 className="text-white text-left">{event.name}</h3>
                    <p className="text-white text-left"><b>Description     :</b> {event.description}</p>
                </div>
                <div className="col-6">
                    <ImageHelper event={event} />
                </div>
                </div>
            );
            })}
        </div>
        </div>
    </Base>
  );
};

export default EventQrcode;
