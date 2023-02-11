import { useNavigate } from "react-router-dom";

const Logout = () =>{
    const user = localStorage.removeItem("valid_user");

    const navigate = useNavigate();

      if(localStorage.getItem("valid_user") == undefined || localStorage.getItem("valid_user") == null){
        navigate("/authentication/sign-in");
      }else{
        setTimeout(()=>{Logout()},1000)
      }

      return <></>
  
  } 
  
  export default Logout;