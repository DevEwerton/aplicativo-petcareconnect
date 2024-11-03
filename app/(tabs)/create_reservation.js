import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert, ScrollView } from "react-native";
import { COLORS, HEIGHT_HEADER, SIZES } from "../../constants";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Input from "../../components/Input";
import Header from "../../components/Header";
import Button from "../../components/Button";
import Select from "../../components/Select";
import DateInput from "../../components/DateInput";

const API = require("../../api");

var ID_CURRENT_USER = null;

export default function CreateReservation (props)
{
	const router = useRouter();
    const [user, setUser] = useState(null);
    const [optionsAnimals, setOptionsAnimals] = useState("");
    const [animal, setAnimal] = useState("");
    const [date, setDate] = useState(null);
    const [hours, setHours] = useState("");
	const [modeView, setModeView] = useState("CREATE");
	const { mode, idParam, nameParam } = useLocalSearchParams();

	useEffect(() => 
	{
        setInterval(checkingUserLogged, 1000);
        getAllAnimals();

        console.log("(create_reservation) idParam: ", idParam);
        console.log("(create_reservation) nameParam: ", nameParam);

	}, [props, user]);

    async function checkingUserLogged ()
	{
		let user = await AsyncStorage.getItem("user");
		user = JSON.parse(user);

		if (user && user.id_user !== ID_CURRENT_USER)
		{
			console.log(`(create_reservations\ view) start checkingUserLogged: ${user?.id_user}, nameUser: ${user?.name}`);

			ID_CURRENT_USER = user.id_user;
			setUser(user);
		}
	}

    async function getAllAnimals ()
	{
		console.log(`(create_reservation view) getAllAnimals idUser: ${user?.id_user}, nameUser: ${user?.name}`);

		let api = new API();
		let animalsScreen = [];
		
		if (!user?.id_user) { return; }

		let response = await api.animals().getByUser("", user.id_user);

		if (response.code === 200)
		{
			let data = response.data;
			
			if (data)
			{
				Object.keys(data).forEach(ka => { //ka = key animal
					let animal = data[ka];
					let pet = {
						id: ka,
						name: animal.name,
						breed: animal.breed,
						age: animal.age,
						sex: animal.sex,
						type: animal.type,
                        label: animal.name,
                        value: ka,
					};
					animalsScreen.push(pet);
				});
			}
		}

		setOptionsAnimals(animalsScreen);
	}

    function getStampFromInstanceDate (dateInstance, hours)
    {
        try
        {
            let d = new Date(dateInstance);
            let month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();    
            day = ("0" + day).slice(-2);
            month = ("0" + month).slice(-2);

            return new Date(`${year}-${month}-${day} ${hours}:00`).getTime();
        }
        catch (error)
        {
            console.log("error: ", error);
            Alert.alert("Opsssss, tivemos algum problema!"); 
        }
    }

	async function onSave ()
	{
        try
        {
            let data = {};

            if (!date || !hours)
            {
                Alert.alert("Opsssss, preencha os campos corretamente (dia e hora)!"); 
                return;
            }

            if (animal.toString().trim() === "")
            {
                Alert.alert("Opsssss, preencha os campos corretamente (pet)!"); 
                return;
            }
            else
            {
                let choosenAnimal = optionsAnimals.filter(a => a.value === animal)[0];
                data.nameAnimal = choosenAnimal.name;
                data.typeAnimal = choosenAnimal.type;
            }

            if (user?.id_user)
            {
                data.idOwner = user.id_user;
                data.nameOwner = user.name;
                data.phoneOwner = user.phone;
            }

            data.when = getStampFromInstanceDate(date, hours);
            data.status = 1;
            data.namePetshop = nameParam;

            let api = new API();
            let response = await api.scheduled().post("", idParam, data);

            router.push({ pathname: "/reservations", params: {  } });

            setDate(null);
            setHours("");
        }
        catch (error)
        {
            console.log("error: ", error);
            Alert.alert("Opsssss, tivemos algum problema!"); 
        }
	}

	return (
		<View style={styles.container}>
			<Header />
			<ScrollView style={styles.scrollView}>
				<View style={styles.body}>
					<Text style={styles.title}>Fazer Reserva</Text>
					<Input
						label="Petshop"
						placeholder={nameParam}
                        editable={false} 
                        selectTextOnFocus={false}
					/>
                    <DateInput
                        onChange={(date) => setDate(date)}
                    />
					<Input
						label="Horas"
						value={hours}
						placeholder="10:55"
                        maxLength={5}
						onChangeText={(hours) => setHours(hours)}
					/>
					 <Select
                        label="Tipo de Usuário"
                        value={animal}
                        options={optionsAnimals}
                        onValueChange={(animal) => setAnimal(animal)}
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
