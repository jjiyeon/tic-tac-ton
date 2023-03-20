import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import ReactDOM from 'react-dom/client'
import App from './App'
// this manifest is used temporarily for development purposes
const manifestUrl = 'https://jjiyeon.github.io/tic-tac-ton/tonconnect-manifest.json'

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </TonConnectUIProvider>
)
