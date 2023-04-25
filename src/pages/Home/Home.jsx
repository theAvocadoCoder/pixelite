import { Link } from "react-router-dom"


function Home() {
  return (
    <>
      <h1 className="text-xl font-bold mx-auto">Home</h1>
        <Link to="/edit/untitled">
          <button className="bg-blue-500 text-gray-100 p-10 rounded-lg">
            <p>Create a new masterpiece</p>
            <p>+</p>
          </button>
        </Link>

    </>
  )
}

export default Home