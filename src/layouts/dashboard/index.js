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

function getPageContent() {

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3} >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <Card><MDBox p={2} py={1} px={1} display="flex" justifyContent="center" alignItems="center"><CircleProgressBar percentage={90} /></MDBox><MDTypography display="flex" alignItems="center" justifyContent="center">North Zone</MDTypography></Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card><MDBox p={2} py={1} px={1} display="flex" justifyContent="center" alignItems="center" ><CircleProgressBar percentage={60} /></MDBox><MDTypography display="flex" alignItems="center" justifyContent="center">South Zone</MDTypography></Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card><MDBox p={2} py={1} px={1} display="flex" justifyContent="center" alignItems="center"><CircleProgressBar percentage={40} /></MDBox><MDTypography display="flex" alignItems="center" justifyContent="center">Central Zone</MDTypography></Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card><MDBox p={2} py={1} px={1} display="flex" justifyContent="center" alignItems="center"><CircleProgressBar percentage={40} /></MDBox><MDTypography display="flex" alignItems="center" justifyContent="center">East Zone</MDTypography></Card>
          </Grid>
          </Grid>
          </MDBox>
      
      
      
      
      {/* <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Bookings"
                count={281}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Today's Users"
                count="2,300"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Revenue"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
       */}
    </DashboardLayout>
  );
}

const Dashboard = () =>{
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

export default Dashboard;
