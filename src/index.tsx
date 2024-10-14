import ReactDOM from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from "react-query";
import { APIProvider } from '@vis.gl/react-google-maps';
import { RouterProvider } from 'react-router';
import router from './common/routes';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <APIProvider apiKey={String(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)}>
      <RouterProvider router={router} />
    </APIProvider>
  </QueryClientProvider>
);