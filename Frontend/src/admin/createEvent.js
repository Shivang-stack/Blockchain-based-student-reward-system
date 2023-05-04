import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategories, createaEvent } from "./helper/adminapicall";
import { isAutheticated } from "../auth/helper/index";

const CreateEvent = () => {
  const { user, token } = isAutheticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    link: "",
    reward: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdEvent: "",
    getaRedirect: false,
    formData: ""
  });

  const {
    name,
    description,
    link,
    reward,
    categories,
    category,
    loading,
    error,
    createdEvent,
    getaRedirect,
    formData
  } = values;

  const preload = () => {
    getCategories().then(data => {
      //console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createaEvent(user._id, token, formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          link: "",
          reward: "",
          loading: false,
          createdEvent: data.name
        });
      }
    });
  };

  const handleChange = name => event => {
    const value =  event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdEvent ? "" : "none" }}
    >
      <h4>{createdEvent} created successfully</h4>
    </div>
  );

  const createEventForm = () => (
    <form>
      <div className="form-group">
        <p className="lead font-weight-bold ">Enter the event</p>
        <input
          onChange={handleChange("name")}
          name="name"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
      <p className="lead font-weight-bold ">Enter the Description</p>
        <textarea
          onChange={handleChange("description")}
          name="description"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
      <p className="lead font-weight-bold ">Enter the Link</p>
        <input
          onChange={handleChange("link")}
          type="text"
          className="form-control"
          placeholder="link"
          value={link}
        />
      </div>
      <div className="form-group">
      <p className="lead font-weight-bold ">Enter the Category</p>
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select Category</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
      <p className="lead font-weight-bold ">Enter the Reward</p>
        <input
          onChange={handleChange("reward")}
          type="number"
          className="form-control"
          placeholder="Reward"
          value={reward}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-success mb-3"
      >
        Create Event
      </button>
    </form>
  );

  return (
    <Base
      title="Add a event here!"
      description="Welcome to event creation section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-info text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {createEventForm()}
        </div>
      </div>
    </Base>
  );
};

export default CreateEvent;
