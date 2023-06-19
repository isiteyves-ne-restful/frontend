import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { EmployeeLaptops } from "./pages/EmployeeLaptops";
import { PrivateRoute, PublicRoute } from "./utils/Route";
import { Logout } from "./pages/Logout";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route
            path="/"
            exact
            element={<PrivateRoute element={EmployeeLaptops} />}
          />
          <Route
            path="/login"
            exact
            element={<PublicRoute element={Login} />}
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
