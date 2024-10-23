/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-key */
import { useMutation, useQuery } from '@apollo/client'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Link,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material'
import { Dayjs } from 'dayjs'
import { ChangeEvent, useEffect, useState } from 'react'
import CityDropDown from 'src/@core/layouts/components/shared-components/CityDropDown'
import CountryDropDown from 'src/@core/layouts/components/shared-components/CountryDropDown'
import StateDropDown from 'src/@core/layouts/components/shared-components/StateDropDown'
import { CreateCustomerAdminSide } from 'src/graphql/query/customer.query'
import { GetAllSalesAgents, GetAllSalesChannel, GetStoreType } from 'src/graphql/query/salesAgents.query'
import { ICity, ICountry, IState } from 'src/models/country.model'
import { ISaleChanneList, ISalesAgentUsersList } from 'src/models/user.model'
import EmitterService, { EventEmitterEvents } from 'src/service/event-emitter.service'

interface CustomerDetail {
  userId: string
  addressId: number
  customerCode: string
  storeName: string
  contactPerson: string
  contactNumber: string
  email: string
  customerSince: Dayjs | null
  primarySalesChannel: number
  numberOfDoors: number
  platformWebsite: string
  storeType: [number]
  secondaryEmailID1: string
  secondaryEmailID2: string
  secondaryEmailID3: string
  instagramLink: string
  facebookLink: string
  tiktokLink: string
  salesTaxIdOrEinNumber: string
  salesAgentId: string
  paymentTerms: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  countryCode: string
  country: string
  postalCode: string
}

