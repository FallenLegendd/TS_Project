export interface User {
  id: number;
  email: string;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Post {
  id: number;
  text: string;
  image?: string;
  likeCount: number;
  user_id: number;
  createdAt: string;
  updatedAt: string;
  User?: User;
}

export interface Comment {
  id: number;
  text: string;
  user_id: number;
  post_id: number;
  createdAt: string;
  updatedAt: string;
  User?: User;
}

export interface CreatePostData {
  text: string;
  image?: string;
  likeCount?: number;
}

export interface CreateCommentData {
  text: string;
  post_id: number;
}

export interface UpdatePostData {
  text?: string;
  image?: string;
}

export interface UpdateCommentData {
  text: string;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
  error?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}
