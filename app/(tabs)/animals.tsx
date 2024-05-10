import { StyleSheet, View, Text } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function animals (props: any) 
{
	const router = useRouter();
	
	useEffect(() => 
	{
		checkingUserLogged();
		
	}, [props]);

	async function checkingUserLogged ()
	{
		const value = await AsyncStorage.getItem("user-logged");		
		if (value !== null && value === "false") { router.push({ pathname: "/auth", params: { logout: "false" } }); }
	}

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Animals View</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#ffffff",
		flex: 1,
		display: "flex",
		justifyContent: "center",
		alignContent: "center",
		verticalAlign: "middle",
		alignItems: "center",
	},
	text: {
		fontSize: 24,
		color: "#000000"
	}
});
