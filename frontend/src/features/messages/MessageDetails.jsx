import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteMessage, getMessages } from "../../App";
import {
  BackArrowIcon,
  DeleteIcon,
  EditIcon,
  ForwardArrowIcon,
  PreviousPageIcon,
} from "../../Icons";

function MessageDetails({ messages, setMessages }) {
  messages = messages || [];
  const navigate = useNavigate();
  const { messageId } = useParams();
  const message =
    messages?.responseData?.data?.find(
      (msg) => msg.messageId === Number(messageId)
    ) || [];

  function handleClickDelete() {
    deleteMessage(message.messageId).then(() => {
      getMessages().then((res) => setMessages(res));
      navigate(-1);
    });
  }
  return message ? (
    <div className="message-details">
      <div className="top-bar">
        <div className="left-buttons">
          <button
            type="button"
            className="previous-page-icon"
            onClick={() => navigate(-1)}
          >
            <PreviousPageIcon />
          </button>
        </div>
        <div className="right-buttons">
          <Link
            to={`/messages/${message.messageId}/edit`}
            message={message}
            className="edit-icon"
          >
            <EditIcon />
          </Link>
          <button
            className="delete-icon"
            type="button"
            onClick={handleClickDelete}
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
      <div className="body">
        <div className="title-time-recipient">
          <h1 className="title">{message.title}</h1>
          <div className="time-recipient">
            <strong>{message.to}</strong>
            <p>{message?.sentAt}</p>
          </div>
        </div>
        <p className="text">{message.body}</p>
      </div>
      <div className="next-back-buttons">
        <div className="back-button">
          <div className="back-arrow-icon">
            <BackArrowIcon />
          </div>
          <div className="label">Back</div>
        </div>
        <div className="next-button">
          <div className="label">Next</div>
          <div className="next-arrow-icon">
            <ForwardArrowIcon />
          </div>
        </div>
      </div>
    </div>
  ) : (
    "Message loading..."
  );
}

export default MessageDetails;
