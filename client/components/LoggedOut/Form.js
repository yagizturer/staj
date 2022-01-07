import React from 'react';
import { View, StyleSheet, TextInput, Text, TouchableHighlight, Alert } from "react-native";

const Form = ({ submit, username, password, setUsername, setPassword }) => {
    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.text}>Kullanıcı Adı</Text>
                <TextInput style={styles.input} placeholder='Kullanıcı Adı' value={username} onChangeText={text => setUsername(text)} />
                <Text style={styles.text}>Şifre</Text>
                <TextInput style={styles.input} placeholder='Şifre' value={password} onChangeText={text => setPassword(text)} />
                <TouchableHighlight style={styles.button} underlayColor={"gray"} onPress={submit}>
                    <Text style={styles.buttonText}>Gönder</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FCF992",
        justifyContent: "center",
        alignItems: "center"
    },
    form: {
        padding: 40,
        backgroundColor: "#E6D090",
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        backgroundColor: "white",
        width: 200,
        height: 40,
        paddingHorizontal: 10,
        fontWeight: "bold",
        marginVertical: 15
    },
    text: {
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
    },
    button: {
        backgroundColor: "#FCF992",
        paddingVertical: 6,
        paddingHorizontal: 20,
        marginVertical: 15
    },
    buttonText: {
        fontSize: 20,
        textAlign: "center"
    }
})

export default Form;