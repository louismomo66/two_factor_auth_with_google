// import { useAppContext } from "../context/appContext";
import { useSelector } from "react-redux";

import StatItem from "./StatItem";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";
const StatsContainer = () => {
  const { defaultLabStats } = useSelector((state) => state.lab);
  // console.log('defaultLabStats',defaultLabStats);
  const defaultStats = [
    {
      title: "Labs Scheduled",
      count: defaultLabStats.Scheduled || 0,
      icon: <FaSuitcaseRolling />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "Labs Granted",
      count: defaultLabStats.Granted || 0,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "Labs Expired",
      count: defaultLabStats.Expired || 0,
      icon: <FaBug />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};

export default StatsContainer;
