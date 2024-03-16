import React from "react";
import { AuthStyles } from "@/styles/AuthCommonStyles";
import { Text, View } from "react-native";
import { Link } from "expo-router";
import { StyledButton } from "@/components/Form/StyledButton";
import { Loading } from "@/components/Layout/Loading";
import { useRegisterMutation } from "@/api/AuthMutations";
import { useSession } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { ControlledTextInput } from "@/components/Form/ControlledComponents/ControlledTextInput";
import { EmailRegExp } from "@/utils/regExp";

interface RegisterFormProps {
    name: string;
    email: string;
    password: string;
}

const Register = () => {
    const { login } = useSession();

    const { control, handleSubmit } = useForm<RegisterFormProps>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const mutation = useRegisterMutation();

    const onSubmit = handleSubmit((formData) => {
        mutation.mutate(formData, {
            onSuccess: ({ data }) => {
                login(data.token);
            },
        });
    });

    return (
        <View style={AuthStyles.container}>
            <Text style={AuthStyles.title}>Register</Text>
            <View style={AuthStyles.form}>
                <ControlledTextInput
                    name="name"
                    control={control}
                    rules={{ required: true, pattern: EmailRegExp }}
                    placeholder="Name"
                    autoCapitalize="sentences"
                    editable={!mutation.isPending}
                />
                <ControlledTextInput
                    name="email"
                    control={control}
                    rules={{ required: true }}
                    placeholder="Email"
                    keyboardType="email-address"
                    editable={!mutation.isPending}
                />
                <ControlledTextInput
                    name="password"
                    control={control}
                    rules={{ required: true }}
                    placeholder="Password"
                    secureTextEntry
                    editable={!mutation.isPending}
                />
                <StyledButton
                    onPress={onSubmit}
                    title="Register"
                    disabled={mutation.isPending}
                    sx={AuthStyles.button}
                />
            </View>
            <View style={AuthStyles.separator} />
            <Link href="/login" style={AuthStyles.link} disabled={mutation.isPending}>
                Already have an account?
            </Link>
            {mutation.isPending && <Loading />}
        </View>
    );
};

export default Register;
