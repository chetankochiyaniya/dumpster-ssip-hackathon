import { useNavigate } from "react-router-dom";

const getPageContent = () =>{
    const user = localStorage.removeItem("valid_user");

    console.log("user",user)
  } 

  const Logout = () =>{
    const user = localStorage.getItem("valid_user");
    console.log("user",user)
    const navigate = useNavigate();
  
    if(user===null) {
      navigate("/authentication/sign-in");
  } else {
    return getPageContent();
  }
  return <></>;
  } 
  
  export default Logout;