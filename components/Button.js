import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { COLORS } from "../constants";

export default function Button (props)
{
    return (
        <TouchableOpacity
            style={[styles.button, (props.style && props.style)]}
            onPress={props.onPress}
        >
            <Text style={[styles.label, (props.styleLabel && props.styleLabel)]}>{props.label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        minHeight: 60,
        minWidth: 60,
        borderWidth: 2,
        padding: 4,
        borderColor: COLORS.primary,
        backgroundColor: COLORS.primary,
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        verticalAlign: "middle",
        margin: 10
    },
    label: {
        color: COLORS.darkOne,
        fontSize: 24,
        textTransform: "lowercase",
        textAlign: "center",
        fontWeight: '600'
    }
})