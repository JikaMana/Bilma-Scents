import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./layouts/RootLayout";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Cart from "./pages/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "shop/:id", element: <ProductDetails /> },
      // { path: "about", element: <About /> },
      // { path: "contact", element: <Contact /> },
      // { path: "cart", element: <Cart /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
