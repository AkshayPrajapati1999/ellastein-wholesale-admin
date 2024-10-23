export interface Product {
  image: string
  title: string
  price: number
  id: number
  category: string
  description: string
}
export interface IProducts {
  productId: number
  productName: string
  categoryName: string
  productImage: string
  price: number
  wholesalePrice: number
  isActive: boolean
}

export interface IOrderFor {
  key: string
  value: string
}

export interface IOrders {
  paymentType: string
  id: number
  orderDate: Date
  orderNumber: string
  customerCode: string
  orderDetails: any
  orderFor: IOrderFor[]
  totalAmount: number
  orderStatus: string
  storeName: string
  email: string
}

export interface IAllCategorieswithSubCategories {
  categoryId: number
  categoryName: string
  subCategoryId: number
  subCategories: ISubcategory[]
}

export interface ISubcategory {
  categoryId: number
  subCategoryId: number
  subCategoryName: string
}

export interface ICustomers {
  index: any
  userId: string
  id: any
  storeName: string
  location: string
  email: string
  customerCode: string
  openOrders: string
  lastOrderDate: Date
  lastOrderValue: number
  phoneNumber: string
  salesAgentName: string
  date: string
  lastorder: string
  status: string
  paymentTerms: string
  isActive: boolean
}

export interface PendingCustomers {
  index: any
  id: number
  status: string
  storeName: string
  primarySalesChannel: string
  numberOfDoors: number
  platformWebsite: string
  storeType: string
  email: string
  phoneNumber: number
  userId: string
}
