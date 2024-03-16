import React from "react";
import { Text, View } from "react-native";
import { AuthStyles } from "@/styles/AuthCommonStyles";
import { StyledButton } from "@/components/Form/StyledButton";
import { useForgotPasswordMutation } from "@/api/AuthMutations";
import { Loading } from "@/components/Layout/Loading";
import { Link, router } from "expo-router";
import { useForm } from "react-hook-form";
import { ControlledTextInput } from "@/components/Form/ControlledComponents/ControlledTextInput";
import { EmailRegExp } from "@/utils/regExp";

const ForgotPassword = () => {
    const { control, handleSubmit } = useForm<{ email: string }>({ defaultValues: { email: "" } });

    const mutation = useForgotPasswordMutation();

    const onSubmit = handleSubmit((formData) => {
        mutation.mutate(formData, {
            onSuccess: () => router.navigate({ pathname: "/remember-password", params: { email: formData.email } }),
        });
    });

    return (
        <View style={AuthStyles.container}>
            <Text style={AuthStyles.title}>Remember password</Text>
            <View style={AuthStyles.form}>
                <Text style={AuthStyles.helper}>
                    Enter your email and we will send you a link to reset your password
                </Text>
                <ControlledTextInput
                    name="email"
                    control={control}
                    rules={{ required: true, pattern: EmailRegExp }}
                    placeholder="Email"
                    keyboardType="email-address"
                    editable={!mutation.isPending}
                />
                <StyledButton onPress={onSubmit} title="Send" disabled={mutation.isPending} sx={AuthStyles.button} />
            </View>
            <View style={AuthStyles.separator} />
            <Link href="/remember-password" style={AuthStyles.link}>
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
