import { useSelector } from "react-redux";

const useAuth = () => {
  const { user } = useSelector((state) => state.auth);
  const isAuthenticated = !!user;

  return {
    isAuthenticated,
    user_type: user?.user_type,
  };
};

export default useAuth;
