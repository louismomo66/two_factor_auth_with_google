import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import {FaHome} from 'react-icons/fa'
import {MdComputer} from 'react-icons/md'
import {BsCalendarDayFill} from 'react-icons/bs'
import {FiBookOpen} from 'react-icons/fi'
import {BsPersonCheckFill} from 'react-icons/bs'
const links = [
  {
    id: 1,
    text: "home",
    path: "/dashboard",
    icon: <FaHome/>,
  },
  {
    id: 2,
    text: "labs",
    path: "/dashboard/labs",
    icon: <MdComputer />,
  },
  {
    id: 3,
    text: "reports",
    path: "/dashboard/reports",
    icon: <ImProfile />,
  },
  {
    id: 4,
    text: "schedules",
    path: "/dashboard/schedules",
    icon: <BsCalendarDayFill />,
  },
  {
    id: 5,
    text: "tests",
    path: "/dashboard/tests",
    icon: <FiBookOpen />,
  },
  {
    id: 6,
    text: "profile",
    path: "/dashboard/profile",
    icon: <BsPersonCheckFill />,
  },
];

export default links;
