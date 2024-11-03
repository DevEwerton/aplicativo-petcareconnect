import { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { COLORS, HEIGHT_HEADER } from "../../constants";
import Header from "../../components/Header";
import ItemListReservation from "../../components/ItemListReservation";

var RESERVATIONS = [
	{
		id: 1,
		nameOwner: "Ewerton",
		nameAnimal: "Milu",
		phone: "11 95999-8098",
		type: "DOG",
		when: 1733238000000,
		status: 1, //1 for scheduled, 2 for finished
	},
	{
		id: 2,
		nameOwner: "Maria",
		nameAnimal: "Patty",
		phone: "11 95999-8098",
		type: "CAT",
		when: 1733238000000,
		status: 2, //1 for scheduled, 2 for finished
	},
]

export default function reservations (props)
{
	const [reservations, setReservations] = useState(RESERVATIONS);

	useEffect(() => 
	{
		
	}, [props]);

	async function onEditReservation ()
	{

	}

	async function onConfirmRemoveReservation ()
	{

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
	scrollView: {
        paddingTop: 30,
        width: "100%",
        height: "100%",
        position: "relative",
    },
});
