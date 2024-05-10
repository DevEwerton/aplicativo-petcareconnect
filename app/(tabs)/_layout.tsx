import { Tabs, usePathname } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

export default function TabLayout (props: any) 
{
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
					tabBarIcon: ({ color, focused }) => (
							<TabBarIcon name={"search"} color={focused ? "#000000" : "#949494"} />
					),
				}}
			/>
			<Tabs.Screen
				name="reservations"
				options={{
					title: "Reservas",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon name={"calendar"} color={focused ? "#000000" : "#949494"} />
					),
				}}
			/>
			<Tabs.Screen
				name="animals"
				options={{
					title: "Animais",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon name={"paw"} color={focused ? "#000000" : "#949494"} />
					),
				}}
			/>
			<Tabs.Screen
				name="home"
				options={{
					title: "Início",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon name={"home"} color={focused ? "#000000" : "#949494"} />
					),
				}}
			/>
			<Tabs.Screen
				name="auth"
				options={{
					title:"Auth",
					tabBarButton:()=>null
				}}
			/>
		</Tabs>
	);
}

