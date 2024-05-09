import { StyleSheet, View, Text } from "react-native";

export default function HomeScreen() 
{
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Index View</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "red",
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
