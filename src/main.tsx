import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Theme } from "@radix-ui/themes";
import { App } from './App.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Theme>
            <App/>
        </Theme>
      </QueryClientProvider>
  </StrictMode>,
);
