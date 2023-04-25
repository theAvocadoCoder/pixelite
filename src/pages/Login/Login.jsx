import { useLocation } from "react-router-dom"


function Login() {
  const {pathname} = useLocation();
  return (
    <>
      <h1 className="text-xl font-bold">{pathname === "/login" ? "Log In" : "Sign Up"}</h1>
    </>
  )
}

export default Login