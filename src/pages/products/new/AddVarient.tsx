import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  TextField,
  Typography
} from '@mui/material'
import React, { ChangeEvent, useState } from 'react'

interface IProductionOption {
  id: number
  name: string
}
interface ProductVariantOption {
  [x: string]: any
  __typename: string
  id: number
  name: string
  isDeleted: boolean
}

interface VariantData {
  price: number
  variantWholesalePrice: number
  quantity: number
  variantSKU: string
  isDefault: boolean
  combinationJson: { [key: string]: string }
  productImageNames: string[]
  getImage: string[]
}

interface AddVariantProps {
  productOptions: IProductionOption[]
  checkedKeys: number[]
  onClose: () => void
  onSave: (data: VariantData) => void
  Varient: any
  selectedImages: File[]
  productValue: { [key: string | number]: ProductVariantOption }
}

const AddVariant: React.FC<AddVariantProps> = ({
  productOptions,
  checkedKeys,
  onClose,
  onSave,
  selectedImages,
  productValue
}) => {
  const [variantData, setVariantData] = useState({
    price: 0,
    variantWholesalePrice: 0,
    quantity: 0,
    variantSKU: '',
    isDefault: true,
    combinationJson: {} as { [key: string]: string },
    productImageNames: [] as string[],
    getImage: [] as string[]
  })

  const [error, setError] = useState<{ [key: string]: string }>({})
  const [dropdownError, setDropdownError] = useState<{ [key: string]: string }>({})
  const [selectedImage, setSelectedImage] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string }>({})

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const convertedValue =
      name === 'price' || name === 'variantWholesalePrice' || name === 'quantity' ? parseInt(value) : value

    setVariantData(prevdata => ({
      ...prevdata,
      [name]: convertedValue
    }))
  }

  const handleSelectDropdownChange = (event: React.ChangeEvent<{ value: unknown }>, key: number) => {
    const { value } = event.target
    const selectedValue = value as string
    setSelectedOptions(prevSelectedOptions => ({
      ...prevSelectedOptions,
      [key]: selectedValue
    }))

    if (key) {
      setVariantData(prevData => ({
        ...prevData,
        combinationJson: {
          ...prevData.combinationJson,
          [productOptions.find(opt => opt.id === key)?.name || '']: selectedValue
        }
      }))
      setDropdownError(prevErrors => ({
        ...prevErrors,
        [key]: ''
      }))
    } else {
      setVariantData(prevData => ({ ...prevData, value }))
    }
  }

  const handleSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
    const imageName = e.target.value
    setSelectedImage(imageName)

    const file = selectedImages.find(image => image.name === imageName)

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setImagePreview(base64String)
        setVariantData(prevData => ({
          ...prevData,
          productImageNames: [imageName],
          getImage: [base64String]
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const validateFormData = async () => {
    const errors: { [key: string]: string } = {}
    const dropdownErrors: { [key: string]: string } = {}

    if (variantData.price <= 0) {
      errors.price = 'Price is required'
    } else if (!Number.isInteger(variantData.price)) {
      errors.price = 'Price must be a number'
    }

    if (variantData.variantWholesalePrice <= 0) {
      errors.variantWholesalePrice = 'Wholesale price is required'
    } else if (!Number.isInteger(variantData.variantWholesalePrice)) {
      errors.variantWholesalePrice = 'Wholesale price must be a number'
    }

    if (variantData.quantity <= 0) {
      errors.quantity = 'Quantity must be a required'
    } else if (!Number.isInteger(variantData.quantity)) {
      errors.quantity = 'quantity must be a number'
    }

    if (!variantData.variantSKU) errors.variantSKU = 'Variant SKU is required'
    if (!selectedImage) errors.image = 'Image is required'

    checkedKeys.forEach(key => {
      const optionName = productOptions.find(opt => opt.id === key)?.name
      if (optionName && !variantData.combinationJson[optionName]) {
        dropdownErrors[key] = `${optionName} is required`
      }
    })

    setError(errors)
    setDropdownError(dropdownErrors)
    if (Object.keys(errors).length === 0 && Object.keys(dropdownErrors).length === 0) {
      return true
    }

    return false
  }

  const handleSave = async () => {
    const isValid = await validateFormData()
    if (isValid) {
      onSave(variantData)
      onClose()
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        border: '1px solid rgba(58, 53, 65, 0.22)',
        padding: 10,
        borderRadius: 6
      }}
    >
      <Typography variant='h5' sx={{ marginBottom: '10px' }}>
        Add Variant
      </Typography>

      <Box sx={{ display: 'flex', gap: 6 }}>
        <Box sx={{ width: '100%' }}>
          <Typography variant='body1' sx={{ marginBottom: 5 }}>
            PRICE*
          </Typography>
          <TextField
            sx={{ width: '100%' }}
            id='outlined-number'
            name='price'
            onChange={handleInputChange}
            error={!!error.price}
            helperText={error.price}
          />
        </Box>
        <Box sx={{ width: '100%' }}>
          <Typography variant='body1' sx={{ marginBottom: 5 }}>
            WHOLESALE PRICE*
          </Typography>
          <TextField
            sx={{ width: '100%' }}
            id='outlined-number'
            name='variantWholesalePrice'
            onChange={handleInputChange}
            error={!!error.variantWholesalePrice}
            helperText={error.variantWholesalePrice}
          />
        </Box>
        <Box sx={{ width: '100%' }}>
          <Typography variant='body1' sx={{ marginBottom: 5 }}>
            QUANTITY*
          </Typography>
          <TextField
            sx={{ width: '100%' }}
            id='outlined-number'
            name='quantity'
            error={!!error.quantity}
            helperText={error.quantity}
            onChange={handleInputChange}
          />
        </Box>
        <Box sx={{ width: '100%' }}>
          <Typography variant='body1' sx={{ marginBottom: 5 }}>
            variantSKU *
          </Typography>
          <TextField
            sx={{ width: '100%' }}
            id='outlined-number'
            name='variantSKU'
            error={!!error.variantSKU}
            helperText={error.variantSKU}
            onChange={handleInputChange}
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Typography variant='body1'>Image</Typography>
        <FormControl variant='outlined' fullWidth>
          <Select defaultValue='' onChange={(e: any) => handleSelectChange(e)}>
            <MenuItem value='' disabled>
              Select an option
            </MenuItem>
            {selectedImages?.map((image, index) => (
              <MenuItem key={index} value={image.name}>
                {image.name}
              </MenuItem>
            ))}
          </Select>
          {imagePreview && <img src={imagePreview} alt={selectedImage} style={{ width: '10%', marginTop: 8 }} />}

          {!!error.image && (
            <Typography variant='caption' color='error'>
              {error.image}
            </Typography>
          )}
        </FormControl>
      </Box>

      {checkedKeys?.map(key => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }} key={key}>
          <Typography variant='body1'>{productOptions?.find(opt => opt.id === key)?.name}</Typography>
          <FormControl variant='outlined' sx={{ m: 1, width: 300 }}>
            <InputLabel id={`multiple-select-label-${key}`}>
              {productOptions?.find(opt => opt.id === key)?.name}
            </InputLabel>
            <Select
              labelId={`multiple-select-label-${key}`}
              id={`multiple-select-${key}`}
              required
              value={selectedOptions[key] || []}
              onChange={(e: any) => handleSelectDropdownChange(e, key)}
              input={<OutlinedInput label={productOptions.find(opt => opt.id === key)?.name} />}
              error={!!dropdownError[key]}
            >
              {productValue[key]?.map((option: any, i: number) => (
                <MenuItem key={i} value={option}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
            {!!dropdownError[key] && (
              <Typography variant='caption' color='error'>
                {dropdownError[key]}
              </Typography>
            )}
          </FormControl>
        </Box>
      ))}

      <FormGroup>
        <FormControlLabel control={<Switch defaultChecked />} label=' isDefault' />
      </FormGroup>
      <Button onClick={handleSave} variant='contained' size='small' sx={{ width: '200px' }}>
        Save Variant
      </Button>
    </Box>
  )
}

export default AddVariant
