import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { COLORS, HEIGHT_HEADER } from "../../constants";
import { useRouter } from "expo-router";

import Input from "../../components/Input";
import Header from "../../components/Header";
import Button from "../../components/Button";

export default function Search (props)
{
	const router = useRouter();
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");

	useEffect(() => 
	{
		
	}, [props]);

	async function onCreate ()
	{
		if (name.toString().trim() === "" || address.toString().trim() === "" || phone.toString().trim() === "")
		{ 
			Alert.alert("Opsssss, preencha os campos corretamente!"); 
			return;
		}

		router.push({ pathname: "/", params: { name, address, phone, action: "CREATE" } });

		setName("");
		setAddress("");
		setPhone("");
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
					onPress={onCreate}
					label="cadastrar"
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
