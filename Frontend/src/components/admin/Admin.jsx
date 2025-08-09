import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import Card from "./Card";
import JobCard1 from "./JobCard1";
import AddNewJob from "../admin/AddNewJob";
import EditJob from "../admin/EditJob";
import { useNavigate } from "react-router-dom";
export default function Admin() {
  const [data, setData] = useState([]);
  const [totalApplications, setTotalApplications] = useState(null);
  const [edit, setEdit] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  if (!token) {
    navigate("/unauthorized");
  }
  const [active, setActive] = useState({
    addNewJob: false,
    editJob: false,
  });
  useEffect(() => {
    getData();
    fetchApplications();
  }, []);
  const getData = async () => {
    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/jobs`;
      const response = await axios.get(url);
      const job = response.data;

      setData(job);
    } catch (error) {
      console.log(
        "Error fetching jobs:",
        error.response?.data || error.message
      );
      setData([]);
    }
  };

  const fetchApplications = async () => {
    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/form-count`;
      const response = await axios.get(url);
      const applications = response.data.totalApplications;
      setTotalApplications(applications);
    } catch (error) {
      console.log(
        "Error fetching applications:",
        error.response?.data || error.message
      );
      setTotalApplications(null);
    }
  };

  return (
    <div className=" space-y-12">
      <Card total={data.length} totalApplications={totalApplications} />
      <div>
        <button
          // to={"/admin"}
          onClick={() => setActive({ addNewJob: true })}
          className="flex gap-2 justify-center items-center p-4  pt-2 pb-2  cursor-pointer  bg-blue-600  text-white rounded shadow font-semibold "
        >
          <Plus className=" w-4 h-4 " />{" "}
          <span className=" font-semibold">Add New Job</span>
        </button>
      </div>
      {active.addNewJob && (
        <div
          className="fixed inset-0 flex items-center justify-center h-full z-50 p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        >
          <div className="max-w-lg w-full">
            <AddNewJob
              setData={setData}
              fetchApplications={fetchApplications}
              getData={getData}
              setActive={setActive}
            />
          </div>
        </div>
      )}

      {active.editJob && (
        <div
          className="fixed inset-0 flex items-center justify-center h-full z-50 p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        >
          <div className="max-w-lg w-full">
            <EditJob
              setData={setData}
              getData={getData}
              data={edit}
              setActive={setActive}
            />
          </div>
        </div>
      )}

      {data && data.length > 0 ? (
        data.map((item, index) => (
          <JobCard1
            setActive={setActive}
            setEdit={setEdit}
            setData={setData}
            key={index}
            item={item}
          />
        ))
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}
