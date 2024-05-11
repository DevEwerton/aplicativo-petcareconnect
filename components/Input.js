import React from "react";
import { StyleSheet, TextInput, Text, View } from "react-native";
import { COLORS, SIZES } from "../constants";

export default function Input (props)
{
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput 
                style={styles.input}
                {...props}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minWidth: 200,
        marginHorizontal: 10,
    },
    input: {
        borderWidth: 2,
        borderColor: COLORS.primary,
        width: "100%",
        minHeight: 60,
        marginBottom: 20,
        paddingLeft: 10,
        fontSize: SIZES.subtitle
    },
    label: {
        color: COLORS.darkOne,
        fontWeight: "900",
        textAlign: "left",
        marginBottom: 10,
        fontSize: SIZES.subtitle
    }
})