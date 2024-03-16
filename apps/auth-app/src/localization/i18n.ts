import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en";
import es from "./es";
import { getLocales } from "expo-localization";
import * as SecureStore from "expo-secure-store";

// List of translation resources
const resources = {
    en,
    es,
};

export const validLanguages = ["en", "es"];
const deviceLanguage = getLocales()[0].languageCode ?? "";

i18n.use(initReactI18next).init({
    compatibilityJSON: "v3", //To make it work for Android devices, add this line.
    resources,
    lng: validLanguages.includes(deviceLanguage) ? deviceLanguage : "en",
    // if you're using a language detector, do not define the lng option
    interpolation: {
        escapeValue: false,
    },
});

SecureStore.getItemAsync("language").then((value) => {
    if (value && validLanguages.includes(value)) {
        i18n.changeLanguage(value);
    }
});

export default i18n;
