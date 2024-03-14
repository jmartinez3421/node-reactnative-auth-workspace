import { useMutation } from "@tanstack/react-query";
import { authService } from "@/api/services";
import { Alert } from "react-native";
import {
    ErrorResponse,
    ForgotPasswordRequest,
    ForgotPasswordResponse,
    ResetPasswordRequest,
    ResetPasswordResponse,
} from "@/api/APIClient";
import { AxiosError, AxiosResponse } from "axios";
import { router } from "expo-router";

export const useForgotPasswordMutation = () => {
    return useMutation<
        AxiosResponse<ForgotPasswordResponse>,
        AxiosError<ErrorResponse>,
        ForgotPasswordRequest,
        ForgotPasswordRequest
    >({
        mutationKey: ["forgotPassword"],
        mutationFn: (data) => authService.forgotPassword(data),
        onSuccess: () => {
            Alert.alert("Email sent", "Check your email to reset your password");
        },
        onError: (error) => {
            Alert.alert("Error", error.response?.data.msg || "Error sending email");
        },
    });
};

export const useResetPasswordMutation = () => {
    return useMutation<
        AxiosResponse<ResetPasswordResponse>,
        AxiosError<ErrorResponse>,
        ResetPasswordRequest,
        ResetPasswordRequest
    >({
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
