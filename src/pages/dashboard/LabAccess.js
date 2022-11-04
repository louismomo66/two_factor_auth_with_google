import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useAppContext } from "../../context/appContext";

import moment from "moment";

const LabAccess = () => {
  const { user, token } = useAppContext();
  const [labName, setLabName] = useState("");
  const [labCode, setLabCode] = useState("");
  const [labStatus, setLabStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [stopDate, setStopDate] = useState("");
  // const [ourLabs, setOurLabs] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const getAccess = async () => {
    try {
      const response = await axios.get("/api/v1/client/my-access", config);
      //  console.log("resp: ", response);
      console.log("respData: ", response.data);

      const accessData = response.data;
      accessData.map((LabItem, index) => {
        //  const [access]= LabItem
        console.log("labItem", LabItem);
        const { lab, status } = LabItem;
        const { name, code, description, startDate, stopDate } = lab;
        setLabName(name);
        setLabCode(code);
        setLabStatus(status);
        setStartDate(moment(startDate).format("MMM Do, YYYY, h:mm a"));
        setStopDate(moment(stopDate).format("MMM Do, YYYY, h:mm a"));

        console.log("lab:", lab);
      });
      //  console.log("access:", access);
      //  console.log("name:", name);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };
  useEffect(() => {
    getAccess();
  }, []);

  return (
    <Wrapper>
      <Table bordered hover>
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
          {/* <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td></td>
            <td>@fat</td>
            <td>
              <button className='btn'>Schedule</button>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Larry the Bird</td>
            <td>@twitter</td>
            <td>@twitter</td>
            <td></td>
            <td>
              <button className='btn'>Schedule</button>
            </td>
          </tr> */}
        </tbody>
      </Table>
      {/* <h2>lab access</h2>
      <h1>{labName}</h1>
      <p>{labCode}</p>
      <p>{startDate}</p>
      <p>{stopDate}</p> */}
    </Wrapper>
  );
};
export default LabAccess;
