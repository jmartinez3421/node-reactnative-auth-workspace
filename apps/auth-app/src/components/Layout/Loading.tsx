import { ActivityIndicator, StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";

export const Loading = () => (
    <BlurView intensity={15} style={styles.container}>
        <ActivityIndicator size="large" color="royalblue" />
    </BlurView>
)

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
    },
});
