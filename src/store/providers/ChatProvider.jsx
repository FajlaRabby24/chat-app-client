import { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { ChatContext } from "../contexts";

const ChatProvider = ({ children }) => {
  const { socket } = useAuth();
  const axiosPublic = useAxiosPublic();

  const [messages, setmessages] = useState([]);
  const [users, serUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessage, setUnseenMessage] = useState({});

  // func to get all users for sidebar
  const getUsers = async () => {
    try {
      const { data } = await axiosPublic.get("/api/message/users");
      if (data?.success) {
        serUsers(data?.users);
        setUnseenMessage(data?.unseenMessage);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // func to get message for selected user
  const getMessage = async (userId) => {
    try {
      const { data } = await axiosPublic.get(`/api/message/${userId}`);
      if (data?.success) {
        setmessages(data?.messages);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // func to send message to selected user
  const sendMessage = async (messageData) => {
    try {
      const { data } = await axiosPublic.post(
        `/api/message/send/${selectedUser._id}`,
        messageData
      );
      if (data?.success) {
        setmessages((prev) => [...prev, data?.newMessage]);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // func to subscribe to messages for selected user
  const subscribeToMessages = async () => {
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      if (selectedUser && newMessage.senderId === selectedUser._id) {
        newMessage.seen = true;
        setmessages((prev) => [...prev, newMessage]);
        axiosPublic.put(`/api/message/mark/${newMessage?._id}`);
      } else {
        setUnseenMessage((prevUnseenMessages) => ({
          ...prevUnseenMessages,
          [newMessage.senderId]: prevUnseenMessages[newMessage.senderId]
            ? prevUnseenMessages[newMessage.senderId] + 1
            : 1,
        }));
      }
    });
  };

  const chatValue = {};

  return (
    <ChatContext.Provider value={chatValue}>{children}</ChatContext.Provider>
  );
};

export default ChatProvider;
