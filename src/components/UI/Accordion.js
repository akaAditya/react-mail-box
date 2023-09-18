import React, { useEffect, useState } from "react";
import "./Accordion.css";
import { ToastContainer, toast } from "react-toastify";

const Accordion = (props) => {
  const [isActive, setIsActive] = useState(false);
  // const [readMsg, setReadMsg] = useState(false);
  const [msgData, setMsgData] = useState([]);

  const API_data = props.onGetDataFromAPI;
  // console.log(API_data, "API data");
  // console.log(msgData);

  useEffect(() => {
    Object.values(API_data).map((data) => {
      setMsgData(data);
      // console.log(data, "data from mapping api-data");
    });
  }, []);
  // const { emailFrom, emailTo, mailBody, subject } = msgData;

  const readMsgHandler = async (id) => {
    // setReadMsg(true);
    setIsActive(!isActive);
    // console.log(subject);
    const response = await fetch(
      `https://mail-box-react-59b23-default-rtdb.firebaseio.com/mailData${props.userMail}/${id}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          ...msgData,
          msgStatus: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    // console.log(data.msgStatus, "data");
    // setReadMsg(data.msgStatus);
  };

  const emailDeleteHandler = async (id) => {
    await fetch(
      `https://mail-box-react-59b23-default-rtdb.firebaseio.com/mailData${props.userMail}/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    toast("Successfully mail deleted");
  };

  return (
    <div>
      <div className="accordion-item">
        <div
          className="accordion-title"
          onClick={() => readMsgHandler(props.onGetMsgID)}
        >
          <div>
            {props.msgStatus ? "read" : "un-read"} {props.emailFrom} ------
            {props.subject}
          </div>
          <div>
            <button onClick={() => emailDeleteHandler(props.onGetMsgID)}>
              Delete
            </button>
            <ToastContainer />
          </div>
        </div>
        {isActive && <div className="accordion-content">{props.mailBody}</div>}
      </div>
      <hr />
    </div>
  );
};

export default Accordion;
