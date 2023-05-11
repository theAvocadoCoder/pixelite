import { forwardRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

// forwardRef allows the component to access the parent's own ref value.
const CanvasComponent = forwardRef(function CanvasComponent({ project, setProject, gridSize, user, chosenColor }, ref) {
  // eslint-disable-next-line no-unused-vars
  const [penUp, togglePenUp] = useState(true);
  const [localUser, setLocalUser] = useState();
  const [localTempUserProjects, setLocalTempUserProjects] = useState();

  useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem("user"));
    let tempProjects = JSON.parse(localStorage.getItem("tempUserProjects"));
    if (user.isLoggedIn) {
      setLocalUser(userInfo);
    } else {
      setLocalTempUserProjects(tempProjects)
    }
  }, [user, setLocalUser, setLocalTempUserProjects]);

  /**
   * Add the touch move event listener to the canvas in a useEffect.
   * The reason for this is that React does not support editing the 
   * passive option on events and touch move is automatically a 
   * passive event except on Safari.
   */
  useEffect(() => {
    const canvas = document.querySelector("#canvas");

    function _drawEffect(e) {
      e.target.style.backgroundColor = chosenColor;

      let projectsArray = localUser
        ? [ ...localUser.projects ]
        : localTempUserProjects
        ? [ ...localTempUserProjects ]
        : [];

      if (projectsArray[user.projectIndex].tiles[Number(e.target.id)]) 
        projectsArray[user.projectIndex].tiles[Number(e.target.id)] = chosenColor;

      localStorage.setItem(
        (
          localUser
            ? "user"
            : localTempUserProjects
            ? "tempUserProjects"
            : ""
        ), 
        JSON.stringify(
          localUser
          ? { ...localUser, projects: projectsArray }
          : localTempUserProjects
          ? [...projectsArray]
          : ""
        )
      );
    }

    function handleTouchMove(e) {
      e.preventDefault();
      console.log("local")
      const touch = e.touches[0];
      const fakeEvent = {
        target: document.elementFromPoint(touch.clientX, touch.clientY),
      };
      if (!penUp && canvas.contains(fakeEvent.target)) {
        _drawEffect(fakeEvent);
      }
    }
    
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false })
  
    return () => {
      canvas.removeEventListener("touchmove", handleTouchMove)
    }
  }, [penUp, chosenColor, localTempUserProjects, localUser, user])
  

  function _draw(e) {
    e.target.style.backgroundColor = chosenColor;

    let projectsArray = localUser
      ? [ ...localUser.projects ]
      : localTempUserProjects
      ? [ ...localTempUserProjects ]
      : [];

    if (projectsArray[user.projectIndex].tiles[Number(e.target.id)]) 
      projectsArray[user.projectIndex].tiles[Number(e.target.id)] = chosenColor;
    
    if (project.tiles[Number(e.target.id)])
      setProject((current) => {
        let newState = {...current};
        newState.tiles[Number(e.target.id)] = chosenColor;
        return newState;
      })

    localStorage.setItem(
      (
        localUser
          ? "user"
          : localTempUserProjects
          ? "tempUserProjects"
          : ""
      ), 
      JSON.stringify(
        localUser
        ? { ...localUser, projects: projectsArray }
        : localTempUserProjects
        ? [...projectsArray]
        : ""
      )
    );
  }

  function handleMouseUp() {
    togglePenUp(true);
  }

  function handleMouseDown(e) {
    togglePenUp(false);
    _draw(e);
  }

  function handleMouseOver(e) {
    if (!penUp) {
      _draw(e)
    }
  }

  function handleTouchStart(e) {
    togglePenUp(false);
    _draw(e);
  }

  function handleTouchEnd() {
    togglePenUp(true);
  }

  return (
    <div
      id="canvas"
      className="border-2 border-solid border-gray-800 w-64 h-64 md:w-96 md:h-96 mx-auto flex flex-wrap"
      // style={{ cursor: "url(\"/assets/circle.svg\") 10 10, pointer" }}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      onMouseOver={handleMouseOver}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      // onTouchMove={handleTouchMove}
    >
      {
        project.tiles.map((el, idx) => (
          <div
            key={idx}
            id={idx}
            style={{
              width: `${100 / gridSize}%`,
              height: `${100 / gridSize}%`,
              backgroundColor: el
            }} 
            // The ref.current value is an array. The next line fills that array
            // with the individual tiles.
            ref={(element) => {ref.current[idx] = element}}  
          />
        ))
      }
    </div>
  )
})

CanvasComponent.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string,
    tiles: PropTypes.arrayOf(PropTypes.string)
  }),
  setProject: PropTypes.func.isRequired,
  gridSize: PropTypes.number,
  user: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
    projectIndex: PropTypes.number
  }),
  chosenColor: PropTypes.string,
}

export default CanvasComponent