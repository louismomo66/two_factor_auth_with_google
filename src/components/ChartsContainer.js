import React, { useState } from "react";

import BarChart from "./BarChart";
import AreaChart from "./AreaChart";

import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/ChartsContainer";

export default function ChartsContainer() {
  const [barChart, setBarChart] = useState(true);

  const { monthlyLabAccesses: data } = useSelector((state) => state.lab);
  return (
    <Wrapper>
      <h4>Monthly Lab Accesses</h4>

      <button type='button' onClick={() => setBarChart(!barChart)}>
        {barChart ? "AreaChart" : "BarChart"}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
}
