"use client";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import useReactApexChart from "../../hook/useReactApexChart";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const RevenueReportOne = () => {
  const [paymentStatusChartSeriesThree, setPaymentStatusChartSeriesThree] = useState([]);
  const [statisticsDonutChartSeries, setStatisticsDonutChartSeries] = useState([]);
  let { paymentStatusChartOptionsThree,  statisticsDonutChartOptions  } = useReactApexChart();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/report");
        const data = await response.json();
        setPaymentStatusChartSeriesThree(data.paymentStatusChartSeriesThree);
        setStatisticsDonutChartSeries(data.statisticsDonutChartSeries);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div className=''>
      <div className='card radius-8 border-0'>
        <div className='row'>
          <div className='col-xxl-6 pe-xxl-0'>
            <div className='card-body p-24'>
              <div className='d-flex align-items-center flex-wrap gap-2 justify-content-between'>
                <h6 className='mb-2 fw-bold text-lg'>Jumlah soal dikerjakan harian</h6>
              </div>
              <div className='mt-40'>
                <ReactApexChart
                  options={paymentStatusChartOptionsThree}
                  series={paymentStatusChartSeriesThree}
                  type='bar'
                  height={400}
                  id='paymentStatusChart'
                  className='margin-16-minus'
                />
              </div>
            </div>
          </div>
          <div className='col-xxl-6 pe-xxl-0'>
            <div className='card-body p-24'>
              <div className='d-flex align-items-center flex-wrap gap-2 justify-content-between'>
                <h6 className='mb-2 fw-bold text-lg'>Persebaran Pengerjaan Quiz</h6>
              </div>
              <div className='mt-40'>
              <ReactApexChart
                  options={statisticsDonutChartOptions}
                  series={statisticsDonutChartSeries}
                  type='donut'
                  height={330}
                  id='statisticsDonutChart'
                  className='mt-36 flex-grow-1 apexcharts-tooltip-z-none title-style circle-none'
                />
              </div>
              <ul className='d-flex flex-wrap align-items-center justify-content-between mt-3 gap-3'>
                <li className='d-flex align-items-center gap-2'>
                  <span className='w-12-px h-12-px radius-2 bg-primary-600' />
                  <span className='text-secondary-light text-sm fw-normal'>
                    Interaksi:
                    <span className='text-primary-light fw-bold'>{`${statisticsDonutChartSeries[0]}`}</span>
                  </span>
                </li>
                <li className='d-flex align-items-center gap-2'>
                  <span className='w-12-px h-12-px radius-2 bg-yellow' />
                  <span className='text-secondary-light text-sm fw-normal'>
                    Angka dan Huruf:
                    <span className='text-primary-light fw-bold'>{`${statisticsDonutChartSeries[1]}`}</span>
                  </span>
                </li>
                <li className='d-flex align-items-center gap-2'>
                  <span className='w-12-px h-12-px radius-2 bg-success' />
                  <span className='text-secondary-light text-sm fw-normal'>
                    Lingkungan:
                    <span className='text-primary-light fw-bold'>{`${statisticsDonutChartSeries[2]}`}</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

{/* <div className='col-xxl-6'>
<div className='position-relative'>



</div>
</div> */}

export default RevenueReportOne;
