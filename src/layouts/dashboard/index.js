import Grid from "@mui/material/Grid";

// Dumpster Dashboard React components
import MDBox from "components/MDBox";

// Dumpster Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { useNavigate } from "react-router-dom";
import CircleProgressBar from "./components/Progressbar";
import { Card } from "@mui/material";
import MDTypography from "components/MDTypography";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import reportsLineChartData from "./data/reportsLineChartData";
import reportsBarChartData from "layouts/rtl/data/reportsBarChartData";

function getPageContent() {
  const { sales, tasks } = reportsLineChartData
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3} >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <Card>
              <MDBox p={2} py={1} px={1} display="flex" justifyContent="center" alignItems="center">
                <CircleProgressBar percentage={90} />
              </MDBox>
              <MDTypography display="flex" alignItems="center" justifyContent="center">North Zone</MDTypography>
              <MDTypography display="flex" alignItems="center" justifyContent="center">Total : 2</MDTypography>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card><MDBox p={2} py={1} px={1} display="flex" justifyContent="center" alignItems="center" ><CircleProgressBar percentage={60} /></MDBox><MDTypography display="flex" alignItems="center" justifyContent="center">South Zone</MDTypography>
              <MDTypography display="flex" alignItems="center" justifyContent="center">Total : 1</MDTypography></Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card><MDBox p={2} py={1} px={1} display="flex" justifyContent="center" alignItems="center"><CircleProgressBar percentage={40} /></MDBox><MDTypography display="flex" alignItems="center" justifyContent="center">Central Zone</MDTypography>
            <MDTypography display="flex" alignItems="center" justifyContent="center">Total : 3</MDTypography></Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card><MDBox p={2} py={1} px={1} display="flex" justifyContent="center" alignItems="center"><CircleProgressBar percentage={40} /></MDBox><MDTypography display="flex" alignItems="center" justifyContent="center">East Zone</MDTypography>
              <MDTypography display="flex" alignItems="center" justifyContent="center">Total : 2</MDTypography></Card>
          </Grid>
        </Grid>
      </MDBox>

      <MDBox py={3}>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="error"
                  title="5"
                  description="Dustbin Over 70"
                  date="updated 4 min ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="warning"
                  title="2"
                  description="Dustbin Over 50"
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="success"
                  title="1"
                  description="Dustbin Under 50"
                  date="updated 4 min ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>

    </DashboardLayout>
  );
}

const Dashboard = () => {
  const user = localStorage.getItem("valid_user");
  console.log("user", user)
  const navigate = useNavigate();

  if (user === null) {
    navigate("/authentication/sign-in");
  } else {
    return getPageContent();
  }
  return <></>;
}

export default Dashboard;
