import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ event }) => {
  const imageurl = event
    ? `${API}/event/qrcode/${event._id}`
    : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;

  const handleDownload = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", imageurl, true);
    xhr.responseType = "blob";
    xhr.onload = () => {
      const blob = xhr.response;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${event.name}.png`;
      link.click();
      URL.revokeObjectURL(url);
    };
    xhr.send();
  };

  return (
    <div className="rounded border bg-dark border-dark p-2">
      <div className="p-2">
        <img src={imageurl} alt="Qrcode" className="qrcode-img" />
      </div>
      <button className="btn btn-primary" onClick={handleDownload}>Download</button>
    </div>
  );
};

export default ImageHelper;
