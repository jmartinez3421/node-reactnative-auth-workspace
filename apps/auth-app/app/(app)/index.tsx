import React from "react";
import { View } from "react-native";
import { useSession } from "@/contexts/AuthContext";
import { StyledButton } from "@/components/Form/StyledButton";

const Index = () => {
    const { logout } = useSession();
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <StyledButton title="Logout" onPress={logout} />
        </View>
    );
};

export default Index;
