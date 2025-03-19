import { useEffect } from "react";
import Message from "./Message.tsx";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks.ts";
import useChatScroll from "../../hooks/useChatScroll.ts";
import useListenMessages from "../../hooks/useListenMessages.ts";
import { fetchMessages } from "../../state/conversation/conversationSlice.ts";

const Messages = () => {
  const dispatch = useAppDispatch();
  const { loading, messages, selectedConversation } = useAppSelector(
    (state) => state.conversation,
  );

  useListenMessages();
  const ref = useChatScroll<HTMLDivElement>(messages);

  useEffect(() => {
    if (selectedConversation) {
      dispatch(fetchMessages(selectedConversation.id));
    }
  }, [dispatch, selectedConversation]);

  return (
    <div className="px-4 flex-1 overflow-auto" ref={ref}>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      {loading && <span className="loading loading-spinner mx-auto" />}
      {!loading && messages.length === 0 && (
        <p className="text-center text-white">
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
};

export default Messages;
