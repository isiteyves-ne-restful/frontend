import { useState } from "react";
import { errorToast, successToast } from "../utils/Toast";
import { Input } from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/Api";

export const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // check if there are no exmpty values
    const isFormDataFilled = Object.values(formData).every(
      (value) => value !== ""
    );

    // if there are empty values, show error toast to the user
    if (!isFormDataFilled) {
      errorToast("All fields are required");
      return;
    }

    // start showing the user that we are processing their login request
    setLoading(true);
    try {
      const response = await axios.post(API_URL + "/auth/login", formData);
      successToast("Successfully logged in");

      setFormData({
        username: "",
        password: "",
      });

      const token = response.data?.token;
      localStorage.setItem("token", token);
      navigate("/dashboard");

      setLoading(false);
    } catch (error) {
      setLoading(false);
      errorToast(error?.response?.data?.message || "An error occurred");
    }
  };

  // function to handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="pb-12">
      <h1 className="text-xl text-[#2272C3] font-extrabold text-center my-12">
        KALIM Binary Supermarket
      </h1>
      <div className="flex flex-col items-center mt-8 border w-full md:w-[35vw] mx-auto py-8 px-16">
        <h1 className="font-black text-black mb-4 text-xl">Login</h1>
        <p className="text-xs font-light text-gray-400 mb-8">
          To start using KALIM Binary Supermarket, you need to login.
        </p>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-6">
            <Input
              type="username"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-8">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full mb-6 flex justify-center mx-auto text-base px-4 py-3 text-white rounded-md"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-sm">
          New to the platform?{" "}
          <Link to="/signup" className="text-[#2272C3] font-bold">
            Register
          </Link>
          .
        </p>
      </div>
    </div>
  );
};
