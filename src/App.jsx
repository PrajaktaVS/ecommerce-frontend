import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { ProductsPage } from "./components/ProductsPage";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { Register } from "./pages/Register";
import { Cart } from "./pages/Cart";
import { Error } from "./pages/Error";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          style={{marginTop:"70px"}}
        />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AllProducts" element={<ProductsPage title="All Products" />} />
          <Route path="/Clothes" element={<ProductsPage categoryId={1} title="Clothes" />} />
          <Route path="/Electronics" element={<ProductsPage categoryId={2} title="Electronics" />} />
          <Route path="/Furnitures" element={<ProductsPage categoryId={3} title="Furnitures" />} />
          <Route path="/Shoes" element={<ProductsPage categoryId={4} title="Shoes" />} />
          <Route path="/Miscellaneous" element={<ProductsPage categoryId={5} title="Miscellaneous" />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/My-Cart" element={<Cart />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}