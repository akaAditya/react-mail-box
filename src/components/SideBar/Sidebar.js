import React, { useState } from "react";
import "./Sidebar.css";
import MailEditor from "./Compose/Editor/MailEditor";
import Inbox from "./Inbox/Inbox";
import Read from "./Read/Read";
import Sent from "./Sent/Sent";
import Trash from "./Trash/Trash";

const Sidebar = () => {
  const [showCompose, setShowCompose] = useState(false);
  const [showInbox, setShowInbox] = useState(false);
  const [showRead, setShowRead] = useState(false);
  const [showSent, setShowSent] = useState(false);
  const [showTrash, setShowTrash] = useState(false);

  const openCompose = () => setShowCompose(true);
  const closeCompose = () => setShowCompose(false);

  const openInbox = () => setShowInbox(true);
  const closeInbox = () => setShowInbox(false);

  const openRead = () => setShowRead(true);
  const closeRead = () => setShowRead(false);

  const openSent = () => setShowSent(true);
  const closeSent = () => setShowSent(false);

  const openTrash = () => setShowTrash(true);
  const closeTrash = () => setShowTrash(false);

  return (
    <div>
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
              Inbox
            </button>
            {showInbox && <Inbox onClose={closeInbox} />}
          </li>
          <li>
            <button className="button-81" onClick={openRead}>
              Read
            </button>
            {showRead && <Read onClose={closeRead} />}
          </li>
          <li>
            <button className="button-81" onClick={openSent}>
              Sent
            </button>
            {showSent && <Sent onClose={closeSent} />}
          </li>
          <li>
            <button className="button-81" onClick={openTrash}>
              Trash
            </button>
            {showTrash && <Trash onClose={closeTrash} />}
          </li>
        </ul>
      </div>
      <div></div>
    </div>
  );
};

export default Sidebar;
