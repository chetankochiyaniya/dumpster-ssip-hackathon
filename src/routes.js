// Dumpster Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import ResetPassword from "layouts/authentication/reset-password"
import AddDustbin from "layouts/add-dustbin";

// @mui icons
import Icon from "@mui/material/Icon";

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
    key: "billing",
    route: "/add-dustbin",
    icon: <Icon size="12px" />,
    component: <AddDustbin />,
    noCollapse: true,
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
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    name: "Reset Password",
    key: "reset-passwoed",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/resetpassword",
    component: <ResetPassword /> ,
  },
];

export default routes;
