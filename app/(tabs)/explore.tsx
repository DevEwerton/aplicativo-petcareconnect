import { StyleSheet, View, Text } from "react-native";

export default function TabTwoScreen() 
{
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Expore View</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "green",
		flex: 1,
		display: "flex",
		justifyContent: "center",
		alignContent: "center",
		verticalAlign: "middle",
		alignItems: "center",
	},
	text: {
		fontSize: 24,
		color: "white"
	}
});
