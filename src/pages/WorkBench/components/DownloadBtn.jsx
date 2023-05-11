import { useState, useRef } from "react";
import PropTypes from "prop-types";

const DownloadBtn = ({project}) => {
  const [
    canvasImg,
    setCanvasImg
  ] = useState("");
  const [
    previewImg,
    setPreviewImg
  ] = useState("");

  const dialogRef = useRef(null);
  const previewImgRef = useRef(null);
  const canvasRef = useRef(null);
  const imageBtnRef = useRef(null);

  function openPreview() {
    const canvas = canvasRef.current;
    console.log(project.tiles[0]);
    const ctx = canvas.getContext("2d");
    let xPosition = 0;
    let yPosition = 0;
    const pixelSize =
      1024 / Math.sqrt(project.tiles.length);

    for (let i = 0; i < project.tiles.length; i++) {
      ctx.fillStyle = project.tiles[i];
      ctx.fillRect(
        xPosition,
        yPosition,
        pixelSize,
        pixelSize
      );

      if (Math.floor(xPosition + pixelSize) === 1024 || Math.ceil(xPosition + pixelSize) === 1024) {
        xPosition = 0;
        yPosition = yPosition + pixelSize;
      } else {
        xPosition += pixelSize;
      }
    }

    setCanvasImg(canvas.toDataURL());
    setPreviewImg(canvas.toDataURL());
    dialogRef.current.showModal();
  }

  return (
    <div>
      <button
        onClick={openPreview}
      >
        Download
      </button>
      <dialog ref={dialogRef}>
        <img
          ref={previewImgRef}
          width="300px"
          height="300px"
          src={previewImg}
          style={{ margin: "auto" }}
        />
        <canvas
          ref={canvasRef}
          height="1024px"
          width="1024px"
          style={{ display: "none" }}
        >
          Your browser does not support HTML canvas,
          sorry.
        </canvas>
        <button
          style={{ margin: "10px auto" }}
          ref={imageBtnRef}
          onClick={() => dialogRef.current.close()}
        >
          <a
            href={canvasImg}
            download={project.name}
            style={{ textDecoration: "none" }}
            className="text-black"
          >
            Download Image
          </a>
        </button>
      </dialog>
    </div>
  )
}

DownloadBtn.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string,
    tiles: PropTypes.arrayOf(PropTypes.string)
  }),
}

export default DownloadBtn