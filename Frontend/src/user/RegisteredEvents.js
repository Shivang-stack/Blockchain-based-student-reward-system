import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { getRegisteredEventsByUserId } from "./helper/userapicalls";
import {QrReader} from 'react-qr-reader';

const RegisteredEvents = ({ match }) => {
  const [registeredEvent, setRegisteredEvent] = useState([]);
  const [error, setError] = useState(false);
  const [scannerActive, setScannerActive] = useState(false);
  const { user, token } = isAutheticated();
  const [scannedData, setScannedData] = useState('');

  const loadEvent = (userId) => {
    getRegisteredEventsByUserId(userId , token).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setRegisteredEvent(data);
      }
    });
  };

  useEffect(() => {
    loadEvent(match.params.userId);
  }, []);

  const handleScan = (result) => {
    if (result) {
      // setScannedData(result);
      console.log("result")
    }
  };

  const handleError = (err) => {
    console.error(err); // handle any errors here
  };

  const handleQrScan = (data) => {
    if (data) {
      setScannedData(data.text);
    }
  }

  const toggleScanner = () => {
    setScannerActive(!scannerActive);
  };

  return (
    <Base title={`Welcome ${user.name}`} description="Manage Events Attendence here">
      <Link className="btn btn-info" to={`/admin/dashboard`}>
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
              <div className="row text-center mb-2" key={index}>
                <div className="col-4">
                  <h3 className="text-white text-left">{event.event_id.name}</h3>
                </div>
                <div className="col-2">
                  <div className="btn btn-primary" onClick={toggleScanner}>
                    {scannerActive ? 'Stop Scanner' : 'Start Scanner'}
                  </div>
                </div>
                <div className="col-4">
                  {scannerActive && (
                    <QrReader
                      delay={300}
                      style={{ width: '100%' }}
                      onError={handleError}
                      onScan={handleScan}
                      onResult={handleQrScan}
                    />
                  )}
                  <h3>data: {scannedData}</h3>
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
