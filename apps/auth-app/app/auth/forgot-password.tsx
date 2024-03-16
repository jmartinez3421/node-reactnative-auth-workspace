import React from "react";
import { Text, View } from "react-native";
import { AuthStyles } from "@/styles/AuthCommonStyles";
import { StyledButton } from "@/components/Form/StyledButton";
import { useForgotPasswordMutation } from "@/api/AuthMutations";
import { Loading } from "@/components/Layout/Loading";
import { Link, router } from "expo-router";
import { useForm } from "react-hook-form";
import { ControlledTextInput } from "@/components/Form/ControlledComponents/ControlledTextInput";
import { EmailRegExp } from "@/utils/regExp";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
    const { t } = useTranslation("auth");
    const { control, handleSubmit } = useForm<{ email: string }>({ defaultValues: { email: "" } });

    const mutation = useForgotPasswordMutation();

    const onSubmit = handleSubmit((formData) => {
        mutation.mutate(formData, {
            onSuccess: () =>
                router.navigate({ pathname: "/auth/remember-password", params: { email: formData.email } }),
        });
    });

    return (
        <View style={AuthStyles.container}>
            <Text style={AuthStyles.title}>{t("ForgotPassword")}</Text>
            <View style={AuthStyles.form}>
                <Text style={AuthStyles.helper}>{t("ForgotPasswordHelper")}</Text>
                <ControlledTextInput
                    name="email"
                    control={control}
                    rules={{ required: true, pattern: EmailRegExp }}
                    placeholder={t("Email")}
                    keyboardType="email-address"
                    editable={!mutation.isPending}
                />
                <StyledButton
                    onPress={onSubmit}
                    title={t("Send")}
                    disabled={mutation.isPending}
                    sx={AuthStyles.button}
                />
            </View>
            <View style={AuthStyles.separator} />
            <Link href="/auth/remember-password" style={AuthStyles.link}>
                {t("AlreadyHaveToken")}
            </Link>
            <Link href="/auth/login" style={AuthStyles.link}>
                {t("BackToLogin")}
            </Link>
            {mutation.isPending && <Loading />}
        </View>
    );
};

export default ForgotPassword;
