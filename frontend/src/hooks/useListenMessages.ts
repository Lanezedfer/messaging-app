import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { setMessages } from "../state/conversation/conversationSlice";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.conversation.messages);

  useEffect(() => {
    const handleNewMessage = (newMessage: MessageType) => {
      const sound = new Audio(notificationSound);
      sound.play();
      dispatch(setMessages([...messages, newMessage]));
    };

    socket?.on("newMessage", handleNewMessage);

    return () => {
      socket?.off("newMessage", handleNewMessage);
    };
  }, [socket, messages, dispatch]);
};

export default useListenMessages;
