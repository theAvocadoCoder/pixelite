import { Link, Outlet } from "react-router-dom"

function Navbar() {
  return (
    <>
      <ul className="flex max-w-screen justify-around mb-10">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/sign-up">Signup</Link>
        </li>
      </ul>
      <Outlet />
    </>
  )
}

export default Navbar