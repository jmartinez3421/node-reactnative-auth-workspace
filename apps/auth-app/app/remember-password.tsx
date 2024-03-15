import React from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { View, Text, Alert, StyleSheet } from "react-native";
import { AuthStyles } from "@/styles/AuthCommonStyles";
import { StyledTextInput } from "@/components/Form/StyledTextInput";
import { StyledButton } from "@/components/Form/StyledButton";
import { useResetPasswordMutation } from "@/api/AuthMutations";
import { Loading } from "@/components/Layout/Loading";

const RememberPassword = () => {
    const { email } = useLocalSearchParams<{ email: string }>();

    const [formData, setFormData] = React.useState({
        email: email,
        password: "",
        repeatPassword: "",
        token: "",
    });

    const mutation = useResetPasswordMutation();

    const handleResetPassword = () => {
        if (!formData.email || !formData.password || !formData.repeatPassword || !formData.token) {
            Alert.alert("Please fill in all fields");
            return;
        }
        if (formData.password !== formData.repeatPassword) {
            Alert.alert("Passwords do not match");
            return;
        }
        mutation.mutate({
            email: formData.email,
            password: formData.password,
            token: formData.token,
        });
    };

    const isValidForm =
        formData.email !== undefined &&
        formData.password !== "" &&
        formData.repeatPassword !== "" &&
        formData.token !== "";

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
                    <StyledTextInput
                        placeholder="Email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={(value) => setFormData({ ...formData, email: value })}
                        editable={!mutation.isPending}
                    />
                )}
                <StyledTextInput
                    placeholder={"Password"}
                    value={formData.password}
                    onChangeText={(value) => setFormData({ ...formData, password: value })}
                    secureTextEntry
                    editable={!mutation.isPending}
                />
                <StyledTextInput
                    placeholder={"Repeat password"}
                    value={formData.repeatPassword}
                    onChangeText={(value) => setFormData({ ...formData, repeatPassword: value })}
                    secureTextEntry
                    hasError={formData.password !== formData.repeatPassword}
                    editable={!mutation.isPending}
                />
                <StyledTextInput
                    placeholder="Code"
                    value={formData.token}
                    onChangeText={(value) => setFormData({ ...formData, token: value })}
                    style={styles.codeInput}
                    editable={!mutation.isPending}
                />
                <StyledButton
                    onPress={handleResetPassword}
                    title="Reset password"
                    disabled={mutation.isPending || !isValidForm}
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
