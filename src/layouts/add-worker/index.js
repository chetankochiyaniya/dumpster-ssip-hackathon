/**
=========================================================
* MD UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/MD-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the MDware.
*/

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// MD UI Dashboard React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// MD UI Dashboard React base styles
import borders from "assets/theme/base/borders";

// Images
import masterCardLogo from "assets/images/logos/mastercard.png";
import visaLogo from "assets/images/logos/visa.png";
import MDInput from "components/MDInput";
import { useEffect, useState } from "react";

import { db } from "../../firebase/firebase";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import Table from "examples/Tables/Table";
// MD UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";


function AddWorker() {
  const { borderWidth, borderColor } = borders;

  const [workerName, setworkerName] = useState();
  const [email_id, setemail_id] = useState();
  const [address, setaddress] = useState();
  const [dustbin_name, setdustbin_name] = useState();
  const [message, setMessage] = useState({ error: false, msg: "" });
  const [data, setData] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [number,setNumber] = useState();

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setData([]);
      const data = snapshot.val();
      console.log("check", data.worker)
      if (data !== null) {
        Object.values(data.worker).map((data) => {
          setData((oldArray) => [...oldArray, data]);
        });
      }
    });
  }, []);



  console.log("dustbin list data", data)

  //update
  const handleEdit = (workerName, email_id, number, address, dustbin_name) => {
    setIsEdit(true);
    setworkerName(workerName)
    setNumber(number)
    setemail_id(email_id)
    setaddress(address)
    setdustbin_name(dustbin_name)
  };



  const handleUpdate = () => {
    update(ref(db, `worker/${workerName}`), {
      workerName,
        email_id,
        address,
        dustbin_name,
        number
    });

    setIsEdit(false);
    setworkerName("");
    setemail_id("");
    setaddress("");
    setdustbin_name("");
    setNumber("");
  };


  //delete
  const handleDelete = (workerName) => {
    remove(ref(db, `worker/${workerName}`));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (workerName === "" || email_id === "" || address === "" || dustbin_name === "" || number === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      console.log("err", message)
      return;
    } else {
      // const uuid = uid();
      set(ref(db, `worker/${workerName}`), {
        workerName,
        email_id,
        address,
        dustbin_name,
        number
      });
      console.log("added")
      setworkerName("");
      setemail_id("");
      setaddress("");
      setdustbin_name("");
      setNumber("")

    }
  };

  console.log("data", data)


  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mt={4}>
          <MDBox mb={1.5}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card id="delete-account">
                  <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
                    <MDTypography variant="h6" fontWeight="medium">
                      Add Worker
                    </MDTypography>
                  </MDBox>
                  <MDBox p={2}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <MDInput type="text" sx={{width:"100%"}} placeholder="Worker Name" value={workerName} onChange={(e) => setworkerName(e.target.value)} />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <MDInput type="text" sx={{width:"100%"}} placeholder="Email Id" value={email_id} onChange={(e) => setemail_id(e.target.value)} />
                      </Grid>
                      {/* <Grid item xs={12} md={6}>
                        <MDInput type="text" sx={{width:"100%"}} placeholder="Dustbin Name" value={dustbin_name} onChange={(e) => setdustbin_name(e.target.value)} />
                      </Grid> */}
                      <Grid item xs={12} md={6}>
                        <MDInput type="text" sx={{width:"100%"}} placeholder="Phone Number" value={number} onChange={(e) => setNumber(e.target.value)} />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <MDInput type="text" sx={{width:"100%"}} placeholder="Worker Address" value={address} onChange={(e) => setaddress(e.target.value)} />
                      </Grid>
                    </Grid>
                  </MDBox>
                  {
                    isEdit ? (
                      <MDBox p={2}>
                        <MDButton variant="gradient" color="dark" onClick={handleUpdate}>
                          <Icon sx={{ fontWeight: "bold" }}>edit</Icon>
                          &nbsp;Edit
                        </MDButton>
                      </MDBox>
                    ) : (
                      <MDBox p={2}>
                        <MDButton variant="gradient" color="dark" onClick={handleSubmit}>
                          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                          &nbsp;add new Worker
                        </MDButton>
                      </MDBox>
                    )
                  }


                </Card>

                <MDBox py={3}>
                  <MDBox mb={3}>
                    <Card>
                      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                        <MDTypography variant="h6">Worker list</MDTypography>
                      </MDBox>
                      <MDBox
                        sx={{
                          "& .MuiTableRow-root:not(:last-child)": {
                            "& td": {
                              borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                                `${borderWidth[1]} solid ${borderColor}`,
                            },
                          },
                        }}
                      >

                        <Table
                          columns={[
                            { name: "name", align: "center" },
                            { name: "email_id", align: "center" },
                            { name: "number", align: "center" },
                            { name: "address", align: "center" },
                            // { name: "dustbin_name", align: "center" },
                            { name: "edit", align: "right" },
                            { name: "delete", align: "center" },
                          ]}

                          rows=
                          {
                            data?.map((value) => {
                              console.log("kkk", value)
                              let x = {};
                              const name = value["workerName"]
                              const email_id = value["email_id"]
                              const number = value["number"]
                              const address = value["address"]
                              // const dustbin_name = value["dustbin_name"]
                              x["name"] = value["workerName"]
                              x["email_id"] = value["email_id"];
                              x["number"] = value["number"]
                              x["address"] = value["address"]
                              // x["dustbin_name"] = value["dustbin_name"]
                              x["edit"] = (<MDButton variant="gradient" color="info" iconOnly
                                onClick={() => { handleEdit(name, email_id, number, address, dustbin_name); }}>
                                <Icon>edit</Icon></MDButton>)
                              x["delete"] = (<MDButton variant="gradient" color="info" iconOnly onClick={() => { handleDelete(name); }}><Icon>deleteforever</Icon></MDButton>)
                              return x;
                            })
                          }

                        />
                      </MDBox>
                    </Card>
                  </MDBox>
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>

      </DashboardLayout>


      {/* {data=="undefined" ? console.log("undefine"):( 
      data?.map((test)=>{
        console.log("test",test.dustbin_name)
      })
    )} */}
    </>
  );
}

export default AddWorker;
