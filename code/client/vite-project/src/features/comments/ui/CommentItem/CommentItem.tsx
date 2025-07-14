import React, { useState } from "react";
import type { Comment, User } from "../../../../types";
import "./CommentItem.css";

interface CommentItemProps {
  comment: Comment;
  currentUser: User | null;
  onDelete?: (commentId: number) => void;
  onUpdate?: (commentId: number, text: string) => void;
}

export const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  currentUser,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(comment.text);
  };

  const handleSave = () => {
    if (editText.trim() && editText !== comment.text) {
      onUpdate?.(comment.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(comment.text);
  };

  const handleDelete = () => {
      onDelete?.(comment.id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("ru-RU");
  };

  const canEdit = currentUser?.id === comment.user_id;
  const canDelete = currentUser?.id === comment.user_id;

  return (
    <div className="comment-item">
      <div className="comment-header">
        <span className="comment-author">
          {comment.User?.email || "Неизвестный пользователь"}
        </span>
        <span className="comment-date">{formatDate(comment.createdAt)}</span>
      </div>

      {isEditing ? (
        <div className="comment-edit">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="comment-edit-input"
            rows={3}
          />
          <div className="comment-edit-actions">
            <button
              onClick={handleSave}
              className="comment-edit-save"
              disabled={!editText.trim()}
            >
              Сохранить
            </button>
            <button onClick={handleCancel} className="comment-edit-cancel">
              Отмена
            </button>
          </div>
        </div>
      ) : (
        <div className="comment-content">
          <p className="comment-text">{comment.text}</p>
          {(canEdit || canDelete) && (
            <div className="comment-actions">
              {canEdit && (
                <button onClick={handleEdit} className="comment-edit-btn">
                  Редактировать
                </button>
              )}
              {canDelete && (
                <button onClick={handleDelete} className="comment-delete-btn">
                  Удалить
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
