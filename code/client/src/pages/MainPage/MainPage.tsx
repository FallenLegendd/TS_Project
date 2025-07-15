import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Post, User, CreatePostData } from "@/types";
import { PostApi } from "@/entities/PostApi";
import { CommentsSection } from "@/features/comments/ui/CommentsSection/CommentsSection";
import "./MainPage.css";
import { Button } from "@/shared/lib/ui/Button";
import { Input } from "@/shared/lib/ui/Input";
import { useNotifications } from "@/features/notification";

interface MainPageProps {
  user: User | null;
}

export default function MainPage({ user }: MainPageProps) {
  const navigate = useNavigate();
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [submit, setSubmit] = useState(false);
  const { dispatch } = useNotifications();
  const [newPost, setNewPost] = useState<CreatePostData>({
    image: "",
    text: "",
    likeCount: 0,
  });

  const navigateHandler = (id: number) => {
    navigate(`posts/${id}`);
  };

  const handleShowForm = async () => {
    setShowForm(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmit(true);
    console.log(newPost);
    try {
      const response = await PostApi.create(newPost);
      dispatch({ type: "", payload: { message: "Пост успешно создан" } });
      console.log("Post created:", response.data);
      setShowForm(false);
      setNewPost({
        image: "",
        text: "",
        likeCount: 0,
      });
      getAllPosts();
    } catch (err) {
      console.error("Error creating post:", err);
    } finally {
      setSubmit(false);
    }
  };

  async function getAllPosts() {
    try {
      const response = await PostApi.getAll();
      if (response.data) {
        setAllPosts(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLike(postId: number) {
    try {
      const response = await PostApi.like(postId);
      if (response.data) {
        setAllPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? { ...post, likeCount: response.data.likeCount }
              : post
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="banner">
      <div className="banner-content">
        {showForm === true ? (
          <div>
            <form onSubmit={handleSubmit}>
              <Input 
                type="text"
                name="image"
                value={newPost.image}
                onChange={handleInputChange}
                required
                placeholder="Ссылка на картинку"
              />
              <Input
                type="text"
                name="text"
                value={newPost.text}
                onChange={handleInputChange}
                required
                placeholder="text"
              />
              <Button
                variant="danger"
                size="small"
                type="submit"
                disabled={submit}
              >
                {submit ? "Создание..." : "Создать"}
              </Button>
            </form>
            <Button variant="secondary" size="small" onClick={() => setShowForm(false)}>
              Скрыть форму
            </Button>
          </div>
        ) : (
          <div></div>
        )}
        <Button variant="primary" size="medium" onClick={() => handleShowForm()}>
          Создать пост
        </Button>
      </div>
      <div className="allPosts">
        {allPosts.map((post) => (
          <div key={post.id} className="onePost">
            <div className="imageContainer">
              <img src={post.image} alt="image" />
            </div>
            <p>Номер поста: {post.id}</p>
            <p>Содержание: {post.text}</p>
            <p>Время создания поста: {post.createdAt}</p>
            <p>Лайки: {post.likeCount}</p>
            <button className="like" onClick={() => handleLike(post.id)}>
              Лайкнуть
            </button>
            {user?.id === post.user_id ? (
              <div>
                <button onClick={() => navigateHandler(post.id)}>
                  Редактировать
                </button>
              </div>
            ) : (
              <div>Это не твой пост жЫ есть</div>
            )}
            <CommentsSection postId={post.id} currentUser={user} />
          </div>
        ))}
      </div>
      <div className="tech-logos"></div>
    </div>
  );
}
