import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import { router } from "./routes/router.jsx";
import { AuthProvider } from "./store/providers/AuthProvider.jsx";
import ChatProvider from "./store/providers/ChatProvider.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ChatProvider>
      <RouterProvider router={router} />
    </ChatProvider>
  </AuthProvider>
);
