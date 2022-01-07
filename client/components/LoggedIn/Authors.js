import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Text, Pressable } from "react-native";
import LoggedInHeader from './LoggedInHeader';

const Authors = ({ logout, data }) => {
    const authors = [...new Set(data.books.map(b => b.author))]
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <LoggedInHeader logout={logout} />
            <Text style={styles.header}>Yazarlar</Text>
            <View style={styles.table}>
                <View style={styles.row}>
                    <Text style={{ ...styles.column, backgroundColor: "#E6D090", fontWeight: "bold", textDecorationLine: "underline" }}>
                        Yazar Adı
                    </Text>
                </View>
                {
                    authors.map((author, i) => {
                        return (
                            <Pressable key={i} style={styles.row} onPress={() => navigation.navigate("Books", { author })}>
                                <Text style={{ ...styles.column, backgroundColor: i % 2 ? "#E6D090" : "#FCC892" }}>
                                    {author}
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
    table: {
        width: "80%",
        marginTop: 30
    },
    row: {
        flexDirection: "row"
    },
    column: {
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

export default Authors;