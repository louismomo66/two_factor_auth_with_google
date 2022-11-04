import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useAppContext } from "../../context/appContext";

import moment from "moment";

const LabAccess2 = () => {
  const { user, token } = useAppContext();
  const [labName, setLabName] = useState("");
  const [labCode, setLabCode] = useState("");
  const [labStatus, setLabStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [stopDate, setStopDate] = useState("");
  const [ourLabs, setOurLabs] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/client/my-access", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("response: ", response);
        return response.data;
      })
      .then((data) => {
        setOurLabs(data);
        console.log("data: ", data);
      })
      .catch((err) => console.log("error:", err));
  }, []);

  return (
    <Wrapper>
      <div>
        {ourLabs.map((LabItem, index) => {
          const { lab, status } = LabItem;
          const { name, code, description, startDate, stopDate } = lab;
          console.log("code:", code);
          setLabName(name);
          setLabCode(code);
          setLabStatus(status);
          setStartDate(moment(startDate).format("MMM Do, YYYY, h:mm a"));
          setStopDate(moment(stopDate).format("MMM Do, YYYY, h:mm a"));
          console.log("labCode", labCode);
          return (
            <Table bordered hover key={index}>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Lab Name</th>
                  <th>Lab Code</th>
                  <th>Start Time</th>
                  <th>End Time </th>
                  <th>Status</th>
                  <th>Schedule</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>{labName}</td>
                  <td>{labCode}</td>
                  <td>{startDate}</td>
                  <td>{stopDate}</td>
                  <td>{labStatus}</td>
                  <td>
                    <button className='btn'>Schedule</button>
                  </td>
                </tr>
              </tbody>
            </Table>
          );
        })}
      </div>
    </Wrapper>
  );
};
export default LabAccess2;
