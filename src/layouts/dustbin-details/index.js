/* eslint-disable jsx-a11y/iframe-has-title */


// @mui material components
import Grid from "@mui/material/Grid";

import dumpsterImage from "assets/images/dumpster.svg"

// MD UI Dashboard React components
import MDBox from "components/MDBox";

// MD UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useLocation } from "react-router-dom";
import MDTypography from "components/MDTypography";
import CircleProgressBar from "layouts/dashboard/components/Progressbar";


function DustbinDetails() {
    const { state } = useLocation();

  return (
    <DashboardLayout>
    <DashboardNavbar />
      <MDBox mt={5} mb={3}>
        <Grid container spacing={3}>
        <Grid item xs={12} md={4} xl={4}>
          <MDBox
                height="100%"
                display="grid"
                alignItems="center"
                justifyContent="center"
                padding="20px"
                borderRadius="lg"
                variant="gradient"
              >
                <CircleProgressBar percentage={state.lev} />
              </MDBox>
          </Grid>
          <Grid item xs={12} md={8} xl={8}>
            <MDBox
                height="100%"
                display="grid"
                alignItems="center"
                padding="20px"
                borderRadius="lg"
                variant="gradient"
              >
                <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
                  Dustbin Name :  {state.name} ,
                </MDTypography>
                <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
                  Responsible Person :  {state.res_p} ,
                </MDTypography>
                <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
                  Level :  {state.lev} ,
                </MDTypography>
                <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
                  Ward Number :  {state.war} ,
                </MDTypography>
                <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
                  Address :  {state.add} 
                </MDTypography>

              </MDBox>
          </Grid>
          </Grid>
      </MDBox> 

      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.9940857916185!2d70.89866591475415!3d22.240303185354804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959b4a660019ee9%3A0x3d6254f36ed0e794!2sRK%20University%20Main%20Campus!5e0!3m2!1sen!2sin!4v1665189458482!5m2!1sen!2sin" width="100%" height="450" ></iframe>

    </DashboardLayout>
  );
}

export default DustbinDetails;
