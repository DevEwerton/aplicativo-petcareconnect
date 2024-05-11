import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import Header from "../../components/Header";
import { COLORS, HEIGHT_HEADER } from "../../constants";

export default function Search (props)
{
	useEffect(() => 
	{
		
	}, [props]);

	return (
		<View style={styles.container}>
			<Header />
			<View style={styles.body}>
				<Text style={styles.title}>Cadatrar Petshop</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.lightOne,
		flex: 1,
		position: "relative",
		paddingTop: HEIGHT_HEADER
	},
	body: {
		flex: 1,
		padding: 40,
	},
	title: {
		fontSize: 24,
		textAlign: "center",
		color: COLORS.darkOne
	}
});
