import { axiosInstance } from "@/shared/lib/axiosInstance";
import type {
  Comment,
  CreateCommentData,
  UpdateCommentData,
  ApiResponse,
} from "@/types";

export class CommentApi {
  static async getAll(): Promise<ApiResponse<Comment[]>> {
    const { data } = await axiosInstance.get("/comments");
    return data;
  }

  static async getById(id: number): Promise<ApiResponse<Comment>> {
    const { data } = await axiosInstance.get(`/comments/${id}`);
    return data;
  }

  static async getAllForPost(postId: number): Promise<ApiResponse<Comment[]>> {
    const { data } = await axiosInstance.get(`/comments/post/${postId}`);
    return data;
  }

  static async getAllForPostByUser(
    userId: number,
    postId: number
  ): Promise<ApiResponse<Comment[]>> {
    const { data } = await axiosInstance.get(
      `/comments/user/${userId}/post/${postId}`
    );
    return data;
  }

  static async create(
    commentData: CreateCommentData
  ): Promise<ApiResponse<Comment>> {
    console.log(commentData);
    const { data } = await axiosInstance.post("/comments/", commentData);
    return data;
  }

  static async updateById(
    id: number,
    updateData: UpdateCommentData
  ): Promise<ApiResponse<Comment>> {
    const { data } = await axiosInstance.put(`/comments/${id}`, updateData);
    return data;
  }

  static async deleteById(id: number): Promise<ApiResponse<void>> {
    const { data } = await axiosInstance.delete(`/comments/${id}`);
    return data;
  }
}
