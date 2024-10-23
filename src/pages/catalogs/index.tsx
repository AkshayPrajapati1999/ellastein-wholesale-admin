import { downloadPdf } from '@/src/@core/utils/fileDownload'
import { DeleteCatalog, GetAllCatalog } from '@/src/graphql/query/catalog.query'
import { CookieKeys, getCookie } from '@/src/models/cookie.model'
import { ICatalog } from '@/src/models/user.model'
import { useMutation, useQuery } from '@apollo/client'
import DeleteIcon from '@mui/icons-material/Delete'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import {
  Box,
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography
} from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useSelector } from 'react-redux'
import PDFImage from './PDFImage'

interface Styles {
  [key: string]: React.CSSProperties
}

const styles: Styles = {
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  title: {
    fontSize: '24px'
  },
  buttonsContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  addButtonHover: {
    backgroundColor: '#f0f0f0'
  },
  cardContainer: {
    marginBottom: '20px'
  },
  catalogImage: {
    height: 300,
    width: '100%',
    objectFit: 'cover',
    borderRadius: 0
  },
  uploadContainer: {
    border: '2px dashed #ccc',
    borderRadius: '4px',
    padding: '16px',
    textAlign: 'center',
    cursor: 'pointer',
    marginTop: '16px'
  }
}

