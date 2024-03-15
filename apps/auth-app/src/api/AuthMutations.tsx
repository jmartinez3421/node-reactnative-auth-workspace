import { useMutation } from "@tanstack/react-query";
import { authService, userService } from "@/api/services";
import { Alert } from "react-native";
import {
    CreateUserRequest,
    CreateUserResponse,
    ErrorResponse,
    ForgotPasswordRequest,
    ForgotPasswordResponse,
    LoginRequest,
    LoginResponse,
    ResetPasswordRequest,
    ResetPasswordResponse,
} from "@/api/APIClient";
import { AxiosError } from "axios";
import { router } from "expo-router";

export const useForgotPasswordMutation = () => {
    return useMutation<ForgotPasswordResponse, AxiosError<ErrorResponse>, ForgotPasswordRequest, ForgotPasswordRequest>(
        {
            mutationKey: ["forgotPassword"],
            mutationFn: (data) => authService.forgotPassword(data),
            onSuccess: () => {
                Alert.alert("Email sent", "Check your email to reset your password");
            },
            onError: (error) => {
                Alert.alert("Error", error.response?.data.msg || "Error sending email");
            },
        }
    );
};

export const useResetPasswordMutation = () => {
    return useMutation<ResetPasswordResponse, AxiosError<ErrorResponse>, ResetPasswordRequest, ResetPasswordRequest>({
        mutationKey: ["resetPassword"],
        mutationFn: (data) => authService.resetPassword(data),
        onSuccess: () => {
            Alert.alert("Password updated", "You can now login with your new password");
            router.replace("/login");
        },
        onError: (error) => {
            Alert.alert("Error", error.response?.data.msg || "Error updating password");
        },
    });
};

export const useLoginMutation = () => {
    return useMutation<LoginResponse, AxiosError<ErrorResponse>, LoginRequest, LoginRequest>({
        mutationKey: ["login"],
        mutationFn: (data) => authService.login(data),
        onError: (error) => {
            Alert.alert("Error", error.response?.data.msg || "Error logging in");
        },
    });
};

export const useRegisterMutation = () => {
    return useMutation<CreateUserResponse, AxiosError<ErrorResponse>, CreateUserRequest, CreateUserRequest>({
        mutationKey: ["register"],
        mutationFn: (data) => userService.createUser(data),
        onError: (error) => {
            Alert.alert("Error", error.response?.data.msg || "Error registering");
        },
    });
};
