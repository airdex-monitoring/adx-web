import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout";
import ErrorPage from "./ErrorPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        errorElement: <ErrorPage />,
    },
]);

export default router;