import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Search (props: any) 
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
		
		setInterval(() => checkingUserLogged(), 1000);
		
	}, [props, checkingUserLogged]);
	
	async function checkingUserLogged ()
	{
		const value = await AsyncStorage.getItem("user-logged");
		
		if (value !== null && value === "false") 
		{
			router.push({ pathname: "/auth", params: { logout: "false" } });
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Search View</Text>
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
