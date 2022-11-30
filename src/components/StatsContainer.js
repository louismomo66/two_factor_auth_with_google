// import { useAppContext } from "../context/appContext";
import { useSelector } from "react-redux";

import StatItem from "./StatItem";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";
const StatsContainer = () => {
  const { stats } = useSelector((state) => state.lab);
  const defaultStats = [
    {
      title: "Labs Scheduled",
      count: stats.Scheduled || 0,
      icon: <FaSuitcaseRolling />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "Labs Granted",
      count: stats.Granted || 0,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "Labs Expired",
      count: stats.Expired || 0,
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
