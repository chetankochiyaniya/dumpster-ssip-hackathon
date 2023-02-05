import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

//Dumpster Dashboard React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function PlatformSettings() {
  const [followsMe, setFollowsMe] = useState(true);
  const [answersPost, setAnswersPost] = useState(false);
  const [newLaunches, setNewLaunches] = useState(false);
  const [productUpdate, setProductUpdate] = useState(true);


  return (
    <Card>
      <MDBox pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          platform settings
        </MDTypography>
      </MDBox>
      <MDBox pt={1.5} pb={2} px={2} lineHeight={1.25}>
        <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
          account
        </MDTypography>
        <MDBox display="flex" >
          <MDBox mt={0.25}>
            <Switch checked={followsMe} onChange={() => setFollowsMe(!followsMe)} />
          </MDBox>
          <MDBox width="80%" ml={2}>
            <MDTypography variant="button" fontWeight="regular" color="text">
            Email me weekly admin panel report
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox display="flex" >
          <MDBox mt={0.25}>
            <Switch checked={answersPost} onChange={() => setAnswersPost(!answersPost)} />
          </MDBox>
          <MDBox width="80%" ml={2}>
            <MDTypography variant="button" fontWeight="regular" color="text">
            Email me when someone send query
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox mt={3}>
          <MDTypography
            variant="caption"
            fontWeight="bold"
            color="text"
            textTransform="uppercase"
          >
            Report
          </MDTypography>
        </MDBox>
        <MDBox display="flex" >
          <MDBox mt={0.25}>
            <Switch checked={newLaunches} onChange={() => setNewLaunches(!newLaunches)} />
          </MDBox>
          <MDBox width="80%" ml={2}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              New dustbin and worker adding report (weekly)
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox display="flex" >
          <MDBox mt={0.25}>
            <Switch checked={productUpdate} onChange={() => setProductUpdate(!productUpdate)} />
          </MDBox>
          <MDBox width="80%" ml={2}>
            <MDTypography variant="button" fontWeight="regular" color="text">
            send warning letter for poor performance
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default PlatformSettings;
