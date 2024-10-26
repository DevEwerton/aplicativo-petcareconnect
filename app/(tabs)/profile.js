import { StyleSheet, View, Text } from "react-native";
import { useEffect, useState } from "react";
import { COLORS, HEIGHT_HEADER } from "../../constants";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import Header from "../../components/Header";
import Button from "../../components/Button";

var control = 0;

export default function home (props)
{	
	const router = useRouter();	
	const [user, setUser] = useState(null);
	const optionsTypeUser = [{id: 1, label: "Cliente", value: "PET_01"}, {id: 2, label: "Dono(a)", value: "PET_02"}];

	useEffect(() => 
	{
		setInterval(checkingUserLogged, 1000);

	}, [props]);


	async function onLogout  ()
	{
		router.push({ pathname: "/auth", params: { logout: "true" } });	
	}

	async function checkingUserLogged ()
	{
		control++;

		let user = await AsyncStorage.getItem("user");
		user = JSON.parse(user);
		if (user) { setUser(user); }

		console.log(control + " user (profile view): ", user?.name);
	}

	return (
		<View style={styles.container}>
			<Header />
			<View style={styles.body}>
				<Text style={styles.title}>Perfil</Text>
				<FontAwesome5 name="user" style={styles.avatar} color="black" />
				{
					user &&
					<View>
						<Text style={styles.title}>{optionsTypeUser.filter(t => t.value === user.type)[0].label}</Text>
						<Text style={styles.title}>{user.name}</Text>
						<Text style={styles.title}>{user.mail}</Text>
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
		textAlign: "center",
		display: "flex",
		verticalAlign: "middle"
	},
	title: {
		fontSize: 24,
		textAlign: "center",
		color: COLORS.darkOne
	},
	avatar: {
		width: 120,
		height: 120,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		verticalAlign: "middle",
		textAlign: "center",
		fontSize: 70,
		marginTop: 20,
		marginBottom: 20,
		marginLeft: "auto",
		marginRight: "auto",
		borderWidth: 1,
		borderColor: "black",
		padding: 20,
		borderRadius: 60
	}
});
