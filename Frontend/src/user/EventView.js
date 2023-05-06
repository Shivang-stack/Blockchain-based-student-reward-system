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

  const [registered, setRegistered] = useState('');


  const { user, token } = isAutheticated();

  const { name, description, link, id, reward } = values;

  const loadEvent = (eventId) => {
    getEventById(eventId).then((data) => {
      if (data[0].error) {
        setError(data[0].error);
      } else if (data[0]) {
        setValues({
          ...values,
          id: data[0].id,
          name: data[0].name,
          description: data[0].description,
          link: data[0].link,
          reward: data[0].reward,
        });
      }
    });
  };
  
  const handleRegister = async () => {
    try {
      const body = {
        student_id: user._id,
        event_id: match.params.eventId,
      };
      const response = await registerToEvent(user._id, token, body);
      if (response.error) {
        setError(response.error);
      } else {
        setRegistered("Registered to Event");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again later.");
    }
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
            <h4>{registered}</h4>
            
          </div>
        </div>
      </div>
    </Base>
  );
};

export default EventView;
