import React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { ApexOptions } from 'apexcharts'
import { Grid } from '@mui/material'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const WeeklyOverview: React.FC = () => {
  // ** Hook
  const theme = useTheme()

  const options: ApexOptions = {
    colors: ['#000000', '#cccccc'],
    chart: {
      parentHeightOffset: 10,
      toolbar: {
        show: true,
        tools: {
          download: true,
          pan: false,
          zoom: false,
          reset: false,
          selection: false,
          zoomin: false,
          zoomout: false
        }
      }
    },
    plotOptions: {
      bar: {
        distributed: true,
        columnWidth: '20px',
        endingShape: 'rounded',
        startingShape: 'rounded',
        colors: {
          ranges: [
            {
              from: 0,
              to: 0,
              color: '#000000'
            },
            {
              from: 1,
              to: 1,
              color: '#cccccc'
            }
          ]
        }
      }
    },
    stroke: {
      width: 2,
      colors: [theme.palette.background.paper]
    },
    legend: { show: false },
    grid: {
      padding: {
        top: -1,
        right: 0,
        left: 0,
        bottom: 5
      }
    },
    dataLabels: { enabled: false },

    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu'],
      labels: { show: true },
      axisBorder: { show: true }
    },
    yaxis: {
      show: false,
      tickAmount: 4,
      labels: {
        offsetX: -17,
        formatter: value => `${value > 999 ? `${(value / 1000).toFixed(0)}` : value}k`
      }
    }
  }

  const series = [
    {
      data: [
        { x: 'Mon', y: 5, fillColor: '#000000' },
        { x: 'Tue', y: 3, fillColor: '#000000' },
        { x: 'Wed', y: 5, fillColor: '#000000' },
        { x: 'Thu', y: 7, fillColor: '#000000' },
        { x: 'Fri', y: 9, fillColor: '#000000' },
        { x: 'Sat', y: 2, fillColor: '#000000' },
        { x: 'Sun', y: 5, fillColor: '#000000' },
        { x: 'Mon', y: 6, fillColor: '#000000' },
        { x: 'Tue', y: 4, fillColor: '#000000' },
        { x: 'Wed', y: 7, fillColor: '#000000' },
        { x: 'Thu', y: 3, fillColor: '#000000' }
      ]
    },
    {
      data: [
        { x: 'Mon', y: 3, fillColor: '#cccccc' },
        { x: 'Tue', y: 6, fillColor: '#cccccc' },
        { x: 'Wed', y: 8, fillColor: '#cccccc' },
        { x: 'Thu', y: 3, fillColor: '#cccccc' },
        { x: 'Fri', y: 1, fillColor: '#cccccc' },
        { x: 'Sat', y: 9, fillColor: '#cccccc' },
        { x: 'Sun', y: 6, fillColor: '#cccccc' },
        { x: 'Mon', y: 5, fillColor: '#cccccc' },
        { x: 'Tue', y: 2, fillColor: '#cccccc' },
        { x: 'Wed', y: 5, fillColor: '#cccccc' },
        { x: 'Thu', y: 7, fillColor: '#cccccc' }
      ]
    }
  ]

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
        <Grid item xs={8} sx={{ display: 'flex' }}>
          <Box sx={{ marginRight: '10rem' }}>
            <Typography sx={{ fontSize: '1rem' }}>Total Sales</Typography>
            <Box sx={{ display: 'flex' }}>
              <Typography
                sx={{
                  fontWeight: 500,
                  color: '#4C4A54',
                  fontSize: '14.94px',
                  marginRight: 2
                }}
              >
                $ 10,053
              </Typography>
              <Typography
                sx={{
                  color: '#5F76FF',
                  fontSize: '0.875rem'
                }}
              >
                ↑45%
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography sx={{ fontSize: '1rem' }}>Total Orders</Typography>
            <Box sx={{ display: 'flex' }}>
              <Typography
                sx={{
                  fontWeight: 500,
                  color: '#4C4A54',
                  fontSize: '14.94px',
                  marginRight: 2
                }}
              >
                683
              </Typography>
              <Typography
                sx={{
                  fontWeight: 200,
                  color: '#D83A3E',
                  fontSize: '0.875rem',
                  textAlign: 'bottom'
                }}
              >
                ↓3%
              </Typography>
            </Box>
          </Box>
        </Grid>
        <ReactApexcharts type='bar' height={205} options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default WeeklyOverview
