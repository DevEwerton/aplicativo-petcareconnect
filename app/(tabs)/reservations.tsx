import { StyleSheet, View, Text } from "react-native";
import { useEffect } from "react";

export default function reservations (props: any)
{
	useEffect(() => 
	{
		
	}, [props]);

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Reservations View</Text>
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
