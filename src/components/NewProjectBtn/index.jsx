import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { randomNumber } from "../../helpers";


// forwardRef allows the component to access the parent's own ref value.
function NewProjectBtn({ userInfo }) {
  const [gridSize, setGridSize] = useState(8);
  const [newProjectName, setNewProjectName] = useState("");
  const dialogRef = useRef(null);

  const navigate = useNavigate();

  function increaseGridSize() {
    gridSize < 64 && setGridSize(() => gridSize + 4);
  }

  function decreaseGridSize() {
    gridSize > 8 && setGridSize(() => gridSize - 4);
  }

  function openModal() {
    dialogRef.current.showModal();
  }

  function closeModal() {
    dialogRef.current.close();
  }

  function handleSetSize() {
    dialogRef.current.close();
    // template for a new project
    const newProject = {
      name: `${newProjectName == "" ? "untitled" + randomNumber(6) : newProjectName}`,
      tiles: [...Array(gridSize * gridSize).fill("#ffffff")]
    }
    
    let tempUserProjects = JSON.parse(localStorage.getItem("tempUserProjects"));

    if (Object.keys(userInfo).length > 0) {
      localStorage.setItem("user", JSON.stringify({ ...userInfo, projects: [...userInfo.projects, newProject] }));
    } else if (tempUserProjects) {
      localStorage.setItem("tempUserProjects", JSON.stringify([...tempUserProjects, newProject]));
    } else {
      localStorage.setItem("tempUserProjects", JSON.stringify([newProject]));
    }
    navigate(`/new/${newProject.name}`);
  }

  return (
    <>
      <button
        className="bg-blue-500 text-white font-bold text-lg p-8 rounded-lg"
        onClick={openModal}
      >
        <p>Create a new masterpiece</p>
        <p className="text-3xl">+</p>
      </button>

      <dialog ref={dialogRef}>
        <p>Prime your canvas, Picasso</p>
        <p>Name:</p>
        <input
          type="text"
          className="border-blue-400 border-2 rounded-md"
          onChange={(e) => {setNewProjectName(e.target.value)}}
        />
        <p>Size:</p>
        <p className="m-2">
          <button onClick={decreaseGridSize} className={`px-3 font-bold ${gridSize === 8 ? "bg-slate-300 text-slate-400" : "bg-slate-500 text-white" }`}>-</button>
          <span className="mx-2">{gridSize}</span>
          <button onClick={increaseGridSize} className={`px-3 font-bold ${gridSize === 64 ? "bg-slate-300 text-slate-400" : "bg-slate-500 text-white" }`}>+</button>
        </p>
        <button className="m-2 px-3 bg-slate-500 text-white" onClick={closeModal}>Cancel</button>
        <button className="m-2 px-3 bg-slate-500 text-white" onClick={handleSetSize}>Set Size</button>
      </dialog>
    </>
  )
}

NewProjectBtn.propTypes = {
  userInfo: PropTypes.shape({
    username: PropTypes.string,
    projects: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      tiles: PropTypes.arrayOf(PropTypes.string)
    }))
  }).isRequired
}

export default NewProjectBtn