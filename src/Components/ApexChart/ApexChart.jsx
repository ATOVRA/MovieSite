// Hooks
import { useState, useEffect, useContext } from "react";

// Packages
import ReactApexChart from "react-apexcharts";

// Context
import { GlobalContext } from "../../Context/GlobalContext";

const ApexChart = () => {
  const { series } = useContext(GlobalContext);

  const getChartColor = (percentage) => {
    if (percentage <= 35) {
      return ["#ef0107"];
    } else if (percentage < 70) {
      return ["#f3ce13"];
    } else {
      return ["#20E647"];
    }
  };

  const [chartData, setChartData] = useState({
    series: [0],
    options: {
      chart: {
        height: 120,
        type: "radialBar",
      },
      colors: ["#ef0107"],
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: "52%",
            background: "#222",
          },
          track: {
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              blur: 4,
              opacity: 0.15,
            },
          },
          dataLabels: {
            name: {
              offsetY: -5,
              color: "#fff",
              fontSize: "11px",
              fontWeight: 500,
            },
            value: {
              offsetY: -2,
              color: "#fff",
              fontSize: "15px",
              show: true,
            },
          },
        },
      },
      fill: {
        gradient: {
          shade: "dark",
          type: "vertical",
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: "round",
      },
      labels: ["Score"],
    },
  });

  useEffect(() => {
    setChartData((prevChartData) => ({
      ...prevChartData,
      series: [series],
      options: {
        ...prevChartData.options,
        colors: getChartColor(series),
      },
    }));
  }, [series]);

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="radialBar"
        height={chartData.options.chart.height}
      />
    </div>
  );
};

export default ApexChart;

// Default Chart Options

// chart: {
//     height: 280,
//     type: "radialBar",
//   },
//   series: [67],
//   colors: ["#20E647"],
//   plotOptions: {
//     radialBar: {
//       hollow: {
//         margin: 0,
//         size: "70%",
//         background: "#293450"
//       },
//       track: {
//         dropShadow: {
//           enabled: true,
//           top: 2,
//           left: 0,
//           blur: 4,
//           opacity: 0.15
//         }
//       },
//       dataLabels: {
//         name: {
//           offsetY: -10,
//           color: "#fff",
//           fontSize: "13px"
//         },
//         value: {
//           color: "#fff",
//           fontSize: "30px",
//           show: true
//         }
//       }
//     }
//   },
//   fill: {
//     type: "gradient",
//     gradient: {
//       shade: "dark",
//       type: "vertical",
//       gradientToColors: ["#87D4F9"],
//       stops: [0, 100]
//     }
//   },
//   stroke: {
//     lineCap: "round"
//   },
//   labels: ["Progress"]
