import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { getTransactions } from "./helper/adminapicall";

const Transaction = () => {
  const [blocks, setBlocks] = useState([]);

  const { user, token } = isAutheticated();

  const preload = () => {
    getTransactions().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBlocks(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Base title="Welcome admin" description="See All transaction here">
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
            <h2 className="text-center text-white my-3 font-weight-bolder">Total Transactions</h2>
            {blocks.map((block, index) => {
            return (
                <div className="row text-center mb-2 border border-white" key={index}>
                    <div className="col-11">
                        <p className="text-white text-center"><b>Sender     :</b> {block.sender}</p>
                        <p className="text-white text-center"><b>Receiver   :</b> {block.receiver}</p>
                        <p className="text-white text-center"><b>Amount     :</b> {block.amount}</p>
                        <p className="text-white text-center"><b>Timestamp  :</b> {block.timestamp}</p>
                        <p className="text-white text-center"><b>Signature  :</b> {block.signature}</p>
                    </div>
                </div>
            );
            })}
        </div>
        </div>
    </Base>
  );
};

export default Transaction;
