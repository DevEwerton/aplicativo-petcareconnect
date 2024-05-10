import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Fragment, useEffect, useState } from "react";
import { useRouter, useLocalSearchParams, useNavigation, Stack } from "expo-router";

export default function auth (props) 
{
	const router = useRouter();
	const navigation = useNavigation();
	const { logout } = useLocalSearchParams();

	useEffect(() => 
	{
		navigation.addListener('beforeRemove', (e) => {
            console.log('onBack pressioned on Auth view...');
            e.preventDefault();
        });

		console.log("logout on auth view: ", logout);

	}, [props]);

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Auth View (for logout)</Text>
			<Text
				onPress={() => {
					router.push({ pathname: "/", params: { logout: "true", id: 444, other: "other" } });
				}}
			>ENTRAR</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#ffffff",
		display: "flex",
		height: "100%",
		justifyContent: "center",
		alignContent: "center",
		verticalAlign: "middle",
		alignItems: "center",
		borderColor: "red",
		borderWidth: 5
	},
	text: {
		fontSize: 24,
		color: "#ff0000",

	}
});
