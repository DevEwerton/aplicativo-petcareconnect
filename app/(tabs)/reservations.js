import { StyleSheet, View, Text } from "react-native";
import { useEffect } from "react";
import { COLORS, HEIGHT_HEADER } from "../../constants";
import Header from "../../components/Header";

export default function reservations (props)
{
	useEffect(() => 
	{
		
	}, [props]);

	return (
		<View style={styles.container}>
			<Header />
			<View style={styles.body}>
				<Text style={styles.title}>Reservas</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.lightTwo,
		flex: 1,
		position: "relative",
		paddingTop: HEIGHT_HEADER
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
