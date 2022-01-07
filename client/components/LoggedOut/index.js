import React, { useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableHighlight, Alert } from "react-native";
import info from "../../info.json";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Form from './Form';
const Stack = createNativeStackNavigator();




const Home = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.homeContainer}>
            <TouchableHighlight style={styles.homeButton} onPress={() => navigation.navigate("Login")} underlayColor={"gray"}>
                <Text style={styles.homeButtonText}>Giriş Yap</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.homeButton} onPress={() => navigation.navigate("Register")} underlayColor={"gray"}>
                <Text style={styles.homeButtonText}>Kayıt Ol</Text>
            </TouchableHighlight>
        </View>
    )
}

const LoggedOut = ({ setUser, setLoading }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const submitForm = (route) => {
        if (!username || !password) {
            Alert.alert("Boş alan bırakma!");
            return;
        }
        setLoading(true);
        fetch(info["server"] + "/" + route, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        }).then(res => res.json()).then(data => {
            if (!data.success) {
                Alert.alert("Hata!", data.error)
            } else {
                setUser({ user_type: data.user_type, username: data.username, id: data.id })
            }
        }).catch(console.log).finally(() => setLoading(false));
    }
    const login = () => {
        submitForm("login");
    }

    const register = () => {
        submitForm("register");
    }
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Login">
                    {props => <Form {...props} setUser={setUser} submit={login} username={username} password={password} setUsername={setUsername} setPassword={setPassword} />}
                </Stack.Screen>
                <Stack.Screen name="Register">
                    {props => <Form {...props} setUser={setUser} submit={register} username={username} password={password} setUsername={setUsername} setPassword={setPassword} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        backgroundColor: "#FCF992",
        justifyContent: "center",
        alignItems: "center"
    },
    homeButton: {
        backgroundColor: "#E6D090",
        paddingVertical: 6,
        width: 150,
        marginVertical: 15
    },
    homeButtonText: {
        fontSize: 20,
        textAlign: "center"
    }
})

export default LoggedOut;