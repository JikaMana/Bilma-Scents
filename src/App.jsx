import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./layouts/RootLayout";
import Store from "./pages/Store";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import CartPage from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { CartProvider } from "./contexts/CartContext";
import OrderSuccessful from "./pages/OrderSuccessful";
import { Toaster } from "sonner";

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
      { path: "checkout", element: <Checkout /> },
      { path: "order-successful", element: <OrderSuccessful /> },

      // { path: "wishlist", element: <Wishlist /> },
      // { path: "admin", element: <Admin /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return (
    <CartProvider>
      <Toaster position="top-right" offset={100} />
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