const MUITable: React.FC = () => {
  const { userRole } = useSelector((state: any) => state.auth)
  const [open, setOpen] = useState<boolean>(false)
  const [pdfFiles, setPdfFiles] = useState<File[]>([])
  const [catalogName, setCatalogName] = useState<string>('')
  const [selectedCatalogs, setSelectedCatalogs] = useState<number[]>([])
  const [isNameValid, setIsNameValid] = useState(false)
  const [isPdfValid, setIsPdfValid] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false)

  const { loading, error, data, refetch } = useQuery(GetAllCatalog)

  const [deleteCatalog] = useMutation(DeleteCatalog())

  const catalogData: ICatalog[] | undefined = data?.allCatalogs.graphdata

  const handleDownload = async (url: string, filename: string) => {
    await downloadPdf(url, filename)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onDrop = (acceptedFiles: File[]) => {
    setPdfFiles([...pdfFiles, ...acceptedFiles])
    setIsPdfValid(acceptedFiles.length >= 0)
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': []
    },
    onDrop: onDrop
  })

  const handleCreateCatalog = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setFormSubmitted(true)
    if (!isNameValid || !isPdfValid) {
      alert('Please fill in all required fields.')

      return
    }
    const token = getCookie(CookieKeys.USER_TOKEN)
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
      const formData = new FormData()
      formData.append('name', catalogName)
      pdfFiles.forEach(file => {
        formData.append('pdfFile', file)
      })

      const response = await axios.post('http://ellastien-api.appunik.com/api/Catalog', formData, config)

      if (response.status === 200) {
        handleClose()
        refetch()
      }
    } catch (error) {
      console.error('Error creating catalog:', error)
    }
  }

  const handleDeleteCatalog = async (id: number) => {
    try {
      const { data } = await deleteCatalog({
        variables: { id }
      })
      console.log('Catalog deleted:', data)
      refetch()
    } catch (error) {
      console.error('Error deleting catalog:', error)
    }
  }

  const handleRemoveFile = (fileIndex: any) => {
    setPdfFiles(prevFiles => prevFiles.filter((_, index) => index !== fileIndex))
  }

  const handleCheckboxChange = (catalogId: number) => {
    setSelectedCatalogs(prevState =>
      prevState.includes(catalogId) ? prevState.filter(id => id !== catalogId) : [...prevState, catalogId]
    )
  }

  const handleExportSelected = async () => {
    const selected = catalogData?.filter(catalog => selectedCatalogs.includes(catalog.id)) || []
    for (const catalog of selected) {
      await handleDownload(catalog.path, `${catalog.name}.pdf`)
    }
  }

  return (
    <Box>
      <Box style={styles.headerContainer}>
        <Typography style={styles.title}>Catalogs</Typography>
        <Box style={styles.buttonsContainer}>
          <Button
            variant='contained'
            sx={{
              backgroundColor: 'white',
              boxShadow: 'none',
              marginLeft: '20px',
              color: '#4C4A54',
              '&:hover': styles.addButtonHover
            }}
            onClick={handleClickOpen}
          >
            Add New Catalog
          </Button>
          <Button
            variant='contained'
            sx={{
              backgroundColor: 'white',
              boxShadow: 'none',
              marginLeft: '20px',
              color: '#4C4A54',
              '&:hover': styles.addButtonHover
            }}
            onClick={handleExportSelected}
            disabled={selectedCatalogs.length === 0}
          >
            Download All
          </Button>
          {userRole !== 'Admin' && (
            <Button
              variant='contained'
              sx={{
                backgroundColor: 'white',
                boxShadow: 'none',
                marginLeft: '20px',
                color: '#4C4A54',
                '&:hover': styles.addButtonHover
              }}
              onClick={handleExportSelected}
              disabled={selectedCatalogs.length === 0}
            >
              Download All
            </Button>
          )}
          {/* {userRole === 'Admin' ? (
            <Button
              variant='contained'
              sx={{
                backgroundColor: 'white',
                boxShadow: 'none',
                marginLeft: '20px',
                color: '#4C4A54',
                '&:hover': styles.addButtonHover
              }}
              onClick={handleClickOpen}
            >
              Add New Catalog
            </Button>
          ) : (
            <Button
              variant='contained'
              sx={{
                backgroundColor: 'white',
                boxShadow: 'none',
                marginLeft: '20px',
                color: '#4C4A54',
                '&:hover': styles.addButtonHover
              }}
              onClick={handleExportSelected}
              disabled={selectedCatalogs.length === 0}
            >
              Download All
            </Button>
          )} */}
        </Box>
      </Box>

      <Grid container spacing={4}>
        {loading ? (
          <p style={{ paddingLeft: '1rem' }}>Loading...</p>
        ) : error ? (
          <p style={{ paddingLeft: '1rem' }}>Error: {error.message}</p>
        ) : (
          catalogData?.map((catalog: ICatalog, index: number) => (
            <Grid key={index} item>
              <Card
                sx={{
                  width: '385px',
                  height: '80%',
                  borderRadius: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative'
                }}
              >
                <PDFImage url={catalog.path} pageNumber={1} />
                <Checkbox
                  checked={selectedCatalogs.includes(catalog.id)}
                  onChange={() => handleCheckboxChange(catalog.id)}
                  inputProps={{ 'aria-label': 'Select catalog' }}
                  sx={{ position: 'absolute', top: 8, left: 8 }}
                />
              </Card>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                <Typography gutterBottom sx={{ textAlign: 'center' }} component='div'>
                  {catalog.name}
                </Typography>
                <Grid sx={{ display: 'flex' }}>
                  <Grid item>
                    <IconButton
                      aria-label='download'
                      onClick={() => handleDownload(catalog.path, `${catalog.name}.pdf`)}
                    >
                      <FileDownloadIcon />
                    </IconButton>
                  </Grid>
                  {userRole === 'Admin' && (
                    <Grid item>
                      <IconButton aria-label='delete' onClick={() => handleDeleteCatalog(catalog.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  )}
                </Grid>
              </div>
            </Grid>
          ))
        )}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Catalog</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            label='Catalog Name'
            type='text'
            fullWidth
            variant='standard'
            value={catalogName}
            onChange={e => {
              setCatalogName(e.target.value)
              setIsNameValid(e.target.value.trim() !== '')
            }}
            required
            error={!isNameValid && formSubmitted}
            helperText={!isNameValid && formSubmitted && 'Catalog Name is required'}
          />
          <Box {...getRootProps()} sx={styles.uploadContainer}>
            <input {...getInputProps()} />
            <Typography>Drag & drop a PDF here, or click to select a PDF</Typography>
            {!isPdfValid && formSubmitted && <Typography style={{ color: 'red' }}>PDF is required</Typography>}
          </Box>
          <List>
            {pdfFiles.map((file, index) => (
              <ListItem key={index}>
                <ListItemText primary={file.name} />
                <IconButton edge='end' onClick={() => handleRemoveFile(index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleCreateCatalog} color='primary'>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default MUITable
