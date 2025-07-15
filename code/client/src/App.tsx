import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import Layout from "./app/Layout";
import { useEffect, useState } from "react";
import type { User, Post } from "./types";
import { UserApi } from "./entities/UserApi";
import { setAccessToken } from "./shared/lib/axiosInstance";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import UpdatePage from "./pages/UpdatePage/UpdatePage";
import { PostApi } from "./entities/PostApi";
import MyCabinet from "./pages/MyCabinet/MyCabinet";

export function App() {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

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
