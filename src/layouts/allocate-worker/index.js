import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import Table from "examples/Tables/Table";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { onValue, ref, update } from "firebase/database";

function Allocate() {
    const [deviceName, setDeviceName] = useState();
    const [worker, setWorker] = useState();
    const [ddata, setdData] = useState();
    const [wdata, setwData] = useState();
    const [isEdit, setIsEdit] = useState(false);
    const [w, setW] = useState();
    const [d, setD] = useState();
    const [message, setMessage] = useState({ error: false, msg: "" });

    useEffect(() => {
        const onValueRef = onValue(ref(db), (snapshot) => {
            setdData([]);
            setwData([]);
            const data = snapshot.val();
            if (data !== null) {
                // console.log("data",data)
                Object.values(data.worker).map((data) => {
                    setwData((oldArray) => [...oldArray, data]);
                });
                Object.values(data.smartbin).map((data) => {
                    setdData((oldArray) => [...oldArray, data]);
                });
            }
        });
        console.log("ddata", ddata)
        return () => {
        };
    }, []);

    //update
    const handleEdit = (deviceName, worker) => {
        setIsEdit(true);
        setDeviceName(deviceName)
        setWorker(worker)
    };



    const handleUpdate = () => {
        update(ref(db, `smartbin/${deviceName}`), {
            deviceName,
            worker,
        });

        setIsEdit(false);
        setDeviceName("");
        setWorker("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        console.log()
        if (deviceName == undefined || worker == undefined) {
            setMessage({ error: true, msg: "All fields are mandatory!" });
            console.log("error")
            return;
        } else {
            update(ref(db, `smartbin/${deviceName}`), {
                worker
            });
            setWorker("")
            setDeviceName("")
            console.log("succefully")

        }
    };
    return (
        <>
            <DashboardLayout>
                <DashboardNavbar />
                <Card id="delete-account">
                    <MDBox
                        pt={3}
                        px={2}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <MDTypography variant="h6" fontWeight="medium">
                            Allocate Worker
                        </MDTypography>
                    </MDBox>
                    <MDBox p={2}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                                <select
                                    value={worker}
                                    onChange={(e) => setWorker(e.target.value)}
                                    style={{
                                        width: "100%",
                                        padding: "0.75rem",
                                        fontSize: "0.875rem",
                                        fontWeight: 400,
                                        lineHeight: "1.4375em",
                                        letterSpacing: "0.00938em",
                                        borderRadius: "4px",
                                        background: "none",
                                    }}
                                >
                                    <option value="" onChange={(e) => setW(e.target.value)}>Select Worker</option>
                                    {
                                        wdata?.map((elem) => {
                                            return (
                                                <option value={w} onChange={(e) => setW(e.target.value)}>{elem.workerName}</option>
                                            )
                                        })
                                    }
                                </select>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <select
                                    value={deviceName}
                                    onChange={(e) => setDeviceName(e.target.value)}
                                    style={{
                                        width: "100%",
                                        padding: "0.75rem",
                                        fontSize: "0.875rem",
                                        fontWeight: 400,
                                        lineHeight: "1.4375em",
                                        letterSpacing: "0.00938em",
                                        borderRadius: "4px",
                                        background: "none",
                                    }}
                                >
                                    <option value="" onChange={(e) => setD(e.target.value)}>Select Device Name</option>
                                    {
                                        ddata?.map((elem) => {
                                            return (
                                                <option value={d} onChange={(e) => setD(e.target.value)}>{elem.deviceName}</option>
                                            )
                                        })
                                    }
                                </select>
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
                                    &nbsp;Allocate
                                </MDButton>
                            </MDBox>
                        )
                    }
                </Card>
                <MDBox py={3}>
                    <MDBox mb={3}>
                        <Card>
                            <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                                <MDTypography variant="h6">Allocated Worker list</MDTypography>
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
                                        { name: "worker", align: "center" },
                                        { name: "dustbin level", align: "center" },
                                        { name: "zone", align: "center" },
                                        { name: "dustbin address", align: "center" },
                                        // { name: "dustbin_name", align: "center" },
                                        { name: "edit", align: "right" },
                                    ]}

                                    rows=
                                    {
                                        ddata?.map((value) => {
                                            let x = {};
                                            const deviceName = value["deviceName"]
                                            const worker = value["worker"]
                                            // const dustbin_name = value["dustbin_name"]
                                            x["name"] = value["deviceName"]
                                            x["worker"] = value["worker"];
                                            x["dustbin level"] = value["level"]
                                            x["zone"] = value["zone"]
                                            x["dustbin address"] = value["address"]
                                            // x["dustbin_name"] = value["dustbin_name"]
                                            x["edit"] = (<MDButton variant="gradient" color="info" iconOnly
                                                onClick={() => { handleEdit(deviceName, worker); }}>
                                                <Icon>edit</Icon></MDButton>)
                                            return x;
                                        })
                                    }

                                />
                            </MDBox>
                        </Card>
                    </MDBox>
                </MDBox>
            </DashboardLayout>
        </>
    );
}

export default Allocate;
