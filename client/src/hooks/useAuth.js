import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout as logoutAction } from "../store/authSlice";

const useAuth = () => {
  const storedUser = localStorage.getItem("user_info");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const user = useSelector((state) => state.auth.user) || parsedUser;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logoutAction());
    localStorage.removeItem("user_info");
    navigate("/login");
  };

  return {
    user,
    logout,
  };
};

export default useAuth;
