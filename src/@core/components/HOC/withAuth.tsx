import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { parseCookies } from 'nookies'
import { CookieKeys } from 'src/models/cookie.model'

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const Wrapper = (props: any) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
    const router = useRouter()

    useEffect(() => {
      const checkAuth = () => {
        const cookies = parseCookies()
        const userData = cookies[CookieKeys.USER_TOKEN]
        if (userData) {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
          router.push('/pages/login/')
        }
      }

      checkAuth()
    }, [router])

    if (isAuthenticated === null) {
      return null
    }

    if (isAuthenticated) {
      return <WrappedComponent {...props} />
    }

    return null
  }

  return Wrapper
}

export default withAuth
