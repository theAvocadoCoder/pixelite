import { useParams } from "react-router-dom"


function WorkBench() {
  const { projectId } = useParams();

  return (
    <>
      <h1 className="text-xl font-bold">WorkBench</h1>
      <p>
        {projectId && ("it is index " + Number(projectId))}
      </p>
    </>
  )
}

export default WorkBench