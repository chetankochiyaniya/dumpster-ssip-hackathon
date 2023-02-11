// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// MD UI Dashboard React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// MD UI Dashboard React base styles
import borders from "assets/theme/base/borders";

import MDInput from "components/MDInput";
import { useEffect, useState } from "react";

import { db } from "../../../firebase/firebase";
import { set, ref, onValue, remove, update } from "firebase/database";
import Table from "examples/Tables/Table";
import emailjs from '@emailjs/browser';
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


function AddBin() {
  const [deviceName, setDeviceName] = useState();
  const [zone, setzone] = useState();
  const [address, setAddress] = useState();
  const [message, setMessage] = useState({ error: false, msg: "" });
  const [data, setData] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [test, setTest] = useState([])

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setData([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data.smartbin).map((data) => {
          setData((oldArray) => [...oldArray, data]);
        });
      }
    });
  }, []);

  //update
  const handleEdit = (deviceName, status, zone, address) => {
    setIsEdit(true);
    setDeviceName(deviceName)
    setzone(zone)
    setAddress(address)
  };



  const handleUpdate = () => {
    update(ref(db, `smartbin/${deviceName}`), {
      deviceName,
      zone,
      address
    });

    setIsEdit(false);
    setDeviceName("");
    setzone("");
    setAddress("");
  };


  //delete
  const handleDelete = (deviceName) => {
    remove(ref(db, `smartbin/${deviceName}`));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (deviceName === "" || zone === "" || address === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    } else {
      const level = 0;
      set(ref(db, `smartbin/${deviceName}`), {
        deviceName,
        level,
        zone,
        address
      });
      setDeviceName("");
      setzone("");
      setAddress("");

    }
  };


  const Toast = swal.mixin({
    customClass: {
      zIndex: 1000
    },
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", swal.stopTimer);
      toast.addEventListener("mouseleave", swal.resumeTimer);
    },
  });


  const key = "myFunctionCalledAt";

function sendEmail(d_id, worker, status, zone, address) {
  const storedTime = localStorage.getItem(key);
  if (storedTime) {
    const elapsedTime = new Date() - new Date(storedTime);
    if (elapsedTime < 1000 * 60 * 30) {
      console.log("Function will be called after 30 minutes.");
      return;
    }
  }
  localStorage.setItem(key, new Date());
  emailjs.send("service_cxatqal", "template_9nx2dqv", {
    email: "ckochiyaniya950@rku.ac.in",
    name: worker,
    did: d_id,
    address: address,
    zone: zone,
    status: status,
  }, "azjlPTfE4F0zrZFJm").then(function (response) {
    Toast.fire({
      customClass: {
        timerProgressBar: 'timerBar'
      },
      color: 'white',
      background: '#222',
      icon: "success",
      title: " mail send Successfully",
    });
    setTest([...test, d_id])
  }, function (error) {
    Toast.fire({
      customClass: {
        timerProgressBar: 'timerBar'
      },
      color: 'white',
      background: '#222',
      icon: "error",
      title: `FAILED...Try Again`,
    });
  });
console.log("Function called for the first time or after 30 minutes.");
}
    

  const navigate = useNavigate();

  const routeChange = (d_id,  level,res, zone, address) => {
    const path = `/dustbin-details`;
    navigate(path, { state: { name: d_id, lev: level,res_p:res, war: zone, add: address } });
  };


  return (
    <>
      <Card id="delete-account">
        <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
          <MDTypography variant="h6" fontWeight="medium">
            Add Dustbin
          </MDTypography>
        </MDBox>
        <MDBox p={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <MDInput type="text" required sx={{ width: "100%" }} placeholder="Dustbin ID" value={deviceName} onChange={(e) => setDeviceName(e.target.value)} />
            </Grid>
            <Grid item xs={12} md={4}>
              <select value={zone} required onChange={(e) => setzone(e.target.value)} style={{ width: "100%", color: "#495057", borderColor: "#495057", padding: "0.75rem", fontSize: "0.875rem", fontWeight: 400, lineHeight: "1.4375em", letterSpacing: "0.00938em", borderRadius: "4px", background: "none" }}>
                <option value="">Select Zone</option>
                <option value="central">Central Zone</option>
                <option value="north">North Zone</option>
                <option value="east">East Zone</option>
                <option value="south">South Zone</option>
              </select>
            </Grid>
            {/* <Grid item xs={12} md={4}>
              <MDInput type="text" sx={{ width: "100%" }} placeholder="Ward Number" value={zone} onChange={(e) => setzone(e.target.value)} />
            </Grid> */}
            <Grid item xs={12}  md={4} >
              <MDInput type="text" required sx={{ width: "100%" }} placeholder="Dustbin Address" value={address} onChange={(e) => setAddress(e.target.value)} />
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
                &nbsp;add new Dustbin
              </MDButton>
            </MDBox>
          )
        }


      </Card>

      <MDBox py={3}>
        <MDBox mb={3}>
          <Card>
            <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <MDTypography variant="h6">Dustbin list</MDTypography>
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
                  { name: "Level", align: "center" },
                  { name: "Zone", align: "center" },
                  { name: "Address", align: "center" },
                  { name: "edit", align: "right" },
                  { name: "delete", align: "center" },
                  { name: "show", align: "center" }
                ]}

                rows=
                {
                  data?.map((value) => {
                    let x = {};
                    const d_id = value["deviceName"]
                    const level = value["level"]
                    const zone = value["zone"]
                    const address = value["address"]
                    const worker = value["worker"]

                    // eslint-disable-next-line no-unused-expressions
                    // level >= 80 ?
                    //   test.includes(d_id) ?
                    //     setTimeout(() => { }, 3600000) : sendEmail(d_id, level, zone, address) : null
                        // eslint-disable-next-line no-unused-expressions
                        level >= 80 ? sendEmail(d_id, worker, level, zone, address) : null

                    x["name"] = value["deviceName"]
                    x["worker"] = value["worker"];
                    x["Level"] = value["level"]
                    x["Zone"] = value["zone"]
                    x["Address"] = value["address"]
                    x["edit"] = (<MDButton variant="gradient" color="info" iconOnly
                      onClick={() => { handleEdit(d_id, level, zone, address); }}>
                      <Icon>edit</Icon></MDButton>)
                    x["delete"] = (<MDButton variant="gradient" color="info" iconOnly onClick={() => { handleDelete(d_id); }}><Icon>deleteforever</Icon></MDButton>)
                    x["show"] = (<MDButton variant="gradient" color="info" onClick={() => {
                      routeChange(d_id, level,worker, zone, address);
                    }} >show</MDButton>)
                    return x;
                  })
                }

              />
            </MDBox>
          </Card>
        </MDBox>
      </MDBox>
    </>
  );
}

export default AddBin;
