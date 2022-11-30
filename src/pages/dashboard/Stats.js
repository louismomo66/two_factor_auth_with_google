import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { displayStats } from "../../store/actions/labActions";
import { StatsContainer, ChartsContainer } from "../../components";

const Stats = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(displayStats());

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
