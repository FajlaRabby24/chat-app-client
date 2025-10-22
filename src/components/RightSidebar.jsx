import { useEffect, useState } from "react";
import assets from "../assets/assets";
import useAuth from "../hooks/useAuth";
import useChat from "../hooks/useChat";

const RightSidebar = () => {
  const { selectedUser, messages } = useChat();
  const { logout, onlineUsers } = useAuth();
  const [msgImages, setMsgImages] = useState([]);

  // GET: all the images from the messages and set them to state
  useEffect(() => {
    setMsgImages(messages.filter((msg) => msg?.image).map((msg) => msg.image));
  }, [messages]);

  return (
    selectedUser && (
      <div
        className={`bg-[#8185b2]/10 text-white w-full relative overflow-y-scroll ${
          selectedUser ? "max-md:hidden " : ""
        }`}
      >
        <div className="pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto">
          <img
            src={selectedUser?.profilePic || assets.avatar_icon}
            alt="profile pic"
            className="w-20 aspect-[1/1] rounded-full  "
          />
          <h1 className="px-10 text-xl font-medium mx-auto flex items-center gap-2  ">
            {onlineUsers.includes(selectedUser?._id) && (
              <p className="w-2 h-2 rounded-full bg-green-500"></p>
            )}
            {selectedUser.fullName}
          </h1>
          <p className="px-10 mx-auto">{selectedUser.bio}</p>
        </div>
        <hr className="border-[#fffff50] my-4  " />

        {/* media  */}
        <div className="px-5 text-xs">
          <p>Media</p>
          <div className="grid grid-cols-2 gap-4 opacity-80 mt-2 max-h-[200px] overflow-y-scroll  ">
            {msgImages?.map((url, idx) => (
              <div
                key={idx}
                onClick={() => window.open(url)}
                className="cursor-pointer rounded"
              >
                <img src={url} alt="url image" className="h-full rounded-md" />
              </div>
            ))}
          </div>
        </div>

        {/* logout btn  */}

        <button
          onClick={logout}
          className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer"
        >
          Logout
        </button>
      </div>
    )
  );
};

export default RightSidebar;
