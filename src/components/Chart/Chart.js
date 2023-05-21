import React, { useState } from "react";
import { Line } from "@ant-design/plots";
const Data = [
  {
    name: "Khóa HTML",
    time: "16/1",
    gdp: 9,
  },
  {
    name: "Khóa CSS",
    time: "16/1",
    gdp: 18,
  },
  {
    name: "Khóa JS",
    time: "16/1",
    gdp: 11,
  },
  {
    name: "Khóa NodeJS",
    time: "16/1",
    gdp: 19,
  },
  {
    name: "Khóa HTML",
    time: "17/1",
    gdp: 17,
  },
  {
    name: "Khóa CSS",
    time: "17/1",
    gdp: 21,
  },
  {
    name: "Khóa JS",
    time: "17/1",
    gdp: 25,
  },
  {
    name: "Khóa NodeJS",
    time: "17/1",
    gdp: 19,
  },
  {
    name: "Khóa HTML",
    time: "18/1",
    gdp: 12,
  },
  {
    name: "Khóa CSS",
    time: "18/1",
    gdp: 19,
  },
  {
    name: "Khóa JS",
    time: "18/1",
    gdp: 10,
  },
  {
    name: "Khóa NodeJS",
    time: "18/1",
    gdp: 20,
  },
  {
    name: "Khóa HTML",
    time: "19/1",
    gdp: 17,
  },
  {
    name: "Khóa CSS",
    time: "19/1",
    gdp: 14,
  },
  {
    name: "Khóa JS",
    time: "19/1",
    gdp: 10,
  },
  {
    name: "Khóa NodeJS",
    time: "19/1",
    gdp: 10,
  },
  {
    name: "Khóa HTML",
    time: "20/1",
    gdp: 12,
  },
  {
    name: "Khóa CSS",
    time: "20/1",
    gdp: 14,
  },
  {
    name: "Khóa JS",
    time: "20/1",
    gdp: 10,
  },
  {
    name: "Khóa NodeJS",
    time: "20/1",
    gdp: 9,
  },
  {
    name: "Khóa HTML",
    time: "21/1",
    gdp: 12,
  },
  {
    name: "Khóa CSS",
    time: "21/1",
    gdp: 14,
  },
  {
    name: "Khóa JS",
    time: "21/1",
    gdp: 10,
  },
  {
    name: "Khóa NodeJS",
    time: "21/1",
    gdp: 11,
  },
  {
    name: "Khóa HTML",
    time: "22/1",
    gdp: 15,
  },
  {
    name: "Khóa CSS",
    time: "22/1",
    gdp: 19,
  },
  {
    name: "Khóa JS",
    time: "22/1",
    gdp: 21,
  },
  {
    name: "Khóa NodeJS",
    time: "22/1",
    gdp: 12,
  },
  {
    name: "Khóa HTML",
    time: "23/1",
    gdp: 20,
  },
  {
    name: "Khóa CSS",
    time: "23/1",
    gdp: 11,
  },
  {
    name: "Khóa JS",
    time: "23/1",
    gdp: 17,
  },
  {
    name: "Khóa NodeJS",
    time: "23/1",
    gdp: 26,
  },
  {
    name: "Khóa HTML",
    time: "24/1",
    gdp: 20,
  },
  {
    name: "Khóa CSS",
    time: "24/1",
    gdp: 11,
  },
  {
    name: "Khóa JS",
    time: "24/1",
    gdp: 17,
  },
  {
    name: "Khóa NodeJS",
    time: "24/1",
    gdp: 16,
  },
  {
    name: "Khóa HTML",
    time: "25/1",
    gdp: 20,
  },
  {
    name: "Khóa CSS",
    time: "25/1",
    gdp: 11,
  },
  {
    name: "Khóa JS",
    time: "25/1",
    gdp: 17,
  },
  {
    name: "Khóa NodeJS",
    time: "25/1",
    gdp: 8,
  },
];
const Chart = () => {
  const [data] = useState(Data);
  //   useEffect(() => {
  //     asyncFetch();
  //   }, []);

  //   const asyncFetch = () => {
  //     fetch(
  //       "https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json"
  //     )
  //       .then((response) => response.json())
  //       .then((json) => setData(json))
  //       .catch((error) => {
  //         console.log("fetch data failed", error);
  //       });
  //   };
  const config = {
    data,
    xField: "time",
    yField: "gdp",
    seriesField: "name",
    yAxis: {
      label: {
        formatter: (v) => `${(v / 1).toFixed(1)}`,
      },
    },
    legend: {
      position: "top",
    },
    smooth: true,
    animation: {
      appear: {
        animation: "path-in",
        duration: 5000,
      },
    },
  };

  return <Line {...config} className="line" />;
};
export default Chart;
