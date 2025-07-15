import React from "react";
import type { Comment, User } from "@/types";
import { CommentItem } from "../CommentItem/CommentItem";
import "./CommentList.css";

interface CommentListProps {
  comments: Comment[];
  currentUser: User | null;
  onDeleteComment?: (commentId: number) => void;
  onUpdateComment?: (commentId: number, text: string) => void;
  isLoading?: boolean;
}

export const CommentList: React.FC<CommentListProps> = ({
  comments,
  currentUser,
  onDeleteComment,
  onUpdateComment,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="comment-list">
        <div className="comment-loading">Загрузка комментариев...</div>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="comment-list">
        <div className="comment-empty">
          Нет комментов. Будь первым!
        </div>
      </div>
    );
  }

  return (
    <div className="comment-list">
      <h3 className="comment-list-title">Комментарии ({comments.length})</h3>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          currentUser={currentUser}
          onDelete={onDeleteComment}
          onUpdate={onUpdateComment}
        />
      ))}
    </div>
  );
};
