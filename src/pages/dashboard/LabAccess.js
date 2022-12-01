import { useEffect, useState } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import moment from "moment";
import { axios } from "../../utils/axios";
import Loading from "../../components/Loading";

const LabAccess = () => {
  const [loading, setLoading] = useState(false);
  const [labs, setLabs] = useState([]);

  const getAccess = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/v1/client/my-access");
      console.log("respData: ", response.data);
      const userLabs = response.data.map((lab, idx) => ({
        id: lab?.id,
        labNo: idx + 1,
        labName: lab?.lab?.name,
        labCode: lab?.lab?.code,
        startTime: moment(lab?.startDate).format("MMM Do, YYYY, h:mm a"),
        endTime: moment(lab?.stopDate).format("MMM Do, YYYY, h:mm a"),
        status: lab?.status,
      }));
      setLabs(userLabs);
      setLoading(false);
    } catch (error) {
      console.log("Error:", error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    getAccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      {loading ? (
        <Loading center={true} />
      ) : (
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Lab Name</th>
              <th>Lab Code</th>
              <th>Start Time</th>
              <th>End Time </th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {labs.map((lab) => (
              <tr key={lab?.id}>
                <td>{lab.labNo}</td>
                <td>{lab?.labName}</td>
                <td>{lab?.labCode}</td>
                <td>{lab?.startTime}</td>
                <td>{lab?.endTime}</td>
                <td>{lab?.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Wrapper>
  );
};

export default LabAccess;
