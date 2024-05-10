import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Fragment, useEffect, useState } from "react";
import { useRouter, useLocalSearchParams, useNavigation } from "expo-router";

export default function auth (props) 
{
	const router = useRouter();
	const { logout } = useLocalSearchParams();
	const [logged, setLogged] = useState(false);
	const navigation = useNavigation();

	useEffect(() => 
	{
		navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            console.log('onBack pressioned on Auth view...');
        });

		if (logout) 
		{
			console.log("logout: ", logout);
			console.log("props: ", props);
			if (logged) { router.push({pathname: "/reservations", params: {}}); }
		}

	}, [props]);

	return (
		<View style={{...styles.container, height: (logged) ? "0%" : "100%"}}>
			<Text style={styles.text}>Auth View (for logout)</Text>
			<TouchableOpacity
				style={styles.button}
				onPress={() => setLogged(true)}
			>
				<Text style={styles.labelButton}>ENTRAR</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#ffffff",
		display: "flex",
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
