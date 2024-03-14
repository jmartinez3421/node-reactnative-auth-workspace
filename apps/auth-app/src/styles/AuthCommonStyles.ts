import { StyleSheet } from "react-native";

export const AuthStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 20,
    },
    form: {
        width: "100%",
        rowGap: 5,
    },
    button: {
        marginTop: 20,
        alignSelf: "center",
        width: "50%",
    },
    link: {
        color: "royalblue",
        fontSize: 15,
        marginBottom: 10,
    },
    separator: {
        marginVertical: 40,
        height: 1,
        width: "80%",
        backgroundColor: "grey",
    },
    helper: {
        textAlign: "center",
        marginBottom: 10,
    },
});
