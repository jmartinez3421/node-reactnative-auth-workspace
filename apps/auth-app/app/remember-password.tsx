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

interface RememberPasswordFormProps {
    email: string;
    token: string;
    password: string;
    repeatPassword: string;
}

const RememberPassword = () => {
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
            Alert.alert("Passwords do not match");
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
            <Text style={AuthStyles.title}>Reset password</Text>
            <View style={AuthStyles.form}>
                <Text style={AuthStyles.helper}>
                    {!email
                        ? "Enter your email and we will send you a link to reset your password"
                        : "Enter the code and your new password"}
                </Text>
                {!email && (
                    <ControlledTextInput
                        name="email"
                        control={control}
                        rules={{ required: true, pattern: EmailRegExp }}
                        placeholder="Email"
                        keyboardType="email-address"
                        editable={!mutation.isPending}
                    />
                )}
                <ControlledTextInput
                    name="password"
                    control={control}
                    rules={{ required: true }}
                    placeholder="Password"
                    secureTextEntry
                    editable={!mutation.isPending}
                />
                <ControlledTextInput
                    name="repeatPassword"
                    control={control}
                    rules={{ required: true }}
                    placeholder="Repeat password"
                    secureTextEntry
                    editable={!mutation.isPending}
                    hasError={repeatPasswordHasError()}
                />
                <ControlledTextInput
                    name="token"
                    control={control}
                    rules={{ required: true, minLength: 6, maxLength: 6, pattern: RememberPasswordRegExp }}
                    placeholder="Code"
                    keyboardType="numeric"
                    editable={!mutation.isPending}
                />
                <StyledButton
                    onPress={onSubmit}
                    title="Reset password"
                    disabled={mutation.isPending}
                    sx={[AuthStyles.button, styles.button]}
                />
            </View>
            <View style={AuthStyles.separator} />
            <Link href="/login" style={AuthStyles.link}>
                Go back to login
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
