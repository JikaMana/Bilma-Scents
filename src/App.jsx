import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./layouts/RootLayout";
import Store from "./pages/Store";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import CartPage from "./pages/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "store", element: <Store /> },
      { path: "store/:id", element: <ProductDetails /> },
      { path: "contact", element: <Contact /> },
      { path: "cart", element: <CartPage /> },
      // { path: "checkout", element: <Checkout /> },
      // { path: "wishlist", element: <Wishlist /> },
      // { path: "admin", element: <Admin /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
