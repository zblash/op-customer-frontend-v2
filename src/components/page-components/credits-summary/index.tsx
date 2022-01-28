/* eslint-disable func-names */
import { ICreditResponse } from '@zblash/op-web-fronted';
import useWindowSize from 'react-use/lib/useWindowSize';
import React from 'react';
import Chart from 'react-apexcharts';

interface CreditsSummaryProps {
  creditSummary: ICreditResponse;
}

const CreditsSummary: React.FC<CreditsSummaryProps> = ({ creditSummary }) => {
  const { width } = useWindowSize();
  const [chartWidth, setChartWidth] = React.useState<string>();

  React.useEffect(() => {
    if (width > 1024) {
      setChartWidth('350');
    } else {
      setChartWidth('275');
    }
  }, [width]);

  const state = {
    series: [
      {
        data: [
          creditSummary.creditLimit - creditSummary.totalDebt,
          creditSummary.totalDebt,
          creditSummary.creditLimit - creditSummary.totalDebt,
          creditSummary.creditLimit,
        ],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 380,
      },
      plotOptions: {
        bar: {
          barHeight: '100%',
          distributed: true,
          horizontal: true,
          dataLabels: {
            position: 'bottom',
          },
        },
      },
      colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B'],
      dataLabels: {
        enabled: true,
        textAnchor: 'start',
        style: {
          colors: ['#fff'],
        },
        formatter(val: any, opt: any) {
          return `${opt.w.globals.labels[opt.dataPointIndex]}:  ${val}`;
        },
        offsetX: 0,
        dropShadow: {
          enabled: true,
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff'],
      },
      xaxis: {
        categories: ['Kullanilan Limit', 'Toplam Borc', 'Kalan Limit', 'Kredi Limiti'],
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      title: {
        text: 'Cariler',
        align: 'center',
        floating: true,
      },
      subtitle: {
        text: 'Sistem Kredi Durumu',
        align: 'center',
      },
      tooltip: {
        theme: 'dark',
        x: {
          show: false,
        },
        y: {
          title: {
            formatter() {
              return '';
            },
          },
        },
      },
    },
  };

  return <Chart options={state.options} series={state.series} type="bar" height={chartWidth} />;
};

export default CreditsSummary;
