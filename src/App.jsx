import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/Signup";
import { EmployeeLaptops } from "./pages/EmployeeLaptops";
import { PrivateRoute, PublicRoute } from "./utils/Route";
import { Logout } from "./pages/Logout";
import { ToastContainer } from "react-toastify";
import Cart from "./pages/Cart";
import ProductList from "./components/ProductsList";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route
            path="/"
            exact
            element={<PublicRoute element={ProductList} />}
          />
          <Route path="/cart" exact element={<PublicRoute element={Cart} />} />
          <Route
            path="/login"
            exact
            element={<PublicRoute element={Login} />}
          />
          <Route
            path="/signup"
            exact
            element={<PublicRoute element={SignUp} />}
          />
          <Route
            path="/dashboard"
            exact
            element={<PrivateRoute element={EmployeeLaptops} />}
          />
          <Route exact path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
