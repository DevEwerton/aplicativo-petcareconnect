import React from "react";
import { StyleSheet, TextInput, Text, View } from "react-native";
import { COLORS, SIZES } from "../constants";

export default function Input (props)
{
    return (
        <View style={[styles.container]}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput 
                style={[styles.input, {...props?.styleInput}]}
                {...props}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
    },
    input: {
        width: "100%",
        borderWidth: 2,
        borderColor: COLORS.primary,
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