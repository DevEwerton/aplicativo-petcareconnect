import { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, Alert } from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { COLORS, HEIGHT_HEADER } from "../../constants";
import ItemListPetshop from "../../components/ItemListPetshop";
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

var ID_CURRENT_USER = null;

export default function Search (props)
{
	const router = useRouter();
	const [petshops, setPetshops] = useState([]);
	const [user, setUser] = useState(null);
	const {
		idOwner,
		id,
		idUser,
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
		setInterval(checkingUserLogged, 1000);
		getAllPetshops();

		if (action === "CREATE") { onCreatePetshop(name, address, phone, intervalWorks, documentCompany, statusService1, intervalPriceService1, statusService2, intervalPriceService2); }
		if (action === "UPDATED") { onUpdatePetshop(idOwner, id, name, address, phone, intervalWorks, documentCompany, statusService1, intervalPriceService1, statusService2, intervalPriceService2); }

	}, [props, user]);

	async function checkingUserLogged ()
	{
		let user = await AsyncStorage.getItem("user");
		user = JSON.parse(user);

		if (user && user.id_user !== ID_CURRENT_USER)
		{
			console.log(`(index view) start checkingUserLogged: ${user?.id_user}, nameUser: ${user?.name}`);

			ID_CURRENT_USER = user.id_user;
			setUser(user);
		}
	}

	async function getAllPetshops ()
	{
		console.log(`(index view) getAllPetshops idUser: ${user?.id_user}, nameUser: ${user?.name}`);

		let api = new API();
		let petshopsScreen = [];
		
		if (user?.type === "PET_01") //client
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
			let response = await api.petshop().getByUser("", user.id_user);

			if (response.code === 200)
			{
				let data = response.data;

				if (data)
				{
					Object.keys(data).forEach(kp => {//kp = key petshop
						let petshop = data[kp];

						let unit = {
							id: kp,
							idOwner: user.id_user,
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
		console.log(`(index view) onEditPetshop`);

		let {id,
			name,
			address,
			phone,
			documentCompany,
			idOwner,
			intervalPriceService1,
			intervalPriceService2,
			intervalWorks,
			statusService1,
			statusService2
		} = props;

		router.push({ pathname: "/create_petshop", params: { 
				mode: "UPDATE",
				idParam: id,
				nameParam: name,
				addressParam: address,
				phoneParam: phone,
				documentCompanyParam: documentCompany,
				idOwnerParam: idOwner,
				intervalPriceService1Param: intervalPriceService1,
				intervalPriceService2Param: intervalPriceService2,
				intervalWorksParam: intervalWorks,
				statusService1Param: statusService1,
				statusService2Param: statusService2,
			}
		});
	}

	async function onRemovePetshop (props)
	{
		console.log(`(index view) onRemovePetshop`);

		let api = new API();
		let response = await api.petshop().del("", props.idOwner, props.id);

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
		console.log(`(index view) onConfirmRemovePetshop`);

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

	async function onUpdatePetshop (idOwner, id, name, address, phone, intervalWorks, documentCompany, statusService1, intervalPriceService1, statusService2, intervalPriceService2)
	{
		console.log(`(index view) onUpdatePetshop`);

		let api = new API();
		let response = await api.petshop().update("", id, idOwner, {name, address, phone, intervalWorks, documentCompany, statusService1, intervalPriceService1, statusService2, intervalPriceService2});

		if (response.code === 200) { getAllPetshops(); }
	}

	async function onCreatePetshop (name, address, phone, intervalWorks, documentCompany, statusService1, intervalPriceService1, statusService2, intervalPriceService2)
	{
		console.log(`(index view) onCreatePetshop`);

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
									options={(p.idOwner === user?.id_user)}
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
