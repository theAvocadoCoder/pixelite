import PropTypes from "prop-types";
import DownloadBtn from "./DownloadBtn";

const Controls = ({
  setChosenColor,
  chosenColor,
  project,
}) => {
  function handleColorInputChange(e) {
    setChosenColor(() => e.target.value);
  }

  return (
    <div className="mt-5 w-64 md:w-96 mx-auto flex justify-evenly">
      <div className="flex w-max">
        <input 
          id="select-color"
          className="h-0 w-0 opacity-0 border-none outline-none"
          type="color"
          onInput={handleColorInputChange} 
        />
        <label 
          htmlFor="select-color"
          className="flex gap-1 items-center"
        >
          <div
            className="rounded-full w-5 h-5"
            style={{ backgroundColor: chosenColor }}
          />
          <p>Color</p>
        </label>
      </div>
      <div>
        <DownloadBtn project={project} />
      </div>
    </div>
  )
}

Controls.propTypes = {
  setChosenColor: PropTypes.func.isRequired,
  chosenColor: PropTypes.string.isRequired,
  project: PropTypes.shape({
    name: PropTypes.string,
    tiles: PropTypes.arrayOf(PropTypes.string)
  }),
}

export default Controls