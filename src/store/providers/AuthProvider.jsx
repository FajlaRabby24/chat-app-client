import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../contexts";

export const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useState();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  // connect socket funciton to handle socket connection and online users updates
  const connectScoket = (userData) => {
    if (!userData || socket?.connected) return;
    const newSocket = io(import.meta.env.VITE_BACKEND_URL, {
      query: {
        userId: userData._id,
      },
    });
    newSocket.connect();
    setSocket(newSocket);

    newSocket.on("getOnlineUsers", (userIds) => {
      setOnlineUsers(userIds);
    });
  };

  // check if user is authenticated and if so, set the user data and connect the socket
  const checkAuth = async () => {
    try {
      const { data } = await axiosPublic.get("/api/auth/check");
      if (data.success) {
        setAuthUser(data.users);
        connectScoket(data.users);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // login func to handle user authentication and socket connection
  const login = async (state, credentials) => {
    try {
      const { data } = await axiosPublic.post(
        `/api/auth/${state}`,
        credentials
      );
      if (data?.success) {
        setAuthUser(data?.userData);
        connectScoket(data?.userData);
        axiosPublic.defaults.headers.common["token"] = data?.token;
        setToken(data?.token);
        localStorage.setItem("token", data?.token);
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // logout func to handle user logout and socket disconnection
  const logout = async () => {
    localStorage.removeItem("token");
    setToken(null);
    setAuthUser(null);
    setOnlineUsers([]);
    axiosPublic.defaults.headers.common["token"] = null;
    toast.success("Logged out successfully");
    socket.disconnect();
  };

  // update profile func to hadnle user profile updates
  const updateProfile = async (body) => {
    try {
      const { data } = await axiosPublic.put("/api/auth/update-profile", body);
      if (data?.success) {
        setAuthUser(data?.user);
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      axiosPublic.defaults.headers.common["token"] = token;
    }

    checkAuth();
  }, []);

  const authValue = {
    authUser,
    onlineUsers,
    socket,
    login,
    logout,
    updateProfile,
    loading,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};
