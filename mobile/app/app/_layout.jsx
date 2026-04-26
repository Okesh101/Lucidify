import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';


export default function RootLayout() {


  const [loaded, error] = useFonts({
    regular: require('../assets/Fonts/Montserrat/static/Montserrat-Regular.ttf'),
    bold: require('../assets/Fonts/Montserrat/static/Montserrat-Bold.ttf'),
    Extra_bold: require('../assets/Fonts/Montserrat/static/Montserrat-ExtraBold.ttf'),
    SemiBold: require('../assets/Fonts/Montserrat/static/Montserrat-SemiBold.ttf'),
    medium : require('../assets/Fonts/Montserrat/static/Montserrat-Medium.ttf'),
     thin : require('../assets/Fonts/Montserrat/static/Montserrat-Thin.ttf'),
  })

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}