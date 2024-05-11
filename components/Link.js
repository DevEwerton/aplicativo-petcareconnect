import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { COLORS } from "../constants";

export default function Link (props)
{
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={props.onPress}
        >
            <Text style={styles.label}>{props.label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        minWidth: 200,
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        verticalAlign: "middle",
        margin: 10
    },
    label: {
        color: COLORS.primary,
        fontSize: 24,
        textTransform: "lowercase",
        textAlign: "center",
        fontWeight: '300'
    }
})