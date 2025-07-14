import { axiosInstance } from "../shared/lib/axiosInstance";
import type {
  Post,
  CreatePostData,
  UpdatePostData,
  ApiResponse,
} from "../types";

export class PostApi {
  static async getAll(): Promise<ApiResponse<Post[]>> {
    const { data } = await axiosInstance.get("/posts");
    return data;
  }

  static async getById(id: number): Promise<ApiResponse<Post>> {
    const { data } = await axiosInstance.get(`/posts/${id}`);
    return data;
  }

  static async create(newPostData: CreatePostData): Promise<ApiResponse<Post>> {
    console.log(
      newPostData,
      "=======================================>>>>>>>>>>>>>>>>>>>>>"
    );
    const { data } = await axiosInstance.post("/posts", newPostData);
    return data;
  }

  static async updateById(
    id: number,
    updateData: UpdatePostData
  ): Promise<ApiResponse<Post>> {
    const { data } = await axiosInstance.put(`/posts/${id}`, updateData);
    return data;
  }

  static async deleteById(id: number): Promise<ApiResponse<void>> {
    const { data } = await axiosInstance.delete(`/posts/${id}`);
    return data;
  }

  static async getAllSorted(): Promise<ApiResponse<Post[]>> {
    const { data } = await axiosInstance.get(`/posts/all`);
    return data;
  }

  static async like(postId: number): Promise<ApiResponse<Post>> {
    const { data } = await axiosInstance.put(`/posts/${postId}/like`);
    return data;
  }
}
