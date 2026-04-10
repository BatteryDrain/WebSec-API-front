import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();
  localStorage.clear();
  navigate("/login");
  return null;
};
