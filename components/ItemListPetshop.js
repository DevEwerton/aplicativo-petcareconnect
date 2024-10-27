import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from "../constants";
import Button from "./Button";

export function ItemListPetshop (props)
{
    const [showOptions, setShowOptions] = useState(false);

    return (
            <View style={styles.container}>
                <View style={styles.colOne}>
                    <MaterialIcons name="pets" style={styles.icon}/>
                </View>
                <View style={styles.colTwo}>
                    <Text style={styles.title}>{props.name}</Text>
                    <Text style={styles.subtitle}>{props.address}</Text>
                    <Text style={styles.subtitle}>Telefone: {props.phone}</Text>
                    <Text style={styles.subtitle}>Serviços oferecidos:</Text>
                    {props.statusService1 === "true" && <Text style={styles.subtitle}>Banho & Tosa:</Text>}
                    {props.statusService1 === "true" && <Text style={styles.subtitle}>{props.intervalPriceService1}</Text>}
                    {props.statusService2 === "true" && <Text style={styles.subtitle}>Médico Veterinário:</Text>}
                    {props.statusService2 === "true" && <Text style={styles.subtitle}>{props.intervalPriceService2}</Text>}
                    <Text style={styles.subtitle}>Horário de funcionamento: {props.intervalWorks}</Text>
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
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: 220,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        backgroundColor: COLORS.lightOne,
        borderRadius: 10,
        marginVertical: 5,
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