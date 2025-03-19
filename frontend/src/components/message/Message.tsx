import { useAuthContext } from "../../context/AuthContext.tsx";
import { useAppSelector } from "../../hooks/hooks.ts";
import extractTime from "../../utils/extractTime.ts";

const Message = ({ message }: { message: MessageType }) => {
  const { authUser } = useAuthContext();
  const selectedConversation = useAppSelector(
    (state) => state.conversation.selectedConversation,
  );

  const fromMe = message?.senderID === authUser?.id;
  const chatClass = fromMe ? "chat-end" : "chat-start";
  const img = fromMe ? authUser?.profilePic : selectedConversation?.profilePic;
  const messageClass = fromMe ? "bg-blue-500" : "bg-gray-800";

  if (!message) {
    return <div>Loading...</div>; // or some loading state
  }

  return (
    <div className={`chat ${chatClass}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={img} alt="Chat bubble" />
        </div>
      </div>
      <p className={`chat-bubble text-white ${messageClass}`}>{message.content}</p>
      <span className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {extractTime(message.createdAt)}
      </span>
    </div>
  );
};

export default Message;
