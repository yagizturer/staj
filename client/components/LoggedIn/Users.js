import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Text, Pressable } from "react-native";
import LoggedInHeader from './LoggedInHeader';

const Users = ({ logout, data }) => {
    const users = data.users;
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <LoggedInHeader logout={logout} />
            <Text style={styles.header}>Kullanıcılar</Text>
            <View style={styles.userTable}>
                <View style={styles.userRow}>
                    <Text style={{ ...styles.userColumn, backgroundColor: "#E6D090", fontWeight: "bold", textDecorationLine: "underline" }}>
                        Kullanıcı Adı
                    </Text>
                    <Text style={{ ...styles.userColumn, backgroundColor: "#FCC892", fontWeight: "bold", textDecorationLine: "underline" }}>
                        Kullanıcı Tipi
                    </Text>
                </View>
                {
                    users.map((user, i) => {
                        return (
                            <Pressable key={i} style={styles.userRow} onPress={() => navigation.navigate("User", { user_id: user.id })}>
                                <Text style={{ ...styles.userColumn, backgroundColor: i % 2 ? "#E6D090" : "#FCC892" }}>
                                    {user.username}
                                </Text>
                                <Text style={{ ...styles.userColumn, backgroundColor: i % 2 ? "#FCC892" : "#E6D090" }}>
                                    {user.user_type === 1 ? "Admin" : "Normal Kullanıcı"}
                                </Text>
                            </Pressable>
                        )
                    })
                }
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FCF992",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    userTable: {
        width: "80%",
        marginTop: 30
    },
    userRow: {
        flexDirection: "row"
    },
    userColumn: {
        flex: 1,
        textAlign: "center",
        fontSize: 18
    },
    header: {
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 15
    }
})

export default Users;