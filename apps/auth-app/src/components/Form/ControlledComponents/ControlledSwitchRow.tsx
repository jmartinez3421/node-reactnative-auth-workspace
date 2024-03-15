import { Control, Controller, FieldValues, Path, PathValue, RegisterOptions } from "react-hook-form";
import { SwitchRow } from "@/components/Form/Switch/SwitchRow";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";

interface Props<T extends FieldValues, TName extends Path<T>, TValue extends PathValue<T, TName>> {
    name: TName;
    control: Control<T>;
    defaultValue?: TValue;
    rules?: Omit<RegisterOptions<T, TName>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled">;

    title: string;
    sx?: StyleProp<ViewStyle>;
    disabled?: boolean;
}

export const ControlledSwitchRow = <T extends FieldValues, TName extends Path<T>, TValue extends PathValue<T, TName>>({
    name,
    control,
    defaultValue,
    rules,
    ...switchProps
}: Props<T, TName, TValue>) => (
    <Controller
        render={({ field: { onChange, value } }) => <SwitchRow value={value} onChange={onChange} {...switchProps} />}
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
    />
);
