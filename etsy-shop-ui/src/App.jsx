import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import { useContext } from "react";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import ENavbar from "./components/ENavbar";
import Profile from "./pages/Profile";
import CreateShop from "./pages/CreateShop";
import Shop from "./pages/Shop";
import MyOrders from "./pages/MyOrders";
import Login from "./components/Login";
import Favorites from "./pages/Favorites";
import Search from "./pages/Search";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch } from "react-redux";
import { currencychange } from "./actions/currencyAction";

function App() {
  const currencyupdate = (e) => {
    console.log(e);
    dispatch(currencychange(e));
  };
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <ENavbar></ENavbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:id" element={<Product />} />
              <Route path="/signup" element={<Register />} />
              <Route path="/" element={<Home />} />
              <Route path="/createshop" element={<CreateShop />} />
              <Route path="/shoppage/:shopname" element={<Shop />} />
              <Route path="/search/:name" element={<Search />} />
              <Route path="/home" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/myorders" element={<MyOrders />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="page-footer">
            <Dropdown
              style={{ position: "absolute", left: "10px", bottom: "5px" }}
              onSelect={currencyupdate}
            >
              {" "}
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Currency
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="$">USD($)</Dropdown.Item>
                <Dropdown.Item eventKey="£">GBP(£)</Dropdown.Item>
                <Dropdown.Item eventKey="€">EURO(€)</Dropdown.Item>
                <Dropdown.Item eventKey="₹">INR(₹)</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            @2022 All rights reserved.
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
