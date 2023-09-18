import React, { useEffect, useState } from "react";
import "./Inbox.css";
import Accordion from "../../UI/Accordion";

const Inbox = (props) => {
  const [inboxMailData, setInboxMailData] = useState([]);

  const userEmail = localStorage.getItem("email");
  let sortedMail = userEmail.replace("@", "");
  sortedMail = sortedMail.replace(".", "");

  const getMailInInbox = async () => {
    const response = await fetch(
      `https://mail-box-react-59b23-default-rtdb.firebaseio.com/mailData${sortedMail}.json`
    );
    const data = await response.json();
    setInboxMailData(data);
  };
  useEffect(() => {
    setInterval(() => {
      getMailInInbox();
    }, 2000);
  }, []);

  return (
    <div className="inbox-container">
      <div
        style={{
          fontFamily: "arial",
          padding: "20px",
          fontSize: "25px",
          color: "#198a26",
        }}
      >
        Inbox
      </div>
      <br />
      <div className="accordion">
        {Object.entries(inboxMailData).map((item) => (
          <div key={item[0]}>
            <Accordion
              emailFrom={item[1].emailFrom}
              subject={item[1].subject}
              mailBody={item[1].mailBody}
              onGetMsgID={item[0]}
              msgStatus={item[1].msgStatus}
              onGetDataFromAPI={inboxMailData}
              userMail={sortedMail}
            />
          </div>
        ))}
      </div>

      <button className="button-45" onClick={props.onClose}>
        Close
      </button>
    </div>
  );
};

export default Inbox;
