import React from "react";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyledButton } from "@/components/Form/StyledButton";
import { useStorageState } from "@/hooks/useStorageState";
import { validLanguages } from "@/localization/i18n";

export const AuthLanguageSelector = () => {
    const { i18n } = useTranslation();
    const [language, setLanguage] = useState(i18n.language);
    const [_, saveLanguage] = useStorageState("language");

    const changeLanguage = (lng: string) => {
        if (validLanguages.includes(lng)) {
            i18n.changeLanguage(lng);
            setLanguage(lng);
            saveLanguage(lng);
        }
    };
    return (
        <View style={styles.container}>
            <StyledButton
                title="EN"
                onPress={() => changeLanguage("en")}
                sx={styles.button}
                disabled={language === "en"}
            />
            <StyledButton
                title="ES"
                onPress={() => changeLanguage("es")}
                sx={styles.button}
                disabled={language === "es"}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    button: {
        margin: 5,
    },
});
