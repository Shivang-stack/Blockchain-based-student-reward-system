import React, { useState } from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createEvent } from "./helper/adminapicall";

const CreateEvent = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    photo: "",
    link: "",
    reward: "",
  });

  const { name, description, link, reward } = values;

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAutheticated();

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );

  const handleChange = (event) => {
    setError("");
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    
    //backend request fired
    createEvent(user._id, token, values).then(
      (data) => {
        if (data.error) {
          console.log(data)
          setError(true);
        } else {
          setError("");
          setSuccess(true);
          setValues({
            name: "",
            description: "",
            photo: "",
            link: "",
            reward: "",
          });
        }
      }
    );
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Event created successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-danger">{error} Failed to create event</h4>;
    }
  };

  const myEventForm = () => (
    <form>
      <div className="form-group">
        <p className="lead font-weight-bold ">Enter the event</p>
        <input
          type="text"
          className="form-control my-3"
          name="name"
          value={name}
          required
          placeholder="Name"
          onChange={handleChange}
        />
        <p className="lead font-weight-bold">Enter the description</p>
        <textarea
          name="description"
          onChange={handleChange}
          className="form-control"
          placeholder="Description"
          value={description}
        />
        <p className="lead font-weight-bold">Enter the Registration Link</p>
        <input
          type="text"
          className="form-control my-3"
          name="link"
          value={link}
          placeholder="Enter Link"
          onChange={handleChange}
        />
        <p className="lead font-weight-bold">Enter Event Reward</p>
        <input
          type="number"
          className="form-control my-3"
          name="reward"
          value={reward}
          placeholder="Enter reward"
          onChange={handleChange}
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Create Event
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Welcome Admin"
      description="Create Events here"
      className="container bg-white p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {myEventForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default CreateEvent;
