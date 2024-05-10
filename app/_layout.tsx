import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Fragment, useEffect, useState } from "react";
import "react-native-reanimated";
import Auth from "./auth";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout (props: any) 
{
	const [logged, setLogged] = useState(false);
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),});
	const router = useRouter();

	useEffect(() => 
	{
		if (loaded) { SplashScreen.hideAsync(); }

	}, [loaded]);

	if (!loaded) { return null; }

	function onLogin ()
	{
		setLogged(true);
	}

	function onLogout ()
	{
		console.log("logoutting...");
		setLogged(false);
	}

	return (
		<Fragment>
			<Auth onLogin={onLogin} onLogout={onLogout}/>
			<Stack>
				<Stack.Screen 
					name="(tabs)" 
					options={{ headerShown: false }}
				/>
				<Stack.Screen name="+not-found" />
			</Stack>
		</Fragment>
	);
}
