import React, { useState } from "react";
import "./AccordionSent.css";
import { ToastContainer, toast } from "react-toastify";

const AccordionSent = (props) => {
  const [isActive, setIsActive] = useState(false);

  // const { emailFrom, emailTo, mailBody, subject } = msgData;
  const readMsgHandler = async (id) => {
    setIsActive(!isActive);
    const inboxData = {
      emailFrom: props.emailFrom,
      emailTo: props.emailTo,
      subject: props.subject,
      mailBody: props.mailBody,
    }

    const response = await fetch(
      `https://mail-box-react-59b23-default-rtdb.firebaseio.com/mailSent${props.userMail}/${id}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          ...inboxData,
          msgStatus: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
  };

  const emailDeleteHandler = async (id) => {
    await fetch(
      `https://mail-box-react-59b23-default-rtdb.firebaseio.com/mailSent${props.userMail}/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // toast("Successfully mail deleted");
  };

  return (
    <div>
      <div className="accordion-item">
        <div
          className="accordion-title"
          onClick={() => readMsgHandler(props.onGetMsgID)}
        >
          <div>
            {props.msgStatus ? "read" : "unread"} {"Sent by me"} ------
            {props.subject}
          </div>
          <div>
            <ToastContainer />
          </div>
        </div>
        {isActive && (
          <div>
            <div className="accordion-content">{props.mailBody}</div>
            <div>
              <button onClick={() => emailDeleteHandler(props.onGetMsgID)}>
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
      <hr />
    </div>
  );
};

export default AccordionSent;
