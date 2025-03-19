import { useEffect } from "react";
import Conversation from "./Conversation.tsx";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks.ts";
import { fetchConversations } from "../../state/conversation/conversationSlice.ts";
import { getRandomEmoji } from "../../utils/emojis.ts";

const Conversations = () => {
  const dispatch = useAppDispatch();
  const conversations = useAppSelector(
    (state) => state.conversation.conversations,
  ) as ConversationType[];
  const { loading } = useAppSelector((state) => state.conversation);

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  return (
    <div className="py-2 flex-col overflow-auto">
      {conversations.map((conversation) => (
        <Conversation
          key={conversation.id}
          conversation={conversation}
          emoji={getRandomEmoji()}
        />
      ))}
      {loading ? <span className="loading loading-spinner mx-auto" /> : null}
    </div>
  );
};

export default Conversations;
