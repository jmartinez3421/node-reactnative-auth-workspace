import { AuthService, UserService } from "@/api/APIClient";
import api from "@/api/api";

export const authService = new AuthService(api);
export const userService = new UserService(api);
