import React, { useEffect, useState } from "react";
import "./Accordion.css";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { emailActions } from "../../store/mail-store";

const Accordion = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [msgData, setMsgData] = useState([]);
  const dispatch = useDispatch();

  const API_data = props.onGetDataFromAPI;
  console.log(Object.keys(API_data).length,'data length')

  // if(props.msgStatus=== false){
  //   dispatch(emailActions.countMailHandler(Object.keys(API_data).length))
  // }
  const countUnReadMsgs = Object.values(API_data).filter(item=> item.msgStatus===false)
  console.log(countUnReadMsgs,'countUnReadMsgs')
  dispatch(emailActions.countMailHandler(countUnReadMsgs.length))
  useEffect(() => {
    Object.values(API_data).map((data) => {
      setMsgData(data);
    });
  }, []);

  const readMsgHandler = async (id) => {
    setIsActive(!isActive);
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
