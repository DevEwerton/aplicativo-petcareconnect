import { StyleSheet, View, Text } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { COLORS, HEIGHT_HEADER } from "../../constants";
import Header from "../../components/Header";
import Button from "../../components/Button";

export default function home (props)
{	
	const router = useRouter();

	useEffect(() => 
	{
		
	}, [props]);

	function onLogout  ()
	{
		router.push({ pathname: "/auth", params: { logout: "true" } });		
	}

	return (
		<View style={styles.container}>
			<Header />
			<View style={styles.body}>
				<Text style={styles.title}>Início</Text>
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
