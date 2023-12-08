import { useContext, useEffect, useState } from "react";
import Context, { ContextTypeProps } from "../../../assets/services/Context";
import imgUrl from "../../../assets/images/man-2_icon-icons.com_55041.png";

import "./Neto-Login.css";
import Preloader from "../../Preloader/Preloader";
import http from "../../../assets/services/http";
import { useNavigate } from "react-router";

export type LoginProps =
  | {
      id: string;
      login: string;
      name: string;
      avatar: string;
    }
  | undefined;

export default function Login() {
  const [login, setLogin] = useState<LoginProps>();
  const navigate = useNavigate();
  const { baseUrl, token, logout } = useContext<ContextTypeProps>(Context);

  const onLogoutHandler = () => {
    setLogin(undefined);
    logout();
    navigate("/");
  };

  const getLogin = async () => {
    const response = await http(baseUrl + "/private/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response?.error) {
      onLogoutHandler;
    }

    setLogin(response?.login);
  };

  useEffect(() => {
    (async () => {
      await getLogin();
    })();
  }, []);

  return (
    <div className="Login">
      {login ? (
        <>
          <span className="Login-Title">Hello, {login?.name}</span>
          <img className="Login-Image" src={imgUrl} alt="Login" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="Login-Form"
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                onLogoutHandler();
              }}
              className="Form-Button"
            >
              Logout
            </button>
          </form>
        </>
      ) : (
        <Preloader />
      )}
    </div>
  );
}
