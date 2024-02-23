import ReactApexChart from "react-apexcharts";
import { GraphData } from "../../interface/driver/driverInterface";

const ChartComponent = ({ graphData,isScheduled }: { graphData?: GraphData[],isScheduled?:boolean }) => {
  
  const today = new Date();
  const lastSevenDays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(date.getDate() - index);
    return date.toISOString().split("T")[0];
  }).reverse();
  const mergedData = lastSevenDays.map((date) => {
    const dataItem = graphData?.find((item) => item.date === date);
    return {
      date,
      count: dataItem ? dataItem.count : 0,
    };
  });
  const labels = mergedData.map((data) => data.date);
  const counts = mergedData.map((data) => data.count);

  const chartData: any = {
    options: {
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: true,
        },
      },
      colors: ["#BE3455", "#D4CACD"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Ride count per day for the last seven days",
        align: "left",
      },
     
      markers: {
        size: 1,
      },
      xaxis: {
        categories: labels,
        title: {
          text: "Days",
        },
      },
      yaxis: {
        title: {
          text: `${isScheduled ? "Scheduled Rides" : "Quick Rides"}`,
        },
        min: 0,
        max: 40,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [
      {
        name: "",
        data: counts,
      },
    ],
  };
  return (
    <div className="bg-white p-4 rounded-lg ">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="line"
        width="100%"
        height={350}
      />
    </div>
  );
};

export default ChartComponent;
