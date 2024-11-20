import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import boost from 'highcharts/modules/boost'
import HC_more from 'highcharts/highcharts-more'
import accessibility from 'highcharts/modules/accessibility'
import type { StockData } from '@store/useStockStore'

if (typeof Highcharts === 'object') {
  boost(Highcharts)
  HC_more(Highcharts)
  accessibility(Highcharts)
}

type StockHistoryGraphProps = {
  data: StockData[]
}

export const StockHistoryGraph = ({ data }: StockHistoryGraphProps) => {
  const chartOptions: Highcharts.Options = {
    accessibility: {
      enabled: true,
    },
    chart: {
      backgroundColor: 'transparent',
      zooming: { type: 'x' },
      panning: { enabled: true },
      panKey: 'shift',
      style: {
        fontFamily: 'Poppins, sans-serif',
      },
      resetZoomButton: {
        theme: {
          fill: 'hsl(238, 100%, 82%)',
          stroke: 'hsl(238, 76%, 92%)',
          r: 5,
          states: {
            hover: {
              fill: 'hsl(238, 100%, 90%)',
              stroke: 'hsl(238, 89%, 75%)',
              'transition-duration': '300ms',
            },
          },
          padding: 8,
          zIndex: 6,
        },
      },
    },
    title: {
      text: '',
    },
    xAxis: {
      type: 'datetime',
      labels: {
        format: '{value:%Y-%m-%d}',
        rotation: -45,
        align: 'right',
        style: {
          color: 'hsl(0, 0%, 11%)',
          fontSize: '1rem',
          fontFamily: 'Poppins, sans-serif',
        },
      },
      gridLineColor: 'hsl(238, 76%, 92%)',
      lineColor: 'hsl(238, 89%, 75%)',
      minRange: 24 * 3600 * 1000,
      crosshair: {
        color: 'hsl(238, 100%, 82%)',
        dashStyle: 'Dash',
      },
    },
    yAxis: {
      title: {
        text: 'Price (USD)',
        style: {
          color: 'hsl(0, 0%, 11%)',
          fontSize: '1.1rem',
          fontFamily: 'Poppins, sans-serif',
        },
      },
      labels: {
        format: '${value:.2f}',
        style: {
          color: 'hsl(0, 0%, 11%)',
          fontSize: '1rem',
          fontFamily: 'Poppins, sans-serif',
        },
      },
      gridLineColor: 'hsl(238, 76%, 92%)',
    },
    series: [
      {
        type: 'line',
        name: 'Stock Price',
        data: data.map((item) => [new Date(item.date).getTime(), item.close]),
        color: 'hsl(249, 29%, 28%)',
        lineWidth: 2,
      },
    ],
    tooltip: {
      backgroundColor: 'hsl(240, 100%, 99%)',
      borderColor: 'hsl(238, 76%, 92%)',
      borderWidth: 1,
      borderRadius: 8,
      shadow: false,
      style: {
        color: 'hsl(0, 0%, 11%)',
        fontSize: '1.1rem',
        fontFamily: 'Poppins, sans-serif',
      },
      pointFormat:
        '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>${point.y:.2f}</b><br/>',
      xDateFormat: '%Y-%m-%d',
      headerFormat: '<span style="font-size: 1.1rem">{point.key}</span><br/>',
    },
    plotOptions: {
      line: {
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: true,
              radius: 5,
              lineColor: 'hsl(238, 89%, 75%)',
              fillColor: 'hsl(240, 100%, 99%)',
            },
          },
        },
      },
      series: {
        states: {
          hover: {
            enabled: true,
            lineWidth: 3,
            halo: {
              size: 0,
            },
          },
        },
      },
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    boost: {
      useGPUTranslations: true,
      seriesThreshold: 1000,
    },
  }

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />
}
