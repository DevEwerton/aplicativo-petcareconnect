import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Auth (props)
{
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Auth view</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={props.onLogin}
            >
                <Text style={styles.labelButton}>Click</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "gray",
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        verticalAlign: "middle"
    },
    text: {
        fontSize: 24,
		color: "white"
    },
    button: {
        borderWidth: 2,
        borderColor: "red",
        minWidth: 300,
        minHeight: 40,
        padding: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        verticalAlign: "middle"
    },
    labelButton: {
        color: "white",
        fontSize: 24,
        fontWeight: "600"
    }
})