/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { ProductOptionValue } from '@/src/graphql/query/products.query'
import { ApiRoutes } from '@/src/models/common.enum'
import { CookieKeys, getCookie } from '@/src/models/cookie.model'
import { environment } from '@/src/service/env'
import { useLazyQuery, useQuery } from '@apollo/client'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Grid from '@mui/system/Unstable_Grid'
import axios from 'axios'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'
import { GetAllCategory, GetAllProduct, GetAllSubCategory } from 'src/graphql/query/category.query'
import { ICustomerCategory, IProductionOption, ISubCustomerCategory } from 'src/models/user.model'
import AddVarient from './AddVarient'
import Setimage from './setimage'

interface NewProduct {
  productName: string
  description: string
  categoryId: number
  subCategoryId: number
  productIsActive: boolean
}

interface Variant {
  productVariantOptionId: number
  values: string[]
}

interface CombinationEntry {
  name: string
}

interface productOptionsValue {
  combinationJson: {
    [key: string]: {
      __typename: string
      id: number
      productVariantOptionId: number
      name: string
      isDeleted: boolean
    }
  }
}

interface IProductVariant {
  price: number
  variantWholesalePrice: number
  quantity: number
  variantSKU: string
  isDefault: boolean
  combinationJson: productOptionsValue
  productImageNames: string[]
  getImage: Blob
}
interface IProductVariant {
  id: number
  price: number
  variantWholesalePrice: number
  quantity: number
  variantSKU: string
  isDefault: boolean
  combinationJson: productOptionsValue
  productImageNames: string[]
  getImage: Blob
}

interface ProductValue {
  [key: string]: ProductVariantOptionValue
}

interface ProductVariantOptionValue {
  __typename: string
  id: number
  productVariantOptionId: number
  name: string
  isDeleted: boolean
}

interface IUpdatedCombinationJson {
  getImage?: Blob
  combinationJson: {
    [key: string]: string
  }
  id: number
  price: number
  variantWholesalePrice: number
  quantity: number
  variantSKU: string
  isDefault: boolean
  productImageNames: string[]
}

interface CombinationItem {
  name: string
}

