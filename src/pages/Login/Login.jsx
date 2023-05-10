import { useLocation } from "react-router-dom";
import PageInProgress from "../../components/PageInProgress";


function Login() {

  const { pathname } = useLocation();
  
  return (
    <>
      <h1 className="text-xl font-bold mx-auto">{pathname === "/login" ? "Log In" : "Sign Up"}</h1>
      <PageInProgress />
    </>
  )
}

export default Login