import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategories, createaAchievement } from "./helper/userapicalls";
import { isAutheticated } from "../auth/helper/index";

const CreateAchievement = () => {
  const { user, token } = isAutheticated();

  const [values, setValues] = useState({
    details: "",
    categories: [],
    category: "",
    certificate:"",
    student_id: user._id,
    loading: false,
    error: "",
    createdAchievement: "",
    getaRedirect: false,
    formData: ""
  });

  const {
    details,
    categories,
    category,
    loading,
    error,
    createdAchievement,
    getaRedirect,
    formData
  } = values;

  const preload = () => {
    getCategories().then(data => {
      //console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, student_id:user._id, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createaAchievement(user._id, token, formData).then(data => {
      console.log(data)
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          details: "",
          certificate: "",
          student_id:user._id,
          loading: false,
          createdAchievement: "Certificate"
        });
      }
    });
  };

  // const handleChange = name => event => {
  //   const value =  event.target.value;
  //   formData.set(name, value);
  //   setValues({ ...values, [name]: value });
  // };

  const handleChange = name => event => {
    const value = name === "certificate" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdAchievement ? "" : "none" }}
    >
      <h4>{createdAchievement} submitted successfully</h4>
    </div>
  );

  const createAchievementForm = () => (
    <form>
      <span>Post Certificate</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("certificate")}
            type="file"
            name="certificate"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
      <p className="lead font-weight-bold ">Enter the details</p>
        <textarea
          onChange={handleChange("details")}
          name="details"
          className="form-control"
          placeholder="Description"
          value={details}
        />
      </div>
      

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-success mb-3"
      >
        Create Achievement
      </button>
    </form>
  );

  return (
    <Base
      title="Add a Your Achievements here!"
      description="Showcase your Excellence"
      className="container bg-info p-4"
    >
      <Link to="/user/profile" className="btn btn-md btn-dark mb-3">
        Profile
      </Link>
      <div className="row bg-info text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {createAchievementForm()}
        </div>
      </div>
    </Base>
  );
};

export default CreateAchievement;
