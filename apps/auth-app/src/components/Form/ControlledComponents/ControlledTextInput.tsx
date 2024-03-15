import React from "react";
import { StyledTextInput, StyledTextInputProps } from "@/components/Form/StyledTextInput";
import { Control, Controller, FieldValues, Path, PathValue, RegisterOptions } from "react-hook-form";

interface Props<T extends FieldValues, TName extends Path<T>, TValue extends PathValue<T, TName>>
    extends StyledTextInputProps {
    name: TName;
    control: Control<T>;
    defaultValue?: TValue;
    rules?: Omit<RegisterOptions<T, TName>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled">;
}

export const ControlledTextInput = <T extends FieldValues, TName extends Path<T>, TValue extends PathValue<T, TName>>({
    name,
    control,
    defaultValue,
    rules,
    value: _,
    onBlur: __,
    hasError: ___,
    onChangeText: ____,
    ...inputProps
}: Props<T, TName, TValue>) => (
    <Controller
        render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
            <StyledTextInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                hasError={Boolean(error)}
                {...inputProps}
            />
        )}
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
    />
);
