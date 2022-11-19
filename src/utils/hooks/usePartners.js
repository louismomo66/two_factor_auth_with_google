import { useEffect, useState } from "react";
import { axios } from "../axios";
import { getPartnersRoute } from "../requests/apiRoutes";

let cache = [];

const usePartners = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const fetchPartners = async () => {
    setLoading(true);
    if (cache.length > 0) {
      setLoading(false);
      setData(cache);
      return;
    }
    try {
      const { url } = getPartnersRoute();
      const res = await axios.get(url);
      cache = res.data;
      setData(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  return {
    loading,
    institutions: data,
  };
};

export default usePartners;
