import React from 'react';
import { View, StyleSheet, Text, Pressable } from "react-native";
import LoggedInHeader from './LoggedInHeader';
import { useNavigation } from '@react-navigation/native';

const User = ({ logout, data, route, user }) => {
    const displayUser = data.users.find(u => u.id === route.params.user_id);
    const selfProfile = displayUser.id === user.id;
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <LoggedInHeader logout={logout} />
            <Text style={styles.header}>{selfProfile ? `Profilim (${displayUser.username})` : `${displayUser.username} Profili`}</Text>
            <View style={{ flexGrow: 1 }}>
                <View style={styles.tableContainer}>
                    <Text style={styles.tableHeader}>Okuma Listesi</Text>
                    <View style={styles.table}>
                        {data.plan_to_read.filter(ptr => ptr.user_id === displayUser.id).map((ptr, i) => {
                            return (
                                <Pressable onPress={() => navigation.navigate("Book", { bookId: ptr.book_id })} key={i} style={styles.row}>
                                    <Text style={i % 2 ? styles.columnType1 : styles.columnType2}>{data.books.find(b => b.id === ptr.book_id).title}</Text>
                                </Pressable>
                            )
                        })}
                    </View>
                    <View style={{ flex: 1 }} />
                </View>
                <View style={styles.tableContainer}>
                    <Text style={styles.tableHeader}>Okunanlar</Text>
                    <View style={styles.table}>
                        {data.read_books.filter(ptr => ptr.user_id === displayUser.id).map((ptr, i) => {
                            const book = data.books.find(b => b.id === ptr.book_id);
                            return (
                                <Pressable onPress={() => navigation.navigate("Book", { bookId: ptr.book_id })} key={i} style={styles.row}>
                                    <Text style={i % 2 ? styles.columnType1 : styles.columnType2}>{`${book.title} (${ptr.rating} Puan)`}</Text>
                                </Pressable>
                            )
                        })}
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FCF992",
        flexDirection: "column",
    },
    header: {
        fontSize: 30,
        fontWeight: "bold",
        width: "100%",
        textAlign: "center",
        marginBottom: 15
    },
    tableContainer: {
        flex: 1,
        alignItems: "center"
    },
    tableHeader: {
        flex: 1,
        fontSize: 25,
        fontWeight: "bold"
    },
    table: {
        flex: 5,
        width: "75%"
    },
    row: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    columnType1: {
        fontSize: 16,
        flex: 1,
        backgroundColor: "#FCE992",
        textAlign: "center"
    },
    columnType2: {
        fontSize: 16,
        flex: 1,
        backgroundColor: "#E6D090",
        textAlign: "center"
    },
});

export default User;