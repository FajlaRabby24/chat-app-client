import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="bg-[url('./src/assets/bgImage.svg')] bg-cover bg-no-repeat">
      <Toaster />
      <Outlet />
    </div>
  );
};

export default RootLayout;
