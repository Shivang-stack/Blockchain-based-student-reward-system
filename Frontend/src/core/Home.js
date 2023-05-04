import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getEvents, getCategoryById } from "./helper/coreapicalls";

export default function Home() {
  const [Events, setEvents] = useState([]);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState({});

  useEffect(() => {
    getEvents().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setEvents(data);
        const categoryMap = {};
        data.forEach((event) => {
          if (!categoryMap[event.category]) {
            getCategoryById(event.category).then((categoryData) => {
              categoryMap[event.category] = categoryData.name;
              setCategories({ ...categoryMap });
            });
          }
        });
      }
    });
  }, []);

  // Group events by category
  const eventsByCategory = {};
  Events.forEach((event) => {
    if (eventsByCategory[event.category]) {
      eventsByCategory[event.category].push(event);
    } else {
      eventsByCategory[event.category] = [event];
    }
  });

  return (
    <Base
      title="AMC Student Engagement Program"
      description="Blockchain Based Student Reward System"
    >
      {Object.entries(eventsByCategory).map(([categoryId, events]) => (
        <div key={categoryId}>
          <h5 className="nav nav-tabs bg-dark text-white p-2">{categories[categoryId]}</h5>
          <div className="row p-2">
            {events.map((event, index) => (
              <div key={index} className="col-lg-3 col-md-6 col-sm-12 mb-4">
                <Card event={event} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </Base>
  );
}
