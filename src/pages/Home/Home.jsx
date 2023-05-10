import { useEffect, useState } from "react";
import NewProjectBtn from "../../components/NewProjectBtn/NewProjectBtn"


function Home() {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"))
   
    if (userInfo) {
      setUserInfo(userInfo);
    }

  }, [])

  return (
    <>
      <h1 className="text-xl font-bold mx-auto">Home</h1>
      <NewProjectBtn userInfo={userInfo} />

    </>
  )
}

export default Home