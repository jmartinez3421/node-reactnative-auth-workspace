import React from "react";
import { TextInput, StyleSheet } from "react-native";

export interface StyledTextInputProps extends React.ComponentProps<typeof TextInput> {
    hasError?: boolean;
}

export const StyledTextInput = ({ style: propsStyles, hasError, ...props }: StyledTextInputProps) => (
    <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        style={[styles.input, propsStyles, hasError && styles.error, !props.editable && styles.disabled]}
        placeholderTextColor="#303030"
        {...props}
    />
);

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        height: 50,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginVertical: 10,
        borderColor: "#303030",
        color: "#303030",
        width: "100%",
    },
    error: {
        borderColor: "red",
        color: "red",
    },
    disabled: {
        backgroundColor: "#f2f2f2",
        color: "#a0a0a0",
        borderColor: "#a0a0a0",
    },
});
