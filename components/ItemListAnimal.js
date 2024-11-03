import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, SIZES } from "../constants";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import Button from "./Button";

export default function ItemListAnimal (props)
{
    const [showOptions, setShowOptions] = useState(false);

    return (
            <View style={styles.container}>
                <View style={styles.colOne}>
                    <MaterialCommunityIcons name={props.type.toLowerCase()} style={styles.icon}/>
                    {
                        props.options &&
                        <Button
                            label="..."
                            style={styles.buttonShowOptions}
                            onPress={() => setShowOptions(!showOptions)}
                        />
                    }
                    {
                        showOptions &&
                        <View style={styles.options}>
                            <Button
                                label="alterar"
                                style={styles.buttonOption}
                                styleLabel={styles.labelButton}
                                onPress={() => {
                                    props.onEditAnimal(props);
                                    setShowOptions(false);
                                }}
                            />
                            <Button
                                label="excluir"
                                style={styles.buttonOption}
                                styleLabel={styles.labelButton}
                                onPress={() => {
                                    props.onRemoveAnimal(props);
                                    setShowOptions(false);
                                }}
                            />
                        </View>
                    }
                </View>
                <View style={styles.colTwo}>
                    <Text style={styles.title}>{props.name}</Text>
                    <Text style={styles.subtitle}>sexo: {props.sex === "MALE" ? "Macho" : "Fêmea"}</Text>
                    <Text style={styles.subtitle}>idade: {props.age}</Text>
                    <Text style={styles.subtitle}>raça: {props.breed}</Text>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: 220,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: COLORS.lightOne,
        borderRadius: 10,
        marginVertical: 5,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: { width: 5, height: 10 },
        shadowOpacity: 0.8,
        shadowRadius: 10,  
        elevation: 2
    },
    colOne: {
        width: "100%",
        display: "flex",
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        verticalAlign: "middle",
        textAlign: "center",
    },
    colTwo: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        position: "relative",
    },
    icon: {
        fontSize: 120,
        color: COLORS.darkTwo,
    },
    title: {
        fontSize: SIZES.title,
        color: COLORS.darkTwo,
        fontWeight: "600",
        textAlign: "center"
    },
    subtitle: {
        fontSize: SIZES.subtitle,
        color: COLORS.darkTwo,
        fontWeight: "400",        
    },
    buttonShowOptions: {
        position: "absolute",
        top: -20,
        right: -10,
        width: 30,
        height: 10,
        backgroundColor: "transparent",
        borderWidth: 0
    },
    options: {
        position: "absolute",
        right: 55,
        top: 5,
        width: 140,
        display: "flex",
        justifyContent: "center",
        minHeight: 100,
        backgroundColor: COLORS.lightTwo,
        borderRadius: 5,
    },
    buttonOption: {
        minHeight: 30,
        margin: 5,
        padding: 0
    },
    labelButton: {
        fontSize: SIZES.description
    }
})