const Newproduct = () => {
  const router = useRouter()
  const [category, setCategories] = useState<number>(1)
  const [checkedKeys, setCheckedKeys] = useState<number[]>([])
  const [newProduct, setNewProduct] = useState<NewProduct>({
    productName: '',
    categoryId: 0,
    subCategoryId: 0,
    description: '',
    productIsActive: true
  })

  const [variants, setVariants] = useState<Variant[]>([])
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: (string | number)[] }>({})
  const [showAddVariant, setShowAddVariant] = useState(false)
  const [combinationJson, setCombinationJson] = useState<IProductVariant[]>([])

  const { data: AllCategories } = useQuery(GetAllCategory)
  const categories = AllCategories?.allCategories.graphdata as ICustomerCategory[]

  const { data: AllproductOptions } = useQuery(GetAllProduct)
  const productOption = AllproductOptions?.productOptions.graphdata as IProductionOption[]

  const { data: AllSubCategories } = useQuery(GetAllSubCategory(category))
  const subCategories = AllSubCategories?.subCategoryByCategoryId.graphdata as ISubCustomerCategory[]
  const [loadProductOptionsValue, { loading, error, data }] = useLazyQuery(ProductOptionValue)
  const [productValue, setProductValue] = useState<ProductValue>({})
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    if (data) {
      setProductValue(prev => ({
        ...prev,
        [data.productOptionsValue.graphdata[0]?.productVariantOptionId]: data.productOptionsValue.graphdata
      }))
    }
  }, [data])

  const handleCatogorySelect = (event: SelectChangeEvent<string>) => {
    const value = parseInt(event.target.value)
    setCategories(value)
    setNewProduct({ ...newProduct, categoryId: value })
    if (value) setErrors(prev => ({ ...prev, categoryId: '' }))
  }

  const handleSubCatogorySelect = (event: SelectChangeEvent<string>) => {
    const value = parseInt(event.target.value)
    setNewProduct({ ...newProduct, subCategoryId: value })
    if (value) setErrors(prev => ({ ...prev, subCategoryId: '' }))
  }

  const handleImageChange = (images: File[]) => {
    setSelectedImages(images)
    if (images.length > 0) setErrors(prev => ({ ...prev, images: '' }))
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setNewProduct({ ...newProduct, [name]: value })
  }

  const handleCheckboxChange = (key: number) => {
    if (checkedKeys.includes(key)) {
      setCheckedKeys(prevCheckedKeys => prevCheckedKeys.filter(k => k !== key))
    } else {
      setCheckedKeys(prevCheckedKeys => [...prevCheckedKeys, key])
    }

    const removedIds = combinationJson.map((item: IProductVariant) => item.id)
    setCombinationJson(prevItems => prevItems.filter(item => !removedIds.includes(item.id)))
    setCheckedKeys(prevCheckedKeys => prevCheckedKeys.filter(key => !removedIds.includes(key)))

    setVariants(prevVariants => {
      if (prevVariants.some(variant => variant.productVariantOptionId === key)) {
        return prevVariants.filter(variant => variant.productVariantOptionId !== key)
      } else {
        return [...prevVariants, { productVariantOptionId: key, values: [] }]
      }
    })

    setSelectedOptions(prevOptions => {
      const newOptions = { ...prevOptions }
      if (prevOptions[key]) {
        delete newOptions[key]
      }

      return newOptions
    })

    if (!checkedKeys.includes(key)) {
      loadProductOptionsValue({ variables: { productVariantOptionId: key } })
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!newProduct.categoryId) newErrors.categoryId = 'Category is required'
    if (!newProduct.subCategoryId) newErrors.subCategoryId = 'Sub Category is required'
    if (checkedKeys.length === 0) newErrors.productType = 'Product Type is required'
    if (selectedImages.length === 0) newErrors.images = 'At least one image is required'
    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) return

    const token = getCookie(CookieKeys.USER_TOKEN)
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      const combinationJsonData = combinationJson.map(item => item.combinationJson)

      const result = combinationJsonData.reduce((acc: any, item: any) => {
        Object.keys(item).forEach(key => {
          const variant = item[key]
          const { productVariantOptionId, id } = variant

          if (!acc[productVariantOptionId]) {
            acc[productVariantOptionId] = []
          }
          acc[productVariantOptionId].push(id)
        })

        return acc
      }, {})
      const variantArray = Object.keys(result).map(key => ({
        productVariantOptionId: parseInt(key),
        optionValuesId: result[parseInt(key)]
      }))

      const updatedcombinationJson = combinationJson.map((item: IProductVariant) => ({
        ...item,
        combinationJson: Object.fromEntries(
          Object.entries(item.combinationJson).map(([key, value]) => [key, (value as CombinationEntry).name])
        )
      }))

      const imageNames = combinationJson.flatMap(item => item.productImageNames)
      const matchedImages = selectedImages.filter(file => imageNames.includes(file.name))

      updatedcombinationJson.forEach((obj: IUpdatedCombinationJson) => {
        delete obj.getImage
      })

      const payload = {
        ...newProduct,
        code: 'DJJAS',
        variants: variantArray,
        combinationImage: updatedcombinationJson
      }

      const formData = new FormData()
      formData.append('Product', JSON.stringify(payload))
      formData.append('DefaultImage', matchedImages[0])

      for (let i = 0; i < matchedImages.length; i++) {
        formData.append('ProductImages', matchedImages.map(image => image)[i])
      }

      const response = await axios.post(`${environment.DevbaseUrl}${ApiRoutes.Products}`, formData, config)
      console.log(response)
      router.push('/products')
    } catch (error) {
      console.log('error', error)
    }
  }

  const getNamesOfCheckedItems = () => {
    const checkedItemNames: string[] = []

    productOption?.forEach(function (item) {
      if (checkedKeys.includes(item.id)) {
        checkedItemNames.push(item.name)
      }
    })

    return checkedItemNames
  }

  const checkedNames = getNamesOfCheckedItems()

  const handleNavigateBack = () => {
    router.push('/products')
  }

  const handleAddVariantClick = () => {
    if (!validateForm()) return
    setShowAddVariant(true)
  }

  const handleCloseAddVariant = () => {
    setShowAddVariant(false)
  }

  const handleSaveVariant = (newVariant: any) => {
    setCombinationJson(prevItems => [...prevItems, newVariant])
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='h5' gutterBottom style={{ display: 'flex', alignItems: 'center' }}>
              <KeyboardArrowLeftIcon sx={{ fontSize: 30, cursor: 'pointer' }} onClick={handleNavigateBack} />
              Add New Product
            </Typography>
          </Box>

          <Grid xs={12}>
            <Card>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'left',
                  gap: 10,
                  m: 10
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 5
                  }}
                >
                  <Typography variant='body1'>Title*</Typography>
                  <TextField
                    id='outlined-number'
                    name='productName'
                    value={newProduct.productName}
                    onChange={handleInputChange}
                    required
                  />
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 5
                  }}
                >
                  <Typography variant='body1'>Description*</Typography>
                  <TextField
                    multiline
                    rows={8}
                    variant='outlined'
                    name='description'
                    value={newProduct.description}
                    onChange={handleInputChange}
                    required
                  />
                </Box>

                {/* set Image code  */}
                <Box>
                  <Setimage onImageChange={handleImageChange} />
                  {!!errors.images && <Typography color='error'>{errors.images}</Typography>}
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <Typography variant='body1'>Category</Typography>
                  <Select
                    placeholder='Select Category'
                    name='categoryId'
                    defaultValue='default'
                    onChange={handleCatogorySelect}
                    required
                  >
                    <MenuItem value='default' disabled>
                      Select a Category
                    </MenuItem>
                    {categories?.map((item: ICustomerCategory) => {
                      return (
                        <MenuItem key={item.categoryId} value={item.categoryId}>
                          {item.categoryName}
                        </MenuItem>
                      )
                    })}
                  </Select>
                  {!!errors.categoryId && <Typography color='error'>{errors.categoryId}</Typography>}
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <Typography variant='body1'>Sub Category</Typography>
                  <Select
                    placeholder='Select Sub Catogoty'
                    name='subCategoryId'
                    onChange={handleSubCatogorySelect}
                    defaultValue='default'
                    disabled={newProduct.categoryId === 0}
                    required

                    // value={newProduct.subCategoryId || ''}
                  >
                    <MenuItem value='default' disabled>
                      Select a Sub Category
                    </MenuItem>
                    {subCategories?.map((item: ISubCustomerCategory) => {
                      return (
                        <MenuItem key={item.subCategoryId} value={item.subCategoryId}>
                          {item.subCategoryName}
                        </MenuItem>
                      )
                    })}
                  </Select>
                  {!!errors.subCategoryId && <Typography color='error'>{errors.subCategoryId}</Typography>}
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <Typography variant='body1'>Product Type</Typography>
                  <FormGroup
                    style={{
                      width: '100%',
                      marginBottom: 8,
                      padding: 19,
                      borderRadius: 6,
                      border: '1px solid rgba(58, 53, 65, 0.22)'
                    }}
                  >
                    {productOption?.map((productOption: IProductionOption) => (
                      <FormGroup key={productOption.id}>
                        <FormControlLabel
                          key={productOption.id}
                          control={
                            <>
                              <input
                                type='checkbox'
                                checked={checkedKeys.includes(productOption.id)}
                                onChange={() => handleCheckboxChange(productOption.id)}
                                value={productOption.id}
                              />
                            </>
                          }
                          label={productOption.name}
                          required
                        />
                      </FormGroup>
                    ))}
                  </FormGroup>

                  {errors.productType && <FormHelperText error>{errors.productType}</FormHelperText>}
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <Typography>Variants</Typography>
                  <Box sx={{ border: '1px solid #ccc', borderRadius: '8px' }}>
                    <Box sx={{ padding: '20px 30px' }}>
                      <Box sx={{ marginTop: 2, display: 'flex', gap: 2 }}>
                        {checkedNames.map((name: string, index: number) => (
                          <Button sx={{ backgroundColor: '#ccc', Margin: 10 }} key={index}>
                            {name}
                          </Button>
                        ))}
                      </Box>
                    </Box>
                    <Box sx={{ borderTop: '1px solid #ccc' }}>
                      <Button onClick={handleAddVariantClick}>+ Add A Variant</Button>
                    </Box>
                  </Box>
                </Box>

                {showAddVariant ? (
                  <AddVarient
                    productOptions={productOption}
                    checkedKeys={checkedKeys}
                    Varient={variants}
                    onClose={handleCloseAddVariant}
                    selectedImages={selectedImages}
                    onSave={handleSaveVariant}
                    productValue={productValue}
                  />
                ) : (
                  <TableContainer sx={{ maxHeight: 660 }}>
                    <Table stickyHeader aria-label='sticky table'>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ backgroundColor: '#EEEEEE', minWidth: '1rem' }}>
                            <Checkbox sx={{ top: '2px', justifyContent: 'space-between', left: '-1px' }} />
                          </TableCell>
                          <TableCell align='left' sx={{ minWidth: '30rem', backgroundColor: '#EEEEEE' }}>
                            <Typography variant='subtitle1' sx={{ fontSize: '0.75rem', color: '#4C4A54' }}>
                              Variants
                            </Typography>
                          </TableCell>

                          <TableCell align='left' sx={{ minWidth: '10rem', backgroundColor: '#EEEEEE' }}>
                            <Typography variant='subtitle1' sx={{ fontSize: '0.75rem', color: '#4C4A54' }}>
                              Price
                            </Typography>
                          </TableCell>
                          <TableCell align='left' sx={{ minWidth: '10rem', backgroundColor: '#EEEEEE' }}>
                            <Typography variant='subtitle1' sx={{ fontSize: '0.75rem', color: '#4C4A54' }}>
                              Whole Sale Price
                            </Typography>
                          </TableCell>

                          <TableCell align='left' sx={{ minWidth: '10rem', backgroundColor: '#EEEEEE' }}>
                            <Typography variant='subtitle1' sx={{ fontSize: '0.75rem', color: '#4C4A54' }}>
                              Quantity
                            </Typography>
                          </TableCell>
                          <TableCell align='left' sx={{ minWidth: '10rem', backgroundColor: '#EEEEEE' }}>
                            <Typography variant='subtitle1' sx={{ fontSize: '0.75rem', color: '#4C4A54' }}>
                              Available
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {combinationJson.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} align='center'>
                              Data Not Found
                            </TableCell>
                          </TableRow>
                        ) : (
                          combinationJson.map((item: IProductVariant, i: number) => {
                            return (
                              <TableRow key={i}>
                                <TableCell>
                                  <Checkbox sx={{ justifyContent: 'space-between' }} />
                                </TableCell>
                                <TableCell>
                                  <Box sx={{ display: 'flex' }}>
                                    <img
                                      src={`${item.getImage}`}
                                      alt='Example'
                                      style={{ width: '100px', height: '100px', marginRight: '15px' }}
                                    />
                                    <Box>
                                      {Object.values(item.combinationJson).map((obj: CombinationItem, i: number) => {
                                        return (
                                          <Typography variant='body1' key={i}>
                                            {obj.name}
                                          </Typography>
                                        )
                                      })}
                                      <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                        B-40220-YG
                                      </Typography>
                                    </Box>
                                  </Box>
                                </TableCell>
                                <TableCell>
                                  <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                    {item.price}
                                  </Typography>
                                </TableCell>

                                <TableCell>
                                  <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                    {item.variantWholesalePrice}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                    {item.quantity}
                                  </Typography>
                                </TableCell>

                                <TableCell>
                                  <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <Button variant='contained' color='success'>
                                      Active
                                    </Button>
                                    <Button color='secondary' variant='contained' disabled>
                                      Archived
                                    </Button>
                                  </Box>
                                </TableCell>
                              </TableRow>
                            )
                          })
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Box>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', margin: '1rem' }}>
                <Button size='large' type='submit' variant='contained'>
                  Add new product
                </Button>
              </div>
            </Card>
          </Grid>
        </Grid>
      </form>
    </>
  )
}
export default Newproduct
