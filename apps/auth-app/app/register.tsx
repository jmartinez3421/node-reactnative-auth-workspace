import React from "react";
import { AuthStyles } from "@/styles/AuthCommonStyles";
import { Alert, Text, View } from "react-native";
import { StyledTextInput } from "@/components/Form/StyledTextInput";
import { Link } from "expo-router";
import { StyledButton } from "@/components/Form/StyledButton";
import { Loading } from "@/components/Layout/Loading";
import { useRegisterMutation } from "@/api/AuthMutations";
import { useSession } from "@/contexts/AuthContext";

const Register = () => {
    const { login } = useSession();

    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        password: "",
    });

    const mutation = useRegisterMutation();

    const handleRegister = () => {
        if (!formData.email || !formData.password || !formData.name) {
            Alert.alert("Please fill in all fields");
            return;
        }
        mutation.mutate(formData, {
            onSuccess: ({ data }) => {
                login(data.token);
            },
        });
    };

    return (
        <View style={AuthStyles.container}>
            <Text style={AuthStyles.title}>Register</Text>
            <View style={AuthStyles.form}>
                <StyledTextInput
                    placeholder={"Name"}
                    autoCapitalize="sentences"
                    value={formData.name}
                    onChangeText={(name) => setFormData({ ...formData, name })}
                    editable={!mutation.isPending}
                />
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
                <StyledButton
                    onPress={handleRegister}
                    title="Register"
                    disabled={mutation.isPending || !formData.email || !formData.password}
                    sx={AuthStyles.button}
                />
            </View>
            <View style={AuthStyles.separator} />
            <Link href="/login" style={AuthStyles.link}>
                Already have an account?
            </Link>
            {mutation.isPending && <Loading />}
        </View>
    );
};

export default Register;
