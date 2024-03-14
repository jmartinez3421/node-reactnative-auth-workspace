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

const Login = () => {
    const { signIn } = useSession();

    const [formData, setFormData] = React.useState({
        email: "jmartinezg.fp@gmail.com",
        password: "Patata333!",
        remember: false,
    });

    const [isLoading, setIsLoading] = React.useState(false);

    const handleSignIn = async () => {
        if (!formData.email || !formData.password) {
            Alert.alert("Please fill in all fields");
            return;
        }
        setIsLoading(true);
        await signIn(formData.email, formData.password, formData.remember);
        setIsLoading(false);
        router.replace("/");
    };

    return (
        <View style={AuthStyles.container}>
            <Text style={AuthStyles.title}>Login</Text>
            <View style={AuthStyles.form}>
                <StyledTextInput
                    placeholder={"Email"}
                    autoCapitalize="none"
                    value={formData.email}
                    onChangeText={(email) => setFormData({ ...formData, email })}
                    editable={!isLoading}
                />
                <StyledTextInput
                    placeholder={"Password"}
                    autoCapitalize="none"
                    secureTextEntry
                    value={formData.password}
                    onChangeText={(password) => setFormData({ ...formData, password })}
                    editable={!isLoading}
                />
                <SwitchRow
                    title="Remember me"
                    value={formData.remember}
                    onChange={(remember) => setFormData({ ...formData, remember })}
                    sx={styles.switch}
                    disabled={isLoading}
                />
                <Link href="/forgot-password" style={AuthStyles.link}>
                    Forgot your password?
                </Link>
                <StyledButton onPress={handleSignIn} title="Login" disabled={isLoading} sx={AuthStyles.button} />
            </View>
            {isLoading && <Loading />}
        </View>
    );
};

const styles = StyleSheet.create({
    switch: {
        alignSelf: "flex-start",
    },
});

export default Login;
