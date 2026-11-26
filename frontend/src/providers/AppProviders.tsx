import React, { ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SafeAreaProvider>
<<<<<<< HEAD:frontend/src/providers/AppProviders.tsx
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <StatusBar style="dark" />
          {children}
        </NavigationContainer>
      </QueryClientProvider>
=======
      <NavigationContainer>{children}</NavigationContainer>
>>>>>>> e4f9cff (Updated project changes):frontend/src/app/providers.tsx
    </SafeAreaProvider>
  );
}
