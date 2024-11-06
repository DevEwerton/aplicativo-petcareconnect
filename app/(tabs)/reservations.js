import { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, Alert } from "react-native";
import { COLORS, HEIGHT_HEADER } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "../../components/Header";
import ItemListReservation from "../../components/ItemListReservation";

const API = require("../../api");
var RESERVATIONS = [
	{
		id: 1,
		when: 1733238000000,
		status: 1, //1 for scheduled, 2 for finished
		nameOwner: "Ewerton",
		phoneOwner: "11 95999-8098",
		nameAnimal: "Milu",
		typeAnimal: "DOG",
		namePetshop: "Cãopeão Unidde 1"
	},
	{
		id: 2,
		when: 1733238000000,
		status: 2, //1 for scheduled, 2 for finished
		nameOwner: "Maria",
		phoneOwner: "11 95999-8098",
		nameAnimal: "Patty",
		typeAnimal: "CAT",
		namePetshop: "Cãopeão Unidde 1"
	},
]

var ID_CURRENT_USER = null;

export default function reservations (props)
{
	const [reservations, setReservations] = useState([]);
	const [user, setUser] = useState(null);

	useEffect(() => 
	{
		setInterval(checkingUserLogged, 1000);
		getAllReservations();
		
	}, [props, user]);

	async function checkingUserLogged ()
	{
		let user = await AsyncStorage.getItem("user");
		user = JSON.parse(user);

		if (user && user.id_user !== ID_CURRENT_USER)
		{
			console.log(`(reservations view) start checkingUserLogged: ${user?.id_user}, nameUser: ${user?.name}`);

			ID_CURRENT_USER = user.id_user;
			setUser(user);
		}
	}

	function formatedDateStampToDateBRA (stamp)
	{
		let d = new Date(stamp);
		let month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();    
		day = ("0" + day).slice(-2);
		month = ("0" + month).slice(-2);

		return `${day}/${month}/${year}`;
	}

	async function getAllReservations ()
	{
		console.log(`(reservations view) getAllReservations idUser: ${user?.id_user}, nameUser: ${user?.name}, typeUser: ${user?.type}`);

		let api = new API();
		let reservationsScreen = [];
		
		if (!user?.id_user) { return; }

		let response = await api.scheduled().getAll("");

		if (response.code === 200)
		{
			let data = response.data;

			if (user?.type === "PET_01")
			{
				Object.keys(data).forEach(kp => {//kp = key petshop
					let petshop = data[kp];
					
					if (petshop)
					{
						Object.keys(petshop).forEach(kr => {//kr = key reservation
							let reservation = petshop[kr];

							if (reservation.idOwner === user.id_user)
							{
								reservationsScreen.push(
									{
										id: kr,
										idPetshop: kp,
										when: formatedDateStampToDateBRA(reservation.when),
										status: reservation.status, //1 for scheduled, 2 for finished
										nameOwner: reservation.nameOwner,
										phoneOwner: reservation.phoneOwner,
										nameAnimal: reservation.nameAnimal,
										typeAnimal: reservation.typeAnimal,
										namePetshop: reservation.namePetshop
									}
								);
							}
						});
					}
				});
			}
			else
			{
				let idsAllPetshopsByUser = [];
				let responsePetshops = await api.petshop().getByUser("", user?.id_user);

				if (responsePetshops.code === 200)
				{
					let data = responsePetshops.data;

					if (data)
					{
						Object.keys(data).forEach(kp => {//kp = key petshop
							idsAllPetshopsByUser.push(kp);
						});
					}
				}

				Object.keys(data).forEach(kp => {//kp = key petshop
					let petshop = data[kp];
					
					if (petshop && idsAllPetshopsByUser.includes(kp))
					{
						Object.keys(petshop).forEach(kr => {//kr = key reservation
							let reservation = petshop[kr];
							
							reservationsScreen.push(
								{
									id: kr,
									idPetshop: kp,
									when: formatedDateStampToDateBRA(reservation.when),
									status: reservation.status, //1 for scheduled, 2 for finished
									nameOwner: reservation.nameOwner,
									phoneOwner: reservation.phoneOwner,
									nameAnimal: reservation.nameAnimal,
									typeAnimal: reservation.typeAnimal,
									namePetshop: reservation.namePetshop
								}
							);
						});
					}
				});
			}
		}

		setReservations(reservationsScreen);
	}

	async function onEditReservation ()
	{

	}

	async function onRemoveReservation (props)
	{
		console.log(`(reservations view) onRemoveReservation`);

		let api = new API();
		let response = await api.scheduled().del("", props.idPetshop, props.id);

		if (response.code !== 200)
		{
			Alert.alert(response.message);
		}
		else
		{
			getAllReservations();
		}
	}

	async function onConfirmRemoveReservation (props)
	{
		console.log(`(reservations view) onConfirmRemoveReservation`);

		Alert.alert(
			'Confirmação',
			`Você realmente deseja excluir a reserva de '${props.nameAnimal} para ${props.when}?'`,
			[
				{
					text: 'Cancelar',
					onPress: () => {},
					style: 'cancel',
				},
				{
					text: 'Excluir',
					onPress: () => onRemoveReservation(props),
					style: 'cancel',
				},
			],
		);
	}

	return (
		<View style={styles.container}>
			<Header />
			<View style={styles.body}>
				<Text style={styles.title}>Reservas</Text>
				<ScrollView
					style={styles.scrollView}
					contentContainerStyle={{alignItems: "center"}}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
				>
					{
						reservations.map(p => {
							return (
								<ItemListReservation
									key={p.id}
									{...p}
									onEditReservation={onEditReservation}
									onRemoveReservation={onConfirmRemoveReservation}
									typeUser={user?.type}
									options={true}
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
		padding: 40,
	},
	title: {
		fontSize: 24,
		textAlign: "center",
		color: COLORS.darkOne
	},
	scrollView: {
        paddingTop: 30,
        width: "100%",
        height: "100%",
        position: "relative",
    },
});
