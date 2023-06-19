import { useEffect, useState } from "react";
import { formatDate, formatMoney, formatTime } from "../utils/Utilities";
import { API_URL, API_DATA_LIMIT, sendRequest } from "../utils/Api";
import TablePagination from "../components/table/TablePagination";
import TableComponent from "../components/table/TableComponent";
import NewVehicle from "../components/forms/NewRecord";
import ModalContainer from "../components/forms/ModalContainer";

export const EmployeeLaptops = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [modalShown, setmodalShown] = useState({
    shown: false,
    component: null,
  });

  const closeModal = async (shouldNotFetch = true) => {
    setmodalShown({ shown: false, component: null });
    if (!shouldNotFetch) {
      setLoading(true);
      await fetchTableData();
      setLoading(false);
    }
  };

  const openModal = (component) => {
    if (!component) {
      return;
    }
    setmodalShown({ shown: true, component });
  };

  const changePage = async (newPage) => {
    if (newPage !== data.currentPage) {
      setLoading(true);
      await fetchTableData();
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await fetchTableData();
      setLoading(false);
    }
    fetchData();
  }, []);

  const fetchTableData = async () => {
    let response = await sendRequest(API_URL + `/employee-laptop`, "GET");
    setData(response.data?.employeeLaptops);
    // setCurrentPage(response?.data?.data?.currentPage);
    // setPages(response?.data?.data?.totalPages);
    return response;
  };

  const transformData = (data) => {
    return data.map((item) => {
      const {
        firstname,
        lastname,
        nationalIdentity,
        telephone,
        email,
        department,
        position,
        laptopManufacturer,
        model,
        serialNumber,
      } = item;
      return {
        firstname,
        lastname,
        nationalIdentity,
        telephone,
        email,
        department,
        position,
        laptopManufacturer,
        model,
        serialNumber,
      };
    });
  };

  const tableHeaders = [
    "First Name",
    "Last Name",
    "National Identity",
    "Telephone",
    "Email",
    "Department",
    "Position",
    "Laptop Manufacturer",
    "Model",
    "Serial Number",
  ];

  return (
    <>
      <h2>List of Employees</h2>
      <TableComponent
        headers={tableHeaders}
        data={transformData(data)}
        loading={loading}
      />
      {/* <TablePagination
        pages={pages}
        active={currentPage}
        changePage={changePage}
        loading={loading}
      ></TablePagination> */}
      <div className="flex w-full justify-center">
        <div className="bg-white flex items-center justify-center w-full">
          <button
            className="button-link"
            onClick={() => openModal(<NewVehicle closeModal={closeModal} />)}
          >
            Register Employee
          </button>
        </div>
      </div>
      {modalShown.shown && (
        <ModalContainer>{modalShown.component}</ModalContainer>
      )}
    </>
  );
};
