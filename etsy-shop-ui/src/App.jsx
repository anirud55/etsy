import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  // const user = false;
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Product />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
      </Routes>
    </Router>
  );
};

export default App;