import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, SIZES } from "../constants";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { TouchableWithoutFeedback } from "react-native";

export default function Check (props)
{
    return (
        <TouchableWithoutFeedback
            onPress={() => props.onToggle()}
        >
            <View style={styles.container}>
                <View style={styles.icon}>
                    {props.checked && <FontAwesome5 name="check" size={15} color={COLORS.primary} />}
                </View>
                <Text style={styles.label}>{props.label}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        minWidth: 200,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        verticalAlign: "middle",
        textAlign: "center",
        marginBottom: 10
    },
    icon: {
        borderWidth: 2,
        borderColor: COLORS.primary,
        width: 30,
        height: 30,
        borderRadius: 16,
        fontSize: SIZES.subtitle,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        verticalAlign: "middle",
    },
    label: {
        color: COLORS.darkOne,
        fontWeight: "900",
        textAlign: "left",
        fontSize: 15,
        marginLeft: 10
    }
})