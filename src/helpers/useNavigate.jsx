import { useNavigate } from "react-router-dom";

let navigate = useNavigate();
export const navigate = (param) => {
  instance(param);
}