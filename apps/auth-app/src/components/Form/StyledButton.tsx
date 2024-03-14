import React from "react";
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";

interface StyledButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    sx?: StyleProp<ViewStyle>;
}

export const StyledButton = ({ title, onPress, disabled, sx }: StyledButtonProps) => {
    return (
        <View style={sx}>
            <TouchableOpacity
                style={[styles.button, disabled && styles.buttonDisabled]}
                onPress={onPress}
                disabled={disabled}
            >
                <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#303030",
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 200,
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonDisabled: {
        backgroundColor: "#666",
    },
    text: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "500",
        textAlign: "center",
    },
});
