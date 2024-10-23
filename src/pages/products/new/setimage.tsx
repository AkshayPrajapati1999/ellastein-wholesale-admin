import ClearIcon from '@mui/icons-material/Clear'
import { Box, Button, IconButton } from '@mui/material'
import Grid from '@mui/system/Unstable_Grid'
import { useRef, useState } from 'react'

interface SetimageProps {
  onImageChange: (images: File[]) => void
}

const Setimage: React.FC<SetimageProps> = ({ onImageChange }) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      const images = Array.from(files) as File[]
      setSelectedImages(prevImages => [...prevImages, ...images])
      onImageChange([...selectedImages, ...images])
    }
  }

  const handleImageUpload = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...selectedImages]
    newImages.splice(index, 1)
    setSelectedImages(newImages)
    onImageChange(newImages)
  }

  return (
    <div>
      <input type='file' id='file' ref={inputRef} multiple style={{ display: 'none' }} onChange={handleImageChange} />

      <Box>
        <Grid container spacing={2} rowSpacing={5} columnSpacing={{ xs: 5 }}>
          {selectedImages.map((image, index) => (
            <Grid xs={6} key={index}>
              <div style={{ position: 'relative' }}>
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Image ${index + 1}`}
                  style={{ width: '100%', height: 'auto' }}
                />
                <IconButton
                  style={{ position: 'absolute', top: '5px', right: '5px', zIndex: 1 }}
                  onClick={() => removeImage(index)}
                >
                  <ClearIcon />
                </IconButton>
              </div>
            </Grid>
          ))}
          <Grid xs={6}>
            <Button variant='contained' onClick={handleImageUpload}>
              Add Image
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default Setimage
