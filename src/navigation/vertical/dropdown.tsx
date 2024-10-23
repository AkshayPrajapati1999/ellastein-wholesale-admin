import { Collapse, Link, List, ListItemButton, ListItemText } from '@mui/material'
import NextLink from 'next/link'
import { useState } from 'react'

const Dropdown = (props: any) => {
  const [open, setOpen] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [product, setProduct] = useState(props.list)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <div>
      <ListItemButton
        onClick={handleClick}
        sx={{
          '&:hover': {
            backgroundColor: 'inherit' // Remove hover effect
          },
          '&:active': {
            backgroundColor: 'inherit' // Remove click effect
          },
          '&:hover, &:active': {
            backgroundColor: 'inherit' // Remove both hover and click effects
          }
        }}
      >
        <ListItemText primary='Product' />
      </ListItemButton>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <NextLink href='/' passHref>
              <Link>
                <ListItemText primary='Demo1' />
              </Link>
            </NextLink>{' '}
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary='Demo1' />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary='Demo1' />
          </ListItemButton>
        </List>
      </Collapse>
    </div>
  )
}

export default Dropdown
