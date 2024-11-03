import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert, ScrollView } from "react-native";
import { COLORS, HEIGHT_HEADER, SIZES } from "../../constants";
import { useLocalSearchParams, useRouter } from "expo-router";

import Input from "../../components/Input";
import Header from "../../components/Header";
import Button from "../../components/Button";
import Select from "../../components/Select";

export default function CreateAnimal (props)
{
	const router = useRouter();
	const [id, setId] = useState(null);
	const [name, setName] = useState("");
	const [breed, setBreed] = useState("");
	const [age, setAge] = useState("");
    const [sex, setSex] = useState("");
    const [type, setType] = useState("");
	const optionsSex = [{id: 1, label: "Macho", value: "MALE"}, {id: 2, label: "Fêmea", value: "FEMALE"}];
	const optionsType = [{id: 1, label: "Cachorro", value: "DOG"}, {id: 2, label: "Gato", value: "CAT"}];
	const [modeView, setModeView] = useState("CREATE");
	const { mode, idParam, nameParam, breedParam, sexParam, typeParam, ageParam} = useLocalSearchParams();

	useEffect(() => 
	{
		if (mode === "UPDATE") 
		{
			onEdit(idParam, nameParam, breedParam, sexParam, typeParam, ageParam);
			setModeView("UPDATE");
		}

	}, [props,]);

	async function onEdit (idParam, nameParam, breedParam, sexParam, typeParam, ageParam)
	{
		console.log("onPrepareEdit...");

		setId(idParam);
		setName(nameParam);
		setBreed(breedParam);
		setSex(sexParam);
		setType(typeParam);
		setAge(ageParam);
	}

	async function onSave ()
	{
		if
		(
			name.toString().trim() === "" || 
			breed.toString().trim() === "" || 
			age.toString().trim() === "" ||
			sex.toString().trim() === "" ||
			type.toString().trim() === "" 
		)
		{ 
			Alert.alert("Opsssss, preencha os campos corretamente!"); 
			return;
		}

		let params = {
            name,
			breed,
			age,
			sex,
			type
		};
		let action = "CREATE";

		if (modeView === "UPDATE") 
		{
			params.id = idParam;
			action = "UPDATED";
		}

		router.push({ pathname: "/animals", params: { ...params, action } });

		setId(null);
        setName("");
        setBreed("");
        setAge("");
        setSex("");
        setType("");
		setModeView("CREATE");
	}

	return (
		<View style={styles.container}>
			<Header />
			<ScrollView style={styles.scrollView}>
				<View style={styles.body}>
					<Text style={styles.title}>Cadastrar Animal</Text>
					<Input
						label="Nome"
						value={name}
						placeholder="Milu"
						onChangeText={(name) => setName(name)}
					/>
					<Input
						label="Raça"
						value={breed}
						placeholder="Pastor Alemão"
						onChangeText={(breed) => setBreed(breed)}
					/>
					<Input
						label="Idade"
						value={age}
						placeholder="6"
						onChangeText={(age) => setAge(age)}
					/>
					 <Select
    					label="Sexo"
    					value={sex}
						options={optionsSex}
   						onValueChange={(sex) => setSex(sex)}
					/>
					 <Select
    					label="Tipo"
    					value={type}
						options={optionsType}
   						onValueChange={(type) => setType(type)}
					/>
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
