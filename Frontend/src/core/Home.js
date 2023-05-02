import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getEvents } from "./helper/coreapicalls";

export default function Home() {
  const [Events, setEvents] = useState([]);
  const [error, setError] = useState(false);

  const loadAllEvent = () => {
    getEvents().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setEvents(data);
      }
    });
  };

  useEffect(() => {
    loadAllEvent();
  }, []);

  return (
    <Base title="AMC Student Engagement Program" description="Blockchain Based Student Reward System">
      <div className="row">
        {Events.map((event, index) => (
          <div key={index} className="col-lg-3 col-md-6 col-sm-12 mb-4">
            <Card event={event} />
          </div>
        ))}
      </div>
    </Base>
  );
}