const Index = () => {
  const [address, setAddress] = useState({
    id: 0,
    addressLine1: '',
    addressLine2: '',
    postalCode: 0,
    cityId: 0,
    countryId: 0,
    stateId: 0
  })
  const getTodayDate = (): string => {
    const formattedDate = new Date().toLocaleDateString('en-GB')

    return formattedDate
  }

  const [date, setDate] = useState({
    customerSince: getTodayDate()
  })

  const [formData, setFormData] = useState<CustomerDetail>({} as never as CustomerDetail)

  const [countryId, setCountryId] = useState<number | undefined>(undefined)
  const [stateId, setStateId] = useState<number | undefined>(undefined)
  const [cityId, setCityId] = useState<number | undefined>(undefined)
  const [country, setCountry] = useState<ICountry | null>(null)
  const [state, setState] = useState<IState | null>(null)
  const [city, setCity] = useState<ICity>()
  const [selectedStoreTypes, setSelectedStoreTypes] = useState<string[]>([])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const updatedValue = name === 'numberOfDoors' ? parseInt(value) : value
    setFormData({
      ...formData,
      [name]: updatedValue
    })
    setAddress({
      ...address,
      [name]: updatedValue
    })
    setDate({
      ...date,
      [name]: updatedValue
    })
  }

  EmitterService.on(EventEmitterEvents.COUNTRY_LOADED, () => {
    setCountryId(address?.countryId)
  })

  EmitterService.on(EventEmitterEvents.STATE_LOADED, () => {
    setStateId(address?.stateId)
  })

  EmitterService.on(EventEmitterEvents.CITY_LOADED, () => {
    setCityId(address?.cityId)
  })

  const { data: salesAgentsData } = useQuery(GetAllSalesAgents)
  const salesAgents = salesAgentsData?.salesAgents?.graphdata as ISalesAgentUsersList[]

  const { data: salesChannelData } = useQuery(GetAllSalesChannel)
  const primarySalesChannel = salesChannelData?.allSalesChannel.graphdata as ISaleChanneList[]

  const { data: storeTypeData } = useQuery(GetStoreType)
  const storeTypes = storeTypeData?.allStoreType?.graphdata as any

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSelectedStoreTypes(prevSelected => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter(item => item !== value)
      } else {
        return [...prevSelected, value]
      }
    })
  }

  const [salesChannel, setSalesChannel] = useState<number | ''>('')
  const [agents, setAgents] = useState<string | ''>('')

  const handleChange = (event: SelectChangeEvent<any>) => {
    const primarySalesData = event.target.value
    setFormData({ ...formData, primarySalesChannel: parseInt(primarySalesData) })
  }

  const handleSaleAgentChange = (event: SelectChangeEvent<string>) => {
    const selectedAgentId = event.target.value
    setFormData({ ...formData, salesAgentId: selectedAgentId })
  }

  useEffect(() => {
    if (storeTypes && storeTypes.length > 0) {
      setSalesChannel(storeTypes[0].id)
    }
  }, [storeTypes])

  useEffect(() => {
    if (salesAgents && salesAgents.length > 0) {
      setAgents(salesAgents[0].userId)
    }
  }, [salesAgents])

  // query use
  const [addCustomerMutation] = useMutation(CreateCustomerAdminSide())

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const updatedFormData = {
      ...formData,
      addressId: address.id,
      storeType: selectedStoreTypes.map(type => parseInt(type)),
      countryId: country?.id,
      countryCode: country?.name,
      stateId: state?.id,
      cityId: city?.id
    }

    try {
      await addCustomerMutation({
        variables: updatedFormData
      }).then((data: any) => {
        console.log('Update Customer', data?.CreateCustomerAdminSide)
        window.location.href = '/customers/pending-customer/'
      })
    } catch (error) {
      console.error('Error new customer up:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={9}>
        <Grid item xs={12}>
          <Box>
            <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center' }}>
              <KeyboardArrowLeftIcon /> Add New Customer
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ padding: '25px 200px 25px 25px' }}>
            <Typography mb={3}>Customer Code</Typography>
            <TextField
              id='outlined-number'
              placeholder='To be assigned'
              name='customerCode'
              value={formData.customerCode}
              sx={{ width: '100%', marginBottom: 8 }}
              onChange={handleInputChange}
            />
            <Typography mb={3} color='blue'>
              Store Name *
            </Typography>
            <TextField
              id='outlined-number'
              name='storeName'
              value={formData.storeName}
              sx={{ width: '100%', marginBottom: 8 }}
              onChange={handleInputChange}
              required
            />
            <Typography mb={3}>Primary Sales Channel</Typography>
            <Select
              name='primarySalesChannel'
              style={{
                width: '100%',
                marginBottom: 8
              }}
              value={formData.primarySalesChannel}
              onChange={(e: any) => handleChange(e)}
            >
              {primarySalesChannel?.map((item: ISaleChanneList) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                )
              })}
            </Select>
            <Typography mb={3}>Number of Stores</Typography>
            <TextField
              id='outlined-number'
              name='numberOfDoors'
              value={formData.numberOfDoors}
              onChange={handleInputChange}
              sx={{ width: '100%', marginBottom: 8 }}
            />
            <Typography mb={3}>Website Link</Typography>
            <TextField
              id='outlined-number'
              name='platformWebsite'
              value={formData.platformWebsite}
              onChange={handleInputChange}
              sx={{ width: '100%', marginBottom: 8 }}
            />
            <Typography mb={3}>Store Type</Typography>
            <FormGroup>
              {storeTypes?.map((storeType: any) => (
                <FormGroup>
                  <FormControlLabel
                    key={storeType.id}
                    control={<Checkbox onChange={handleCheckboxChange} value={storeType.id} />}
                    label={storeType.name}
                  />
                </FormGroup>
              ))}
            </FormGroup>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ padding: '25px 200px 25px 25px' }}>
            <Typography mb={0} color='gray'>
              Personal Details
            </Typography>

            <Typography mb={3} color='blue'>
              Contact Person *
            </Typography>
            <TextField
              id='outlined-number'
              name='contactPerson'
              value={formData.contactPerson}
              onChange={handleInputChange}
              sx={{ width: '100%', marginBottom: 8 }}
              required
            />
            <Typography mb={3} color='blue'>
              Contact Number *
            </Typography>
            <TextField
              id='outlined-number'
              name='contactNumber'
              value={formData.contactNumber}
              onChange={handleInputChange}
              sx={{ width: '100%', marginBottom: 8 }}
              required
            />
            <Typography mb={3} color='blue'>
              Primary Email Address *
            </Typography>
            <TextField
              id='outlined-number'
              name='email'
              value={formData.email}
              sx={{ width: '100%', marginBottom: 8 }}
              onChange={handleInputChange}
              required
            />
            <Typography mb={3}>Secondary Email Address 1 *</Typography>
            <TextField
              id='outlined-number'
              name='secondaryEmailID1'
              value={formData.secondaryEmailID1}
              onChange={handleInputChange}
              sx={{ width: '100%', marginBottom: 8 }}
            />

            <Typography mb={3}>Secondary Email Address 2*</Typography>
            <TextField
              id='outlined-number'
              name='secondaryEmailID2'
              value={formData.secondaryEmailID2}
              onChange={handleInputChange}
              sx={{ width: '100%', marginBottom: 8 }}
            />

            <Typography mb={3}>Secondary Email Address 3*</Typography>
            <TextField
              id='outlined-number'
              name='secondaryEmailID3'
              value={formData.secondaryEmailID3}
              onChange={handleInputChange}
              sx={{ width: '100%', marginBottom: 8 }}
            />
            <Typography mb={3} color='blue'>
              Shipping Address LIne 1 *
            </Typography>
            <TextField
              id='outlined-number'
              name='addressLine1'
              value={formData.addressLine1}
              onChange={handleInputChange}
              sx={{ width: '100%', marginBottom: 8 }}
              required
            />
            <Typography mb={3}>Shipping Address LIne 2 *</Typography>
            <TextField
              id='outlined-number'
              name='addressLine2'
              value={formData.addressLine2}
              onChange={handleInputChange}
              sx={{ width: '100%', marginBottom: 8 }}
              required
            />
            <Box sx={{ display: 'flex', gap: 6, justifyContent: 'space-between' }}>
              <Box sx={{ width: '100%', marginBottom: 8 }}>
                <Typography mb={3} color='blue'>
                  Country
                </Typography>

                <CountryDropDown onChange={setCountry} countryId={countryId}></CountryDropDown>
              </Box>
              <Box sx={{ width: '100%', marginBottom: 8 }}>
                <Typography mb={3} color='blue'>
                  State
                </Typography>
                {country ? (
                  <StateDropDown onChange={setState} countryId={country.id} stateId={stateId}></StateDropDown>
                ) : (
                  <select
                    name='state'
                    disabled
                    className='confirm_Order_Disabled'
                    style={{
                      width: '100%',
                      marginBottom: 8,
                      padding: 19,
                      borderRadius: 6,
                      border: '1px solid rgba(58, 53, 65, 0.22)'
                    }}
                    required
                  >
                    <option value='none' selected disabled hidden>
                      select one...
                    </option>
                  </select>
                )}
              </Box>
              <Box sx={{ width: '100%', marginBottom: 8 }}>
                <Typography mb={3} color='blue'>
                  City
                </Typography>

                {state ? (
                  <CityDropDown onChange={setCity} stateId={state.id} cityId={cityId}></CityDropDown>
                ) : (
                  <select
                    name='city'
                    disabled
                    className='confirm_Order_Disabled'
                    style={{
                      width: '100%',
                      marginBottom: 8,
                      padding: 19,
                      borderRadius: 6,
                      border: '1px solid rgba(58, 53, 65, 0.22)'
                    }}
                    required
                  >
                    <option value='none' selected disabled hidden>
                      select one...
                    </option>
                  </select>
                )}
              </Box>
              <Box sx={{ width: '100%', marginBottom: 8 }}>
                <Typography mb={3} color='blue'>
                  Zipcode
                </Typography>
                <TextField
                  id='outlined-number'
                  name='postalCode'
                  value={address.postalCode}
                  onChange={handleInputChange}
                  sx={{ width: '100%', marginBottom: 8 }}
                  required
                />
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ padding: '25px 200px 25px 25px' }}>
            <Typography mb={0} color='gray'>
              Business Details
            </Typography>

            <Typography mb={3} color='blue'>
              EIN Number / Tax ID *
            </Typography>
            <TextField
              id='outlined-number'
              name='salesTaxIdOrEinNumber'
              value={formData.salesTaxIdOrEinNumber}
              onChange={handleInputChange}
              sx={{ width: '100%', marginBottom: 8 }}
              required
            />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ padding: '25px 200px 25px 25px' }}>
            <Typography mb={3}>Instagram</Typography>
            <TextField
              id='outlined-number'
              name='instagramLink'
              value={formData.instagramLink}
              onChange={handleInputChange}
              sx={{ width: '100%', marginBottom: 8 }}
            />
            <Typography mb={3}>Facebook</Typography>
            <TextField
              id='outlined-number'
              name='facebookLink'
              value={formData.facebookLink}
              onChange={handleInputChange}
              sx={{ width: '100%', marginBottom: 8 }}
            />
            <Typography mb={3}>Tiktok</Typography>
            <TextField
              id='outlined-number'
              name='tiktokLink'
              value={formData.tiktokLink}
              onChange={handleInputChange}
              sx={{ width: '100%', marginBottom: 8 }}
            />
            <Typography mb={3}>Sales Agent *</Typography>
            <Select
              fullWidth
              placeholder='Select Sales Agent'
              name='salesAgentId'
              value={formData.salesAgentId}
              sx={{ width: '100%', marginBottom: 8 }}
              onChange={(e: any) => handleSaleAgentChange(e)}
            >
              {salesAgents?.map((item: ISalesAgentUsersList) => {
                return (
                  <MenuItem key={item.userId} value={item.userId}>
                    {item.storeName}
                  </MenuItem>
                )
              })}
            </Select>

            <Typography mb={3}>Date of Onboarding *</Typography>
            <TextField
              id='outlined-number'
              name='customerSince'
              value={date.customerSince}
              sx={{ width: '100%', marginBottom: 8 }}
              onChange={handleInputChange}
            />
            {/* <Box sx={{ width: '100%', marginBottom: 8 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DemoItem>
                    <DatePicker onChange={handleDateChange} />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
            </Box> */}

            <Box sx={{ width: '100%', marginBottom: 8 }}>
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker />
                </DemoContainer>
              </LocalizationProvider> */}
            </Box>

            <Typography mb={3}>Payment Terms</Typography>
            <TextField
              id='outlined-number'
              name='paymentTerms'
              value={formData.paymentTerms}
              sx={{ width: '100%', marginBottom: 8 }}
              onChange={handleInputChange}
            />
          </Card>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Link href='/customers'>
              <Button size='large' type='submit' variant='contained'>
                Add Customer
              </Button>
            </Link>
          </div>
        </Grid>
      </Grid>
    </form>
  )
}

export default Index
