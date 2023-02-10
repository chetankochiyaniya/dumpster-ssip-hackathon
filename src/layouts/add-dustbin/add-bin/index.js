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
  const { borderWidth, borderColor } = borders;

  const [deviceName, setDeviceName] = useState();
  const [res_person, setRes_Person] = useState();
  const [wardno, setWardNo] = useState();
  const [address, setAddress] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const [message, setMessage] = useState({ error: false, msg: "" });
  const [data, setData] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [test, setTest] = useState([])

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setData([]);
      const data = snapshot.val();
      console.log("check", data.smartbin)
      if (data !== null) {
        Object.values(data.smartbin).map((data) => {
          setData((oldArray) => [...oldArray, data]);
        });
      }
    });
  }, []);



  console.log("dustbin list data", data)

  //update
  const handleEdit = (deviceName, res_person, status, wardno, address) => {
    setIsEdit(true);
    setDeviceName(deviceName)
    setRes_Person(res_person)
    setWardNo(wardno)
    setAddress(address)
  };



  const handleUpdate = () => {
    update(ref(db, `smartbin/${deviceName}`), {
      deviceName,
      res_person,
      wardno,
      address
    });

    setIsEdit(false);
    setDeviceName("");
    setRes_Person("");
    setWardNo("");
    setAddress("");
  };


  //delete
  const handleDelete = (deviceName) => {
    remove(ref(db, `smartbin/${deviceName}`));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (deviceName === "" || res_person === "" || wardno === "" || address === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      console.log("err", message)
      return;
    } else {
      // const uuid = uid();
      set(ref(db, `smartbin/${deviceName}`), {
        deviceName,
        res_person,
        wardno,
        address
      });
      console.log("added")
      setDeviceName("");
      setRes_Person("");
      setWardNo("");
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


  function sendEmail(d_id, res_person, status, wardno, address) {
    emailjs.send("service_cxatqal", "template_9nx2dqv", {
      email: "ckochiyaniya950@rku.ac.in",
      name: res_person,
      did: d_id,
      address: address,
      wardno: wardno,
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
      console.log("mail send Successfully")
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
  }

  console.log("check list ", test)




  console.log("data", data)

  const navigate = useNavigate();

  const routeChange = (d_id, res_person, level, wardno, address) => {
    console.log(d_id, res_person, level, wardno, address)
    const path = `/dustbin-details`;
    navigate(path, { state: { name: d_id, res_p: res_person, lev: level, war: wardno, add: address } });
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
              <MDInput type="text" sx={{ width: "100%" }} placeholder="Dustbin ID" value={deviceName} onChange={(e) => setDeviceName(e.target.value)} />
            </Grid>
            <Grid item xs={12} md={4}>
              <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} style={{ width: "100%", padding: "0.75rem", fontSize: "0.875rem", fontWeight: 400, lineHeight: "1.4375em", letterSpacing: "0.00938em", borderRadius: "4px", background: "none" }}>
                <option value="">Select Zone</option>
                <option value="central">Central Zone</option>
                <option value="north">North Zone</option>
                <option value="east">East Zone</option>
                <option value="south">South Zone</option>
              </select>
            </Grid>
            {/* <Grid item xs={12} md={4}>
              <MDInput type="text" sx={{ width: "100%" }} placeholder="Ward Number" value={wardno} onChange={(e) => setWardNo(e.target.value)} />
            </Grid> */}
            <Grid item xs={12}  md={4} >
              <MDInput type="textbox" sx={{ width: "100%" }} placeholder="Dustbin Address" value={address} onChange={(e) => setAddress(e.target.value)} />
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
                  // { name: "Responsible_person", align: "left" },
                  { name: "Level", align: "center" },
                  { name: "Ward_no", align: "center" },
                  { name: "Address", align: "center" },
                  { name: "edit", align: "right" },
                  { name: "delete", align: "center" },
                  { name: "show", align: "center" }
                ]}

                rows=
                {
                  data?.map((value) => {
                    console.log("kkk", value)
                    let x = {};
                    const d_id = value["deviceName"]
                    const res_person = value["res_person"]
                    const level = value["level"]
                    const wardno = value["wardno"]
                    const address = value["address"]

                    // eslint-disable-next-line no-unused-expressions
                    level >= 80 ?
                      test.includes(d_id) ?
                        setTimeout(() => { }, 3600000) : sendEmail(d_id, res_person, level, wardno, address) : null

                    x["name"] = value["deviceName"]
                    // x["Responsible_person"] = value["res_person"];
                    x["Level"] = value["level"]
                    x["Ward_no"] = value["wardno"]
                    x["Address"] = value["address"]
                    x["edit"] = (<MDButton variant="gradient" color="info" iconOnly
                      onClick={() => { handleEdit(d_id, res_person, level, wardno, address); }}>
                      <Icon>edit</Icon></MDButton>)
                    x["delete"] = (<MDButton variant="gradient" color="info" iconOnly onClick={() => { handleDelete(d_id); }}><Icon>deleteforever</Icon></MDButton>)
                    x["show"] = (<MDButton variant="gradient" color="info" onClick={() => {
                      routeChange(d_id, res_person, level, wardno, address);
                    }} >show</MDButton>)
                    return x;
                  })
                }

              />
            </MDBox>
          </Card>
        </MDBox>
      </MDBox>


      {data == "undefined" ? console.log("undefine") : (
        data?.map((test) => {
          console.log("test", test.address)
        })
      )}
    </>
  );
}

export default AddBin;
