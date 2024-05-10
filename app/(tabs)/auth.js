import { StyleSheet, View, Text } from "react-native";
import { useEffect } from "react";
import { useRouter, useLocalSearchParams, useNavigation } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function auth (props)
{
	const router = useRouter();
	const navigation = useNavigation();
	const { logout } = useLocalSearchParams();

	useEffect(() => 
	{
		navigation.addListener('beforeRemove', (e) => {
            console.log('onBack pressioned on auth view...');
            e.preventDefault();
        });

		if (logout) { onLogout(); }

	}, [props]);

	async function onLogout ()
	{
		console.log("setting logout...");
		await AsyncStorage.setItem("user-logged", "false");
	}

	async function onLogin ()
	{
		console.log("setting login...");
		await AsyncStorage.setItem("user-logged", "true");
		router.push({ pathname: "/", params: { logout: "true" } });
	}

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Auth View (for logout)</Text>
			<Text onPress={() => onLogin()}>ENTRAR</Text>
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
