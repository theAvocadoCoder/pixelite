import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { extractNumber } from "../../helpers";
import CanvasComponent from "./components/Canvas";


function WorkBench() {
  const { projectId, newProject } = useParams();
  const [projectIndex, setProjectIndex] = useState();
  const [gridSize, setGridSize] = useState(8);
  const [userInfo, setUserInfo] = useState(null);
  const [project, setProject] = useState(null);
  // eslint-disable-next-line no-unused-vars 
  const [chosenColor, setChosenColor] = useState("#000000");
  const tileRefs = useRef([]);

  const navigate = useNavigate();

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    let tempUserProjects = JSON.parse(localStorage.getItem("tempUserProjects"));
    let projectIdNum = projectId ? Number(extractNumber(projectId, 3)) : null;
   
    // Check if there is a logged in user
    if (user) {
      setUserInfo(user);
      // Check if the logged in user selected an existing project
      if (user.projects.length > 0 && typeof projectIdNum === "number" && user.projects[projectIdNum]) {
        setProject(user.projects[projectIdNum]);
        setGridSize(Math.sqrt(user.projects[projectIdNum].tiles.length));
        setProjectIndex(projectIdNum)
      } else if (newProject) {
        // The following executes if the user is making a new project
        setProject(user.projects[user.projects.length - 1]);
        setGridSize(Math.sqrt(user.projects[user.projects.length - 1].tiles.length));
        setProjectIndex(user.projects.length - 1)
      } else {
        navigate("/");
      }
    } else {
      // The following executes if no user is logged in
      if (tempUserProjects) {
        setProject(tempUserProjects[tempUserProjects.length - 1]);
        setGridSize(Math.sqrt(tempUserProjects[tempUserProjects.length - 1].tiles.length));
        setProjectIndex(tempUserProjects.length - 1)
      } else {
        navigate("/");
      }
    }

  }, [setUserInfo, projectId, setProjectIndex, setProject, setGridSize, navigate, newProject])



  return (
    <>
      <h1 className="text-xl font-bold">WorkBench</h1>
      <div>
        {
          // Check that the project is set
          project && (
            <>
              <p>Hey, {userInfo ? userInfo.username : "there"}</p>
              <p>
                This is {
                  project.name
                }, your {(projectIndex + 1)}{
                    (projectIndex === 0
                      ? "st"
                      : projectIndex === 1
                        ? "nd"
                        : projectIndex === 2
                          ? "rd"
                          : "th")
                } project. It is {`${gridSize} by ${gridSize}`}
              </p>
              <CanvasComponent
                project={project}
                gridSize={gridSize}
                user={{ 
                  isLoggedIn: userInfo ? true : false,
                  projectIndex
                 }}
                ref={tileRefs}
                chosenColor={chosenColor} 
              />
            </>
          )
        }
      </div>
    </>
  )
}

export default WorkBench