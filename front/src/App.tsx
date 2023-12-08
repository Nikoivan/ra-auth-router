import { useState } from "react";
import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import NetoSocial from "./components/Neto/Social/Neto-Social";
import Context from "./assets/services/Context";
import NetoMain from "./components/Neto/Main/Neto-Main";
import NetoNews from "./components/Neto/News/Neto-News";
import MainPost from "./components/Neto/Main/Post/Main-Post";

const baseUrl = "http://localhost:6006";

export type TokenProps = string | undefined;

function App() {
  const [token, setToken] = useState<TokenProps>();

  const logout = () => {
    setToken(undefined);
    window.localStorage.removeItem("token");
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <NetoSocial />,
      children: [
        { path: "", element: <NetoMain /> },
        { path: "news", element: <NetoNews /> },
        { path: "news/:postId", element: <MainPost /> },
      ],
    },
    { path: "*", element: <NetoSocial /> },
  ]);

  return (
    <Context.Provider value={{ baseUrl, token, setToken, logout }}>
      <RouterProvider router={router} />
    </Context.Provider>
  );
}

export default App;
