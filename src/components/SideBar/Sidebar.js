import React, { useState } from "react";
import "./Sidebar.css";
import MailEditor from "./Compose/Editor/MailEditor";
import Inbox from "./Inbox/Inbox";
// import Read from "./Read/Read";
import Sent from "./Sent/Sent";
import Trash from "./Trash/Trash";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-store";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Sidebar = () => {
  const [showCompose, setShowCompose] = useState(false);
  const [showInbox, setShowInbox] = useState(false);
  // const [showRead, setShowRead] = useState(false);
  const [showSent, setShowSent] = useState(false);
  const [showTrash, setShowTrash] = useState(false);
  const history = useHistory();

  const countUnRead = useSelector((state) => state.email.count);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logoutHandler());
    history.replace("/auth");
  };
  const openCompose = () => setShowCompose(true);
  const closeCompose = () => setShowCompose(false);

  const openInbox = () => setShowInbox(true);
  const closeInbox = () => setShowInbox(false);

  // const openRead = () => setShowRead(true);
  // const closeRead = () => setShowRead(false);

  const openSent = () => setShowSent(true);
  const closeSent = () => setShowSent(false);

  const openTrash = () => setShowTrash(true);
  const closeTrash = () => setShowTrash(false);

  return (
    <div className="container-sb">
      <div>
        <ul className="sidebar-ul">
          <li>
            <button className="button-81" onClick={openCompose}>
              Compose
            </button>
            {showCompose && <MailEditor onClose={closeCompose} />}
          </li>
          <li>
            <button className="button-81" onClick={openInbox}>
              Inbox {countUnRead}
            </button>
          </li>
          {/* <li>
            <button className="button-81" onClick={openRead}>
              Read
            </button>
            {showRead && <Read onClose={closeRead} />}
          </li> */}
          <li>
            <button className="button-81" onClick={openSent}>
              Sent
            </button>
          </li>
          <li>
            <button className="button-81" onClick={openTrash}>
              Trash
            </button>
          </li>
          <li>
            <button onClick={logoutHandler} className="button-81">
              Logout
            </button>
          </li>
        </ul>
      </div>
      <div>{showInbox && <Inbox onClose={closeInbox} />}</div>
      <div>{showSent && <Sent onClose={closeSent} />}</div>
      <div>{showTrash && <Trash onClose={closeTrash} />}</div>
    </div>
  );
};

export default Sidebar;
