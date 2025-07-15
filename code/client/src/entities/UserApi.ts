import { axiosInstance } from "@/shared/lib/axiosInstance";
import type { AuthResponse, ApiResponse } from "@/types";

interface SignUpData {
  email: string;
  password: string;
}

interface SignInData {
  email: string;
  password: string;
}

export class UserApi {
  static async refreshTokens(): Promise<ApiResponse<AuthResponse>> {
    const { data } = await axiosInstance.get("/auth/refreshTokens");
    return data;
  }

  static async signUp(
    userData: SignUpData
  ): Promise<ApiResponse<AuthResponse>> {
    const { data } = await axiosInstance.post("/auth/signUp", userData);
    return data;
  }

  static async signIn(
    userData: SignInData
  ): Promise<ApiResponse<AuthResponse>> {
    const { data } = await axiosInstance.post("/auth/signIn", userData);
    return data;
  }

  static async signOut(): Promise<ApiResponse<void>> {
    const { data } = await axiosInstance.get("/auth/signOut");
    return data;
  }
}
