import React from "react";
import { View, Text, Alert } from "react-native";
import { useSession } from "@/contexts/AuthContext";
import { Link, router } from "expo-router";
import { StyleSheet } from "react-native";
import { Loading } from "@/components/Layout/Loading";
import { SwitchRow } from "@/components/Form/Switch/SwitchRow";
import { StyledTextInput } from "@/components/Form/StyledTextInput";
import { StyledButton } from "@/components/Form/StyledButton";
import { AuthStyles } from "@/styles/AuthCommonStyles";
import { useLoginMutation } from "@/api/AuthMutations";

const Login = () => {
    const { login } = useSession();

    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
        remember: false,
    });

    const mutation = useLoginMutation();

    const handleSignIn = async () => {
        if (!formData.email || !formData.password) {
            Alert.alert("Please fill in all fields");
            return;
        }
        mutation.mutate(formData, {
            onSuccess: ({ data }) => {
                login(data.token);
                router.replace("/");
            },
        });
    };

    return (
        <View style={AuthStyles.container}>
            <Text style={AuthStyles.title}>Login</Text>
            <View style={AuthStyles.form}>
                <StyledTextInput
                    placeholder={"Email"}
                    keyboardType="email-address"
                    value={formData.email}
                    onChangeText={(email) => setFormData({ ...formData, email })}
                    editable={!mutation.isPending}
                />
                <StyledTextInput
                    placeholder={"Password"}
                    secureTextEntry
                    value={formData.password}
                    onChangeText={(password) => setFormData({ ...formData, password })}
                    editable={!mutation.isPending}
                />
                <SwitchRow
                    title="Remember me"
                    value={formData.remember}
                    onChange={(remember) => setFormData({ ...formData, remember })}
                    sx={styles.switch}
                    disabled={mutation.isPending}
                />
                <Link href="/forgot-password" style={AuthStyles.link}>
                    Forgot your password?
                </Link>
                <StyledButton
                    onPress={handleSignIn}
                    title="Login"
                    disabled={mutation.isPending || !formData.email || !formData.password}
                    sx={AuthStyles.button}
                />
            </View>
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
