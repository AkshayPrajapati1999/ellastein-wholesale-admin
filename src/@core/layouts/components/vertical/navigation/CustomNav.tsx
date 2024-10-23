import { ListItemButton } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp'
import BusinessCenterSharpIcon from '@mui/icons-material/BusinessCenterSharp'
import InsertChartSharpIcon from '@mui/icons-material/InsertChartSharp'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined'
import PersonSharpIcon from '@mui/icons-material/PersonSharp'
import SellSharpIcon from '@mui/icons-material/SellSharp'
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp'
import TrendingUpSharpIcon from '@mui/icons-material/TrendingUpSharp'
import { useSelector } from 'react-redux'

interface NavigationItem {
  title: string
  icon: JSX.Element
  path: string
  subcategories?: NavigationItem[]
}

interface CustomLinkProps {
  href: string
  children: React.ReactNode
}

const CustomLink: React.FC<CustomLinkProps> = ({ children, href }) => {
  const router = useRouter()
  const isActive = router.pathname === href

  return (
    <Link href={href}>
      <a
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 3,
          width: '100%',
          borderTopRightRadius: 100,
          borderBottomRightRadius: 100,
          padding: '8px 14px',
          transition: 'opacity .25ms ease-in-out',
          textDecoration: 'none',
          backgroundColor: isActive ? '#5F76FF' : 'transparent',
          color: isActive ? 'white' : 'inherit'
        }}
      >
        {children}
      </a>
    </Link>
  )
}

const CustomNav: React.FC = () => {
  const { userRole } = useSelector((state: any) => state.auth)

  const navigation: { [key: string]: NavigationItem[] } = {
    Admin: [
      {
        title: 'Dashboard',
        icon: <InsertChartSharpIcon />,
        path: '/'
      },
      {
        title: 'Order',
        icon: <ShoppingCartSharpIcon />,
        path: '/orders'
      },
      {
        title: 'Customers',
        icon: <PersonSharpIcon />,
        path: '/customers'
      },
      {
        title: 'Products',
        icon: <SellSharpIcon />,
        path: '/products'
      },
      {
        title: 'Sales Reps',
        icon: <BusinessCenterSharpIcon />,
        path: '/sales'
      },
      {
        title: 'Catalogs',
        icon: <AssignmentSharpIcon />,
        path: '/catalogs'
      },
      {
        title: 'Reports ',
        icon: <TrendingUpSharpIcon />,
        path: '/reports'
      }
    ],
    SalesAgent: [
      {
        title: 'Dashboard',
        icon: <InsertChartSharpIcon />,
        path: '/'
      },
      {
        title: 'Order',
        icon: <ShoppingCartSharpIcon />,
        path: '/orders'
      },
      {
        title: 'Customers ',
        icon: <PersonSharpIcon />,
        path: '/customers'
      },
      {
        title: 'Catalogs ',
        icon: <AssignmentSharpIcon />,
        path: '/catalogs'
      },
      {
        title: 'Reports',
        icon: <TrendingUpSharpIcon />,
        path: '/reports'
      }
    ],
    RetailUser: [
      {
        title: 'Dashboard',
        icon: <InsertChartSharpIcon />,
        path: '/'
      },
      {
        title: 'Order',
        icon: <ShoppingCartSharpIcon />,
        path: '/orders'
      },
      {
        title: 'Reports',
        icon: <TrendingUpSharpIcon />,
        path: '/reports'
      },
      {
        title: 'Catalogs ',
        icon: <AssignmentSharpIcon />,
        path: '/catalogs'
      }
    ]
  }

  const [showSubcategories, setShowSubcategories] = useState<number | null>(null)

  const toggleSubcategories = (index: number) => {
    setShowSubcategories(showSubcategories === index ? null : index)
  }

  const renderSubcategories = (subcategories: NavigationItem[]) => {
    return subcategories.map((subcategory, index) => (
      <CustomLink key={index} href={subcategory.path}>
        <div style={{ paddingLeft: '25px', display: 'flex', alignItems: 'center', gap: 8 }}>
          {subcategory.icon}
          {subcategory.title}
        </div>
      </CustomLink>
    ))
  }

  const renderNavigationItems = (items: NavigationItem[]) => {
    return items.map((item, index) => (
      <li key={index}>
        {item.subcategories ? (
          <>
            <ListItemButton
              onClick={() => toggleSubcategories(index)}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '4px',
                gap: 8,
                width: '100%',
                borderTopRightRadius: 100,
                borderBottomRightRadius: 100,
                padding: '8px 14px',
                backgroundColor: showSubcategories === index ? '#5F76FF' : 'transparent',
                color: showSubcategories === index ? 'white' : 'inherit'
              }}
            >
              {item.icon} {item.title}
              <KeyboardArrowRightOutlinedIcon
                style={{
                  marginLeft: 'auto',
                  transform: showSubcategories === index ? 'rotate(90deg)' : 'none',
                  transition: 'transform 0.03s'
                }}
              />
            </ListItemButton>
            {showSubcategories === index && (
              <div style={{ display: 'flex', flexFlow: 'column', alignItems: 'center', gap: 8 }}>
                {renderSubcategories(item.subcategories)}
              </div>
            )}
          </>
        ) : (
          <>
            <CustomLink href={item.path}>
              {item.icon} {item.title}
            </CustomLink>
          </>
        )}
      </li>
    ))
  }

  // Render navigation based on user role
  const renderNavigation = () => {
    if (userRole && navigation[userRole]) {
      return renderNavigationItems(navigation[userRole])
    }

    return null
  }

  return <>{renderNavigation()}</>
}

export default CustomNav
