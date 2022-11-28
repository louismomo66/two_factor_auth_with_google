import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayStats } from "../../store/actions/labActions";
import { StatsContainer, Loading, ChartsContainer } from "../../components";

const Stats = () => {
  const { monthlyLabAccesses } = useSelector((state) => state.lab);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(displayStats());
  }, []);

  
  return (
    <>
      {/* <StatsContainer />
      {monthlyLabAccesses.length > 0 && <ChartsContainer />} */}

      <StatsContainer />
      {<ChartsContainer />}
    </>
  );
};
export default Stats;
