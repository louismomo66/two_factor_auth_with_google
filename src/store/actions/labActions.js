import { toast } from "react-toastify";
import { axios } from "../../utils/axios";
import { getStats } from "../../utils/requests/apiRoutes";
import { showError } from "../../utils/showError";
import { setLoading, getUserStats } from "../slices/labSlice";

export const displayStats = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { url } = getStats();
      const { data } = await axios.get(url);
      console.log("data", data);
      dispatch(getUserStats(data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      toast.error(showError(error));
      console.log(error);
    }
  };
};
