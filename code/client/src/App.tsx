import { Routes, Route } from "react-router-dom";
import Layout from "./app/Layout";
import { useEffect, useState } from "react";
import type { User, Post } from "./types";
import { UserApi } from "./entities/UserApi";
import { setAccessToken } from "./shared/lib/axiosInstance";
import { PostApi } from "./entities/PostApi";
import { useAlerts } from "./features/alert";
import {
  MainPage,
  RegisterPage,
  LoginPage,
  UpdatePage,
  MyCabinet,
} from "./pages";

export function App() {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const { dispatch } = useAlerts();
  async function getAllPosts() {
    try {
      const response = await PostApi.getAll();
      if (response.data) {
        console.log(
          response.data,
          "from APP ================================="
        );
        setPosts(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  useEffect(() => {
    UserApi.refreshTokens().then((serverResponse) => {
      if (serverResponse.error) return;
      if (serverResponse.data) {
        setUser(serverResponse.data.user);
        setAccessToken(serverResponse.data.accessToken);
        dispatch({ type: "SHOW_SUCCESS", payload: { message: "Вы успешно авторизовались" } });
      }
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout user={user} setUser={setUser} />}>
        <Route index element={<MainPage user={user} />} />
        <Route
          path="/auth/registration"
          element={<RegisterPage setUser={setUser} />}
        />
        <Route path="/auth/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/posts/:id" element={<UpdatePage />} />
        <Route
          path="/myCabinet"
          element={<MyCabinet user={user} post={posts} />}
        />
      </Route>
    </Routes>
  );
}
