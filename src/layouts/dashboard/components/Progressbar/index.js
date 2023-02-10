import { onValue, ref } from "firebase/database";
import { db } from "../../../../firebase/firebase";
import React, { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

const CircleProgressBar = ({ percentage }) => {
    const [data, setData] =  useState();

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setData([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data.smartbin).map((data) => {
            console.log("--------------------",data)
          setData((oldArray) => [...oldArray, data]);
        });
      }
    });
  }, []);


    
    const color = percentage < 50 ? "#00FF00" : percentage < 70 ? "#FFA500" :"#FF0000";
  return (
    <CircularProgressbar
      value={percentage}
      text={`${percentage}%`}
      strokeWidth={15}
      styles={{
        root: { width: "150px" },
        path: { stroke: color },
        text: { fill: color, fontSize: "16px" }
      }}
    />
  );
};

export default CircleProgressBar;
