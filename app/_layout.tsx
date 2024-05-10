import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Fragment, useEffect } from "react";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function RootLayout (props: any) 
{
	const [loaded] = useFonts({SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),});
	const router = useRouter();

	useEffect(() => 
	{
		if (loaded) { SplashScreen.hideAsync(); }

	}, [loaded]);

	if (!loaded) { return null; }

	return (
		<Fragment>
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
