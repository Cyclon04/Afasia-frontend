// app/_layout.tsx
import { Stack } from 'expo-router';
import { ThemeProvider } from '../hooks/useTheme';

export default function RootLayout() {
  return (
    <ThemeProvider initialScheme="light">
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="modal" />
      </Stack>
    </ThemeProvider>
  );
}