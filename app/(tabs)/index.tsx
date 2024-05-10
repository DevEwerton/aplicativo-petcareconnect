import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useNavigation } from "expo-router";

export default function Search (props: any)
{
	const navigation = useNavigation();

	useEffect(() => 
	{
		navigation.addListener('beforeRemove', (e) => {
			console.log('onBack pressioned on Auth view...');
			e.preventDefault();
		});
		
	}, [props]);

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Search View</Text>
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
