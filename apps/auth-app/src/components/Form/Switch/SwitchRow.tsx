import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { CustomSwitch } from "./CustomSwitch";

type SwitchRowProps = {
    title: string;
    value: boolean;
    onChange: (value: boolean) => void;
    sx?: StyleProp<ViewStyle>;
    disabled?: boolean;
};
export const SwitchRow = ({ title, value, onChange, sx, disabled }: SwitchRowProps) => {
    return (
        <View style={[styles.switchRow, sx]}>
            <CustomSwitch isOn={value} onChange={onChange} disabled={disabled} />
            <Text style={[styles.switchText, !value && styles.disabledSwitchText]}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    switchRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        columnGap: 10,
    },
    switchText: {
        fontSize: 18,
    },
    disabledSwitchText: {
        fontSize: 18,
        color: "grey",
    },
});
