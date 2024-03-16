import React from "react";
import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { AuthLanguageSelector } from "@/components/Auth/AuthLanguageSelector";

const AuthLayout = () => {
    return (
        <View style={styles.container}>
            <Stack
                initialRouteName="login"
                screenOptions={{
                    headerShown: false,
                    contentStyle: {
                        backgroundColor: "white",
                    },
                }}
            />
            <AuthLanguageSelector />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        rowGap: 20,
    },
});

export default AuthLayout;
