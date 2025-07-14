import React, { useState, useEffect } from "react";
import type { Comment, User, CreateCommentData } from "../../../../types";
import { CommentApi } from "../../../../entities/CommentApi";
import { CommentForm } from "../CommentForm/CommentForm";
import { CommentList } from "../CommentList/CommentList";
import "./CommentsSection.css";

interface CommentsSectionProps {
  postId: number;
  currentUser: User | null;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({
  postId,
  currentUser,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadComments = async () => {
    setIsLoading(true);
    try {
      const response = await CommentApi.getAllForPost(postId);
      if (response.data) {
        console.log(response.data);
        setComments(response.data);
      }
    } catch (error) {
      console.error("Ошибка при загрузке комментариев:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitComment = async (commentData: CreateCommentData) => {
    if (!currentUser) {
      alert("Необходимо войти в систему для добавления комментария");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await CommentApi.create(commentData);
      if (response.data) {
        setComments((prev) => [response.data, ...prev]);
      }
    } catch (error) {
      console.error("Ошибка при создании комментария:", error);
      alert("Ошибка при создании комментария");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await CommentApi.deleteById(commentId);
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("Ошибка при удалении комментария:", error);
      alert("Ошибка при удалении комментария");
    }
  };

  const handleUpdateComment = async (commentId: number, text: string) => {
    try {
      const response = await CommentApi.updateById(commentId, { text });
      if (response.data) {
        setComments((prev) =>
          prev.map((comment) =>
            comment.id === commentId
              ? {
                  ...comment,
                  text: response.data.text,
                  updatedAt: response.data.updatedAt,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.error("Ошибка при обновлении комментария:", error);
      alert("Ошибка при обновлении комментария");
    }
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

  return (
    <div className="comments-section">
      {currentUser ? (
        <CommentForm
          postId={postId}
          onSubmit={handleSubmitComment}
          isLoading={isSubmitting}
        />
      ) : (
        <div className="comment-login-prompt">
          <p>Войдите в систему, чтобы оставить комментарий</p>
        </div>
      )}

      <CommentList
        comments={comments}
        currentUser={currentUser}
        onDeleteComment={handleDeleteComment}
        onUpdateComment={handleUpdateComment}
        isLoading={isLoading}
      />
    </div>
  );
};
