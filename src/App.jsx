import { BrowserRouter, Routes, Route } from "react-router-dom";
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

import ScrollToTop from "./components/ScrollToTop";
import Wishlist from "./pages/Wishlist";
import { WishProvider } from "./contexts/WishContext";

function App() {
  return (
    <CartProvider>
      <WishProvider>
        <Toaster position="top-right" offset={100} />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="store" element={<Store />} />
              <Route path="store/:id" element={<ProductDetails />} />
              <Route path="contact" element={<Contact />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="order-successful" element={<OrderSuccessful />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </WishProvider>
    </CartProvider>
  );
}

export default App;
