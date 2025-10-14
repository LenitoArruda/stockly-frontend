'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { Theme } from '@radix-ui/themes';
import { store } from '@/redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type Props = {
  children: ReactNode;
};

export function AppProvider({ children }: Props) {
  const client = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <Theme appearance="dark">{children}</Theme>
      </QueryClientProvider>
    </Provider>
  );
}
