import { StyleSheet, View, Text } from "react-native";

export default function animals () 
{
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
		color: "#ffffff"
	}
});
