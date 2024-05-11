import React from "react";
import { StyleSheet, View } from "react-native";
import { COLORS, HEIGHT_HEADER } from "../constants";
import { Ionicons } from '@expo/vector-icons';

export default function Header (props)
{
    return (
        <View style={styles.container}>
            <View style={styles.line}>
                <Ionicons name="menu" size={28} color="black" />
                <Ionicons name="notifications" size={28} color="black" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: HEIGHT_HEADER,
        width: "100%",
        backgroundColor: "gray",
        position: "absolute",
        top: 0,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        verticalAlign: "middle",
        backgroundColor: COLORS.primary,
    },
    line: {
        flexDirection: "row",
        width: "100%",
        padding: 20,
        display: "flex",
        justifyContent: "space-between"
    },
})