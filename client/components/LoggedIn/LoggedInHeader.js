import React from 'react';
import { View, StyleSheet, Text, Pressable } from "react-native";

const LoggedInHeader = ({ logout }) => {
    return (
        <View style={styles.container}>
            <Pressable onPress={logout}>
                <Text style={styles.text}>
                    Çıkış Yap
                </Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        width: "100%",
        backgroundColor: "#F2C1B6",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 25,
        fontWeight: "bold",
        textDecorationLine: "underline",
        paddingVertical: 5
    },
});

export default LoggedInHeader