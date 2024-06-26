import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { SessionProvider } from "@/contexts/AuthContext";

const queryClient = new QueryClient();
const AppState = () => (
    <QueryClientProvider client={queryClient}>
        <SessionProvider>
            <Slot />
        </SessionProvider>
    </QueryClientProvider>
);

export default AppState;
