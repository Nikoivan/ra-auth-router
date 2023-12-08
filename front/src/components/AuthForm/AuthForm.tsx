import { ChangeEvent, FormEvent } from "react";

import "./AuthForm.css";

export type AuthFormProps = {
  formState: { login: string; password: string };
  onSubmitHandler: () => void;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function AuthForm({
  formState,
  onSubmitHandler,
  onChangeHandler,
}: AuthFormProps) {
  const { login, password } = formState;

  return (
    <form
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        onSubmitHandler();
      }}
      className="AuthForm"
    >
      <input
        onChange={(e) => {
          onChangeHandler(e);
        }}
        placeholder="Username"
        type="text"
        className="AuthForm-Item AuthForm-LoginInput"
        name="login"
        value={login}
      />
      <input
        onChange={(e) => {
          onChangeHandler(e);
        }}
        placeholder="Password"
        type="text"
        className="AuthForm-Item AuthForm-PasswordInput"
        name="password"
        value={password}
      />
      <button
        onClick={onSubmitHandler}
        className="AuthForm-Item AuthForm-SubmitBtn"
      >
        Login
      </button>
    </form>
  );
}
