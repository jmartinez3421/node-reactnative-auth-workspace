import React from "react";
import { View, Text } from "react-native";
import { useSession } from "@/contexts/AuthContext";
import { Link, router } from "expo-router";
import { StyleSheet } from "react-native";
import { Loading } from "@/components/Layout/Loading";
import { StyledButton } from "@/components/Form/StyledButton";
import { AuthStyles } from "@/styles/AuthCommonStyles";
import { useLoginMutation } from "@/api/AuthMutations";
import { useForm } from "react-hook-form";
import { ControlledTextInput } from "@/components/Form/ControlledComponents/ControlledTextInput";
import { ControlledSwitchRow } from "@/components/Form/ControlledComponents/ControlledSwitchRow";
import { EmailRegExp } from "@/utils/regExp";
import { useTranslation } from "react-i18next";

interface LoginFormProps {
    email: string;
    password: string;
    remember: boolean;
}

const Login = () => {
    const { t } = useTranslation("auth");
    const { login } = useSession();

    const { control, handleSubmit } = useForm<LoginFormProps>({
        defaultValues: {
            email: "",
            password: "",
            remember: false,
        },
    });

    const mutation = useLoginMutation();

    const onSubmit = handleSubmit((formData) => {
        mutation.mutate(formData, {
            onSuccess: ({ data }) => {
                login(data.token);
                router.replace("/");
            },
        });
    });

    return (
        <View style={AuthStyles.container}>
            <Text style={AuthStyles.title}>{t("Login")}</Text>
            <View style={AuthStyles.form}>
                <ControlledTextInput
                    name="email"
                    control={control}
                    placeholder={t("Email")}
                    keyboardType="email-address"
                    editable={!mutation.isPending}
                    rules={{
                        required: true,
                        pattern: EmailRegExp,
                    }}
                />
                <ControlledTextInput
                    name="password"
                    control={control}
                    placeholder={t("Password")}
                    secureTextEntry
                    editable={!mutation.isPending}
                    rules={{
                        required: true,
                    }}
                />
                <ControlledSwitchRow
                    name="remember"
                    control={control}
                    title={t("RememberMe")}
                    sx={styles.switch}
                    disabled={mutation.isPending}
                />
                <Link href="/auth/forgot-password" style={AuthStyles.link}>
                    {t("ForgotPasswordLink")}
                </Link>
                <StyledButton
                    onPress={onSubmit}
                    title={t("Login")}
                    disabled={mutation.isPending}
                    sx={AuthStyles.button}
                />
            </View>
            <View style={AuthStyles.separator} />
            <Link href="/auth/register" style={AuthStyles.link}>
                {t("DontHaveAnAccount")}
            </Link>
            {mutation.isPending && <Loading />}
        </View>
    );
};

const styles = StyleSheet.create({
    switch: {
        alignSelf: "flex-start",
    },
});

export default Login;
