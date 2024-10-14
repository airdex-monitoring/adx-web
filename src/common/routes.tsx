import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../pages/home/AppLayout";
import ErrorPage from "./ErrorPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        errorElement: <ErrorPage />,
    },
]);

export default router;