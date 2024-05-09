import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function Navigator (props)
{
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Navigator view</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "gray",
        flex: 1,
    },
    text: {
        fontSize: 24,
		color: "white"
    }
})