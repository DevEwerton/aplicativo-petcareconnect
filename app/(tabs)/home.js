import { StyleSheet, View, Text } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { COLORS, HEIGHT_HEADER } from "../../constants";
import Header from "../../components/Header";
import Button from "../../components/Button";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function home (props)
{	
	const router = useRouter();
	const [user, setUser] = useState(null);
	const optionsTypeUser = [{id: 1, label: "Cliente", value: "PET_01"}, {id: 2, label: "Dono(a) de PetShop", value: "PET_02"}];

	useEffect(() => 
	{
		console.log("(home) props: ", props);

		checkingUserLogged();

	}, [props]);


	async function onLogout  ()
	{
		router.push({ pathname: "/auth", params: { logout: "true" } });	
	}

	async function checkingUserLogged ()
	{
		let user = await AsyncStorage.getItem("user");
		user = JSON.parse(user);

		setUser(user);
	}

	return (
		<View style={styles.container}>
			<Header />
			<View style={styles.body}>
				<Text style={styles.title}>Início</Text>
				{
					user &&
					<View>
						<Text style={styles.title}>Bem-vindo(a) {user.name}</Text>
						<Text style={styles.title}>você é um: {optionsTypeUser.filter(t => t.value === user.type)[0].label}</Text>
					</View>
				}
				<Button 
					onPress={onLogout}
					label="sair"
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.lightTwo,
		flex: 1,
		position: "relative",
		paddingTop: HEIGHT_HEADER,
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
