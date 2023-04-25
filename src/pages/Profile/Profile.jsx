import { useEffect, useState } from "react";
import { Link } from "react-router-dom"


function Profile() {
  // const userInfo = localStorage.getItem("user");
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"))
   
    if (userInfo) {
      setUserInfo(userInfo);
    }

  }, [])
  

  return (
    userInfo && <>
      <h1 className="text-xl font-bold mb-5">Profile</h1>
      <div>
        <h2>Hi, {userInfo.username}</h2>
        <Link to="/edit/untitled">
          <button className="bg-blue-500 text-white font-bold text-lg p-8 rounded-lg">
            <p>Create a new masterpiece</p>
            <p className="text-3xl">+</p>
          </button>
        </Link>
        <div className="flex mt-5">
          {
            userInfo.projects.map((project, projectIndex) => {
              return (
                <Link to={`/edit/${projectIndex > 99 ? "" : projectIndex > 9 ? "0" : "00"}${projectIndex}`} key={projectIndex} className="m-auto">
                  <div className="h-24 w-24 flex flex-wrap">
                    {project.tiles.map((tile, tileIndex) => {
                      return (
                        <div key={tileIndex} style={{ backgroundColor: tile, width: `${100 / 8}%`, }} />
                      )
                    })}
                  </div>
                </Link>
              );
            })
          }
        </div>
      </div>
        
    </>
  )
}

export default Profile