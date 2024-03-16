import React from "react";
import { AuthStyles } from "@/styles/AuthCommonStyles";
import { Text, View } from "react-native";
import { Link } from "expo-router";
import { StyledButton } from "@/components/Form/StyledButton";
import { Loading } from "@/components/Layout/Loading";
import { useRegisterMutation } from "@/api/AuthMutations";
import { useSession } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { ControlledTextInput } from "@/components/Form/ControlledComponents/ControlledTextInput";
import { EmailRegExp } from "@/utils/regExp";
import { useTranslation } from "react-i18next";

interface RegisterFormProps {
    name: string;
    email: string;
    password: string;
}

const Register = () => {
    const { t } = useTranslation("auth");
    const { login } = useSession();

    const { control, handleSubmit } = useForm<RegisterFormProps>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const mutation = useRegisterMutation();

    const onSubmit = handleSubmit((formData) => {
        mutation.mutate(formData, {
            onSuccess: ({ data }) => {
                login(data.token);
            },
        });
    });

    return (
        <View style={AuthStyles.container}>
            <Text style={AuthStyles.title}>{t("Register")}</Text>
            <View style={AuthStyles.form}>
                <ControlledTextInput
                    name="name"
                    control={control}
                    rules={{ required: true }}
                    placeholder={t("Name")}
                    autoCapitalize="sentences"
                    editable={!mutation.isPending}
                />
                <ControlledTextInput
                    name="email"
                    control={control}
                    rules={{ required: true, pattern: EmailRegExp }}
                    placeholder={t("Email")}
                    keyboardType="email-address"
                    editable={!mutation.isPending}
                />
                <ControlledTextInput
                    name="password"
                    control={control}
                    rules={{ required: true }}
                    placeholder={t("Password")}
                    secureTextEntry
                    editable={!mutation.isPending}
                />
                <StyledButton
                    onPress={onSubmit}
                    title={t("Register")}
                    disabled={mutation.isPending}
                    sx={AuthStyles.button}
                />
            </View>
            <View style={AuthStyles.separator} />
            <Link href="/auth/login" style={AuthStyles.link} disabled={mutation.isPending}>
                {t("AlreadyHaveAnAccount")}
            </Link>
            {mutation.isPending && <Loading />}
        </View>
    );
};

export default Register;
