import React, { useState } from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useEffect } from "react";
import { useNavigation, useRouter, Tabs, usePathname } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabLayout (props) 
{
	const router = useRouter();
	const navigation = useNavigation();
	const path = usePathname();

	useEffect(() => 
	{
		navigation.addListener('beforeRemove', (e) => {
			console.log('onBack pressioned on Auth view...');
			e.preventDefault();
		});
		
		console.log("path: ", path);

		checkingUserLogged();
		
	}, [props]);


	async function checkingUserLogged ()
	{
		let value = await AsyncStorage.getItem("user-logged");

		console.log("checking the user-logged status: ", value);

		if ((value !== null && value === "false" && path !== "/auth") || value === null) 
		{
			router.push({ pathname: "/auth", params: { logout: "false" } });
		}
	}

	return (
		<Tabs
			screenOptions={
				{
					headerShown: false,
					tabBarActiveTintColor: "#000000",
					tabBarStyle: {
						height: 85,
						backgroundColor: "#BAD36D",
						display: usePathname() === '/auth' ? 'none' : 'flex',
					},
					tabBarLabelStyle: {
						fontSize: 14,
						fontWeight: "bold",
						marginBottom: 10,
					},
				}
			}			
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Buscar",
					tabBarIcon: ({ color, focused }) => ( <TabBarIcon name={"search"} color={focused ? "#000000" : "#949494"} />),
				}}
			/>
			<Tabs.Screen
				name="reservations"
				options={{
					title: "Reservas",
					tabBarIcon: ({ color, focused }) => ( <TabBarIcon name={"calendar"} color={focused ? "#000000" : "#949494"} /> ),
				}}
			/>
			<Tabs.Screen
				name="animals"
				options={{
					title: "Animais",
					tabBarIcon: ({ color, focused }) => ( <TabBarIcon name={"paw"} color={focused ? "#000000" : "#949494"} /> ),
				}}
			/>
			<Tabs.Screen
				name="home"
				options={{
					title: "Início",
					tabBarIcon: ({ color, focused }) => ( <TabBarIcon name={"home"} color={focused ? "#000000" : "#949494"} /> ),
				}}
			/>
			<Tabs.Screen
				name="auth"
				options={{ title:"Auth", tabBarButton: () => null }}
			/>
			<Tabs.Screen
				name="create_petshop"
				options={{ title:"Cadastrar Petshop", tabBarButton: () => null }}
			/>
		</Tabs>
	);
}