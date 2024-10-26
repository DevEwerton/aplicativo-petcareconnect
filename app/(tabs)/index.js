import { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, Alert } from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { COLORS, HEIGHT_HEADER } from "../../constants";
import { ItemListPetshop } from "../../components/ItemListPetshop";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "../../components/Header";
import Button from "../../components/Button";

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
	const router = useRouter();	
	const navigation = useNavigation();
	const [petshops, setPetshops] = useState([])
	const { id, name, address, phone, action } = useLocalSearchParams();
	const [user, setUser] = useState(null);

	useEffect(() => 
	{
		navigation.addListener('beforeRemove', (e) => {
			console.log('onBack pressioned on index view...');
			e.preventDefault();
		});

		console.log("name: ", name);
		console.log("address: ", address);
		console.log("phone: ", phone);
		console.log("action: ", action);

		if (action === "CREATE") { onCreatePetshop(name, address, phone); }
		if (action === "UPDATED") { onUpdatePetshop(id, name, address, phone); }
		
		getAllPetshops();
		checkingUserLogged();
		
	}, [props]);

	async function checkingUserLogged ()
	{
		let user = await AsyncStorage.getItem("user");
		user = JSON.parse(user);
		setUser(user);

		console.log("user (index view): ");
	}

	async function getAllPetshops ()
	{
		console.log("getAllPetshops...");

		let api = new API();
		let response = await api.petshop().getAll("", user.id_user);
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

		setPetshops(petshops);
	}

	async function onEditPetshop (props)
	{
		console.log("onEditPetshop...");

		let {id, name, address, phone} = props;
		router.push({ pathname: "/create_petshop", params: { mode: "UPDATE", idParam: id, nameParam: name, addressParam: address, phoneParam: phone } });
	}

	async function onRemovePetshop (props)
	{
		console.log("onRemovePetshop...");

		let api = new API();
		let response = await api.petshop().del("", props.id);

		if (response.code !== 200)
		{
			Alert.alert(response.message);
		}
		else
		{
			getAllPetshops();
		}
	}

	async function onConfirmRemovePetshop (props)
	{
		console.log("onConfirmRemovePetshop... ");

		Alert.alert(
			'Confirmação',
			`Você realmente deseja excluir '${props.name}?'`,
			[
				{
					text: 'Cancelar',
					onPress: () => {},
					style: 'cancel',
				},
				{
					text: 'Excluir',
					onPress: () => onRemovePetshop(props),
					style: 'cancel',
				},
			],
		  );
	}

	async function onUpdatePetshop (id, name, address, phone)
	{
		console.log("onUpdatePetshop...");
		
		let api = new API();
		let response = await api.petshop().update("", id, user.id_user, {name, address, phone});

		if (response.code === 200) { getAllPetshops(); }
	}

	async function onCreatePetshop (name, address, phone)
	{
		if (name !== undefined && address !== undefined && phone !== undefined)
		{
			let api = new API();
			await api.petshop().post("", user.id_user, {name, address, phone});
			getAllPetshops();
		}
	}

	return (
		<View style={styles.container}>
			<Header />
			<View style={styles.body}>
				<Text style={styles.title}>Petshops</Text>
				{
					user?.type === "PET_02" &&
					<Button
						style={styles.button}
						label="+"
						onPress={() => {
							router.push({ pathname: "/create_petshop", params: { mode: "CREATE" } });
						}}
					/>
				}
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
									onRemovePetshop={onConfirmRemovePetshop}
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
