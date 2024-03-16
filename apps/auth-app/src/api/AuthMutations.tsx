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
    showValidationErrorAlert,
} from "@/api/APIClient";
import { AxiosError } from "axios";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

export const useForgotPasswordMutation = () => {
    const { t } = useTranslation("auth");
    return useMutation<ForgotPasswordResponse, AxiosError<ErrorResponse>, ForgotPasswordRequest, ForgotPasswordRequest>(
        {
            mutationKey: ["forgotPassword"],
            mutationFn: (data) => authService.forgotPassword(data),
            onSuccess: () => {
                Alert.alert(t("EmailSent"), t("CheckEmailToResetPassword"));
            },
            onError: (error) => {
                if (error.response?.data.errors) {
                    showValidationErrorAlert(error.response.data.errors);
                    return;
                }
                Alert.alert("Error", t(error.response?.data.msg || "ErrorSendingEmail", { ns: "errors" }));
            },
        }
    );
};

export const useResetPasswordMutation = () => {
    const { t } = useTranslation("auth");
    return useMutation<ResetPasswordResponse, AxiosError<ErrorResponse>, ResetPasswordRequest, ResetPasswordRequest>({
        mutationKey: ["resetPassword"],
        mutationFn: (data) => authService.resetPassword(data),
        onSuccess: () => {
            Alert.alert(t("PasswordUpdated"), t("YouCanNowLogin"));
            router.replace("/login");
        },
        onError: (error) => {
            if (error.response?.data.errors) {
                showValidationErrorAlert(error.response.data.errors);
                return;
            }
            Alert.alert("Error", t(error.response?.data.msg || "ErrorUpdatingPassword", { ns: "errors" }));
        },
    });
};

export const useLoginMutation = () => {
    const { t } = useTranslation("errors");
    return useMutation<LoginResponse, AxiosError<ErrorResponse>, LoginRequest, LoginRequest>({
        mutationKey: ["login"],
        mutationFn: (data) => authService.login(data),
        onError: (error) => {
            if (error.response?.data.errors) {
                showValidationErrorAlert(error.response.data.errors);
                return;
            }
            Alert.alert("Error", t(error.response?.data.msg || "ErrorLoggingIn"));
        },
    });
};

export const useRegisterMutation = () => {
    const { t } = useTranslation("errors");
    return useMutation<CreateUserResponse, AxiosError<ErrorResponse>, CreateUserRequest, CreateUserRequest>({
        mutationKey: ["register"],
        mutationFn: (data) => userService.createUser(data),
        onError: (error) => {
            if (error.response?.data.errors) {
                showValidationErrorAlert(error.response.data.errors);
                return;
            }
            Alert.alert("Error", t(error.response?.data.msg || "ErrorRegistering"));
        },
    });
};
