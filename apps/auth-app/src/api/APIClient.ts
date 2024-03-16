import { AxiosInstance } from "axios";
import { Alert } from "react-native";
import i18n from "i18next";

export interface ErrorResponse {
    ok: false;
    msg: string;
    errors?: string[];
}

export interface SuccessResponse<T> {
    ok: true;
    data: T;
}

export interface User {
    id: string;
    name: string;
    email: string;
    status: boolean;
}

export interface GetUserResponse extends SuccessResponse<User> {}

export interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
}

export interface CreateUserResponse extends SuccessResponse<{ token: string }> {}

export interface UpdateUserRequest {
    name?: string | undefined;
    email: string;
    password: string;
    newPassword?: string | undefined;
}

export interface UpdateUserResponse extends SuccessResponse<User> {}

export interface DeleteUserResponse extends SuccessResponse<{ msg: string }> {}

export interface LoginRequest {
    email: string;
    password: string;
    remember?: boolean;
}

export interface LoginResponse extends SuccessResponse<{ token: string }> {}

export interface RenewTokenResponse extends SuccessResponse<{ token: string }> {}

export interface ForgotPasswordResponse extends SuccessResponse<{ msg: string }> {}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ResetPasswordRequest {
    email: string;
    token: string;
    password: string;
}

export interface ResetPasswordResponse extends SuccessResponse<{ msg: string }> {}

export const ValidationErrorCodes = [
    "InvalidEmail",
    "EmailRequired",
    "InvalidPassword",
    "PasswordRequired",
    "NameRequired",
    "TokenRequired",
    "EmailAlreadyExists",
    "NoTokenProvided",
    "UserNotFound",
    "InactiveUser",
    "InvalidToken",
    "InvalidResetToken",
];

export const showValidationErrorAlert = (errors: string[]) =>
    Alert.alert(i18n.t("common:InvalidData"), `- ${errors.join("\n\n- ")}`);

export class UserService {
    private baseURL = "/user";

    constructor(private api: AxiosInstance) {}

    public getUser() {
        return this.api.get<GetUserResponse>(this.baseURL);
    }

    public createUser(data: CreateUserRequest) {
        return this.api.post<CreateUserResponse>(this.baseURL, data);
    }

    public updateUser(data: UpdateUserRequest) {
        return this.api.put<UpdateUserResponse>(this.baseURL, data);
    }

    public deleteUser() {
        return this.api.delete<DeleteUserResponse>(this.baseURL);
    }
}

export class AuthService {
    private baseURL = "/auth";

    constructor(private api: AxiosInstance) {}

    public login(data: LoginRequest) {
        return this.api.post<LoginResponse>(`${this.baseURL}/login`, data);
    }

    public renew() {
        return this.api.get<RenewTokenResponse>(`${this.baseURL}/renew`);
    }

    public forgotPassword(data: ForgotPasswordRequest) {
        return this.api.post<ForgotPasswordResponse>(`${this.baseURL}/forgot-password`, data);
    }

    public resetPassword(data: ResetPasswordRequest) {
        return this.api.post<ResetPasswordResponse>(`${this.baseURL}/reset-password`, data);
    }
}
