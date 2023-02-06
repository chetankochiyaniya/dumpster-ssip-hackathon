

// @mui material components
import Grid from "@mui/material/Grid";

// MD UI Dashboard React components
import MDBox from "components/MDBox";

// MD UI Dashboard React components
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// MD UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import AddBin from "./add-bin";

function AddDustbin() {

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={4}>
        <MDBox mb={1.5}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
                  <AddBin />
              </Grid>
            </Grid>
        </MDBox>
      </MDBox>
      
    </DashboardLayout>
  );
}

export default AddDustbin;
