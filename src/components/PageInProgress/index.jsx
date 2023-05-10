import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const PageInProgress = () => {
  const dialogRef = useRef();

  const navigate = useNavigate();

  function closeModal() {
    dialogRef.current.close();
  } 

  return (
    <dialog
      ref={dialogRef}
      open
      className="bg-slate-50 mt-20 rounded-md w-fit"
    >
      <p>Oop! You caught me! 😅</p>
      <p>{`I'm still working on this page. Why don't you try making some pixel art?`}</p>
    
      <div
        className="flex flex-col items-center md:flex-row md:justify-center gap-5 my-5"
      >
        <button className="p-3 bg-blue-500 text-white rounded-md w-max" onClick={() => navigate("/")}>Sure, why not?</button>
        <button className="p-3 border border-red-500 text-red-500 rounded-md w-fit" onClick={closeModal}>Nope! I love staring at blank pages</button>
      </div>
    </dialog>
  )
}

export default PageInProgress