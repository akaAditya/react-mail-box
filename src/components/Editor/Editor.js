import { useEffect, useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "./Editor.css";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch } from "react-redux";
import { emailActions } from "../../store/mail-store";

const MailEditor = () => {
  const inputToEmail = useRef();
  const inputSubject = useRef();
  const dispatch = useDispatch();
  const [convertedContent, setConvertedContent] = useState(null);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    let mailBodyData = convertToRaw(editorState.getCurrentContent());
    let textContent = mailBodyData.blocks.map((item) => {
      return item.text;
    });
    setConvertedContent(textContent.toString());
  }, [editorState]);

  const sendMailHandler = async () => {
    const mailToInput = inputToEmail.current.value;
    const subjectInput = inputSubject.current.value;
    let sortedMail = mailToInput.replace("@", "");
    sortedMail = sortedMail.replace(".", "");

    const mailData = {
      email: mailToInput,
      subject: subjectInput,
      mailBody: convertedContent,
    };
    dispatch(emailActions.sendMailHandler(mailData));
    const response = await fetch(
      `https://mail-box-react-59b23-default-rtdb.firebaseio.com/mailData${sortedMail}.json`,
      {
        method: "POST",
        body: JSON.stringify({
          email: mailToInput,
          subject: subjectInput,
          mailBody: convertedContent,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    alert('Successfully Mail Sent')

  };

  return (
    <div className="editor-area">
      <header className="editor-header">Compose E-Mail</header>
      <div>
        <label htmlFor="email">To:</label>
        <input type="email" id='email' placeholder="Email to..." ref={inputToEmail} autoComplete='on'/>
        <label htmlFor="subject">Subject:</label>
        <input type="text" id="subject" placeholder="Subject" ref={inputSubject} />
      </div>
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          onEditorStateChange={setEditorState}
          toolbar={{
            options: ["inline", "blockType"],
          }}
        />
      </div>
      {/* <div
        className="preview"
        dangerouslySetInnerHTML={createMarkup(convertedContent)}
      ></div> */}
      <button onClick={sendMailHandler}>Send</button>
    </div>
  );
};

export default MailEditor;
