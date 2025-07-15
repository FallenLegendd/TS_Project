import type { User, Post } from "@/types";
import { PostApi } from "@/entities/PostApi";
import "./MyCabinet.css";
import { useEffect, useState } from "react";
import { useNotifications } from "@/features/notification/hooks/useNotifications";
import { useAlerts } from "@/features/alert";

interface MyCabinetProps {
  user: User | null;
  post?: Post[];
}

export default function MyCabinet({ user }: MyCabinetProps) {
  const { dispatch } = useAlerts();
  const [posts, setPosts] = useState<Post[]>([]);
  
  if (!user) {
    return <div>Пользователь не найден</div>;
  }
  
  

  async function getAllPosts() {
    try {
      const allPosts = await PostApi.getAll();
      console.log(allPosts);
      setPosts(allPosts.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  const thisUsersPosts = posts?.filter((el) => el.user_id === user?.id);

  const deleteHandler = async (id: number) => {
    try {
      await PostApi.deleteById(id);
      setPosts(thisUsersPosts.filter(el => el.id !== id))
      dispatch({ type: "SHOW_SUCCESS", payload: { message: "Пост успешно удален" } });
    } catch (error) {
      console.error("Ошибка при удалении поста:", error);
    }
  };

  return (
    <div className="containerForAllPosts">
      {thisUsersPosts.map((post) => (
        <div key={post.id} className="onePost">
          <p>Номер поста: {post.id}</p>
          <p>Щебет: {post.text}</p>
          <p>Время создания поста: {post.createdAt}</p>
          <p>Лайки: {post.likeCount}</p>
          <button onClick={() => deleteHandler(post.id)}>Удалить</button>
        </div>
      ))}
    </div>
  );
}
