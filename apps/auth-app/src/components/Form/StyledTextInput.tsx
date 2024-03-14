import React from "react";
import { TextInput, StyleSheet } from "react-native";

export const StyledTextInput = (props: React.ComponentProps<typeof TextInput>) => (
    <TextInput style={[styles.input, props.style]} placeholderTextColor="#303030" {...props} />
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
});
