import { Box } from '@mui/material'
import Grid from '@mui/material/Grid'
import { Dayjs } from 'dayjs'
import { useState } from 'react'
import withAuth from 'src/@core/components/HOC/withAuth'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import ThingsToDoNext from 'src/views/dashboard/ThingsToDoNext'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DateRangePickerComponent from '../views/dashboard/DateRangeComponents'

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState<null | Dayjs>(null)

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={8}>
          <Box>
            {/* <Paper
              sx={{
                width: '160.48px',
                height: '56.02px',
                color: '#4C4A54',
                fontSize: '10.95px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 1
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker value={selectedDate} onChange={newDate => setSelectedDate(newDate)} />
              </LocalizationProvider>
            </Paper> */}
            <h1>Date Range Picker</h1>
            <DateRangePickerComponent />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <WeeklyOverview />
        </Grid>

        <Grid item xs={12}>
          <ThingsToDoNext />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default withAuth(Dashboard)
