/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery } from '@apollo/client'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import {
  Box,
  Button,
  Card,
  FormControlLabel,
  FormGroup,
  Grid,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'
import CityDropDown from 'src/@core/layouts/components/shared-components/CityDropDown'
import CountryDropDown from 'src/@core/layouts/components/shared-components/CountryDropDown'
import StateDropDown from 'src/@core/layouts/components/shared-components/StateDropDown'
import { ActiveAndPendingCustomerDetail, UpdateActiveUserDetail } from 'src/graphql/query/customer.query'
import { GetAllSalesAgents, GetAllSalesChannel, GetStoreType } from 'src/graphql/query/salesAgents.query'
import { ICity, ICountry, IState } from 'src/models/country.model'
import { ISaleChanneList, ISalesAgentUsersList, IStoreType } from 'src/models/user.model'
import EmitterService, { EventEmitterEvents } from 'src/service/event-emitter.service'

interface CustomerDetail {
  userId: string
  addressId: number
  customerCode: string
  storeName: string
  contactPerson: string
  phoneNumber: string
  email: string
  customerSince: Date
  primarySalesChannel: any
  numberOfDoors: number
  platformWebsite: string
  storeType: number[]
  secondaryEmailId1: string
  secondaryEmailId2: string
  secondaryEmailId3: string
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

const UpdateCustomerDetails = () => {
  const router = useRouter()
  const userId = router.query.id as string

  const [address, setAddress] = useState({
    id: 0,
    addressLine1: '',
    addressLine2: '',
    postalCode: 0,
    cityId: 0,
    countryId: 0,
    stateId: 0
  })

  // const [primarySalesChannel, setPrimarySalesChannel] = useState()

  const [formData, setFormData] = useState<CustomerDetail>({
    userId: userId
  } as never as CustomerDetail)

  const { data, loading, error } = useQuery(ActiveAndPendingCustomerDetail(userId))

  useEffect(() => {
    if (data) {
      const customerDetail = data?.activeAndPendingCustomerDetail?.graphdata
      setAddress(customerDetail?.userShippingAddress)
      const primarySalesChannelNumber = parseInt(customerDetail.primarySalesChannel[0]?.key)

      setFormData({
        ...customerDetail,
        primarySalesChannel: primarySalesChannelNumber
      })
    }
  }, [data])

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

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const { data: salesAgentsData } = useQuery(GetAllSalesAgents)

  const salesAgents = salesAgentsData?.salesAgents?.graphdata as ISalesAgentUsersList[]

  const { data: salesChannelData } = useQuery(GetAllSalesChannel)

  const primarySalesChannel = salesChannelData?.allSalesChannel.graphdata as ISaleChanneList[]

  const { data: storeTypeData } = useQuery(GetStoreType)

  const storeTypes = storeTypeData?.allStoreType?.graphdata as IStoreType[]

  const [updateUser] = useMutation(UpdateActiveUserDetail())
  const [countryId, setCountryId] = useState<number | undefined>(undefined)
  const [stateId, setStateId] = useState<number | undefined>(undefined)

  const [cityId, setCityId] = useState<number | undefined>(undefined)

  const [country, setCountry] = useState<ICountry | null>(null)
  const [state, setState] = useState<IState | null>(null)
  const [city, setCity] = useState<ICity>()

  const [checkedKeys, setCheckedKeys] = useState<string[]>([])

  useEffect(() => {
    if (data?.activeAndPendingCustomerDetail?.graphdata?.storeTypes) {
      const keys = data.activeAndPendingCustomerDetail.graphdata.storeTypes.map((item: any) => item.key)
      setCheckedKeys(keys)
    }
  }, [data?.activeAndPendingCustomerDetail?.graphdata?.storeTypes])

  const handleCheckboxChange = (key: string) => {
    setCheckedKeys(prevCheckedKeys =>
      prevCheckedKeys.includes(key) ? prevCheckedKeys.filter(k => k !== key) : [...prevCheckedKeys, key]
    )
  }

  const [salesChannel, setSalesChannel] = useState<number | ''>('')

  const handleChange = (event: SelectChangeEvent<any>) => {
    const primarySalesData = event.target.value
    setFormData({ ...formData, primarySalesChannel: parseInt(primarySalesData) })
  }

  const handleSaleAgentChange = (event: SelectChangeEvent<string>) => {
    const selectedAgentId = event.target.value
    setFormData({ ...formData, salesAgentId: selectedAgentId })
  }

  const formattedDate = new Date(formData.customerSince).toLocaleDateString('en-GB')

  useEffect(() => {
    if (storeTypes && storeTypes.length > 0) {
      setSalesChannel(storeTypes[0].id)
    }
  }, [storeTypes])

  const handleUpdateCustomerStatus = (event: any) => {
    event.preventDefault()

    const updatedFormData = {
      ...formData,
      addressId: address.id,
      storeType: checkedKeys.map(type => parseInt(type)),
      countryId: country?.id,
      countryCode: country?.countryCode,
      stateId: state?.id,
      cityId: city?.id
    }

    updateUser({
      variables: updatedFormData
    })
      .then((data: any) => {
        console.log('Update Customer', data?.updateActiveUserDetail)
        window.location.href = '/customers'
      })
      .catch(error => {
        console.error('Error Update Customer:', error)
      })
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <form onSubmit={handleUpdateCustomerStatus}>
      <Grid container spacing={9}>
        <Grid item xs={12}>
          <Box>
            <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center' }}>
              <KeyboardArrowLeftIcon /> Update Customer
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
              disabled
              required
            />
            <Typography mb={3} color='blue'>
              Store Name *
            </Typography>
            <TextField
              id='outlined-number'
              name='storeName'
              value={formData.storeName}
              sx={{ width: '100%', marginBottom: 8 }}
              disabled
              required
            />
            <Typography mb={3}>Primary Sales Channel</Typography>
            <select
              placeholder='Select Sales Agent'
              name='primarySalesChannel'
              style={{
                width: '100%',
                marginBottom: 8,
                padding: 19,
                borderRadius: 6,
                border: '1px solid rgba(58, 53, 65, 0.22)'
              }}
              value={formData.primarySalesChannel}
              onChange={(e: any) => handleChange(e)}
              required
            >
              {primarySalesChannel?.map((item: ISaleChanneList) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                )
              })}
            </select>
            <Typography mb={3}>Number of Stores</Typography>
            <TextField
              id='outlined-number'
              name='numberOfDoors'
              type='number'
              value={formData.numberOfDoors}
              onChange={handleInputChange}
              sx={{ width: '100%', marginBottom: 8 }}
              required
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
                    control={
                      <>
                        <input
                          type='checkbox'
                          checked={checkedKeys.includes(storeType.id)}
                          onChange={() => handleCheckboxChange(storeType.id)}
                          value={storeType.id}
                        />
                      </>
                    }
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
            />
            <Typography mb={3} color='blue'>
              Contact Number *
            </Typography>
            <TextField
              id='outlined-number'
              name='phoneNumber'
              value={formData.phoneNumber}
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
              required
            />
            <Typography mb={3}>Secondary Email Address 1</Typography>
            <TextField
              id='outlined-number'
              name='secondaryEmailId1'
              value={formData.secondaryEmailId1}
              onChange={handleInputChange}
              sx={{ width: '100%', marginBottom: 8 }}
            />

            <Typography mb={3}>Secondary Email Address 2</Typography>
            <TextField
              id='outlined-number'
              name='secondaryEmailId2'
              value={formData.secondaryEmailId2}
              onChange={handleInputChange}
              sx={{ width: '100%', marginBottom: 8 }}
            />

            <Typography mb={3}>Secondary Email Address 3</Typography>
            <TextField
              id='outlined-number'
              name='secondaryEmailId3'
              value={formData.secondaryEmailId3}
              onChange={handleInputChange}
              sx={{ width: '100%', marginBottom: 8 }}
            />
            <Typography mb={3} color='blue'>
              Shipping Address LIne 1 *
            </Typography>
            <TextField
              id='outlined-number'
              name='addressLine1'
              value={address.addressLine1}
              onChange={handleInputChange}
              sx={{ width: '100%', marginBottom: 8 }}
            />
            <Typography mb={3}>Shipping Address LIne 2 *</Typography>
            <TextField
              id='outlined-number'
              name='addressLine2'
              value={address.addressLine2}
              onChange={handleInputChange}
              sx={{ width: '100%', marginBottom: 8 }}
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
                  Zipcode *
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
              disabled
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
            <select
              placeholder='Select Sales Agent'
              name='salesAgentId'
              style={{
                width: '100%',
                marginBottom: 8,
                padding: 19,
                borderRadius: 6,
                border: '1px solid rgba(58, 53, 65, 0.22)'
              }}
              value={formData.salesAgentId}
              onChange={(e: any) => handleSaleAgentChange(e)}
              required
            >
              {salesAgents?.map((item: ISalesAgentUsersList) => {
                return (
                  <option key={item.userId} value={item.userId}>
                    {item.storeName}
                  </option>
                )
              })}
            </select>

            <Typography mb={3}>Date of Onboarding *</Typography>
            <TextField
              id='outlined-number'
              name='customerSince'
              value={formattedDate}
              sx={{ width: '100%', marginBottom: 8 }}
              onChange={handleInputChange}
              disabled
              required
            />

            <Typography mb={3}>Payment Terms *</Typography>
            <TextField
              id='outlined-number'
              name='paymentTerms'
              value={formData.paymentTerms}
              sx={{ width: '100%', marginBottom: 8 }}
              disabled
              required
            />
          </Card>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Button size='large' type='submit' variant='contained'>
              Update
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  )
}

export default UpdateCustomerDetails
