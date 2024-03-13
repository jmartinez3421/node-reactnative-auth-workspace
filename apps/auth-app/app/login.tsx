import React from "react";
import { Button, View, Text, TextInput, Switch, Alert } from "react-native";
import { useSession } from "@/contexts/AuthContext";
import { router } from "expo-router";
import { StyleSheet } from "react-native";
import { Loading } from "@/components/Layout/Loading";
import { SwitchRow } from "@/components/Form/Switch/SwitchRow";

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
            <TextInput
                placeholder={"email"}
                autoCapitalize="none"
                style={styles.input}
                value={formData.email}
                onChangeText={(email) => setFormData({ ...formData, email })}
            />
            <TextInput
                placeholder={"password"}
                autoCapitalize="none"
                secureTextEntry
                style={styles.input}
                value={formData.password}
                onChangeText={(password) => setFormData({ ...formData, password })}
            />
            <SwitchRow title="Remember me" value={formData.remember} onChange={(remember) => setFormData({ ...formData, remember })} />
            <Button onPress={handleSignIn} title="sign in" />
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
        fontSize: 20,
        fontWeight: "bold",
    },
    input: {
        height: 40,
        margin: 12,
        width: "100%",
        borderWidth: 1,
    }
});

export default Login;
