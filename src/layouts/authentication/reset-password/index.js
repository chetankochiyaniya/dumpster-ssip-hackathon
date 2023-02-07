

// @mui material components
import Card from "@mui/material/Card";

// Dumpster Dashboard React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-reset-cover.jpeg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../../../firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

function RestPassword() {
  

  const [email, setEmail] = useState();
  const navigate = useNavigate();

  const sendMail = () => {
      console.log("email",email)
      sendPasswordResetEmail(auth, email)
          .then((res) => {
              // Password reset email sent!
              localStorage.removeItem("validate")
              console.log("email is sended !")
              alert("check your email !!")
              navigate('/authentication/sign-in')
              
          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              // ..
              console.log("error",errorMessage)
              alert("plase enter valid details")
          });
  }

  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
            Reset Password
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            You will receive an e-mail in maximum 60 seconds
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={4}>
              <MDInput type="email" label="Email" variant="standard" fullWidth onChange={e => setEmail(e.target.value)} />
            </MDBox>
            <MDBox mt={6} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={sendMail}>
                reset
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default RestPassword;
