import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="bg-[url('./src/assets/bgImage.svg')] bg-cover bg-no-repeat">
      <Outlet />
    </div>
  );
};

export default RootLayout;
