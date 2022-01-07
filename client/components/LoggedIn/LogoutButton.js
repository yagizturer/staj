import React from 'react';
import { TouchableHighlight, View, Text } from "react-native";

const LogoutButton = ({ logout }) => {
    return (
        <TouchableHighlight onPress={logout}>
            <Text>
                Çıkış Yap
            </Text>
        </TouchableHighlight>
    )
}

export default LogoutButton;