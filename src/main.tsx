import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { NextUIProvider } from "@nextui-org/react";
import { routeTree } from './routeTree.gen'
import { AuthProvider } from './shared/context/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const router = createRouter({ routeTree })
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </NextUIProvider>
  </React.StrictMode>,
)
