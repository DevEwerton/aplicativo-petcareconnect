import { StyleSheet, View, Text } from "react-native";
import { useRouter } from "expo-router";

export default function home (props) 
{
	const router = useRouter();

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Home View</Text>
			<Text
				onPress={() => {
					router.push({ pathname: "/", params: { logout: "true", id: 444, other: "other" } });
				}}
			>SAIR</Text>
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
		color: "#ff0000",

	}
});
