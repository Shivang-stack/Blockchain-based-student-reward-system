import React from "react";
import { API } from "../../backend";

const BVImageHelper = ({ blog}) => {
    console.log(blog._id)
    const imageurl =`${API}/blog/photo/${blog._id}`
    return (
      <div className="rounded border border-dark p-2">
        <img
          src={imageurl}
          alt=""
          className="blog-img"
        />
      </div>
    );
  };
  export default BVImageHelper;
  