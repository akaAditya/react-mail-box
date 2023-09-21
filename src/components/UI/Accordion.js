import React, { useEffect, useState } from "react";
import "./Accordion.css";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { emailActions } from "../../store/mail-store";

const Accordion = (props) => {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const API_data = props.onGetDataFromAPI;

  useEffect(() => {
    const countUnReadMsgs = Object.values(API_data).filter(
      (item) => item.msgStatus === false
    );
    dispatch(emailActions.countMailHandler(countUnReadMsgs.length));
  }, [API_data, dispatch]);

  const readMsgHandler = async (id) => {
    setIsActive(!isActive);
    console.log(props.subject,'*****')
    const inboxData = {
      emailFrom: props.emailFrom,
      emailTo: props.emailTo,
      subject: props.subject,
      mailBody: props.mailBody,
    }
    const response = await fetch(
      `https://mail-box-react-59b23-default-rtdb.firebaseio.com/mailData${props.userMail}/${id}.json`,
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
      `https://mail-box-react-59b23-default-rtdb.firebaseio.com/mailData${props.userMail}/${id}.json`,
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
            {props.msgStatus ? "read" : "un-read"} {props.emailFrom} ------
            {props.subject}
          </div>
          <div>
            <ToastContainer />
          </div>
        </div>
        {isActive && (
          <div>
            <div className="accordion-content">
              {props.mailBody}
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

export default Accordion;
