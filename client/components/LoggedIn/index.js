import React, { useEffect, useState } from 'react';
import { TouchableHighlight, View, Text, StyleSheet } from "react-native";
import info from "../../info.json";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Books from './Books';
import Users from './Users';
import Authors from './Authors';
import Book from './Book';
import User from './User';

const Stack = createNativeStackNavigator();

const Home = ({ logout, user }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.homeContainer}>
            <TouchableHighlight style={styles.homeButton} onPress={() => navigation.navigate("Books")} underlayColor={"gray"}>
                <Text style={styles.homeButtonText}>Kitaplar</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.homeButton} onPress={() => navigation.navigate("Authors")} underlayColor={"gray"}>
                <Text style={styles.homeButtonText}>Yazarlar</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.homeButton} onPress={() => navigation.navigate("Users")} underlayColor={"gray"}>
                <Text style={styles.homeButtonText}>Kullanıcılar</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.homeButton} onPress={() => navigation.navigate("User", { user_id: user.id })} underlayColor={"gray"}>
                <Text style={styles.homeButtonText}>Profilim</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.homeButton} onPress={logout} underlayColor={"gray"}>
                <Text style={styles.homeButtonText}>Çıkış Yap</Text>
            </TouchableHighlight>
        </View>
    )
}

const LoggedIn = ({ setUser, user, setLoading }) => {
    const [data, setData] = useState();
    const logout = () => {
        fetch(info["server"] + "/logout").then(() => setUser(undefined))
    }
    useEffect(() => {
        setLoading(true)
        {
            fetch(`${info["server"]}/initial`).then(res => res.json()).then(data => {
                if (data.success) {
                    setData(data)
                }
            }).catch(logout).finally(() => setLoading(false))
        }
    }, [])
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Home'>
                    {props => <Home {...props} logout={logout} user={user} />}
                </Stack.Screen>
                <Stack.Screen name='Books'>
                    {props => <Books {...props} logout={logout} data={data} />}
                </Stack.Screen>
                <Stack.Screen name='Users'>
                    {props => <Users {...props} logout={logout} data={data} />}
                </Stack.Screen>
                <Stack.Screen name='Authors'>
                    {props => <Authors {...props} logout={logout} data={data} />}
                </Stack.Screen>
                <Stack.Screen name='Book'>
                    {props => <Book {...props} logout={logout} data={data} user={user} setData={setData} setLoading={setLoading} />}
                </Stack.Screen>
                <Stack.Screen name='User'>
                    {props => <User {...props} logout={logout} data={data} user={user} />}
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

export default LoggedIn;