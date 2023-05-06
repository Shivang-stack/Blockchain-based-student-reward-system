import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { getRegisteredEventsByUserId,attendedTheEvent } from "./helper/userapicalls";
import { QrReader } from 'react-qr-reader';

const RegisteredEvents = ({ match }) => {
  const [registeredEvent, setRegisteredEvent] = useState([]);
  const [error, setError] = useState(false);
  const { user, token } = isAutheticated();

  useEffect(() => {
    loadEvent(match.params.userId);
  }, []);

  const loadEvent = (userId) => {
    getRegisteredEventsByUserId(userId , token).then((data) => {
      console.log(data)
      if (data.error) {
        setError(data.error);
      } else {
        setRegisteredEvent(data);
      }
    });
  };

  const [scannerActive, setScannerActive] = useState({});
  const [scannedData, setScannedData] = useState({});

  const toggleScanner = (index) => {
    setScannerActive(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const handleScan = (index, result) => {
    if (result) {
      console.log(result)
    }
  };

  const handleError = (err) => {
    console.error(err); // handle any errors here
  };

  const handleQrScan = (index, data , event) => {
    if (data) {
      if (data.text === event.event_id._id ){
        const body = {
          student_id: user._id, // replace with actual userId
          event_id: data.text,
        };
        attendedTheEvent(token,body).then((datan) => {
          if (datan.error) {
            setError(datan.error);
          }
          setScannedData(prevState => ({
            ...prevState,
            [index]: `User Attendence Recorded ${event.event_id.name}`
          }));
        });
      }
      else{
        setScannedData(prevState => ({
          ...prevState,
          [index]: `Wrong Event QR-Code`
        }));
      }
      
    }
  }

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: scannedData ? "" : "none" }}
    >
      <h4>{scannedData}</h4>
    </div>
  );

  return (
    <Base title={`Welcome ${user.name}`} description="Manage Events Attendence here">
      {/* {successMessage} */}
      <Link className="btn btn-info" to={`/user/profile`}>
        <span className="">Profile</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3"></h2>
          {registeredEvent.map((event, index) => {
            if (!event.event_id) {
              return null; // skip this element
            }
            return (
              <div className="row text-center mb-2 border border-dark shadow p-2" key={index}>
                <div className="col-3">
                  <h3 className="text-white text-center">{event.event_id.name}</h3>
                </div>
                <div className="col-4">
                  <div className="btn btn-primary" onClick={() => toggleScanner(index)}>
                    {scannerActive[index] ? 'Stop Scanner' : 'Start Scanner'}
                  </div>
                  <div className="shadow">
                    {scannerActive[index] && (
                      <QrReader
                        delay={300}
                        style={{ width: '100%' }}
                        onError={handleError}
                        onScan={(result) => handleScan(index, result)}
                        onResult={(data) => handleQrScan(index, data, event)}
                      />
                    )}
                  </div>
                </div>
                <div className="col-3">
                  <h3 className="text-white">Status: {scannedData[index]}</h3>
                </div>
              </div>
            );
          })}
          
        </div>
      </div>
    </Base>
  );
};


export default RegisteredEvents;
