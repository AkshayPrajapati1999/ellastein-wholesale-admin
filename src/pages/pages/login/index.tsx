/* eslint-disable jsx-a11y/alt-text */
// ** React Imports
import { ChangeEvent, MouseEvent, ReactNode, useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// ** Icons Imports
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import EyeOutline from 'mdi-material-ui/EyeOutline'

// ** Configs

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import { userLogin } from 'src/redux/feature/auth/authAction'
import { useAppDispatch } from 'src/redux/hook'

interface State {
  password: string
  showPassword: boolean
}

// ** Styled Components

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const LoginPage = () => {
  const dispatch = useAppDispatch()

  // ** State
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false
  })

  // ** Hook
  const router = useRouter()

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleLogin = (formData: FormData) => {
    dispatch(userLogin(formData)).then((data: any) => {
      if (data) {
        router.push('/')
      }
    })
  }
  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const data: any = Object.fromEntries(formData.entries())
    handleLogin(data)
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
        <img
          style={{ width: '194.06px', height: '19.93px' }}
          src='https://res.cloudinary.com/dbrtm8pf6/image/upload/a_ignore,c_fit,h_100,q_80/v1707458898/uploads/c003d69e/profiles/1/footer_logos/antzo3qltlr859qvlxcn.png'
        />
      </Box>

      <Box className='content-center'>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 6 }}>
            <Typography
              sx={{
                fontWeight: 600,
                textAlign: 'center',
                color: '#4C4A54',
                fontFamily: 'Bartender-SemiCondensedSans',
                letterSpacing: '2.01px',
                fontSize: '71.92px',
                marginBottom: 1.5
              }}
            >
              LOGIN
            </Typography>
            <Typography sx={{ textAlign: 'center', fontSize: '16.78px', fontFamily: 'Figtree-SemiBold' }}>
              TO BECOME A PARTNER <span style={{ textDecoration: 'underline' }}> APPLY HERE</span>
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              fullWidth
              placeholder='Email Address'
              id='email'
              name='email'
              sx={{
                marginBottom: 4,
                background: '#f6f5f8',
                borderRadius: '11px',
                border: '1px solid #4C4A54',
                font: 'italic normal normal 16px/63px Figtree'
              }}
            />
            <FormControl fullWidth>
              <OutlinedInput
                placeholder='Password'
                name='password'
                value={values.password}
                id='auth-login-password'
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
                sx={{
                  marginBottom: 4,
                  background: '#f6f5f8',
                  borderRadius: '11px',
                  border: '1px solid #4C4A54',
                  font: 'italic normal normal 16px/63px Figtree'
                }}
              />
            </FormControl>
            <Box
              sx={{
                mb: 4,
                font: 'normal normal normal 16px/45px Figtree',
                fontSize: '16px',
                color: '#4C4A54',
                textAlign: 'right'
              }}
            >
              <Link passHref href='/'>
                <LinkStyled onClick={e => e.preventDefault()}>Forgot Password?</LinkStyled>
              </Link>
            </Box>
            <Button
              type='submit'
              fullWidth
              size='large'
              variant='contained'
              sx={{
                marginBottom: 7,
                backgroundColor: '#4C4A54',
                color: '#EDECF1',
                latterSpacing: 'letter-spacing: 2.24px;'
              }}
            >
              SIGN IN
            </Button>
          </form>
        </CardContent>
      </Box>
    </>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginPage
