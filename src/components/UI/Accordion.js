import React, { useEffect, useState } from "react";
import "./Accordion.css";

const Accordion = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [readMsg, setReadMsg] = useState(false);
  const [msgData, setMsgData] = useState([]);

  const API_data = props.onGetDataFromAPI;
  //   console.log(API_data);
  useEffect(() => {
    Object.entries(API_data).map((data) => {
      setMsgData(data[1]);
    });
  }, []);
  //   const { emailFrom, emailTo, mailBody, subject } = msgData;

  const readMsgHandler = async (id) => {
    setReadMsg(true);
    setIsActive(!isActive);

    const response = await fetch(
      `https://mail-box-react-59b23-default-rtdb.firebaseio.com/mailData${props.userMail}/${id}.json`,
      {
        method: "PUT",
        body: JSON.stringify({ ...msgData, msgStatus: true }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    // console.log(data.msgStatus, "data");
    // setReadMsg(data.msgStatus);
  };

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `https://mail-box-react-59b23-default-rtdb.firebaseio.com/mailData${props.userMail}.json`
      );
      const data = await response.json()
    //   console.log(data)
    
      Object.entries(data).map((item)=>{
        setReadMsg(item[1].msgStatus)
      })
    };
    getData()
  }, []);

  return (
    <div>
      <div className="accordion-item">
        <div
          className="accordion-title"
          onClick={() => readMsgHandler(props.onGetMsgID)}
        >
          {/* <div>{props.onGetMsgID}</div> */}
          <div>
            {readMsg ? "r" : "ur"} {props.emailFrom} ------ {props.subject}
          </div>
          <div>{isActive ? "-" : "+"}</div>
        </div>
        {isActive && (
          <div className="accordion-content">
            {props.mailBody}
            <button>Delete</button>
          </div>
        )}
      </div>
      <hr />
    </div>
  );
};

export default Accordion;
