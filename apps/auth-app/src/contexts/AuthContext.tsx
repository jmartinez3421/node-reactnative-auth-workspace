import React from "react";
import { useStorageState } from "@/hooks/useStorageState";
import { router } from "expo-router/build/imperative-api";
import { authService } from "@/api/services";

const AuthContext = React.createContext<{
    login: (token: string) => void;
    logout: () => void;
    session?: string | null;
    isLoading: boolean;
}>({
    login: () => null,
    logout: () => null,
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
        authService
            .renew()
            .then(({ data }) => {
                setSession(data.token);
            })
            .catch(() => {
                setSession(null);
                router.replace("/login");
            });
    }, []);

    const login = (token: string) => {
        setSession(token);
        router.replace("/");
    };

    const logout = () => {
        setSession(null);
        router.replace("/login");
    };

    return (
        <AuthContext.Provider
            value={{
                login,
                logout,
                session,
                isLoading,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
