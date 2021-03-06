import numeral from 'numeral'
import React, { useEffect, useState } from 'react'
import { Line } from "react-chartjs-2"

import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler  } from 'chart.js';
ChartJS.register( Title, Tooltip, LineElement, Legend,CategoryScale, LinearScale, PointElement, Filler )
const options = {

    plugins: {
        legend: {
          display: false
        }
      },
    elements: {
        point: {
            radius: 0,
        }
    },
   
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0")
            }
        }
    },
    scales: {

        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll"
                }
            }


        ],
        yAxes: [
            {
                gridLine: {
                    display: false,
                },
                ticks: {

                    callbacks: function (value, index, values) {
                        return numeral(value).format("0a");
                    }
                }

            }
        ]

    }
   

}





const buildChartData = (data, casesType = "cases" ) => {
    const chartData = [];
    let lastDataPoint;

    for (let date in data.cases) {

        if (lastDataPoint) {
            const newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint
            }
            chartData.push(newDataPoint)
        }
        lastDataPoint = data[casesType][date];
    }
    return chartData;
}




const LineGraph = ({casesType="cases",...props}) => {


    const [data, setData] = useState({});


    useEffect(() => {

          const fetchData= async()=>{
            fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
            .then((response) => response.json())
            .then(data => {
                console.log(data)
                const chartData = buildChartData(data, 'cases')
              
                setData(chartData)
            })
          }
       
          fetchData()

    }, [casesType])





    return (
        <div className={props.className}>

           
             
             {
                data?.length > 0  && (
                    <Line
                options={options}
                data={{
                    datasets: [
                        {
                            backgroundColor: "rgba(204,16,52,0.5)",
                            borderColor: "#CC1034",
                            data: data,
                        }


                    ]

                }}
            />
                )
             }

         



        </div>
    )
}

export default LineGraph