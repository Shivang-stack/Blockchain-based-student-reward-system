import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategories, updateEvent, getEvent } from "./helper/adminapicall";
import { isAutheticated } from "../auth/helper/index";

const UpdateEvent = ({ match }) => {
  const { user, token } = isAutheticated();
  const eventId = match.params.eventId;

  const [values, setValues] = useState({
    name: "",
    description: "",
    link: "",
    reward: "",
    category: "",
    loading: false,
    error: "",
    createdEvent: "",
    getaRedirect: false,
  });

  const {
    name,
    description,
    link,
    reward,
    category,
    loading,
    error,
    createdEvent,
  } = values;

  const [categories, setCategories] = useState([]);

  const preloadProduct = async () => {
    try {
      const eventData = await getEvent(eventId);
      if (eventData[0].error) {
        setValues({ ...values, error: eventData[0].error });
      } else {
        preloadCategories();
        setValues({
          ...values,
          name: eventData[0].name,
          description: eventData[0].description,
          link: eventData[0].link,
          category: eventData[0].category,
          reward: eventData[0].reward,
        });
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const preloadCategories = async () => {
    try {
      const categoryData = await getCategories();
      if (categoryData.error) {
        setValues({ ...values, error: categoryData.error });
      } else {
        setCategories(categoryData);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    preloadProduct();
    preloadCategories();
  }, [eventId]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("link", link);
      formData.append("reward", reward);
      formData.append("category", category);

      console.log(formData)
      
      const eventData = await updateEvent(
        eventId,
        user._id,
        token,
        formData
      );

      console.log(eventData)

      if (eventData.error) {
        setValues({ ...values, error: eventData.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          link: "",
          reward: "",
          loading: false,
          createdEvent: eventData.name,
        });
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdEvent ? "" : "none" }}
    >
      <h4>{createdEvent} updated successfully</h4>
    </div>
  );

  const createEventForm = () => (
    <form>
      <div className="form-group">
        <p className="lead font-weight-bold">Enter the event</p>
        <input
          onChange={handleChange("name")}
          name="name"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <p className="lead font-weight-bold">Enter the Description</p>
        <textarea
          onChange={handleChange("description")}
          name="description"
          rows={5}
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <p className="lead font-weight-bold">Enter the Link</p>
        <input
          onChange={handleChange("link")}
          type="text"
          className="form-control"
          placeholder="link"
          value={link}
        />
      </div>
      <div className="form-group">
        <label htmlFor="category" className="text-light">
          Category
        </label>
        <select
          className="form-control custom-select"
          name="category"
          value={category}
          onChange={handleChange("category")}
          id="category"
          required
        >
          {categories.map((thisCategory, index) => (
            <option key={index} value={thisCategory._id}>
              {thisCategory.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <p className="lead font-weight-bold">Enter the Reward</p>
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
        Update Event
      </button>
    </form>
  );

  return (
    <Base
      title="Update an event here!"
      description="Welcome to the event updation section"
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

export default UpdateEvent;
