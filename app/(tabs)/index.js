import { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import Header from "../../components/Header";
import { COLORS, HEIGHT_HEADER } from "../../constants";
import Button from "../../components/Button";
import { ItemListPetshop } from "../../components/ItemListPetshop";

const API = require("../../api");

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
	const [petshops, setPetshops] = useState([])
	const { id, name, address, phone, action } = useLocalSearchParams();

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

		if (action === "CREATE") { onCreatePetshop(name, address, phone); }
		if (action === "UPDATED") { onUpdatePetshop(id, name, address, phone); }
		
		getAllPetshops();
		
	}, [props]);

	async function getAllPetshops ()
	{
		let api = new API();
		let response = await api.petshop().getAll("");
		let petshops = [];

		if (response.code === 200)
		{
			let data = response.data;	
			
			Object.keys(data).forEach(k => {
				let petshop = data[k];

				petshops.push(
					{
						id: k,
						name: petshop.name,
						address: petshop.address,
						phone: petshop.phone
					}
				);
			});
		}

		console.log("getAllPetshops response: ", response);
		setPetshops(petshops);
	}

	async function onEditPetshop (props)
	{
		let {id, name, address, phone} = props;
		router.push({ pathname: "/create_petshop", params: { mode: "UPDATE", idParam: id, nameParam: name, addressParam: address, phoneParam: phone } });
		console.log("onEditPetshop: ", id);
		console.log("onEditPetshop: ", name);
	}

	async function onRemovePetshop (props)
	{
		console.log("remove: ", props);
	}

	async function onUpdatePetshop (id, name, address, phone)
	{
		console.log("onUpdatePetshop...");
		let api = new API();
		let response = await api.petshop().update("", id, {name, address, phone});

		if (response.code === 200) { getAllPetshops(); }
	}

	async function onCreatePetshop (name, address, phone)
	{
		if (name !== undefined && address !== undefined && phone !== undefined)
		{
			let api = new API();
			await api.petshop().post("", {name, address, phone});
			getAllPetshops();
		}
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
						router.push({ pathname: "/create_petshop", params: { mode: "CREATE" } });
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
