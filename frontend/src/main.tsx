import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


export const queryClient = new QueryClient();

// console.log(import.meta.env.VITE_SOME_KEY) // 123


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
    </Provider>,

  {/* </React.StrictMode>, */}
)
