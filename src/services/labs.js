import { axios } from "../utils/axios";

export const labService = () => {
  const getPage = async (page, limit, search) => {
    try {
      const result = await axios.get(
        `/api/v1/client/paged/${page}/${limit}?search=${search}`
      );
      return {
        count: result.data.totalDocs,
        result: result.data.docs.map((lab, idx) => ({
          id: lab?.id,
          labNo: idx + 1,
          labName: lab?.name,
          labCode: lab?.code,
          timeInterval: `${lab?.timeMinutes} minutes`,
        })),
      };
    } catch (error) {
      console.log("Error:", error.message);
      throw error;
    }
  };

  const service = {
    getPage,
  };

  return service;
};
