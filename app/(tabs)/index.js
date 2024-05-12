import { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import Header from "../../components/Header";
import { COLORS, HEIGHT_HEADER } from "../../constants";
import Button from "../../components/Button";
import { ItemListPetshop } from "../../components/ItemListPetshop";

const PETSHOPS = [
	{
		id: 1,
		name: "Cãopeão 1",
		address: "Rua da oliveiras, 45, JD América",
		phone: "(11) 2334-4455"
	},
	{
		id: 2,
		name: "Cão e Gato 2",
		address: "Rua da oliveiras, 45, JD América",
		phone: "(11) 2334-4455"
	},
]

export default function Search (props)
{
	const router = useRouter();	const navigation = useNavigation();
	const [petshops, setPetshops] = useState(PETSHOPS)
	const { name, address, phone, action } = useLocalSearchParams();

	useEffect(() => 
	{
		navigation.addListener('beforeRemove', (e) => {
			console.log('onBack pressioned on Auth view...');
			e.preventDefault();
		});

		console.log("name: ", name);
		console.log("address: ", address);
		console.log("phone: ", phone);
		console.log("action: ", action);
		
	}, [props]);

	async function onEditPetshop (props)
	{
		console.log("onEditPetshop: ", props);
	}

	async function onRemovePetshop (props)
	{
		console.log("remove: ", props);
	}

	return (
		<View style={styles.container}>
			<Header />
			<View style={styles.body}>
				<Text style={styles.title}>Petshops</Text>
				<Button
					style={styles.button}
					label="+"
					onPress={() => {
						router.push({ pathname: "/create_petshop", params: { id: "123456" } });
					}}
				/>
				<ScrollView
					style={styles.scrollView}
					contentContainerStyle={{alignItems: "center"}}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
				>
					{
						petshops.map(p => {
							return (
								<ItemListPetshop
									key={p.id}
									{...p}
									onEditPetshop={onEditPetshop}
									onRemovePetshop={onRemovePetshop}
								/>
							)
						})
					}					
				</ScrollView>
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
		padding: 20,
		paddingTop: 40,
		position: "relative",
		height: "100%",
		zIndex: 50,
	},
	title: {
		fontSize: 24,
		textAlign: "center",
		color: COLORS.darkOne,
		marginBottom: 20,
	},
	button: {
		width: 60,
		height: 60,
		position: "absolute",
		top: 0,
		right: 0,
		borderRadius: 30,
	},
	scrollView: {
        paddingTop: 30,
        width: "100%",
        height: "100%",
        position: "relative",
    },
});
