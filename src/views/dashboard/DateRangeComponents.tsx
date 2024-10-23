import { DateRange } from '@mui/lab/DateRangePicker'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns'
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker'
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider'
import {
  endOfDay,
  endOfMonth,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfToday,
  startOfYear,
  startOfYesterday,
  subDays,
  subMonths
} from 'date-fns'
import React, { useState } from 'react'

const DateRangePickerComponent: React.FC = () => {
  const [value, setValue] = useState<DateRange<Date>>([null, null])

  const setDateRange = (range: DateRange<Date>) => {
    setValue(range)
  }

  const handleSetToday = () => {
    const today = startOfToday()
    setDateRange([startOfDay(today), endOfDay(today)])
  }

  const handleSetYesterday = () => {
    const yesterday = startOfYesterday()
    setDateRange([startOfDay(yesterday), endOfDay(yesterday)])
  }

  const handleSetLast7Days = () => {
    const today = startOfToday()
    setDateRange([subDays(today, 7), endOfDay(today)])
  }

  const handleSetLast30Days = () => {
    const today = startOfToday()
    setDateRange([subDays(today, 30), endOfDay(today)])
  }

  const handleSetLast90Days = () => {
    const today = startOfToday()
    setDateRange([subDays(today, 90), endOfDay(today)])
  }

  const handleSetLast365Days = () => {
    const today = startOfToday()
    setDateRange([subDays(today, 365), endOfDay(today)])
  }

  const handleSetLastMonth = () => {
    const today = startOfToday()
    const start = startOfMonth(subMonths(today, 1))
    const end = endOfMonth(subMonths(today, 1))
    setDateRange([start, end])
  }

  const handleSetLast12Months = () => {
    const today = startOfToday()
    const start = startOfMonth(subMonths(today, 12))
    const end = endOfMonth(today)
    setDateRange([start, end])
  }

  const handleSetLastYear = () => {
    const start = startOfYear(subMonths(new Date(), 12))
    const end = endOfYear(subMonths(new Date(), 12))
    setDateRange([start, end])
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item>
          <Button variant='outlined' onClick={handleSetToday}>
            Today
          </Button>
        </Grid>
        <Grid item>
          <Button variant='outlined' onClick={handleSetYesterday}>
            Yesterday
          </Button>
        </Grid>
        <Grid item>
          <Button variant='outlined' onClick={handleSetLast7Days}>
            Last 7 Days
          </Button>
        </Grid>
        <Grid item>
          <Button variant='outlined' onClick={handleSetLast30Days}>
            Last 30 Days
          </Button>
        </Grid>
        <Grid item>
          <Button variant='outlined' onClick={handleSetLast90Days}>
            Last 90 Days
          </Button>
        </Grid>
        <Grid item>
          <Button variant='outlined' onClick={handleSetLast365Days}>
            Last 365 Days
          </Button>
        </Grid>
        <Grid item>
          <Button variant='outlined' onClick={handleSetLastMonth}>
            Last Month
          </Button>
        </Grid>
        <Grid item>
          <Button variant='outlined' onClick={handleSetLast12Months}>
            Last 12 Months
          </Button>
        </Grid>
        <Grid item>
          <Button variant='outlined' onClick={handleSetLastYear}>
            Last Year
          </Button>
        </Grid>
      </Grid>
      <DateRangePicker
        startText='Start Date'
        endText='End Date'
        value={value}
        onChange={newValue => {
          setValue(newValue)
        }}
        renderInput={(startProps: any, endProps: any) => (
          <>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </>
        )}
      />
    </LocalizationProvider>
  )
}

export default DateRangePickerComponent
