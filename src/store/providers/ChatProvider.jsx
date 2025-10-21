import { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { ChatContext } from "../contexts";

const ChatProvider = ({ children }) => {
  const { socket } = useAuth();
  const axiosPublic = useAxiosPublic();

  const [message, setmessage] = useState([]);
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

  const chatValue = {};

  return (
    <ChatContext.Provider value={chatValue}>{children}</ChatContext.Provider>
  );
};

export default ChatProvider;
