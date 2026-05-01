import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Sidebar from "./admin/Components/Sidebar";
import "./App.css";
import GlobalStyles from "./GlobalStyles";
import Layout from "./admin/Components/Layout";
import Dashboard from "./admin/Components/Dashboard";
import Cabins from "./admin/Components/Cabins";
import Settings from "./admin/Components/Settings";
import Bookings from "./admin/Components/Bookings";
import { Toaster } from "react-hot-toast";
import BookingDetails from "./admin/UI/BookingDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DarkModeProvider, UseDarkMode } from "./admin/API/DarkModeProvider";
import { useEffect } from "react";
import Auth from "./admin/Components/Auth";

const routes = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/cabins",
        element: <Cabins />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/bookings",
        element: <Bookings />,
      },
      {
        path: "/bookings/:id",
        element: <BookingDetails />,
      },
    ],
  },
  {
    path: "/",
    element: <Auth />,
  },
]);

const queryClient = new QueryClient();
function App() {
  const { darkMode } = UseDarkMode();

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light",
    );
  }, [darkMode]);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes}></RouterProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
