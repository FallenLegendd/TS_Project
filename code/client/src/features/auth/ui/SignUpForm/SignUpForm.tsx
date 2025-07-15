import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../../../../types";
import { UserValidator } from "../../../../entities/User.validator";
import { UserApi } from "../../../../entities/UserApi";
import { setAccessToken } from "../../../../shared/lib/axiosInstance";
import "./SignUpForm.css";

interface SignUpFormProps {
  setUser: (user: User | null) => void;
}

interface SignUpData {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const INITIAL_INPUTS_DATA: SignUpData = {
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
};

export default function SignUpForm({ setUser }: SignUpFormProps) {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<SignUpData>(INITIAL_INPUTS_DATA);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const { isValid, error } = UserValidator.validateSignUpData(inputs);

    if (!isValid) {
      alert(error);
      return;
    }

    if (inputs.password !== inputs.repeatPassword) {
      alert("Пароли не совпадают");
      return;
    }

    try {
      const response = await UserApi.signUp(inputs);
      /* if (response.status !== 204) {
        alert(response.message);
        return;
      } */

      if (response.data) {
        setUser(response.data.user);
        setAccessToken(response.data.accessToken);
        setInputs(INITIAL_INPUTS_DATA);
        navigate("/");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      console.log(errorMessage);
      alert(errorMessage);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="signup-form">
      <input
        placeholder="username"
        name="username"
        required
        value={inputs.username}
        onChange={onChangeHandler}
      />
      <input
        placeholder="email"
        type="email"
        name="email"
        required
        value={inputs.email}
        onChange={onChangeHandler}
      />
      <input
        placeholder="password"
        type="password"
        name="password"
        required
        value={inputs.password}
        onChange={onChangeHandler}
      />
      <input
        placeholder="password"
        type="password"
        name="repeatPassword"
        required
        value={inputs.repeatPassword}
        onChange={onChangeHandler}
      />
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}
