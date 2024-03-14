import React from "react";
import { Platform, Switch } from "react-native";

type Props = {
    isOn: boolean;
    onChange?: (value: boolean) => void;
    disabled?: boolean;
};

export const CustomSwitch = ({ isOn, onChange, disabled }: Props) => {
    const [isEnabled, setIsEnabled] = React.useState(isOn);
    const toggleSwitch = () => {
        setIsEnabled(!isEnabled);
        onChange && onChange(!isEnabled);
    };

    return (
        <Switch
            trackColor={{ false: "#f1f1f1", true: "royalblue" }}
            thumbColor={Platform.OS === "android" ? "blue" : ""}
            onValueChange={toggleSwitch}
            value={isEnabled}
            disabled={disabled}
        />
    );
};
