import { forwardRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

// forwardRef allows the component to access the parent's own ref value.
const CanvasComponent = forwardRef(function CanvasComponent({ project, gridSize, user, chosenColor }, ref) {
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
  }, [user, setLocalUser, setLocalTempUserProjects])
  

  function _draw(e) {
    e.target.style.backgroundColor = chosenColor;
    if (localUser) {
      let projectsArray = [ ...localUser.projects ];
      projectsArray[user.projectIndex].tiles[Number(e.target.id)] = chosenColor;
      localStorage.setItem("user", JSON.stringify({ ...localUser, projects: projectsArray }));
    } else if (localTempUserProjects) {
      let projectsArray = [ ...localTempUserProjects ];
      projectsArray[user.projectIndex].tiles[Number(e.target.id)] = chosenColor;
      localStorage.setItem("tempUserProjects", JSON.stringify([...projectsArray]));
    }
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

  function handleTouchMove(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const fakeEvent = {
      target: document.elementFromPoint(touch.clientX, touch.clientY),
    };
    if (!penUp && e.target.contains(fakeEvent.target)) {
      _draw(fakeEvent);
    }
    console.log(e);
  }

  return (
    <div
      id="canvas"
      className="border-2 border-solid border-gray-800 w-96 h-96 mx-auto flex flex-wrap"
      // style={{ cursor: "url(\"/assets/circle.svg\") 10 10, pointer" }}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      onMouseOver={handleMouseOver}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
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
  gridSize: PropTypes.number,
  user: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
    projectIndex: PropTypes.number
  }),
  chosenColor: PropTypes.string,
}

export default CanvasComponent