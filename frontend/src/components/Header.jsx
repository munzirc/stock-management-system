import { useContext } from "react";
import { Context } from "../context/ContextApi";
import authApi from "../services/auth.api";

const Header = () => {

  const {setIsAuthenticated, showSnackbar} = useContext(Context);

  const handleLogout = async () => {
     try {
       const data = await authApi.logout();
       showSnackbar({ message: data.message, severity: data.severity });
     } catch (error) {
       showSnackbar({ message: error.message, severity: "error" });
     }finally{
      setIsAuthenticated(false);
     }
  };

  return (
    <header className="w-full px-8 py-3 flex justify-between items-center bg-white  shadow-[0px_5px_21px_-5px_#CDD1E1]  z-50 relative">
      <h1 className="text-xl text-[#4B49AC] font-bold">
        Dashboard
      </h1>
      <button
        onClick={handleLogout}
        className="bg-[#4B49AC] hover:bg-[#3a3991] active:scale-95 text-white px-4 py-2 rounded-lg text-sm transition-transform duration-150 shadow-md"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
