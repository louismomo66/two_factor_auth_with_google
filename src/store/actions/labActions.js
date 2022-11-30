import { toast } from "react-toastify";
import { axios } from "../../utils/axios";
import { getStats } from "../../utils/requests/apiRoutes";
import { showError } from "../../utils/showError";
import { setLoading } from "../slices/labSlice";

export const displayStats = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { url } = getStats();
      const { data } = await axios.get(url);
      console.log("data", data);
      //   const { defaultLabStats, monthlyLabAccesses } = data;
      dispatch(setLoading(false));
      //   dispatch({ defaultLabStats, monthlyLabAccesses });
    } catch (error) {
      toast.error(showError(error));
      console.log(error);
    }
  };
};
