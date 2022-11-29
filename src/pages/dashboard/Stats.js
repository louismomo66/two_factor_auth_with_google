import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { StatsContainer, Loading, ChartsContainer } from "../../components";

const Stats = () => {
  const { showStats, isLoading } = useAppContext();

  useEffect(() => {
    showStats();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

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
