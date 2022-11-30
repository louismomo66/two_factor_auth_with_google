import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayStats } from "../../store/actions/labActions";
import { StatsContainer, Loading, ChartsContainer } from "../../components";

const Stats = () => {
  const { monthlyLabAccesses } = useSelector((state) => state.lab);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(displayStats());
  }, [dispatch]);

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
