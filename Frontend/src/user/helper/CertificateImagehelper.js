import React from "react";
import { API } from "../../backend";

const CertificateImageHelper = ({ achievement}) => {
    console.log(achievement)
    const imageurl = achievement
    ? `${API}/user/achievement/certificate/${achievement._id}`
    : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
    return (
      <div className="rounded border bg-dark border-dark p-2">
        <img
          src={imageurl}
          alt="Certificate"
          className="qrcode-img"
          width="70%"
          height="60%"
        />
      </div>
    );
  };
  export default CertificateImageHelper;
  