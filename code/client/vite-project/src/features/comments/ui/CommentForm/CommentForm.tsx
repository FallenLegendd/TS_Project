import React, { useState } from 'react';
import type { CreateCommentData, User } from '../../../../types';
import './CommentForm.css';

interface CommentFormProps {
  postId: number;
  onSubmit: (commentData: CreateCommentData) => void;
  isLoading?: boolean;
}

export const CommentForm: React.FC<CommentFormProps> = ({ 
  postId, 
  onSubmit, 
  isLoading = false 
}) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit({
        text: text.trim(),
        post_id: postId
      });
      setText('');
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        className="comment-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Напишите комментарий..."
        rows={3}
        disabled={isLoading}
        required
      />
      <button 
        type="submit" 
        className="comment-submit-btn"
        disabled={isLoading || !text.trim()}
      >
        {isLoading ? 'Отправка...' : 'Отправить'}
      </button>
    </form>
  );
}; 