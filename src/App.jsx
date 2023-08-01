import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Page404 from "./pages/Page404.jsx";

import { Route, Routes, Navigate } from "react-router-dom";
import Navigatbar from "./components/Navigatbar";
// import Footer from "./components/Footer";


function App() {
  const [user, setUser] = useState(true);

  return (
    <>
      <Navigatbar />

      {user ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categorysec/categorypage/:categoryName" element={<CategoryPage/>} />
          {/* <Route path="/mycart" element={<MyCart />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={ <Navigate to="/login" replace={true} />} />
        </Routes>
      )}

      {/* <Footer /> */}
      
    </>
  );
}

export default App;
