import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Alert, Image, Pressable, ScrollView } from "react-native";
import info from "../../info.json";
import LoggedInHeader from './LoggedInHeader';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const Book = ({ logout, data, route, user, setData, setLoading }) => {
    const bookId = route.params.bookId;
    const book = data.books.find((b) => b.id === bookId);
    const [planToRead, setPlanToRead] = useState(data.plan_to_read.filter(ptr => ptr.book_id === bookId))
    const [userPlanToRead, setUserPlanToRead] = useState(planToRead.find(ptr => ptr.user_id === user.id));
    const [readRecords, setReadRecords] = useState(data.read_books.filter(ptr => ptr.book_id === bookId));
    const [userReadRecord, setUserReadRecord] = useState(readRecords.find(rr => rr.user_id === user.id));
    const [selectedRating, setSelectedRating] = useState("1");
    const navigation = useNavigation();

    useEffect(() => {
        const newPlanToRead = data.plan_to_read.filter(ptr => ptr.book_id === bookId);
        setPlanToRead(newPlanToRead);
        setUserPlanToRead(newPlanToRead.find(ptr => ptr.user_id === user.id));
        const newReadRecords = data.read_books.filter(ptr => ptr.book_id === bookId);
        setReadRecords(newReadRecords);
        setUserReadRecord(newReadRecords.find(rr => rr.user_id === user.id))
        setSelectedRating(newReadRecords.find(rr => rr.user_id === user.id)?.rating || "1")
    }, [data]);

    const addToPlanToRead = () => {
        setLoading(true)
        fetch(info["server"] + "/add_to_plan_to_read", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                bookId
            })
        }).then(res => res.json()).then(data => {
            if (!data.success) {
                Alert.alert("Hata!", data.error)
            } else {
                setData(data);
            }
        }).catch(console.log).finally(() => setLoading(false))
    }

    const removeFromPlanToRead = () => {
        setLoading(true)
        fetch(info["server"] + "/remove_from_plan_to_read", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                recordId: userPlanToRead.id
            })
        }).then(res => res.json()).then(data => {
            if (!data.success) {
                Alert.alert("Hata!", data.error)
            } else {
                setData(data);
            }
        }).catch(console.log).finally(() => setLoading(false))
    }

    const addToReadBooks = (rating) => {
        setLoading(true)
        fetch(info["server"] + "/add_to_read_books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                bookId,
                rating
            })
        }).then(res => res.json()).then(data => {
            if (!data.success) {
                Alert.alert("Hata!", data.error)
            } else {
                setData(data);
            }
        }).catch(console.log).finally(() => setLoading(false))
    }

    const removeFromReadBooks = () => {
        setLoading(true)
        fetch(info["server"] + "/remove_from_read_books", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                recordId: userReadRecord.id
            })
        }).then(res => res.json()).then(data => {
            if (!data.success) {
                Alert.alert("Hata!", data.error)
            } else {
                setData(data);
            }
        }).catch(console.log).finally(() => setLoading(false))
    }

    return (
        <View style={styles.container}>
            <LoggedInHeader logout={logout} />
            <View style={styles.imageContainer}>
                <Image resizeMode="contain" source={{ uri: `${info["server"]}/images/${book.image_name}` }} style={styles.image} />
            </View>
            <Text style={styles.title}>
                {book.title}
            </Text>
            <View style={styles.infoContainer}>
                <View style={styles.row}>
                    <View style={styles.columnType1}>
                        <Text style={styles.tableKey}>Yazar: </Text>
                    </View>
                    <Pressable style={styles.columnType2} onPress={() => navigation.navigate("Books", { author: book.author })}>
                        <Text style={{ ...styles.tableValue, textDecorationLine: "underline" }}>{book.author}</Text>
                    </Pressable>
                </View>
                <View style={styles.row}>
                    <View style={styles.columnType2}>
                        <Text style={styles.tableKey}>Yıl: </Text>
                    </View>
                    <View style={styles.columnType1}>
                        <Text style={styles.tableValue}>{book.year}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.columnType1}>
                        <Text style={styles.tableKey}>Okuma Listesi: </Text>
                    </View>
                    <Pressable style={styles.columnType2} onPress={userPlanToRead ? removeFromPlanToRead : addToPlanToRead}>
                        <Text style={{ ...styles.tableValue, textDecorationLine: "underline" }}>{userPlanToRead ? "Çıkart" : "Ekle"}</Text>
                    </Pressable>
                </View>
                <View style={styles.row}>
                    <View style={styles.columnType2}>
                        <Text style={styles.tableKey}>Puan</Text>
                    </View>
                    <View style={styles.columnType1}>
                        <Text style={styles.tableValue}>{readRecords.length === 0 ? "Puan yok" : (readRecords.map(a => a.rating).reduce((a, b) => a + b, 0) / readRecords.length).toFixed(1)}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={{ ...styles.columnType1, height: "100%" }}>
                        <Text style={styles.tableKey}>Benim Puanım:</Text>
                    </View>
                    <View style={{ ...styles.columnType2, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Picker
                            style={{ backgroundColor: "white", width: "55%" }}
                            selectedValue={"" + selectedRating}
                            mode='dropdown'
                            onValueChange={(itemValue, _itemIndex) => {
                                addToReadBooks(itemValue);
                            }
                            }>
                            {[...Array(10).keys()].map((number, index) => {
                                return (
                                    <Picker.Item style={{}} key={index} label={"" + (number + 1)} value={"" + (number + 1)} />
                                )
                            })}
                        </Picker>
                        {
                            userReadRecord && <Pressable style={{ backgroundColor: "#E6D090" }} onPress={removeFromReadBooks}>
                                <Text style={{ ...styles.tableValue, textDecorationLine: "underline" }}>{"Kaldır"}</Text>
                            </Pressable>
                        }
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.columnType2}>
                        <Text style={{ ...styles.tableKey, textAlign: "center" }}>Konu</Text>
                    </View>
                </View>
                <View style={{ height: "45%" }}>
                    <ScrollView contentContainerStyle={{ backgroundColor: "#FCE992" }}>
                        <Text style={styles.tableValue}>{book.summary}</Text>
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FCF992",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    imageContainer: {
        width: "100%",
        height: "25%"
    },
    image: {
        width: "100%",
        height: "100%"
    },
    infoContainer: {
        flexGrow: 1,
        width: "100%",
        alignItems: "center"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 15
    },
    row: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    columnType1: {
        flex: 1,
        backgroundColor: "#FCE992"
    },
    columnType2: {
        flex: 1,
        backgroundColor: "#E6D090"
    },
    tableKey: {
        textAlign: "right",
        paddingRight: 10,
        fontWeight: "bold",
        fontSize: 20
    },
    tableValue: {
        fontSize: 20,
        paddingLeft: 10
    }
});

export default Book;