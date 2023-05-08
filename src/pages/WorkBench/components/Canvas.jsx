import { forwardRef } from "react";
import { randomColor } from "../../../helpers"
import PropTypes from "prop-types";

// forwardRef allows the component to access the parent's own ref value.
const CanvasComponent = forwardRef(function CanvasComponent({ projectArray, gridSize }, ref) {
  return (
    <div
      id="canvas"
      className="border-2 border-solid border-gray-800 w-96 h-96 mx-auto flex flex-wrap"
      style={{ cursor: "url(\"/assets/circle.svg\") 10 10, pointer" }}
    >
      {
        projectArray.map((el, idx) => (
          <div
            key={idx}
            style={{
              width: `${100 / gridSize}%`,
              height: `${100 / gridSize}%`,
              // Next line is an experimental feature. When a new project is 
              // opened, it displays the canvas as a mosaic until the grid size
              // is set
              backgroundColor: `${typeof el === "string" ? el : randomColor()}`
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
  projectArray: PropTypes.array,
  gridSize: PropTypes.number
}

export default CanvasComponent