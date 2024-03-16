import React from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { View, Text, Alert, StyleSheet } from "react-native";
import { AuthStyles } from "@/styles/AuthCommonStyles";
import { StyledButton } from "@/components/Form/StyledButton";
import { useResetPasswordMutation } from "@/api/AuthMutations";
import { Loading } from "@/components/Layout/Loading";
import { useForm } from "react-hook-form";
import { ControlledTextInput } from "@/components/Form/ControlledComponents/ControlledTextInput";
import { EmailRegExp, RememberPasswordRegExp } from "@/utils/regExp";
import { useTranslation } from "react-i18next";

interface RememberPasswordFormProps {
    email: string;
    token: string;
    password: string;
    repeatPassword: string;
}

const RememberPassword = () => {
    const { t } = useTranslation("auth");
    const { email } = useLocalSearchParams<{ email: string }>();

    const { control, handleSubmit, watch, getFieldState } = useForm<RememberPasswordFormProps>({
        defaultValues: {
            email: email,
            token: "",
            password: "",
            repeatPassword: "",
        },
    });

    const mutation = useResetPasswordMutation();

    const onSubmit = handleSubmit((formData) => {
        if (formData.password !== formData.repeatPassword) {
            Alert.alert(t("PasswordsDontMatch"));
            return;
        }
        mutation.mutate(formData);
    });

    const repeatPasswordHasError = () => {
        const repeatPassword = getFieldState("repeatPassword");
        return repeatPassword.isTouched && watch("password") !== watch("repeatPassword");
    };

    return (
        <View style={AuthStyles.container}>
            <Text style={AuthStyles.title}>{t("ResetPassword")}</Text>
            <View style={AuthStyles.form}>
                <Text style={AuthStyles.helper}>{t(email ? "ResetPasswordHelper1" : "ResetPasswordHelper2")}</Text>
                {!email && (
                    <ControlledTextInput
                        name="email"
                        control={control}
                        rules={{ required: true, pattern: EmailRegExp }}
                        placeholder={t("Email")}
                        keyboardType="email-address"
                        editable={!mutation.isPending}
                    />
                )}
                <ControlledTextInput
                    name="password"
                    control={control}
                    rules={{ required: true }}
                    placeholder={t("Password")}
                    secureTextEntry
                    editable={!mutation.isPending}
                />
                <ControlledTextInput
                    name="repeatPassword"
                    control={control}
                    rules={{ required: true }}
                    placeholder={t("RepeatPassword")}
                    secureTextEntry
                    editable={!mutation.isPending}
                    hasError={repeatPasswordHasError()}
                />
                <ControlledTextInput
                    name="token"
                    control={control}
                    rules={{ required: true, minLength: 6, maxLength: 6, pattern: RememberPasswordRegExp }}
                    placeholder={t("Code")}
                    keyboardType="numeric"
                    editable={!mutation.isPending}
                />
                <StyledButton
                    onPress={onSubmit}
                    title={t("ResetPassword")}
                    disabled={mutation.isPending}
                    sx={[AuthStyles.button, styles.button]}
                />
            </View>
            <View style={AuthStyles.separator} />
            <Link href="/auth/login" style={AuthStyles.link}>
                {t("BackToLogin")}
            </Link>
            {mutation.isPending && <Loading />}
        </View>
    );
};

const styles = StyleSheet.create({
    codeInput: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 24,
    },
    button: {
        width: "80%",
    },
});

export default RememberPassword;
