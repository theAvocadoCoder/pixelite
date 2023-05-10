import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import NewProjectBtn from "../../components/NewProjectBtn/NewProjectBtn";


function Profile() {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"))
   
    if (userInfo) {
      setUserInfo(userInfo);
    }

  }, [setUserInfo])
  

  return (
    <>
      {
        Object.keys(userInfo).length > 0 && (
          <>
            <div
              className="flex flex-col lg:flex-row"
            >
              <div className="flex flex-col lg:gap-5 items-center">
                <h1 className="text-xl font-bold mb-5">Hi, {userInfo.username}</h1>
                <div className="w-fit">
                  <NewProjectBtn userInfo={userInfo} />
                </div>
              </div>
              <div
                className="flex flex-wrap justify-center max-w-xs lg:max-w-xl lg:justify-start my-5 mx-auto gap-2"
                // style={{  width: "50%" }}
              >
                {
                  userInfo.projects.map((project, projectIndex) => {
                    return (
                      <Link to={`/edit/${projectIndex > 99 ? "" : projectIndex > 9 ? "0" : "00"}${projectIndex}`} key={projectIndex}>
                        <div className="h-24 w-24 flex flex-wrap justify-center border-black border-2">
                          {project.tiles.map((tile, tileIndex) => {
                            return (
                              <div key={tileIndex} style={{ backgroundColor: tile, width: `${100 / Math.sqrt(project.tiles.length)}%`, }} />
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
      {
        Object.keys(userInfo).length == 0 && (
          <>
            <h1 className="text-xl font-bold mb-5">Profile</h1>
            <h2>You may not be logged in but you can always:</h2>
            <NewProjectBtn userInfo={userInfo} />
            <div
              className="mt-20 flex w-full p-3 justify-center gap-5"
            >
              <Link to="/sign-up">
                <button
                  className="p-2 bg-blue-500 text-white font-bold rounded-sm"
                >
                  Sign Up
                </button>
              </Link>
              <Link to="/login">
                <button
                  className="p-2 border border-blue-500 text-blue-500 font-bold rounded-sm"
                >
                  Log In
                </button>
              </Link>
            </div>
          </>
        )
      }
    </>
  )
}

export default Profile