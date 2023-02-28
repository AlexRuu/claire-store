import { BrowserRouter, Routes, Route } from "react-router-dom";

// Protected Route
import ProtectedRoute from "./pages/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Store from "./pages/Store";
import Contact from "./pages/Contact";
import SharedLayout from "./pages/SharedLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import CreateProduct from "./pages/Products/CreateProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgotpass" element={<ForgotPassword />} />
        <Route path="profile" element={<Profile />} />
        {/* come back to this for protected route */}
        {/* <Route
          path="createProduct"
          element={
            <ProtectedRoute>
              <CreateProduct />
            </ProtectedRoute>
          }
        /> */}
        {/* Current route for create product for testing so I don't have to deal with the annoying state error because it's not showing that there is a user available...A */}
        <Route path="createProduct" element={<CreateProduct />} />
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="store" element={<Store />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
