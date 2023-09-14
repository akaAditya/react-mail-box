import { useEffect, useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "./Editor.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch } from "react-redux";
import { emailActions } from "../../../../store/mail-store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalEditor from "../../../Modal/ModalEditor";

const MailEditor = (props) => {
  const inputToEmail = useRef();
  const inputSubject = useRef();
  const emailFromUser = localStorage.getItem('email');

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

  const sendMailHandler = async (event) => {
    event.preventDefault();
    const mailToInput = inputToEmail.current.value;
    const subjectInput = inputSubject.current.value;
    let sortedMail = mailToInput.replace("@", "");
    sortedMail = sortedMail.replace(".", "");

    const mailData = {
      emailFrom: emailFromUser,
      emailTo: mailToInput,
      subject: subjectInput,
      mailBody: convertedContent,
    };

    dispatch(emailActions.sendMailHandler(mailData));
    const response = await fetch(
      `https://mail-box-react-59b23-default-rtdb.firebaseio.com/mailData${sortedMail}.json`,
      {
        method: "POST",
        body: JSON.stringify(mailData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    toast("Successfully Mail Sent");
  };

  return (
    <>
      <ModalEditor closeModal={props.onClose}>
        <div className="editor-area">
          <form>
            <header className="editor-header">Compose E-Mail</header>
            <div className="input-field">
            <div className="mb-3 ">
                <label htmlFor="email" className="form-label form-label-color">
                  From:
                </label>
                <input
                  type="email"
                  className="form-control form-input"
                  id="email"
                  value={emailFromUser}
                  autoComplete="on"
                  placeholder="Email from..."
                  required
                />
              </div>
              <div className="mb-3 ">
                <label htmlFor="email" className="form-label form-label-color">
                  To:
                </label>
                <input
                  type="email"
                  className="form-control form-input"
                  id="email"
                  ref={inputToEmail}
                  autoComplete="on"
                  placeholder="Email to..."
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="formGroupExampleInput2"
                  className="form-label form-label-color"
                >
                  Subject:
                </label>
                <input
                  type="text"
                  className="form-control form-input"
                  id="formGroupExampleInput2"
                  placeholder="Subject"
                  ref={inputSubject}
                  required
                />
              </div>
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
              <div className="btn-submit-close-div">
                <button className="button-9" onClick={sendMailHandler}>
                  Send
                </button>
                <ToastContainer />
                <button className="button-45" onClick={props.onClose}>
                  Close
                </button>
              </div>
            </div>
          </form>
        </div>
      </ModalEditor>
    </>
  );
};

export default MailEditor;
