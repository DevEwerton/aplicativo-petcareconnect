import { StyleSheet, View, Text, ImageBackground, Dimensions, Alert } from "react-native";
import { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams, useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, HEIGHT_HEADER, MODE_CREATE_VIEW, MODE_LOGIN_VIEW, SIZES, VERSION } from "../../constants";
import Button from "../../components/Button";
import Link from "../../components/Link";
import Input from "../../components/Input";
import Select from "../../components/Select";

import brand from "../../assets/images/icon.png";

const API = require("../../api");

const WINDOW_WIDHT = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

export default function auth (props)
{
	const router = useRouter();
	const navigation = useNavigation();
	const { logout } = useLocalSearchParams();
	const [mode, setMode] = useState(MODE_LOGIN_VIEW)
	const [name, setName] = useState("");
	const [mail, setMail] = useState("ewerton@mail.com");
	const [password, setPassword] = useState("123456");
	const [type, setType] = useState("");
	const optionsTypeUser = [{id: 1, label: "Cliente", value: "PET_01"}, {id: 2, label: "Dono(a) de PetShop", value: "PET_02"}];

	useEffect(() => 
	{
		navigation.addListener("beforeRemove", (e) => {
            console.log("onBack pressioned on auth view...");
            e.preventDefault();
        });

		if (logout) { onLogout(); }

	}, [props]);

	async function onLogout ()
	{
		console.log("setting logout...");

		await AsyncStorage.setItem("user-logged", "false");
	}

	async function onLogin ()
	{
		console.log("setting login...");

		let api = new API();
		let response = await api.user().login(mail, password);

		if (response.code === 200)
		{
			let {user} = response;

			await AsyncStorage.setItem("user-logged", "true");
			await AsyncStorage.setItem("user", JSON.stringify(user));

			router.push({ pathname: "/", params: { logout: "true" } });	
		}
		else
		{
			Alert.alert(response.message);
		}
	}

	async function onCreate ()
	{
		let n = name;
		let m = mail;
		let p = password;
		let t = type;
		
		if (n.toString().trim() === "" || m.toString().trim() === "" || p.toString().trim() === "")
		{
			Alert.alert("Opsssss, verifique os campos, e preencha corretamente!");
			return;	
		}
		
		let api = new API();
		let response = await api.user().create({mail: m, password: p, name: n, type: t});

		if (response.code === 200)
		{
			setMode(MODE_LOGIN_VIEW);
		}
		else
		{
			Alert.alert(response.message);
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.line}>
				<ImageBackground
					source={brand}
					style={styles.brand}
				/>
			</View>
			{
				mode === MODE_LOGIN_VIEW &&
				<View>
					<Text style={styles.title}>LOGIN</Text>
					<Input
						label="E-mail"
						placeholder="maria@mail.com"
						value={mail}
						onChangeText={(mail) => setMail(mail)}
					/>
					<Input
						label="Senha"
						value={password}
						placeholder="******"
						secureTextEntry={true}
						onChangeText={(password) => setPassword(password)}
					/>
					<Button
						onPress={onLogin}
						label="entrar"
					/>
					<Link
						onPress={() => setMode(MODE_CREATE_VIEW)}
						label="criar conta"
					/>
				</View>
			}
			{
				mode === MODE_CREATE_VIEW &&
				<View>
					<Text style={styles.title}>CADASTRO DE USUÁRIO</Text>
					<Input
						label="Nome"
						placeholder="Maria Dias"
						value={name}
						onChangeText={(name) => setName(name)}
					/>
					<Input
						label="E-mail"
						placeholder="maria@mail.com"
						value={mail}
						onChangeText={(mail) => setMail(mail)}
					/>
					<Input
						label="Senha"
						value={password}
						placeholder="******"
						secureTextEntry={true}
						onChangeText={(password) => setPassword(password)}
					/>
					 <Select
    					label="Tipo de Usuário"
    					value={type}
						options={optionsTypeUser}
   						onValueChange={(type) => setType(type)}
					/>
					<Button
						onPress={onCreate}
						label="cadastrar"
					/>
					<Link
						onPress={() => setMode(MODE_LOGIN_VIEW)}
						label="início"
					/>
				</View>
			}
			<Text style={styles.version}>Versão {VERSION}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.lightOne,
        flexGrow: 1,
        padding: 20,
        justifyContent: "center",
	},
	line: {
		width: "100%",
		textAlign: "center",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		verticalAlign: "top"
	},
	brand: {
        width: 120,
        height: 120,
        marginBottom: 20,
    },
	title: {
		fontSize: SIZES.title,
		textAlign: "center",
		color: COLORS.primary,
		marginBottom: 20
	},
	version: {
		color: COLORS.primary,
		position: "absolute",
		width: WINDOW_WIDHT,
		bottom: 15,
		textAlign: "center",
	}
});
