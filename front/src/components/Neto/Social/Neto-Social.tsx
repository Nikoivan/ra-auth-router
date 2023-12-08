import { ChangeEvent, useState, useContext, useEffect } from "react";
import AuthForm from "../../AuthForm/AuthForm";
import http from "../../../assets/services/http";
import Context, { ContextTypeProps } from "../../../assets/services/Context";
import NetoHeader from "../Header/Neto-Header";
import { Outlet, useNavigate } from "react-router-dom";
import Login from "../Login/Neto-Login";

export default function NetoSocial() {
  const [formState, setFormState] = useState<{
    login: string;
    password: string;
  }>({ login: "", password: "" });
  const navigate = useNavigate();

  const { baseUrl, token, setToken } = useContext<ContextTypeProps>(Context);

  const getToken = () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  };

  const onChangeHandeler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmitHadler = async () => {
    if (!formState.login || !formState.password) {
      return;
    }
    const response = await http(baseUrl + "/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    });

    if (response?.token) {
      setToken(response.token);
      window.localStorage.setItem("token", response.token);
      setFormState({ login: "", password: "" });
      navigate("/news");
    }
  };

  useEffect(getToken, [token]);

  return (
    <div className="NetoSocial">
      <NetoHeader>
        {token ? (
          <Login />
        ) : (
          <AuthForm
            onChangeHandler={onChangeHandeler}
            onSubmitHandler={onSubmitHadler}
            formState={formState}
          />
        )}
      </NetoHeader>
      <Outlet />
    </div>
  );
}
