import { Alert, Text, View } from "react-native";
import { AuthStyles } from "@/styles/AuthCommonStyles";
import { StyledTextInput } from "@/components/Form/StyledTextInput";
import { StyledButton } from "@/components/Form/StyledButton";
import React from "react";
import { useForgotPasswordMutation } from "@/api/AuthMutations";
import { Loading } from "@/components/Layout/Loading";
import { Link, router } from "expo-router";

const ForgotPassword = () => {
    const [email, setEmail] = React.useState("");

    const mutation = useForgotPasswordMutation();

    const handleSignIn = () => {
        if (!email) {
            Alert.alert("Insert your email");
            return;
        }
        mutation.mutate(
            { email },
            {
                onSuccess: () => router.navigate({ pathname: "/password-token", params: { email } }),
            }
        );
    };

    return (
        <View style={AuthStyles.container}>
            <Text style={AuthStyles.title}>Remember password</Text>
            <View style={AuthStyles.form}>
                <Text style={AuthStyles.helper}>
                    Enter your email and we will send you a link to reset your password
                </Text>
                <StyledTextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                    editable={!mutation.isPending}
                />
                <StyledButton
                    onPress={handleSignIn}
                    title="Send"
                    disabled={mutation.isPending}
                    sx={AuthStyles.button}
                />
            </View>
            <View style={AuthStyles.separator} />
            <Link href="/password-token" style={AuthStyles.link}>
                Already have a token?
            </Link>
            <Link href="/login" style={AuthStyles.link}>
                Back to login
            </Link>
            {mutation.isPending && <Loading />}
        </View>
    );
};

export default ForgotPassword;
