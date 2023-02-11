// Dumpster Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import ResetPassword from "layouts/authentication/reset-password"
import AddWorker from "layouts/add-worker"
import AddBin from "layouts/add-dustbin";
import DustbinDetails from "layouts/dustbin-details";
import Logout from "layouts/authentication/logout";
import Allocate from "layouts/allocation"

// @mui icons
import Icon from "@mui/material/Icon";
import SearchableDropdown from "layouts/allocate-worker";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Add Dustbin",
    key: "add-dustbin",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/add-dustbin",
    component: <AddBin /> ,
  },
  {
    type: "collapse",
    name: "Add Worker",
    key: "add-worker",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/add-worker",
    component: <AddWorker />,
  },
  // {
  //   type: "collapse",
  //   name: "Allocation ",
  //   key: "allocation",
  //   icon: <Icon fontSize="small">dashboard</Icon>,
  //   route: "/allocation",
  //   component: <Allocate />,
  // },
  {
    type: "collapse",
    name: "Allocate Worker",
    key: "allocate-worker",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/allocate-worker",
    component: <SearchableDropdown />,
  },
  {
    name: "Dustbin Details",
    key: "dustbin-details",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dustbin-details",
    component: <DustbinDetails />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Logout",
    key: "logout",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/logout",
    component: <Logout />,
  },
  {
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    name: "Reset Password",
    key: "reset-password",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/resetpassword",
    component: <ResetPassword /> ,
  },
];

export default routes;
