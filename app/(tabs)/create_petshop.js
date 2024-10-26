import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { COLORS, HEIGHT_HEADER } from "../../constants";
import { useLocalSearchParams, useRouter } from "expo-router";

import Input from "../../components/Input";
import Header from "../../components/Header";
import Button from "../../components/Button";

export default function CreatePetShop (props)
{
	const router = useRouter();
	const [id, setId] = useState(null);
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");
	const [modeView, setModeView] = useState("CREATE");
	const { mode, idParam, nameParam, addressParam, phoneParam } = useLocalSearchParams();

	useEffect(() => 
	{
		if (mode === "UPDATE") 
		{ 
			onEdit(idParam, nameParam, addressParam, phoneParam);
			setModeView("UPDATE");
		}
		
	}, [props]);

	async function onEdit (idParam, nameParam, addressParam, phoneParam)
	{
		console.log("onPrepareEdit...");
		
		setId(idParam);
		setName(nameParam);
		setAddress(addressParam);
		setPhone(phoneParam);
	}

	async function onSave ()
	{
		if (name.toString().trim() === "" || address.toString().trim() === "" || phone.toString().trim() === "")
		{ 
			Alert.alert("Opsssss, preencha os campos corretamente!"); 
			return;
		}

		let params = {
			name,
			address,
			phone
		};
		let action = "CREATE";

		if (modeView === "UPDATE") 
		{ 
			params.id = id;
			action = "UPDATED";
		}

		router.push({ pathname: "/", params: { ...params, action } });

		setId(null);
		setName("");
		setAddress("");
		setPhone("");
		setModeView("CREATE");
	}

	return (
		<View style={styles.container}>
			<Header />
			<View style={styles.body}>
				<Text style={styles.title}>Cadastrar Petshop</Text>
				<Input
					label="Nome"
					value={name}
					placeholder="Cãopeão"
					onChangeText={(name) => setName(name)}
				/>
				<Input
					label="Endereço"
					value={address}
					placeholder="Rua Santos Domingos, 444, JD. das Palmeiras"
					onChangeText={(address) => setAddress(address)}
				/>
				<Input
					label="Telefone"
					value={phone}
					placeholder="(11) 2222-3333"
					onChangeText={(phone) => setPhone(phone)}
				/>
				<Button
					onPress={onSave}
					label={`${modeView === "CREATE" ? "cadastrar" : "atualizar"}`}
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
	}
});
