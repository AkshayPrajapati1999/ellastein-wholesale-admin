// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import Table from 'mdi-material-ui/Table'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import Dropdown from './dropdown'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Orders',
      icon: Table,
      path: '/orders'
    },
    {
      title: 'Customers',
      icon: Table,
      path: '/customers'
    },
    {
      title: 'Products',
      icon: Table,
      path: '/products'
    },
    {
      title: 'Product Categories',
      icon: Table,
      path: '/product-categories'
    },
    {
      title: '',
      icon: Dropdown
    },
    {
      title: 'Tools',
      icon: Table,
      path: '/tools'
    },
    {
      title: 'Banners',
      icon: Table,
      path: '/banners'
    },
    {
      title: 'News',
      icon: Table,
      path: '/news'
    },
    {
      title: 'Sales Reps',
      icon: Table,
      path: '/sales-reps'
    },
    {
      title: 'Reports',
      icon: Table,
      path: '/reports'
    },
    {
      title: 'Settings',
      icon: Table,
      path: '/settings'
    }
  ]
}

export default navigation
