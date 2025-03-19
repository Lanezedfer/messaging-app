import { useState } from "react";
import { BiSend } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks.ts";
import { sendMessage } from "../../state/conversation/conversationSlice.ts";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();
  const { selectedConversation } = useAppSelector(
    (state) => state.conversation,
  );
  const loading = useAppSelector((state) => state.conversation.loading);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim() || !selectedConversation) return;
    dispatch(sendMessage({ conversationId: selectedConversation.id, message }));
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="px-4 py-3">
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Send message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border text-sm rounded-lg block w-full p-2.5 border-gray-600 text-white"
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            <BiSend className="hover:cursor-pointer" />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
