import React, { useEffect, useState } from "react";
import "./Accordion.css";
import { ToastContainer, toast } from "react-toastify";

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
  const { emailFrom, emailTo, mailBody, subject } = msgData;

  const readMsgHandler = async (id) => {
    setReadMsg(true);
    setIsActive(!isActive);

    const response = await fetch(
      `https://mail-box-react-59b23-default-rtdb.firebaseio.com/mailData${props.userMail}/${id}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          emailFrom: emailFrom,
          emailTo: emailTo,
          mailBody: mailBody,
          subject: subject,
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

  // useEffect(() => {
  //   const getData = async () => {
  //     const response = await fetch(
  //       `https://mail-box-react-59b23-default-rtdb.firebaseio.com/mailData${props.userMail}.json`
  //     );
  //     const data = await response.json();
  //     console.log(data);

  // Object.entries(data).map((item)=>{

  //   setReadMsg(item[1].msgStatus)
  //   setLambai(item[1])
  //   // if(item[1].length === 3){
  //   //   dispatch(emailActions.countMailHandler(data.length))
  //   // }
  // })
  //   };
  //   getData();
  // }, []);
  // console.log(lambai)

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
