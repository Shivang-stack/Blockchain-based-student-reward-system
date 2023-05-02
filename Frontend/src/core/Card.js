import React from "react";
import { Link } from "react-router-dom";

const Card = ({
  event,
}) => {
  const eventvTitle = event ? event.name : "A photo from pexels";
  const eventvDescrption = event ? event.description : "Default description";
  const eventvLink = event.link? event.link : "no link";
  const eventvReward=event.reward?event.reward: "no reward"
  const MAX_LENGTH = 20;
  return (
    <div className="card text-white bg-secondary border border-secondary shadow">
      <div className="card-header lead bg-dark">{eventvTitle}</div>
      <div className="card-body">
        {/* <ImageHelper event={event} /> */}
        <p className="lead bg-dark font-weight-light text-wrap shadow">
        {`${eventvDescrption.substring(0, MAX_LENGTH)}...`}
        </p>
        <p className="btn btn-dark rounded  btn-sm font-weight-bold shadow ">Reward: {eventvReward}</p>
        <div className="row">
          <div className="col-12">
          <Link
              className="btn btn-primary"
              to={`/eventv/${event._id}`}
            >
            <span className="">Read More</span>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
