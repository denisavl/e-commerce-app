import React from 'react'
import ReactDOM from 'react-dom/client'
// import Fetch from './fetch'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
import App from './App';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <Fetch/> */}
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
