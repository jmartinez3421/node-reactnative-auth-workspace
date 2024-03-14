import React from "react";
import { View, Text, Alert } from "react-native";
import { useSession } from "@/contexts/AuthContext";
import { router } from "expo-router";
import { StyleSheet } from "react-native";
import { Loading } from "@/components/Layout/Loading";
import { SwitchRow } from "@/components/Form/Switch/SwitchRow";
import { StyledTextInput } from "@/components/Form/StyledTextInput";
import { StyledButton } from "@/components/Form/StyledButton";

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
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <View style={styles.form}>
                <StyledTextInput
                    placeholder={"email"}
                    autoCapitalize="none"
                    value={formData.email}
                    onChangeText={(email) => setFormData({ ...formData, email })}
                    editable={!isLoading}
                />
                <StyledTextInput
                    placeholder={"password"}
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
                <StyledButton onPress={handleSignIn} title="Login" disabled={isLoading} sx={styles.button} />
            </View>
            {isLoading && <Loading />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 20,
    },
    form: {
        width: "100%",
        rowGap: 5,
    },
    switch: {
        alignSelf: "flex-start",
    },
    button: {
        marginTop: 20,
        alignSelf: "center",
        width: "50%",
    },
});

export default Login;
