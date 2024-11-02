import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert, ScrollView } from "react-native";
import { COLORS, HEIGHT_HEADER, SIZES } from "../../constants";
import { useLocalSearchParams, useRouter } from "expo-router";

import Input from "../../components/Input";
import Header from "../../components/Header";
import Button from "../../components/Button";
import Check from "../../components/Check";

export default function CreatePetShop (props)
{
	const router = useRouter();
	const [idOwner, setIdOwner] = useState("");
	const [id, setId] = useState(null);
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");
	const [intervalWorks, setIntervalWorks] = useState("");
	const [documentCompany, setDocumentCompany] = useState("");
	const [statusService1, setStatusService1] = useState(false);
	const [intervalPriceService1, setIntervalPriceService1] = useState("");
	const [statusService2, setStatusService2] = useState(false);
	const [intervalPriceService2, setIntervalPriceService2] = useState("");
	const [modeView, setModeView] = useState("CREATE");
	const { mode, idUser, idParam, nameParam, addressParam, phoneParam, documentCompanyParam, idOwnerParam, intervalPriceService1Param, intervalPriceService2Param, intervalWorksParam, statusService1Param, statusService2Param} = useLocalSearchParams();

	useEffect(() => 
	{
		console.log("idUser: ", idUser);

		if (mode === "UPDATE") 
		{ 
			onEdit(idParam, nameParam, addressParam, phoneParam, documentCompanyParam, idOwnerParam, intervalPriceService1Param, intervalPriceService2Param, intervalWorksParam, statusService1Param, statusService2Param);
			setModeView("UPDATE");
		}
		
	}, [props]);

	async function onEdit (idParam, nameParam, addressParam, phoneParam, documentCompanyParam, idOwnerParam, intervalPriceService1Param, intervalPriceService2Param, intervalWorksParam, statusService1Param, statusService2Param)
	{
		console.log("onPrepareEdit...");

		setIdOwner(idOwnerParam);
		setId(idParam);
		setName(nameParam);
		setAddress(addressParam);
		setPhone(phoneParam);
		setIntervalWorks(intervalWorksParam);
		setDocumentCompany(documentCompanyParam);
		setStatusService1(statusService1Param === "true");
		setIntervalPriceService1(intervalPriceService1Param);
		setStatusService2(statusService2Param === "true");
		setIntervalPriceService2(intervalPriceService2Param);
	}

	async function onSave ()
	{
		if
		(
			name.toString().trim() === "" || 
			address.toString().trim() === "" || 
			phone.toString().trim() === "" ||
			intervalWorks.toString().trim() === "" ||
			documentCompany.toString().trim() === "" 
		)
		{ 
			Alert.alert("Opsssss, preencha os campos corretamente!"); 
			return;
		}

		if (!statusService1 && !statusService2)
		{
			Alert.alert("Opsssss, escolha pelo menos um serviço!"); 
			return;
		}

		let params = {
			idUser,
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
		let action = "CREATE";

		if (modeView === "UPDATE") 
		{ 
			params.idOwner = idOwner;
			params.id = id;
			action = "UPDATED";
		}

		router.push({ pathname: "/", params: { ...params, action } });

		setIdOwner("");
		setId(null);
		setName("");
		setAddress("");
		setPhone("");
		setIntervalWorks("");
		setDocumentCompany("");
		setStatusService1(false);
		setIntervalPriceService1("");
		setStatusService2(false);
		setIntervalPriceService2("");
		setModeView("CREATE");
	}

	return (
		<View style={styles.container}>
			<Header />
			<ScrollView style={styles.scrollView}>
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
					<Input
						label="Horário de Funcionamento"
						value={intervalWorks}
						placeholder="08:00 - 19:00"
						onChangeText={(intervalWorks) => setIntervalWorks(intervalWorks)}
					/>
					<Input
						label="CNPJ"
						value={documentCompany}
						placeholder="40.244.777/0001-00"
						onChangeText={(documentCompany) => setDocumentCompany(documentCompany)}
					/>
					<View style={styles.viewGroup}>
						<Text style={styles.labelGroup}>Tipos de Serviços</Text>
						<Check checked={statusService1} label="Banho & Tosa" onToggle={() => setStatusService1(!statusService1)} />
						{
							statusService1 &&
							<Input
								styleInput={{width: "40%"}}
								label="Intervalo de Valores (Banho & Tosa)"
								value={intervalPriceService1}
								placeholder="50,00 a 120,00"
								onChangeText={(intervalPriceService1) => setIntervalPriceService1(intervalPriceService1)}
							/>
						}
						<Check checked={statusService2} label="Médico Veterinário" onToggle={() => setStatusService2(!statusService2)} />
						{
							statusService2 &&
							<Input
								styleInput={{width: "40%"}}
								label="Intervalo de Valores (Médico Veterinário)"
								value={intervalPriceService2}
								placeholder="500,00 a 1.200,00"
								onChangeText={(intervalPriceService2) => setIntervalPriceService2(intervalPriceService2)}
							/>
						}
					</View>
					<Button
						onPress={onSave}
						label={`${modeView === "CREATE" ? "cadastrar" : "atualizar"}`}
					/>
				</View>
			</ScrollView>
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
	viewGroup: {
		minWidth: 200,
        marginHorizontal: 10,
        width: "100%",
        minHeight: 60,
        fontSize: SIZES.subtitle
	},
	labelGroup: {
		color: COLORS.darkOne,
        fontWeight: "900",
        textAlign: "left",
        marginBottom: 10,
        fontSize: SIZES.subtitle
	}
});
