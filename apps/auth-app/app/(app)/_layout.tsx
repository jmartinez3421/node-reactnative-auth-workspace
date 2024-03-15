import React from "react";
import { Redirect, Stack } from "expo-router";
import { useSession } from "@/contexts/AuthContext";
import { Loading } from "@/components/Layout/Loading";

const AuthLayout = () => {
    const { session, isLoading } = useSession();

    if (isLoading) {
        return <Loading />;
    }

    if (!session) {
        return <Redirect href="/login" />;
    }

    return <Stack />;
};

export default AuthLayout;
