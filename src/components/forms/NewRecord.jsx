/* eslint-disable react/prop-types */
import React from "react";
import { FaTimes } from "react-icons/fa";
import { Input } from "../Input";
import { API_URL, sendRequest } from "../../utils/Api";
import { errorToast, successToast } from "../../utils/Toast";

const NewRecord = ({ closeModal }) => {
  const [data, setData] = React.useState({});

  const [localSending, setlocalSending] = React.useState(false);

  const inputHandler = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // validate all fields to make sure they are not empty
      if (
        !data?.firstname ||
        !data?.lastname ||
        !data?.nationalIdentity ||
        !data?.email ||
        !data?.telephone ||
        !data?.position ||
        !data?.department ||
        !data?.model ||
        !data?.serialNumber
      ) {
        errorToast("All fields are required");
        return;
      }
      // validate email and phone
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data?.email)) {
        errorToast("Invalid email address");
        return;
      }
      if (!/^[0-9]{10}$/.test(data?.telephone)) {
        errorToast("Invalid phone number");
        return;
      }
      setlocalSending(true);
      await sendRequest(API_URL + "/employee-laptop", "POST", data);
      successToast("Successfully registered the new record");
      closeModal(false);
    } catch (error) {
      errorToast(error?.response?.data?.message || "An error occurred");
    }
    setlocalSending(false);
  };

  return (
    <>
      <div className="form-holder mt-60">
        <div className="form-header text-white flex justify-center items-center relative">
          {"Register Employee Laptop"}
          <FaTimes
            className="text-white absolute right-4 cursor-pointer"
            onClick={closeModal}
          ></FaTimes>
        </div>
        <div className="form-content bg-white p-4">
          <form className="form" onSubmit={handleSubmit}>
            <div className="w-full">
              <div className="flex flex-col items-center justify-center">
                <div className="form-row">
                  <div className="form-group">
                    <Input
                      type="text"
                      labelName="First Name"
                      name="firstname"
                      onChange={inputHandler}
                      defaultInputValue={data?.firstname || ""}
                      required={true}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <Input
                      type="text"
                      labelName="Last Name"
                      name="lastname"
                      onChange={inputHandler}
                      defaultInputValue={data?.lastname || ""}
                      required={true}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <Input
                      type="text"
                      labelName="National Identity"
                      name="nationalIdentity"
                      onChange={inputHandler}
                      defaultInputValue={data?.nationalIdentity || ""}
                      required={true}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <Input
                      type="tel"
                      labelName="Telephone"
                      name="telephone"
                      onChange={inputHandler}
                      defaultInputValue={data?.telephone || ""}
                      required={true}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <Input
                      type="email"
                      labelName="Email"
                      name="email"
                      onChange={inputHandler}
                      defaultInputValue={data?.email || ""}
                      required={true}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <Input
                      type="text"
                      labelName="Department"
                      name="department"
                      onChange={inputHandler}
                      defaultInputValue={data?.department || ""}
                      required={true}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <Input
                      type="text"
                      labelName="Position"
                      name="position"
                      onChange={inputHandler}
                      defaultInputValue={data?.position || ""}
                      required={true}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <Input
                      type="text"
                      labelName="Laptop Manufacturer"
                      name="laptopManufacturer"
                      onChange={inputHandler}
                      defaultInputValue={data?.laptopManufacturer || ""}
                      required={true}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <Input
                      type="text"
                      labelName="Model"
                      name="model"
                      onChange={inputHandler}
                      defaultInputValue={data?.model || ""}
                      required={true}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <Input
                      type="text"
                      labelName="Serial Number"
                      name="serialNumber"
                      onChange={inputHandler}
                      defaultInputValue={data?.serialNumber || ""}
                      required={true}
                    />
                  </div>
                </div>

                <button type="submit" className="save-btn">
                  {localSending ? "Wait..." : "Register"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewRecord;
