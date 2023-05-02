import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper";
import { getEventById, registerToEvent } from "./helper/userapicalls";

const EventView = ({ match }) => {
  const [values, setValues] = useState({
    id: "",
    name: "",
    description: "",
    photo: "",
    link: "",
    reward: "",
  });
  
  const [error, setError] = useState(false);

  const { user, token } = isAutheticated();

  const { name, description, link, id, reward } = values;

  const loadEvent = (eventId) => {
    getEventById(eventId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setValues({
          ...values,
          id: data.id,
          name: data.name,
          description: data.description,
          link: data.link,
          reward: data.reward,
        });
      }
    });
  };

  const handleRegister = () => {
    const body = {
      student_id: user._id, // replace with actual userId
      event_id: values.id,
    };
    registerToEvent(user._id,token,body).then((data) => {
      if (data.error) {
        setError(data.error);
      }
    });
  };

  useEffect(() => {
    loadEvent(match.params.eventId);
  }, []);

  return (
    <Base title="AMC Student Engagement Program" description="">
      <div className="row ">
        <div className="container">
          <div className="text-white text-left">
            <h1 className="display-4 text-dark text-center font-weight-bold">
              {name}
            </h1>
            <p className="font-weight-normal">{description}</p>
            <button className="btn btn-primary btn-lg" href={link}>
              Link 
            </button>
            <h4>Reward: {reward}</h4>
            <button className="btn btn-primary btn-lg" onClick={handleRegister}>
              Click to Register 
            </button>
            
          </div>
        </div>
      </div>
    </Base>
  );
};

export default EventView;
