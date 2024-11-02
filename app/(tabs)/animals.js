import {useState} from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import { COLORS, HEIGHT_HEADER } from "../../constants";

import AsyncStorage from "@react-native-async-storage/async-storage";
import ItemListAnimal from "../../components/ItemListAnimal";
import Header from "../../components/Header";
import Button from "../../components/Button";

const ANIMALS = [
	{
		id: 1,
		name: "Paçoca",
		sex: "Macho",
		breed: "Pomerânia",
		age: "5",
		type: "dog"
	},
	{
		id: 2,
		name: "Zeus",
		sex: "Macho",
		breed: "vira-lata",
		age: "6",
		type: "cat"
	}
];

var ID_CURRENT_USER = null;

export default function animals (props)
{	
	const router = useRouter();
	const [animals, setAnimals] = useState(ANIMALS);
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

	}, [props, user]);

	async function checkingUserLogged ()
	{
		let user = await AsyncStorage.getItem("user");
		user = JSON.parse(user);

		if (user && user.id_user !== ID_CURRENT_USER)
		{
			console.log(`(animals view) start checkingUserLogged: ${user?.id_user}, nameUser: ${user?.name}`);

			ID_CURRENT_USER = user.id_user;
			setUser(user);
		}
	}

	async function onEditAnimal (props)
	{
		console.log(`(animals view) onEditAnimal`);

		// let {id,
		// 	name,
		// 	address,
		// 	phone,
		// 	documentCompany,
		// 	idOwner,
		// 	intervalPriceService1,
		// 	intervalPriceService2,
		// 	intervalWorks,
		// 	statusService1,
		// 	statusService2
		// } = props;

		// router.push({ pathname: "/create_animal", params: { 
		// 		mode: "UPDATE",
		// 		idParam: id,
		// 		nameParam: name,
		// 		addressParam: address,
		// 		phoneParam: phone,
		// 		documentCompanyParam: documentCompany,
		// 		idOwnerParam: idOwner,
		// 		intervalPriceService1Param: intervalPriceService1,
		// 		intervalPriceService2Param: intervalPriceService2,
		// 		intervalWorksParam: intervalWorks,
		// 		statusService1Param: statusService1,
		// 		statusService2Param: statusService2,
		// 	}
		// });
	}

	async function onConfirmRemoveAnimal (props)
	{
		console.log(`(animals view) onConfirmRemoveAnimal`);

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
					onPress: () => onRemoveAnimal(props),
					style: 'cancel',
				},
			],
		);
	}

	return (
		<View style={styles.container}>
			<Header />
			<View style={styles.body}>
				<Text style={styles.title}>Animais</Text>
				<Button
					style={styles.button}
					label="+"
					onPress={() => {
						router.push({ pathname: "/create_animal", params: { mode: "CREATE", idUser } });
					}}
				/>
				<ScrollView
					style={styles.scrollView}
					contentContainerStyle={{alignItems: "center"}}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
				>
					{
						animals.map(p => {
							return (
								<ItemListAnimal
									key={p.id}
									{...p}
									onEditAnimal={onEditAnimal}
									onRemoveAnimal={onConfirmRemoveAnimal}
									// options={(p.idOwner === user?.id_user)}
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
