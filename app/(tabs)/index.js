import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import Header from "../../components/Header";
import { COLORS, HEIGHT_HEADER } from "../../constants";
import Button from "../../components/Button";

export default function Search (props)
{
	const router = useRouter();	const navigation = useNavigation();

	useEffect(() => 
	{
		navigation.addListener('beforeRemove', (e) => {
			console.log('onBack pressioned on Auth view...');
			e.preventDefault();
		});
		
	}, [props]);

	return (
		<View style={styles.container}>
			<Header />
			<View style={styles.body}>
				<Text style={styles.title}>Petshops</Text>
				<Button
					label="+"
					onPress={() => {
						router.push({ pathname: "/create_petshop", params: { id: "123456" } });
					}}
				/>
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
