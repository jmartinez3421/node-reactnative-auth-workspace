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

interface LoginFormProps {
    email: string;
    password: string;
    remember: boolean;
}

const Login = () => {
    const { login } = useSession();

    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm<LoginFormProps>({
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
            <Text style={AuthStyles.title}>Login</Text>
            <View style={AuthStyles.form}>
                <ControlledTextInput
                    name="email"
                    control={control}
                    placeholder="Email"
                    keyboardType="email-address"
                    editable={!mutation.isPending}
                    rules={{
                        required: true,
                    }}
                />
                <ControlledTextInput
                    name="password"
                    control={control}
                    placeholder="Password"
                    secureTextEntry
                    editable={!mutation.isPending}
                    rules={{
                        required: true,
                    }}
                />
                <ControlledSwitchRow
                    name="remember"
                    control={control}
                    title="Remember me"
                    sx={styles.switch}
                    disabled={mutation.isPending}
                />
                <Link href="/forgot-password" style={AuthStyles.link}>
                    Forgot your password?
                </Link>
                <StyledButton
                    onPress={onSubmit}
                    title="Login"
                    disabled={mutation.isPending || !isValid}
                    sx={AuthStyles.button}
                />
            </View>
            <View style={AuthStyles.separator} />
            <Link href="/register" style={AuthStyles.link}>
                Don't have an account?
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
