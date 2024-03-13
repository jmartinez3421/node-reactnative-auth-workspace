import { Button, View, Text } from "react-native";
import { useSession } from "@/contexts/AuthContext";
import { router } from "expo-router";

const Login = () => {
    const { signIn } = useSession();

    const handleSignIn = () => {
        signIn();
        router.replace("/");
    }

    return (
        <View>
            <Text>Sign in</Text>
            <Button onPress={handleSignIn} title="sign in" />
        </View>
    );
}
export default Login;
