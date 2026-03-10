import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useFonts, Heebo_900Black, Heebo_700Bold } from '@expo-google-fonts/heebo';
import { Assistant_400Regular, Assistant_700Bold } from '@expo-google-fonts/assistant';
import { AuthProvider, useAuth } from '../lib/auth';
import { Colors } from '../constants/colors';

function RootLayoutNav() {
  const { session, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inOnboarding = segments[0] === 'onboarding';

    if (!session && !inAuthGroup && !inOnboarding) {
      // Redirect to onboarding or login if not authenticated
      router.replace('/onboarding');
    } else if (session && (inAuthGroup || inOnboarding)) {
      // Redirect to tabs if authenticated
      router.replace('/(tabs)');
    }
  }, [session, isLoading, segments]);

  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Colors.bg } }}>
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Heebo_900Black,
    Heebo_700Bold,
    Assistant_400Regular,
    Assistant_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
