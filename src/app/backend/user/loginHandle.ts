import axiosInstance from "@/lib/axios/axiosInstance";
import { AxiosError } from "axios";

interface ILogin {
  email: string;
  password: string;
}

interface LoginSuccessResponse {
  id: number;
  email: string;
  name: string;
  token: string;
}

export class LoginHandle {
  public async execute(data: ILogin): Promise<LoginSuccessResponse | null> {
    try {
      const response = await axiosInstance.post("/auth", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 && response.data.token) {
        return {
          id: response.data.id,
          email: response.data.email,
          name: response.data.name,
          token: response.data.token,
        };
      }

      return null;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("Erro na autenticação:", error.response?.data?.error);
        throw new Error(
          error.response?.data?.error || "Erro ao realizar login."
        );
      }
      throw new Error("Erro inesperado ao realizar login.");
    }
  }
}
