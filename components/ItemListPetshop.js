import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableNativeFeedback } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { COLORS, SIZES } from "../constants";
import Button from "./Button";

export default function ItemListPetshop (props)
{
    const [showOptions, setShowOptions] = useState(false);

    return (
        <TouchableNativeFeedback onPress={() => props.onOpen(props)}>
            <View style={styles.container}>
                <View style={styles.colOne}>
                    <FontAwesome name="building" style={styles.icon}/>
                </View>
                <View style={styles.colTwo}>
                    <Text style={styles.title}>{props.name}</Text>
                    <Text style={styles.subtitle}>{props.address}</Text>
                    <Text style={styles.subtitle}>Telefone: {props.phone}</Text>
                    <Text style={styles.subtitle}>Serviços oferecidos:</Text>
                    <Text style={styles.subtitle}>Horário de funcionamento: {props.intervalWorks}</Text>
                    <View style={styles.services}>
                        {props.statusService1 === "true" && <Text style={styles.subtitle}>Banho & Tosa (R$ {props.intervalPriceService1})</Text>}
                        {props.statusService2 === "true" && <Text style={styles.subtitle}>Médico Veterinário (R$ {props.intervalPriceService2})</Text>}
                    </View>
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
                                    props.onEditPetshop(props);
                                    setShowOptions(false);
                                }}
                            />
                            <Button
                                label="excluir"
                                style={styles.buttonOption}
                                styleLabel={styles.labelButton}
                                onPress={() => {
                                    props.onRemovePetshop(props);
                                    setShowOptions(false);
                                }}
                            />
                        </View>
                    }
                </View>
            </View>
        </TouchableNativeFeedback>
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
        padding: 10,
        shadowColor: "#000",
        shadowOffset: { width: 5, height: 10 },
        shadowOpacity: 0.8,
        shadowRadius: 10,  
        elevation: 2
    },
    colOne: {
        width: "30%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        verticalAlign: "middle",
        textAlign: "center"
    },
    colTwo: {
        width: "70%",
        display: "flex",
        justifyContent: "center",
        position: "relative"
    },
    services: {
        height: 40
    },
    icon: {
        fontSize: 50,
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