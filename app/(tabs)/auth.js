import { StyleSheet, View, Text, ImageBackground, Dimensions, Alert } from "react-native";
import { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams, useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, HEIGHT_HEADER, MODE_CREATE_VIEW, MODE_LOGIN_VIEW, SIZES, VERSION } from "../../constants";
import Button from "../../components/Button";
import Link from "../../components/Link";
import Input from "../../components/Input";

import brand from "../../assets/images/icon.png";

const WINDOW_WIDHT = Dimensions.get('window').width;

export default function auth (props)
{
	const router = useRouter();
	const navigation = useNavigation();
	const { logout } = useLocalSearchParams();
	const [mode, setMode] = useState(MODE_LOGIN_VIEW)
	const [name, setName] = useState("");
	const [mail, setMail] = useState("");
	const [password, setPassword] = useState("");

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
		await AsyncStorage.setItem("user-logged", "true");
		router.push({ pathname: "/", params: { logout: "true" } });
	}

	async function onCreate ()
	{
		let n = name;
		let m = mail;
		let p = password;

		if (n.toString().trim() === "" || m.toString().trim() === "" || p.toString().trim() === "")
		{
			Alert.alert("Opsssss, verifique os campos, e preencha corretamente!");
			return;	
		}
		
		//continue...	
		console.log("n: ", n);
		console.log("m: ", m);
		console.log("p: ", p);

		Alert.alert("Obaaaaaa");

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
		flex: 1,
		display: "flex",
		justifyContent: "center",
		textAlign: "center",
		verticalAlign: "middle",
		position: "relative",
		paddingTop: HEIGHT_HEADER,
		padding: 40,
	},
	line: {
		width: "100%",
		textAlign: "center",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		verticalAlign: "middle"
	},
	brand: {
        width: 120,
        height: 120,
        marginBottom: 30,
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
		bottom: 20,
		textAlign: "center",
	}
});
