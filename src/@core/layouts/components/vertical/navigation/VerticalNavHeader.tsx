import { ReactNode } from 'react'
import Link from 'next/link'
import Box, { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { Settings } from 'src/@core/context/settingsContext'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
  verticalNavMenuBranding?: (props?: any) => ReactNode
}

// ** Styled Components
const MenuHeaderWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: theme.spacing(4.5),
  transition: 'padding .25s ease-in-out',
  minHeight: theme.mixins.toolbar.minHeight
}))

const VerticalNavHeader = (props: Props) => {
  // ** Props
  const { verticalNavMenuBranding: userVerticalNavMenuBranding } = props

  // ** Hooks

  return (
    <MenuHeaderWrapper className='nav-header' sx={{ pl: 6 }}>
      {userVerticalNavMenuBranding ? (
        userVerticalNavMenuBranding(props)
      ) : (
        <Link href='/' passHref>
          <img
            src='https://res.cloudinary.com/dbrtm8pf6/image/upload/a_ignore,c_fit,h_100,q_80/v1707458898/uploads/c003d69e/profiles/1/footer_logos/antzo3qltlr859qvlxcn.png'
            width='100%'
            alt='logo'
          />
        </Link>
      )}
    </MenuHeaderWrapper>
  )
}

export default VerticalNavHeader
