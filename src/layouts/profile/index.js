

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Dumpster Dashboard React components
import MDBox from "components/MDBox";

// Dumpster Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";


function Overview() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header />
        <MDBox mt={2} mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={6} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title="profile information"
                description="Hi, I’m Vishal Kochiyaniya , Admin of the Dumpster Project (smart garbage monitoring system using iot)"
                info={{
                  fullName: "Vishal Kochiyaniya",
                  mobile: "(+91) 635 307 4971",
                  email: "vishalkochiyaniya@mail.com",
                  location: "IN",
                }}
                social={[
                  {
                    link: "#",
                    icon: <FacebookIcon />,
                    color: "facebook",
                  },
                  {
                    link: "#",
                    icon: <TwitterIcon />,
                    color: "twitter",
                  },
                  {
                    link: "#",
                    icon: <InstagramIcon />,
                    color: "instagram",
                  },
                ]}
                action={{ route: "", tooltip: "Edit Profile" }}
                shadow={false}
              />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
            <Grid item xs={12} md={6} xl={6}>
              <PlatformSettings />
            </Grid>
          </Grid>
        </MDBox>
           
    </DashboardLayout>
  );
}

export default Overview;
