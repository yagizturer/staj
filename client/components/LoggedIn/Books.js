import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, Image, Pressable, Dimensions, ScrollView } from "react-native";
import info from "../../info.json";
import LoggedInHeader from './LoggedInHeader';

const Books = ({ logout, data, route }) => {
    const navigation = useNavigation();
    const books = route?.params?.author ? data.books.filter(b => b.author === route.params.author) : data.books;
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}>
            <LoggedInHeader logout={logout} />
            <Text style={styles.header}>{route?.params?.author ? `${route.params.author} Kitapları` : "Kitaplar"}</Text>
            {
                books && books.map((book, i) => {
                    return (
                        <Pressable key={i} onPress={() => navigation.navigate("Book", {
                            bookId: book.id
                        })} style={{ ...styles.bookContainer, backgroundColor: Math.floor(i / 2) % 2 == i % 2 ? "#FCE992" : "#E6D090" }}>
                            <Image resizeMode="contain" source={{ uri: `${info["server"]}/images/${book.image_name}` }} style={styles.image} />
                            <Text style={styles.bookText}>{book.title}</Text>
                        </Pressable>
                    )
                })
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FCF992",
        flexDirection: "column",
    },
    image: {
        width: "100%",
        flexGrow: 1
    },
    bookContainer: {
        width: Dimensions.get("window").width / 2,
        height: Dimensions.get("window").width / 2 + 60,
        paddingBottom: 30,
        paddingTop: 10
    },
    bookText: {
        fontWeight: "bold",
        textAlign: "center"

    },
    header: {
        fontSize: 30,
        fontWeight: "bold",
        width: "100%",
        textAlign: "center",
        marginBottom: 15
    }
})

export default Books;