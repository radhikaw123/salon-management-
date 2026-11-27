import React, { ReactNode, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function AppProviders({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={client}>
      <SafeAreaProvider>
        <NavigationContainer>{children}</NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}