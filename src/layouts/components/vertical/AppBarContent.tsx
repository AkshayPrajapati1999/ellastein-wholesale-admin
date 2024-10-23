import Box from '@mui/material/Box'
import { useState } from 'react'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'

// interface Props {
//   hidden: boolean
//   settings: Settings
//   toggleNavVisibility: () => void
//   saveSettings: (values: Settings) => void
// }

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(3),
//     width: 'auto'
//   }
// }))

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   color: '#86829A',
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center'
// }))

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   width: '32ch',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch'
//     }
//   }
// }))

const AppBarContent = () => {
  // ** Props
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchTerm, setSearchTerm] = useState('')

  // const handleSearch = (event: { target: { value: SetStateAction<string> } }) => {
  //   setSearchTerm(event.target.value)
  // }

  // ** Hook

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
      {/* <Card
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '1px 1px 1px white',
          width: '333.77px',
          height: '36.44px'
        }}
      >
        <Search sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <StyledInputBase placeholder='Search…' inputProps={{ 'aria-label': 'search' }} onChange={handleSearch} />
          <SearchIconWrapper>
            <SearchIcon sx={{ color: '#86829A' }} />
          </SearchIconWrapper>
        </Search>
      </Card> */}
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        {/* <ModeToggler settings={settings} saveSettings={saveSettings} /> */}
        {/* <NotificationDropdown /> */}
        <UserDropdown />
      </Box>
    </Box>
  )
}

export default AppBarContent
