import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Post } from "@/types";
import { PostApi } from "@/entities/PostApi";
import "./UpdatePage.css";

export default function UpdatePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Post | null>(null);
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    PostApi.getById(+id)
      .then((res) => {
        if (res.status === 200 && res.data) {
          setTask(res.data);
          console.log(res.data);
          setImage(res.data.image || "");
          setText(res.data.text);
        } else {
          setError("Пост не найден");
        }
        setIsLoading(false);
      })
      .catch(() => {
        setError("Ошибка при загрузке поста");
        setIsLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      const res = await PostApi.updateById(parseInt(id), { image, text });
      if (res.status === 200) {
        navigate("/");
      } else {
        setError("Ошибка при обновлении поста");
      }
    } catch {
      setError("Ошибка при обновлении поста");
    }
  };

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!task) return <div>Пост не найден</div>;

  return (
    <div className="update-page">
      <h2>Редактировать пост</h2>
      <form onSubmit={handleSubmit} className="update-form">
        <div className="form-group">
          <label>Ссылка на изображение:</label>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Введите ссылку на изображение"
          />
        </div>
        <div className="form-group">
          <label>Текст поста:</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Введите текст поста"
            rows={5}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Сохранить
        </button>
      </form>
    </div>
  );
}
