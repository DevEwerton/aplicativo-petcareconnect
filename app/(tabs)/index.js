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
];

export default function Search (props)
{
	const router = useRouter();	
	const navigation = useNavigation();
	const [petshops, setPetshops] = useState([])
	const { 
		id,
		idUser,
		nameUser,
		typeUser,
		name,
		address,
		phone,
		intervalWorks,
		documentCompany,
		statusService1,
		intervalPriceService1,
		statusService2,
		intervalPriceService2,
		action
	} = useLocalSearchParams();

	useEffect(() => 
	{
		navigation.addListener('beforeRemove', (e) => {
			console.log('onBack pressioned on index view...');
			e.preventDefault();
		});

		console.log("idUser: ", idUser);
		console.log("nameUser: ", nameUser);
		console.log("typeUser: ", typeUser);
		console.log("name: ", name);
		// console.log("address: ", address);
		// console.log("phone: ", phone);
		// console.log("intervalWorks: ", intervalWorks);
		// console.log("documentCompany: ", documentCompany);
		// console.log("statusService1: ", statusService1);
		// console.log("intervalPriceService1: ", intervalPriceService1);
		// console.log("statusService2: ", statusService2);
		// console.log("intervalPriceService2: ", intervalPriceService2);
		console.log("action: ", action);

		if (action === "CREATE") { onCreatePetshop(name, address, phone, intervalWorks, documentCompany, statusService1, intervalPriceService1, statusService2, intervalPriceService2); }
		if (action === "UPDATED") { onUpdatePetshop(name, address, phone); }

		getAllPetshops();

	}, [props]);

	async function getAllPetshops ()
	{
		console.log("getAllPetshops...");
		console.log("getting petshops by user: ", nameUser);

		let api = new API();
		let petshopsScreen = [];
		
		if (typeUser === "PET_01") //client
		{
			let response = await api.petshop().getAll("");

			if (response.code === 200)
			{
				let data = response.data;
				
				if (data)
				{
					Object.keys(data).forEach(ku => { //ku = key user
						let petshops = data[ku];

						if (petshops)
						{
							Object.keys(petshops).forEach(kp => {// kp = key petshop
								let data = petshops[kp];
								let unit = {
									id: kp,
									idOwner: ku,
									name: data.name,
									address: data.address,
									phone: data.phone,
									documentCompany: data.documentCompany,
									intervalPriceService1: data.intervalPriceService1,
									intervalPriceService2: data.intervalPriceService2,
									intervalWorks: data.intervalWorks,
									statusService1: data.statusService1,
									statusService2: data.statusService2,
								};
								petshopsScreen.push(unit);
							});
						}
					});
				}
			}
		}
		else
		{
			let response = await api.petshop().getByUser("", idUser);

			if (response.code === 200)
			{
				let data = response.data;

				if (data)
				{
					Object.keys(data).forEach(kp => {//kp = key petshop
						let petshop = data[kp];

						let unit = {
							id: kp,
							idOwner: idUser,
							name: petshop.name,
							address: petshop.address,
							phone: petshop.phone,
							documentCompany: petshop.documentCompany,
							intervalPriceService1: petshop.intervalPriceService1,
							intervalPriceService2: petshop.intervalPriceService2,
							intervalWorks: petshop.intervalWorks,
							statusService1: petshop.statusService1,
							statusService2: petshop.statusService2,
						};
						petshopsScreen.push(unit);
					});
				}
			}
		}

		setPetshops(petshopsScreen);
	}

	async function onEditPetshop (props)
	{
		console.log("onEditPetshop...");

		let {id, name, address, phone} = props;
		router.push({ pathname: "/create_petshop", params: { 
				mode: "UPDATE",
				idParam: id,
				nameParam: name,
				addressParam: address,
				phoneParam: phone 
			}
		});
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

	async function onCreatePetshop (name, address, phone, intervalWorks, documentCompany, statusService1, intervalPriceService1, statusService2, intervalPriceService2)
	{
		if (name !== undefined && address !== undefined && phone !== undefined)
		{
			let api = new API();
			let data = {
				name,
				address,
				phone,
				intervalWorks,
				documentCompany,
				statusService1,
				intervalPriceService1,
				statusService2,
				intervalPriceService2
			};
			await api.petshop().post("", idUser, data);
			getAllPetshops();
		}
	}

	return (
		<View style={styles.container}>
			<Header />
			<View style={styles.body}>
				<Text style={styles.title}>Petshops</Text>
				{
					typeUser === "PET_02" &&
					<Button
						style={styles.button}
						label="+"
						onPress={() => {
							router.push({ pathname: "/create_petshop", params: { mode: "CREATE", idUser } });
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
									options={(p.idOwner === idUser)}
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
