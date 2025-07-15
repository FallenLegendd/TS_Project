import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "@/types";
import { UserValidator } from "@/entities/User.validator";
import { UserApi } from "@/entities/UserApi";
import { setAccessToken } from "@/shared/lib/axiosInstance";
import "./SignInForm.css";
import { Input } from "@/shared/lib/ui/Input";
import { useAlerts } from "@/features/alert";

interface SignInFormProps {
  setUser: (user: User | null) => void;
}

interface SignInData {
  email: string;
  password: string;
}

const INITIAL_INPUTS_DATA: SignInData = {
  email: "",
  password: "",
};

export default function SignInForm({ setUser }: SignInFormProps) {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<SignInData>(INITIAL_INPUTS_DATA);
  const { dispatch } = useAlerts();

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const { isValid, error } = UserValidator.validateSignInData(inputs);

    if (!isValid) {
      alert(error);
      return;
    }

    try {
      const response = await UserApi.signIn(inputs);
      /* if (response.status !== 200) {
        alert(response.message);
        console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
        return;
      } */

       
        setUser(response.data.user);
        setAccessToken(response.data.accessToken);
        setInputs(INITIAL_INPUTS_DATA);
        navigate("/");
        dispatch({ type: "SHOW_SUCCESS", payload: { message: "Вы успешно авторизовались" } });
      
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      console.log(errorMessage);
      alert(errorMessage);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="signin-form">
      <Input 
        type="email"
        placeholder="email"
        name="email"
        required
        value={inputs.email}
        onChange={onChangeHandler}
      />
      <Input
        type="password"
        placeholder="password"
        name="password"
        required
        value={inputs.password}
        onChange={onChangeHandler}
      />
      <button type="submit">Войти</button>
    </form>
  );
}
