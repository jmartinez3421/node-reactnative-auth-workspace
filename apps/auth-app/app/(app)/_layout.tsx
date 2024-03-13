import { Redirect, Stack } from 'expo-router';
import { useSession } from "@/contexts/AuthContext";
import { Text } from 'react-native';


const AuthLayout = () => {
    const { session, isLoading } = useSession();

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (!session) {
        return <Redirect href="/login" />;
    }

    return <Stack />;
}


export default AuthLayout;
