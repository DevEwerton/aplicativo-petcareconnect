import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { DatePickerInput, registerTranslation, ptBR } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../constants";

registerTranslation('pt-BR', ptBR)

export default function DateInput (props)
{
	const [inputDate, setInputDate] = React.useState(undefined)

	return (
		<SafeAreaProvider>
			<View style={styles.container}>
				<Text style={styles.label}>Data</Text>
				<DatePickerInput
					label="Data"
					value={inputDate}
					onChange={(d) => {
						setInputDate(d);
						props.onChange(d);
					}}
					inputMode="start"
					key="close"
					style={styles.input}
				/>
			</View>
		</SafeAreaProvider>
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
		marginHorizontal: 0,
		marginBottom: 20,
		paddingLeft: 0,
		fontSize: SIZES.subtitle,
		backgroundColor: "transparent",

	},
	label: {
        color: COLORS.darkOne,
        fontWeight: "900",
        textAlign: "left",
        marginBottom: 10,
        fontSize: SIZES.subtitle
    }
})