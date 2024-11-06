import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, SIZES } from "../constants";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Button from "./Button";

export default function ItemListReservation (props)
{
    const [showOptions, setShowOptions] = useState(false);

    return (
            <View style={styles.container}>
                <View style={styles.colOne}>
                    <MaterialCommunityIcons name={props.typeAnimal.toLowerCase()} style={styles.icon}/>
                </View>
                <View style={styles.colTwo}>
                    <Text style={styles.title}>{props.nameAnimal}</Text>
                    <Text></Text>
                    <Text style={styles.subtitle}>Para: {props.when}</Text>
                    <Text style={styles.subtitle}>Onde: {props.namePetshop}</Text>
                    <Text style={styles.subtitle}>Cliente: {props.nameOwner}</Text>
                    <Text style={styles.subtitle}>Telefone do Cliente: {props.phoneOwner}</Text>
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
                            {
                                props.typeUser === "PET_02" &&   
                                <Button
                                    label="alterar"
                                    style={styles.buttonOption}
                                    styleLabel={styles.labelButton}
                                    onPress={() => {
                                        props.onEditPetshop(props);
                                        setShowOptions(false);
                                    }}
                                />
                            }
                            {
                                props.typeUser === "PET_01" &&
                                <Button
                                    label="excluir"
                                    style={styles.buttonOption}
                                    styleLabel={styles.labelButton}
                                    onPress={() => {
                                        props.onRemoveReservation(props);
                                        setShowOptions(false);
                                    }}
                                />
                            }
                        </View>
                    }
                </View>
                {props.status === 2 && <View style={styles.filter}></View>}
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: 240,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        backgroundColor: COLORS.lightOne,
        borderRadius: 10,
        marginVertical: 5,
        shadowColor: "#000",
        shadowOffset: { width: 5, height: 10 },
        shadowOpacity: 0.8,
        shadowRadius: 10,  
        elevation: 2,
        position: "relative"
    },
    filter: {
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        backgroundColor: "#28a745",
        opacity: 0.3,
        borderRadius: 10,
    },
    colOne: {
        width: "40%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        verticalAlign: "middle",
        textAlign: "center"
    },
    colTwo: {
        width: "60%",
        display: "flex",
        justifyContent: "center",
        position: "relative"
    },
    services: {
        height: 40
    },
    icon: {
        fontSize: 100,
        color: COLORS.darkTwo,
    },
    title: {
        fontSize: SIZES.title,
        color: COLORS.darkTwo,
        fontWeight: "600"
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