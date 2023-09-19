import React, { useEffect, useState } from "react";
import "./Sent.css";
import AccordionSent from "./AccordionSent";
import { useDispatch } from "react-redux";
import { emailActions } from "../../../store/mail-store";
import { useCallback } from "react";

const Sent = (props) => {
  const [sentData, setSentData] = useState([]);
  const userEmail = localStorage.getItem("email");
  const dispatch = useDispatch();
  let sortedSentMail = userEmail.replace("@", "");
  sortedSentMail = sortedSentMail.replace(".", "");

  const storeSentEmails = useCallback(async () => {
    const response = await fetch(
      `https://mail-box-react-59b23-default-rtdb.firebaseio.com/mailSent${sortedSentMail}.json`
    );
    const data = await response.json();
    dispatch(emailActions.sentMailHandler(data));

    if (response.ok && data !== null) {
      return setSentData(data);
    } else {
      return [];
    }
  }, []);

  useEffect(() => {
    setInterval(() => {
      storeSentEmails();
    }, 2000);
  }, []);

  return (
    <div className="sent-container">
      <div
        style={{
          fontFamily: "arial",
          padding: "20px",
          fontSize: "25px",
          color: "#198a26",
        }}
      >
        Sent
      </div>

      <div className="accordion">
        {Object.entries(sentData).map((item) => (
          <div key={item[0]}>
            <AccordionSent
              emailFrom={item[1].emailFrom}
              emailTo={item[1].emailTo}
              subject={item[1].subject}
              mailBody={item[1].mailBody}
              msgStatus={item[1].msgStatus}
              onGetMsgID={item[0]}
              onGetDataFromAPI={sentData}
              userMail={sortedSentMail}
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

export default Sent;
