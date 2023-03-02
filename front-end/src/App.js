import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { fetchUser } from "./slices/authSlice";
import { useDispatch } from "react-redux";

// Protected Route
import ProtectedRoute from "./pages/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SharedLayout from "./pages/SharedLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import CreateProduct from "./pages/Products/CreateProduct";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    // eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgotpass" element={<ForgotPassword />} />
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="profile" element={<Profile />} />
          <Route
            path="create"
            element={
              <ProtectedRoute>
                <CreateProduct />
              </ProtectedRoute>
            }
          />
          <Route path="*" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
