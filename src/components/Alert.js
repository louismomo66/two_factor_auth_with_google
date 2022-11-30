import { useState } from "react";

const Alert = ({ alertType, alertText }) => {
  const [type,setType]=useState(alertType)
  const [text, setText] = useState(alertText);
setTimeout(() => {
  setText('')
  setType('')
}, 5000);
  return <div className={`alert alert-${type}`}>{text}</div>;
};

export default Alert;
