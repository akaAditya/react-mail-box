import React, { useEffect, useState } from "react";
import "./Inbox.css";
import ModalInbox from "../../Modal/ModalInbox";
import { BsRecycle } from "react-icons/bs";

const Inbox = (props) => {
  // const userEmail = useSelector((state) => state.auth.email);
  const userEmail = localStorage.getItem("email");
  const [inboxMailData, setInboxMailData] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  let sortedMail = userEmail.replace("@", "");
  sortedMail = sortedMail.replace(".", "");

  const getMailInInbox = async () => {
    const response = await fetch(
      `https://mail-box-react-59b23-default-rtdb.firebaseio.com/mailData${sortedMail}.json`
    );
    const data = await response.json();
    setInboxMailData(data);
  };

  const showMeassageBodyHandler = () => {
    setShowMessage((prev) => !prev);
  };
  
  useEffect(() => {
    getMailInInbox();
  }, []);

  return (
    <ModalInbox>
      <div>Inbox</div>
      <button onClick={getMailInInbox}>{BsRecycle()}</button>
      <br />
      <>
        {Object.values(inboxMailData).map((item) => (
          <ul key={Math.floor(Math.random() * 100)}>
            <button onClick={showMeassageBodyHandler} className="inbox-msg-btn">
              <span>From: {item.emailFrom}</span>---------------<span>{item.subject}</span> 
            </button>
            {showMessage && <>
              <p>{item.mailBody}</p>
              <button>Delete Mail</button>
            </>}
          </ul>
        ))}
      </>
      <button className="button-45" onClick={props.onClose}>
        Close
      </button>
    </ModalInbox>
  );
};

export default Inbox;
