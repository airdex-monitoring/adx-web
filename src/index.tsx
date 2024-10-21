import ReactDOM from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from "react-query";
import { APIProvider } from '@vis.gl/react-google-maps';
import { RouterProvider } from 'react-router';
import router from './common/routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry(failureCount, error: any) {
        if (error.status === 404 ||
          error.status === 401 ||
          error.status === 403 ||
          error.status === 500) return false;
        else if (failureCount < 2) return true;
        else return false;
      },
      refetchOnWindowFocus: true,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <QueryErrorResetBoundary>
      <APIProvider apiKey={String(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)}>
        <RouterProvider router={router} />
      </APIProvider>
    </QueryErrorResetBoundary>
  </QueryClientProvider>
);