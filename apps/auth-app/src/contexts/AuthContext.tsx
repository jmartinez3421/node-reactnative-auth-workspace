import React from "react";
import { useStorageState } from "@/hooks/useStorageState";
import api from "@/api/api";
import { router } from "expo-router/build/imperative-api";
import { authService } from "@/api/services";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/api/APIClient";
import { Alert } from "react-native";

const AuthContext = React.createContext<{
    signIn: (email: string, password: string, remember?: boolean) => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}>({
    signIn: () => null,
    signOut: () => null,
    session: undefined,
    isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
    const value = React.useContext(AuthContext);
    if (process.env.NODE_ENV !== "production") {
        if (!value) {
            throw new Error("useSession must be wrapped in a <SessionProvider />");
        }
    }

    return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState("session");

    React.useEffect(() => {
        api.get("/auth/renew")
            .then((res) => {
                setSession(res.data.session);
            })
            .catch(() => {
                setSession(null);
                router.replace("/login");
            });
    }, []);

    const signIn = (email: string, password: string, remember?: boolean) => {
        authService
            .login({
                email,
                password,
                remember,
            })
            .then((res) => {
                const { token } = res.data.data;
                setSession(token);
                router.replace("/");
            })
            .catch((err: AxiosError<ErrorResponse>) => {
                if (err.response && err.response.data) {
                    Alert.alert(err.response.data.msg);
                }
            });
    };

    const signOut = () => {
        setSession(null);
        router.replace("/login");
    };

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signOut,
                session,
                isLoading,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
