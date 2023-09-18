import React, { useEffect, useState } from "react";
import "./AccordionSent.css";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { emailActions } from "../../../store/mail-store";

const AccordionSent = (props) => {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const [readMsg, setReadMsg] = useState(false);
  const [msgData, setMsgData] = useState([]);

  const API_data = props.onGetDataFromAPI;
  //   console.log(API_data);
  useEffect(() => {
    Object.values(API_data).map((data) => {
      setMsgData(data);
    });
  }, []);
  // const { emailFrom, emailTo, mailBody, subject } = msgData;
  const readMsgHandler = async (id) => {
    setReadMsg(true);
    setIsActive(!isActive);

    const response = await fetch(
      `https://mail-box-react-59b23-default-rtdb.firebaseio.com/mailSent${props.userMail}/${id}.json`,
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
    dispatch(emailActions.removeEmailHandler(id));
    // await fetch(
    //   `https://mail-box-react-59b23-default-rtdb.firebaseio.com/mailSent${props.userMail}/${id}.json`,
    //   {
    //     method: "",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
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
            {props.msgStatus ? "r" : "ur"} {props.emailFrom} ------ {props.subject}
          </div>
          <div>
            <button 
            onClick={() => emailDeleteHandler(props.onGetMsgID)}
            >
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

export default AccordionSent;
